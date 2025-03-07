"use client";

import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white max-w-3xl w-full p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">Terms and Conditions</h1>
        <p className="text-sm text-gray-600 mt-2">Last updated: March 05, 2025</p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">Agreement to Our Legal Terms</h2>
        <p className="text-gray-700 mt-2">
          We are <strong>Architecture Academics Online</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
          We operate the website{" "}
          <Link href="https://architecture-academics.online" className="text-blue-600 font-medium hover:underline">
            https://architecture-academics.online
          </Link>, as well as other related products and services that refer to these Legal Terms (the &quot;Services&quot;).
        </p>

        <p className="text-gray-700 mt-2">
          Architecture Academics Online is an edTech platform that sells digital courses related to architecture.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">Contact Information</h2>
        <p className="text-gray-700 mt-2"><strong>Phone:</strong> 9445058258</p>
        <p className="text-gray-700">
          <strong>Email:</strong>{" "}
          <a href="mailto:admin@architecture-academics.online" className="text-blue-600 font-medium hover:underline">
            admin@architecture-academics.online
          </a>
        </p>

        <p className="text-gray-700 mt-4">
          By accessing and using our Services, you agree to be bound by these Legal Terms. If you do not agree with all
          of these terms, you must discontinue use immediately.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">Table of Contents</h2>
        <ul className="list-decimal list-inside text-gray-700 mt-2 space-y-1">
          {[
            "Our Services",
            "Intellectual Property Rights",
            "User Representations",
            "User Registration",
            "Products",
            "Purchases and Payment",
            "Subscriptions",
            "Refund Policy",
            "Prohibited Activities",
            "User-Generated Contributions",
            "Contribution License",
            "Social Media",
            "Third-Party Websites and Content",
            "Services Management",
            "Term and Termination",
            "Modifications and Interruptions",
            "Governing Law",
            "Dispute Resolution",
            "Corrections",
            "Disclaimer",
            "Limitations of Liability",
            "Indemnification",
            "User Data",
            "Electronic Communications, Transactions, and Signatures",
            "Miscellaneous",
            "Contact Us",
          ].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <p className="text-gray-700 mt-6">
          For the full document, visit:{" "}
          <Link href="https://architecture-academics.online" className="text-blue-600 font-medium hover:underline">
            https://architecture-academics.online
          </Link>
        </p>
      </div>
    </div>
  );
}
