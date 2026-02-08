"use client";

import React from "react";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function CartItems() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-6">
        <div className="h-24 w-24 rounded-[32px] bg-primary/5 flex items-center justify-center text-primary">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground font-medium max-w-sm mx-auto">
            Looks like you haven't added any medicines to your cart yet. Browse
            our shop to find what you need.
          </p>
        </div>
        <Button
          asChild
          className="h-14 px-12 rounded-md font-black shadow-xl shadow-primary/20"
        >
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* List */}
      <div className="lg:col-span-2 space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 bg-white/70 dark:bg-black/20 backdrop-blur-md p-6 rounded-md ring-1 ring-gray-100 dark:ring-white/10 shadow-xl shadow-gray-100/50 dark:shadow-none group"
          >
            <div className="h-28 w-28 rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs font-bold text-muted-foreground dark:text-gray-400 uppercase tracking-widest mt-1">
                    Pharmacy Verified Product
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center bg-gray-50 p-1.5 rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-black">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        Math.min(item.stock, item.quantity + 1),
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-xl font-black text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white/70 dark:bg-black/20 backdrop-blur-md p-8 rounded-md ring-1 ring-gray-100 dark:ring-white/10 shadow-2xl shadow-gray-100/50 dark:shadow-none space-y-6 sticky top-24">
          <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">
            Order Summary
          </h3>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between text-sm font-bold text-muted-foreground uppercase tracking-widest">
              <span>Subtotal</span>
              <span className="text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-muted-foreground uppercase tracking-widest">
              <span>Shipping Fee</span>
              <span className="text-emerald-500">FREE</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-muted-foreground uppercase tracking-widest">
              <span>Tax Estimate</span>
              <span className="text-gray-900">$0.00</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-black text-gray-900 uppercase tracking-tighter">
                Grand Total
              </span>
              <span className="text-3xl font-black text-primary">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            asChild
            className="w-full h-16 rounded-md text-lg font-black shadow-xl shadow-primary/20 gap-3 group"
          >
            <Link href="/checkout">
              Checkout Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <p className="text-[10px] font-bold text-center text-muted-foreground uppercase tracking-[0.2em] leading-relaxed">
            100% Secure Checkout • Cash on Delivery Available
          </p>
        </div>
      </div>
    </div>
  );
}
