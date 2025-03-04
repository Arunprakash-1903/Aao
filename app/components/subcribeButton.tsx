"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";


export default function SubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const startSubscription = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay is not loaded yet. Please wait...");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/razorpay-subscription", {
      method: "POST",
      body: JSON.stringify({
        email: "arunprakash2225@gmail.com", // Replace with actual user email
        planId: "plan_Q1SgoSIYyPhfBF", // Replace with your Razorpay Plan ID
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.id) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: data.id,
        name: "Your Business",
        description: "Premium Subscription",
        theme: { color: "#3399cc" },
        
        handler: (response: any) => {
          console.log("Payment successful:", response);
        },
        prefill:{
          name:session.user?.name,
          email:session.user?.email
        }
      };

      const rzp = new (window as any).Razorpay(options); // ✅ Now Razorpay will be available
      rzp.open();
    }
    setLoading(false);
  };

  return (
    <button onClick={startSubscription} disabled={loading} className="bg-blue-500 text-white px-4 py-2">
      {loading ? "Processing..." : "Subscribe"}
    </button>
  );
}
