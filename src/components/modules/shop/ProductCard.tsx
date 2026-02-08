"use client";

import React from "react";
import { ShoppingCart, Star, Heart, Eye, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: any }) {
  if (!product) return null;

  const productId = product.id || product._id;
  const productPrice = product.price || 0;
  const productStock = product.stock || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <Link href={`/shop/${productId}`} className="block">
        <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-16 w-16 text-gray-300 dark:text-gray-600" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge className="bg-white dark:bg-gray-800 text-primary font-black px-3 py-1 rounded-md border border-gray-200 dark:border-white/10 shadow-sm">
              OTC
            </Badge>
            {productStock < 10 && productStock > 0 && (
              <Badge
                variant="destructive"
                className="font-black px-3 py-1 rounded-md border-none shadow-sm"
              >
                Low Stock
              </Badge>
            )}
            {productStock === 0 && (
              <Badge className="bg-gray-500 text-white font-black px-3 py-1 rounded-md border-none shadow-sm">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Action Overlay */}
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-md shadow-md hover:scale-110 transition-transform bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>
            <Button
              size="icon"
              className="h-10 w-10 rounded-md shadow-md hover:scale-110 transition-transform"
            >
              <Eye className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
            <span>{product.manufacturer || "Certified Pharmacy"}</span>
            <div className="flex items-center gap-1 text-orange-500">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-gray-900 dark:text-gray-100">4.8</span>
            </div>
          </div>

          <h4 className="text-lg font-black text-gray-900 dark:text-gray-100 leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h4>

          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium line-clamp-2 leading-relaxed">
            {product.description ||
              "Premium quality medicine for your health needs."}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-primary">
                ${productPrice.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">
                Per Unit
              </span>
            </div>
            <Button
              size="icon"
              className="h-12 w-12 rounded-md shadow-md hover:scale-110 active:scale-95 transition-all"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic here
              }}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
