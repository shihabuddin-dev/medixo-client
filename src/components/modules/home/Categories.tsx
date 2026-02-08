"use client";

import React from "react";
import {
  Stethoscope,
  Baby,
  HeartPulse,
  Settings2,
  Sparkles,
  FlaskConical,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const defaultCategories = [
  {
    name: "Prescription",
    icon: Stethoscope,
    color: "bg-blue-500",
    count: "1,200+ Products",
  },
  {
    name: "Baby Care",
    icon: Baby,
    color: "bg-pink-500",
    count: "450+ Products",
  },
  {
    name: "Heart Health",
    icon: HeartPulse,
    color: "bg-red-500",
    count: "300+ Products",
  },
  {
    name: "Vitamins",
    icon: Sparkles,
    color: "bg-orange-500",
    count: "800+ Products",
  },
  {
    name: "Lab Test",
    icon: FlaskConical,
    color: "bg-emerald-500",
    count: "150+ Tests",
  },
  {
    name: "Personal Care",
    icon: Settings2,
    color: "bg-indigo-500",
    count: "2,000+ Products",
  },
];

export function Categories({ data }: { data?: any[] }) {
  const displayCategories =
    data && data.length > 0
      ? data.map((cat, idx) => {
          const defaults = defaultCategories[idx % defaultCategories.length];
          return {
            ...cat,
            icon: defaults.icon,
            color: defaults.color,
            count: defaults.count, // In a real app, this would come from the API
          };
        })
      : defaultCategories;

  return (
    <section className="py-24 bg-white/50 dark:bg-black/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary">
              Browse Pharmacy
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-gray-100">
              Choose by <span className="text-primary italic">Category.</span>
            </h3>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
          >
            View All Collections
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {displayCategories.map((cat, idx) => (
            <motion.div
              key={cat.id || cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/shop?categoriesId=${cat.id}`}>
                <div className="relative overflow-hidden rounded-md bg-white/70 dark:bg-black/20 backdrop-blur-md ring-1 ring-gray-100 dark:ring-white/10 shadow-xl shadow-gray-100/50 p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-primary/10 group-hover:ring-primary/20">
                  <div
                    className={`h-16 w-16 rounded-md ${cat.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-${cat.color.split("-")[1]}-500/20 group-hover:scale-110 transition-transform`}
                  >
                    <cat.icon size={32} />
                  </div>
                  <h4 className="font-black text-gray-900 dark:text-gray-100 text-lg mb-1">
                    {cat.name}
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                    {cat.count}
                  </p>

                  {/* Decorative background element */}
                  <div className="absolute -bottom-4 -right-4 h-16 w-16 bg-gray-50 dark:bg-white/5 rounded-md -z-10 group-hover:bg-primary/5 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
