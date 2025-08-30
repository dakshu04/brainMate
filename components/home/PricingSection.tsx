"use client";
import React from "react";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "Great for individuals starting out",
    items: ["5 PDF summaries per month", "Standard processing"],
    paymentLink: "https://buy.stripe.com/test_basic_plan", // Replace with real link
    priceId: "price_basic_plan", // Stripe price id
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink: "https://buy.stripe.com/test_pro_plan", // Replace with real link
    priceId: "price_pro_plan",
  },
];

const PricingCard = ({
  name,
  price,
  items,
  paymentLink,
}: {
  name: string;
  price: number;
  items: string[];
  paymentLink: string;
}) => {
  return (
    <div className="p-6 border rounded-2xl bg-white shadow-md hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-2xl font-semibold text-rose-500 mb-4">${price}/mo</p>
        <ul className="space-y-2 mb-6">
          {items.map((item, i) => (
            <li key={i} className="text-gray-600 text-sm">
              ✔ {item}
            </li>
          ))}
        </ul>
      </div>
      <a
        href={paymentLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-block text-center bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition"
      >
        Subscribe
      </a>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h2 className="text-center text-3xl font-bold mb-12">Pricing</h2>

      {/* Pricing cards grid */}
      <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
}
