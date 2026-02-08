"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Plus,
  Minus,
  Heart,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export function ProductDetails({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left: Image Gallery */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square rounded-md overflow-hidden bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 shadow-lg border-4 border-white dark:border-gray-800"
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <Package className="h-32 w-32 text-gray-300 dark:text-gray-600" />
            </div>
          )}
          <div className="absolute top-6 left-6">
            <Badge className="bg-primary text-white font-black px-4 py-2 rounded-md text-sm border-none shadow-md">
              100% Genuine
            </Badge>
          </div>
        </motion.div>

        {/* Thumbnail Gallery */}
        <div className="flex gap-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className={`h-24 w-24 rounded-md bg-white dark:bg-gray-900 border-2 ${
                i === 0
                  ? "border-primary shadow-md"
                  : "border-gray-200 dark:border-white/10"
              } p-2 cursor-pointer hover:border-primary transition-colors`}
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  <Package className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Info Section */}
      <div className="flex flex-col">
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <Badge
              variant="secondary"
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold px-3 py-1 rounded-md border border-gray-200 dark:border-white/10"
            >
              {product.category?.name || "Medicine"}
            </Badge>
            <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-gray-900 dark:text-gray-100">
                4.9{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  (120+ Reviews)
                </span>
              </span>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
            {product.name}
          </h1>

          <p className="text-lg font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
            {product.description ||
              "Premium quality medicine for your health needs."}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-8 space-y-6 mb-8 border border-gray-200 dark:border-white/10 shadow-sm">
          <div className="flex items-baseline gap-4 flex-wrap">
            <span className="text-5xl font-black text-primary">
              ${product.price?.toFixed(2) || "0.00"}
            </span>
            <span className="text-lg font-bold text-gray-400 dark:text-gray-500 line-through">
              ${((product.price || 0) * 1.25).toFixed(2)}
            </span>
            <Badge className="bg-emerald-500 text-white border-none font-black px-3 py-1 rounded-md ml-auto shadow-sm">
              SAVE 25%
            </Badge>
          </div>

          <Separator className="bg-gray-200 dark:bg-white/10" />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-md border border-gray-200 dark:border-white/10 shadow-sm">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrement}
                className="h-10 w-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-black text-xl text-gray-900 dark:text-gray-100">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={increment}
                className="h-10 w-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Add to Cart Button */}
            <Button className="flex-1 h-14 rounded-md text-base font-black shadow-md gap-3 group hover:shadow-lg transition-shadow">
              <ShoppingCart className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
              Add to Cart
            </Button>

            {/* Wishlist Button */}
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-md border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-500 hover:border-red-200 dark:hover:border-red-500/30 transition-colors shadow-sm"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <p className="text-xs font-bold text-center text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            Free delivery on orders over $50 • Secured Checkout
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-6 pt-4">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="h-14 w-14 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-sm">
              <Truck className="h-7 w-7" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-gray-100">
              Fast Shipping
            </span>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="h-14 w-14 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-sm">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-gray-100">
              Authentic
            </span>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="h-14 w-14 rounded-md bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center shadow-sm">
              <RotateCcw className="h-7 w-7" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-gray-100">
              Easy Return
            </span>
          </div>
        </div>

        {/* Stock Status */}
        <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-md">
          <p className="text-sm font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest text-center">
            ✓ In Stock - Ships within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
