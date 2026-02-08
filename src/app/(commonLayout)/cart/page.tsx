import React from "react";
import { CartItems } from "@/components/modules/cart/CartItems";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="bg-[#FAFAFA] dark:bg-background min-h-screen pt-24 pb-32 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <Link
              href="/shop"
              className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest hover:gap-3 transition-all"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Pharmacy
            </Link>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
              Your Shopping <span className="text-primary italic">Cart.</span>
            </h1>
          </div>
          <p className="text-sm font-bold text-muted-foreground dark:text-gray-500 uppercase tracking-[0.2em] mb-2">
            Authentic OTC Medicines Only
          </p>
        </div>

        <CartItems />
      </div>
    </div>
  );
}
