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
                // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
             //   ✅ Grant access to the product
             try {
                const sessionstripe = await stripe.checkout.sessions.retrieve(
                    data.object.id,
                    {
                        expand: ['line_items']
                    }
                );
                const customerId:any = sessionstripe?.customer;
                const customer:any = await stripe.customers.retrieve(customerId);
               // const priceId = sessionstripe?.line_items?.data[0]?.price.id;
                
                //console.log(customerId,customer,priceId)
                
                // if (customer.email) {
                //     user = await User.findOne({ email: customer.email });

                //     if (!user) {
                //         user = await User.create({
                //             email: customer.email,
                //             name: customer.name,
                //             customerId
                //         });

                //         await user.save();
                //     }
                // } else {
                //     console.error('No user found');
                //     throw new Error('No user found');
                // }

                // // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
                // user.priceId = priceId;
                // user.hasAccess = true;
                // await user.save();

                // Extra: >>>>> send email to dashboard <<<<
                const user = await prisma.user.update({
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

            case 'customer.subscription.deleted': {
            //     // ❌ Revoke access to the product
            //     // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
            //     const subscription = await stripe.subscriptions.retrieve(
            //         data.object.id
            //     );
            //     const user = await User.findOne({
            //         customerId: subscription.customer
            //     });

            //     // Revoke access to your product
            const sessionstripe = await stripe.checkout.sessions.retrieve(
                data.object.id,
                {
                    expand: ['line_items']
                }
            );
            const customerId:any = sessionstripe?.customer;
            const customer:any = await stripe.customers.retrieve(customerId);
           
            await prisma.user.update({
                where: {
                  email: customer.email,
                },
                data: {
                  subcribed:false,
                },
              })


              const response = await fetch(`${process.env.NEXTAUTH_URL}/api/unpurchase`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  // userId:3,
                  // courseId: 1,
                  email:session.user.email,
                  id:c.id
                }),
              });
        
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to purchase course.');
              }
            //     await user.save();

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