"use client";

import {
  ShieldCheck,
  Truck,
  Clock,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <iframe
          src="https://my.spline.design/bganimation-xIKR0ZTWWoifZLAKROH7y9YL"
          className="w-full h-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <ShieldCheck className="h-4 w-4" />
            Trusted Online Pharmacy
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl">
            Healthcare Made
            <span className="text-primary"> Simple & Reliable</span>
          </h1>

          {/* Description */}
          <p className="mt-5 text-muted-foreground max-w-2xl text-lg">
            Get genuine medicines, healthcare products, and essentials delivered
            safely to your home. Verified pharmacies, fast delivery, and
            reliable service you can trust.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Button size="lg">Browse Medicines</Button>
            <Button size="lg" variant="outline">
              Upload Prescription
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full max-w-4xl">
            <div className="rounded-xl border border-border bg-background/70 backdrop-blur p-5 text-left">
              <Truck className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Quick and reliable delivery to your doorstep.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background/70 backdrop-blur p-5 text-left">
              <BadgeCheck className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold">Verified Medicines</h3>
              <p className="text-sm text-muted-foreground mt-1">
                All products sourced from trusted pharmacies.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background/70 backdrop-blur p-5 text-left">
              <Clock className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Our team is always ready to help you.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 mt-12 text-center">
            <div>
              <p className="text-2xl font-semibold">50K+</p>
              <p className="text-sm text-muted-foreground">Customers Served</p>
            </div>

            <div>
              <p className="text-2xl font-semibold">10K+</p>
              <p className="text-sm text-muted-foreground">Orders Delivered</p>
            </div>

            <div>
              <p className="text-2xl font-semibold">100%</p>
              <p className="text-sm text-muted-foreground">Genuine Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
