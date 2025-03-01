import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Webhook event:", body);

  if (body.event === "subscription.activated") {
    console.log("Subscription activated for:", body.payload.subscription.entity.customer_id);
  }

  return NextResponse.json({ message: "Webhook received" });
}
