
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Webhook event:", body);

  if (body.event === "subscription.activated") {
    const customerId = body.payload.subscription.entity.customer_id;
    console.log("Customer ID:", customerId);
const session=getServerSession(authOptions)
    if (!customerId) {
      return NextResponse.json({ error: "Customer ID not found" }, { status: 400 });
    }

    // Fetch customer details from Razorpay API
    const customerResponse = await fetch(`https://api.razorpay.com/v1/customers/${customerId}`, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64")}`
      }
    });

    if (!customerResponse.ok) {
      console.log("Failed to fetch customer details");
      return NextResponse.json({ error: "Failed to fetch customer details" }, { status: 400 });
    }

    //const customerData = await customerResponse.json();
    const subscriberEmail = (await session).user.email

    console.log("Subscriber Email:", subscriberEmail);

    if (!subscriberEmail) {
      return NextResponse.json({ error: "Email not found for customer" }, { status: 400 });
    }

    // Find user in Prisma
    const user = await prisma.user.findUnique({
      where: { email: subscriberEmail },
    });

    if (user) {
      await prisma.user.update({
        where: { email: subscriberEmail },
        data: { subscribed: true },
      });

      console.log("User subscribed:", user);

      // Notify purchase API
      await fetch(`${process.env.NEXTAUTH_URL}/api/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: subscriberEmail,
          id: "1",
        }),
      });
    } else {
      console.log("User not found in database");
    }
  }

  return NextResponse.json({ message: "Webhook received" });
}
