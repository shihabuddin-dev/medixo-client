"use client";

import {
  Stethoscope,
  Baby,
  HeartPulse,
  Sparkles,
  FlaskConical,
  User,
  Activity,
  Droplet,
  Pill,
  Leaf,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";

const defaultCategories = [
  {
    name: "Prescription",
    icon: Stethoscope,
    linear: "from-sky-500 to-cyan-500",
    count: "1,200+ Products",
  },
  {
    name: "Baby Care",
    icon: Baby,
    linear: "from-pink-500 to-rose-500",
    count: "450+ Products",
  },
  {
    name: "Heart Health",
    icon: HeartPulse,
    linear: "from-red-500 to-orange-500",
    count: "300+ Products",
  },
  {
    name: "Vitamins",
    icon: Sparkles,
    linear: "from-amber-500 to-yellow-500",
    count: "800+ Products",
  },
  {
    name: "Lab Test",
    icon: FlaskConical,
    linear: "from-emerald-500 to-teal-500",
    count: "150+ Tests",
  },
  {
    name: "Personal Care",
    icon: User,
    linear: "from-indigo-500 to-violet-500",
    count: "2,000+ Products",
  },
  {
    name: "Diabetes Care",
    icon: Activity,
    linear: "from-purple-500 to-fuchsia-500",
    count: "220+ Products",
  },
  {
    name: "Skin Care",
    icon: Droplet,
    linear: "from-rose-500 to-pink-500",
    count: "540+ Products",
  },
  {
    name: "Pain Relief",
    icon: Pill,
    linear: "from-orange-500 to-red-500",
    count: "310+ Products",
  },
  {
    name: "Supplements",
    icon: Leaf,
    linear: "from-lime-500 to-emerald-500",
    count: "680+ Products",
  },
];

export function Categories({ data }: { data?: any[] }) {
  const displayCategories =
    data && data.length > 0
      ? data.slice(0, 10).map((cat, idx) => {
          const defaults = defaultCategories[idx % defaultCategories.length];
          return {
            ...cat,
            icon: defaults.icon,
            linear: defaults.linear,
            count: defaults.count,
          };
        })
      : defaultCategories.slice(0, 10);

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-14">
          <SectionHeader
            label="Browse Pharmacy"
            title="Choose by"
            highlight="Category"
          />

          <Link
            href="/shop"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition"
          >
            View All
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {displayCategories.map((cat, idx) => (
            <motion.div
              key={cat.id || cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link href={`/shop?categoriesId=${cat.id || ""}`}>
                <div className="group relative rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {/* Icon */}
                  <div
                    className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-linear-to-br ${cat.linear} text-white shadow-md group-hover:scale-110 transition`}
                  >
                    <cat.icon size={26} />
                  </div>

                  {/* Title */}
                  <h4 className="font-semibold text-base mb-1">{cat.name}</h4>

                  {/* Count */}
                  <p className="text-xs text-muted-foreground">{cat.count}</p>

                  <div className="absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-primary/20 transition pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
