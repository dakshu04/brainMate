import { isDev } from "@/utils/helper";

export const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "Great for individuals starting out",
    items: ["5 PDF summaries per month", "Standard processing"],
    paymentLink: isDev ? 'https://buy.stripe.com/test_8x2fZg7pxd3v8PFapH2Ry00' : '', // Replace with real link
    priceId: isDev ? 'price_1SCQRQCTTZJYDfu3pK8yNqKJ' : '' 
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
    paymentLink: isDev ? 'https://buy.stripe.com/test_eVqdR8fW36F7aXN7dv2Ry01' : '', // Replace with real link
    priceId: isDev ? 'price_1SCQRQCTTZJYDfu3pK8yNqKJ' : '' ,
  },
];