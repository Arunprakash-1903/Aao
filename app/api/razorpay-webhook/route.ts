import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from 'prisma/prisma';
export async function POST(req: Request) {
  const body = await req.json();
  console.log("Webhook event:", body);
  const session=await getServerSession(authOptions)

      //const user=await prisma.user.findUnique({where: { email:session?.user?.email ||"" },});
  if (body.event === "subscription.activated") {
    console.log("Subscription activated for:", body.payload.subscription.entity.customer_id);
console.log(session);


    const user = await prisma.user.findUnique({
      where: {
        email:session?.user?.email,
      },
     
    })


    await prisma.user.update({
        where: {
          email:session?.user?.email,
        },
        data: {
          subcribed:true,
        },
      })
    console.log("subcribed",user);
    
    
        
          
          
          
          await fetch(`${process.env.NEXTAUTH_URL}/api/purchase`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // userId:3,
              // courseId: 1,
              email:session?.user?.email,
              id:"1"
            }),
          });
  }

  return NextResponse.json({ message: "Webhook received" });
}
