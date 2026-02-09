import React from "react";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { adminService } from "@/services/admin.service";
import SectionHeader from "@/components/shared/SectionHeader";

export async function FeaturedMedicines() {
  const { data: medicines } = await adminService.getAllMedicines();
  console.log(medicines);

  // Show only first 4 as featured
  const featured = medicines?.slice(0, 4) || [];

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16 px-4">
          <div className="space-y-4">
            <SectionHeader
              label="Popular Choices"
              title="Featured"
              highlight="Medicines."
            />
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-2 font-bold px-6 py-3 rounded-md backdrop-blur-2xl border-gray-100"
          >
            Browse Pharmacy <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((med: any) => (
            <div
              key={med.id}
              className="group relative bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-md ring-1 ring-gray-100 dark:ring-white/10 shadow-2xl shadow-gray-100/50 dark:shadow-none p-6 transition-all duration-300 hover:shadow-primary/10 hover:ring-primary/20"
            >
              {/* Product Image */}
              <div className="relative aspect-square rounded-md overflow-hidden bg-gray-50 dark:bg-white/5 mb-6">
                <img
                  src={med.image}
                  alt={med.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-primary font-black px-3 py-1 rounded-md border-none">
                  OTC
                </Badge>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Product Info */}
              <div className="space-y-4 px-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-2 truncate">
                    Generic Name • {med.name}
                  </p>
                  <div className="flex items-center gap-1 text-orange-500 text-xs font-bold">
                    <Star className="h-3 w-3 fill-current" />
                    4.9
                  </div>
                </div>

                <h4 className="text-xl font-black text-gray-900 dark:text-gray-100 leading-tight group-hover:text-primary transition-colors">
                  {med.name}
                </h4>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                      Price per unit
                    </span>
                    <span className="text-2xl font-black text-primary">
                      ${med.price.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    size="icon"
                    className="h-12 w-12 rounded-md shadow-lg shadow-primary/20 hover:scale-110 transition-transform"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Hover quick link */}
              <Link
                href={`/shop/${med.id}`}
                className="absolute inset-0 z-10"
              />
            </div>
          ))}
        </div>

        {/* Mobile secondary bridge */}
        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-md bg-primary text-white shadow-xl shadow-primary/20"
          >
            Explore All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
