import React from "react";
import { CheckoutForm } from "@/components/modules/checkout/CheckoutForm";
import { userService } from "@/services/user.service";

export default async function CheckoutPage() {
  const { data: session } = await userService.getSession();

  return (
    <div className="bg-[#FAFAFA] dark:bg-background min-h-screen pt-24 pb-32 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="space-y-4 mb-16 text-center lg:text-left">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary">
            Final Stage
          </h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
            Order <span className="text-primary italic">Checkout.</span>
          </h1>
          <p className="text-muted-foreground dark:text-gray-400 font-medium max-w-2xl">
            Please verify your shipping details and select a payment method to
            complete your purchase. Your health is in safe hands.
          </p>
        </div>

        <CheckoutForm user={session?.user} />
      </div>
    </div>
  );
}
