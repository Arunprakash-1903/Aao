import { NextResponse } from 'next/server';

import Stripe from 'stripe';
import prisma from 'prisma/prisma';
import { getCourseBySlug } from '../../../../sanity/sanity.query'
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req:Request) {
  
    const session=await getServerSession(authOptions)
    const body = await req.text();

    const signature =  req.headers.get('stripe-signature')
   
    let data;
    let eventType;
    let event;
    try {
    // verify Stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(body,  await signature, webhookSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
    const c=await getCourseBySlug("nata-course")
    data = event.data;
    eventType = event.type;


        switch (eventType) {
            case 'checkout.session.completed': {
     
             try {
                const sessionstripe = await stripe.checkout.sessions.retrieve(
                    data.object.id,
                    {
                        expand: ['line_items']
                    }
                );
                const customerId:any = sessionstripe?.customer;
                const customer:any = await stripe.customers.retrieve(customerId);
                const user = await prisma.user.findUnique({
                  where: {
                    email:customer.email,
                  },
                 
                })
            

                await prisma.user.update({
                    where: {
                      email:customer.email,
                    },
                    data: {
                      subcribed:true,
                    },
                  })
                console.log("subcribed",user);
                
                
                    
                      
                      
                      
                      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/purchase`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          // userId:3,
                          // courseId: 1,
                          email:customer.email,
                          id:"1"
                        }),
                      });
                
                      if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to purchase course.');
                      }
                
               
                    } catch (error: any) {
                      console.log(error.message);
                    } 
              
                break;
            }

            default:
            // Unhandled event type
        }
    } catch (e) {
        console.error(
            'stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType
        );
   }

    return NextResponse.json({});
}