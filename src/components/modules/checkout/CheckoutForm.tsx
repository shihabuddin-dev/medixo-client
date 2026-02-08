"use client";

import React, { useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  CreditCard,
  ShieldCheck,
  Loader2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { createBulkOrders } from "@/app/actions/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const addressSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Detailed Address is required"),
  city: z.string().min(1, "City is required"),
});

export function CheckoutForm({ user }: { user: any }) {
  const { cart, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: "",
    },
    validators: {
      onChange: addressSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Processing your order...");
      try {
        const fullAddress = `${value.address}, ${value.city}`;
        const { err } = await createBulkOrders(cart, fullAddress);

        if (err) {
          toast.error(err.message, { id: toastId });
          return;
        }

        toast.success("Order placed successfully!", { id: toastId });
        clearCart();
        setIsSuccess(true);
      } catch (err: any) {
        toast.error(err.message || "Failed to place order", { id: toastId });
      }
    },
  });

  if (cart.length === 0 && !isSuccess) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 space-y-8 text-center"
          >
            <div className="h-32 w-32 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/10">
              <CheckCircle2 className="h-16 w-16" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 leading-tight">
                Order Placed{" "}
                <span className="text-emerald-500 italic">Successfully!</span>
              </h2>
              <p className="text-muted-foreground dark:text-gray-400 font-medium max-w-md mx-auto">
                Thank you for choosing Medixo. Your order is being processed and
                a pharmacist will verify the details soon.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                asChild
                variant="outline"
                className="h-14 px-8 rounded-md font-black border-gray-200 dark:border-white/10"
              >
                <Link href="/dashboard/orders">View My Orders</Link>
              </Button>
              <Button
                asChild
                className="h-14 px-8 rounded-md font-black shadow-xl shadow-primary/20"
              >
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-12"
          >
            {/* Form */}
            <div className="lg:col-span-3 space-y-12">
              <section className="space-y-8 bg-white/70 dark:bg-black/20 backdrop-blur-md p-10 rounded-md ring-1 ring-gray-100 dark:ring-white/10 shadow-2xl shadow-gray-100/50 dark:shadow-none">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-primary/5 dark:bg-primary/20 text-primary flex items-center justify-center">
                    <Truck className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    Shipping Information
                  </h2>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Full Name
                    </Label>
                    <form.Field
                      name="fullName"
                      children={(field) => (
                        <div className="space-y-1">
                          <Input
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 rounded-md bg-gray-50 dark:bg-white/5 border-none ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 dark:text-gray-100"
                          />
                          {field.state.meta.errors ? (
                            <p className="text-[10px] font-bold text-red-500 ml-2 uppercase tracking-widest">
                              {field.state.meta.errors.join(", ")}
                            </p>
                          ) : null}
                        </div>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Phone Number
                    </Label>
                    <form.Field
                      name="phone"
                      children={(field) => (
                        <div className="space-y-1">
                          <Input
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="h-14 rounded-md bg-gray-50 dark:bg-white/5 border-none ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 dark:text-gray-100"
                          />
                          {field.state.meta.errors ? (
                            <p className="text-[10px] font-bold text-red-500 ml-2 uppercase tracking-widest">
                              {field.state.meta.errors.join(", ")}
                            </p>
                          ) : null}
                        </div>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                      City
                    </Label>
                    <form.Field
                      name="city"
                      children={(field) => (
                        <div className="space-y-1">
                          <Input
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="e.g. New York"
                            className="h-14 rounded-md bg-gray-50 dark:bg-white/5 border-none ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 dark:text-gray-100"
                          />
                          {field.state.meta.errors ? (
                            <p className="text-[10px] font-bold text-red-500 ml-2 uppercase tracking-widest">
                              {field.state.meta.errors.join(", ")}
                            </p>
                          ) : null}
                        </div>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Detailed Address
                    </Label>
                    <form.Field
                      name="address"
                      children={(field) => (
                        <div className="space-y-1">
                          <Input
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Street, Building, Apartment, etc."
                            className="h-14 rounded-md bg-gray-50 dark:bg-white/5 border-none ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 dark:text-gray-100"
                          />
                          {field.state.meta.errors ? (
                            <p className="text-[10px] font-bold text-red-500 ml-2 uppercase tracking-widest">
                              {field.state.meta.errors.join(", ")}
                            </p>
                          ) : null}
                        </div>
                      )}
                    />
                  </div>
                </form>
              </section>

              <section className="bg-white/70 dark:bg-black/20 backdrop-blur-md p-10 rounded-md ring-1 ring-gray-100 dark:ring-white/10 shadow-2xl shadow-gray-100/50 dark:shadow-none space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-blue-500/5 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    Payment Method
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-md border-2 border-primary bg-primary/5 dark:bg-primary/10 flex items-center gap-4 relative">
                    <div className="h-6 w-6 rounded-full border-4 border-primary bg-white dark:bg-gray-900 ring-2 ring-primary/20" />
                    <div>
                      <p className="font-black text-gray-900 dark:text-gray-100">
                        Cash on Delivery
                      </p>
                      <p className="text-xs font-medium text-muted-foreground dark:text-gray-400">
                        Pay when your items arrive
                      </p>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-emerald-500 text-white border-none font-black text-[10px] px-2 py-0.5 rounded-md">
                      RECOMMENDED
                    </Badge>
                  </div>
                  <div className="p-6 rounded-md border-2 border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 opacity-60 flex items-center gap-4 cursor-not-allowed grayscale">
                    <div className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-700" />
                    <div>
                      <p className="font-black text-gray-900 dark:text-gray-100">
                        Online Payment
                      </p>
                      <p className="text-xs font-medium text-muted-foreground dark:text-gray-400">
                        Coming Soon
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 dark:bg-black/40 backdrop-blur-xl text-white p-10 rounded-md shadow-2xl shadow-gray-900/20 space-y-8 sticky top-24 border dark:border-white/10">
                <h3 className="text-2xl font-black italic">Order Overview</h3>

                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover"
                          alt={item.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black truncate text-sm">
                          {item.name}
                        </p>
                        <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-black text-primary text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-4">
                  <div className="flex justify-between text-white/50 text-xs font-black uppercase tracking-widest">
                    <span>Cart Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/50 text-xs font-black uppercase tracking-widest">
                    <span>Delivery Fee</span>
                    <span className="text-emerald-400">FREE</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-lg font-black italic">
                      Total Amount
                    </span>
                    <span className="text-4xl font-black text-primary">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      type="button"
                      onClick={() => form.handleSubmit()}
                      disabled={!canSubmit || isSubmitting}
                      className="w-full h-18 rounded-md bg-primary text-white hover:bg-primary/90 text-xl font-black shadow-xl shadow-primary/20 gap-3 group"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <>
                          Place My Order
                          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  )}
                />

                <div className="flex items-center justify-center gap-3 text-white/40 pt-2">
                  <ShieldCheck className="h-4 w-4" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Pharmacist Verified Checkout
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
