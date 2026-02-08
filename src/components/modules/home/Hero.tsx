"use client";

import React from "react";
import { Search, ShieldCheck, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest"
            >
              <ShieldCheck className="h-4 w-4" />
              100% Genuine OTC Medicines
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-gray-100 leading-[1.1]"
            >
              Your Health, Our{" "}
              <span className="text-primary italic">Priority.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Order genuine over-the-counter medicines from certified
              pharmacies. Fast delivery, trusted service, and professional care
              right to your doorstep.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-xl mx-auto lg:mx-0 group"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search for medicines, vitamins, health needs..."
                className="h-16 pl-12 pr-32 rounded-md border-none ring-1 ring-gray-200 dark:ring-white/10 shadow-2xl shadow-gray-100 dark:shadow-none focus:ring-2 focus:ring-primary/20 text-lg transition-all dark:bg-white/5"
              />
              <Button className="absolute right-2 top-2 bottom-2 px-8 rounded-md font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Search
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4"
            >
              <div className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                <div className="h-10 w-10 rounded-md bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Truck className="h-5 w-5" />
                </div>
                Free Delivery
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                <div className="h-10 w-10 rounded-md bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Clock className="h-5 w-5" />
                </div>
                24/7 Support
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-square lg:aspect-[4/3] rounded-md overflow-hidden shadow-2xl shadow-primary/10 border-8 border-white dark:border-white/10 group"
            >
              <img
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=1000"
                alt="Health Care"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent" />
            </motion.div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white/70 dark:bg-black/50 backdrop-blur-md p-6 rounded-md shadow-xl shadow-gray-200/50 dark:shadow-none flex items-center gap-4 ring-1 ring-gray-100 dark:ring-white/10 hidden sm:flex"
            >
              <div className="h-12 w-12 rounded-md bg-green-500 flex items-center justify-center text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900 dark:text-gray-100 leading-none">
                  Trusted pharmacies
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  Verified partner network
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
