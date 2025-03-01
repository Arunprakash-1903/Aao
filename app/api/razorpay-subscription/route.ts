import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const {planId } = await req.json();
    console.log("planId "+planId);
    

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId, // Pass the Razorpay Plan ID
      customer_notify: 1, // Sends a notification to the user
      total_count: 1, // Number of cycles (for a year-long monthly plan)
    });

    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json({ error: "Error creating subscription"+error }, { status: 500 });
  }
}
