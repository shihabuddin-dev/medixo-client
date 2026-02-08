"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

const statusConfig: Record<
  string,
  { color: string; icon: any; label: string }
> = {
  Pending: { color: "bg-blue-500", icon: Clock, label: "Pending" },
  Paid: { color: "bg-emerald-500", icon: CheckCircle2, label: "Paid" },
  Shipped: { color: "bg-indigo-500", icon: Truck, label: "Shipped" },
  Delivered: { color: "bg-green-600", icon: Package, label: "Delivered" },
  Cancelled: { color: "bg-red-500", icon: XCircle, label: "Cancelled" },
};

export function CustomerOrdersList({ orders }: { orders: any[] }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-6">
        <div className="h-24 w-24 rounded-md bg-primary/10 flex items-center justify-center text-primary shadow-xl shadow-primary/20 animate-bounce">
          <Package className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 uppercase tracking-tighter">
            No orders found
          </h2>
          <p className="text-muted-foreground dark:text-gray-400 font-medium max-w-xs mx-auto text-sm uppercase tracking-widest leading-relaxed">
            Your pharmaceutical history is empty. Explore our verified
            repository.
          </p>
        </div>
        <Button
          asChild
          className="h-14 px-10 rounded-md font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all"
        >
          <Link href="/shop">Access Marketplace</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const config = statusConfig[order.status] || statusConfig.Pending;
        const StatusIcon = config.icon;

        return (
          <Card
            key={order.id}
            className="group overflow-hidden rounded-md border-none ring-1 ring-gray-100 dark:ring-white/10 shadow-xl shadow-gray-100/50 dark:shadow-none bg-white/70 dark:bg-black/20 backdrop-blur-md hover:ring-primary/20 transition-all duration-300"
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Left: Product Info */}
                <div className="flex-1 p-8 flex gap-6">
                  <div className="h-24 w-24 rounded-md overflow-hidden bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={order.medicines?.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${config.color} text-white border-none font-black text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-sm`}
                      >
                        <StatusIcon className="h-2.5 w-2.5" />
                        {config.label.toUpperCase()}
                      </Badge>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground dark:text-gray-500">
                        #{order.id.slice(0, 8)}
                      </span>
                    </div>
                    <h4 className="text-xl font-black text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors uppercase tracking-tight">
                      {order.medicines?.name}
                    </h4>
                    <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <ExternalLink className="h-3 w-3" /> Qty:{" "}
                        {order.quantity}
                      </span>
                      <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded-md border dark:border-white/10">
                        Ordered on:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Payment & Action */}
                <div className="bg-gray-50/30 dark:bg-white/5 p-8 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-6 min-w-[220px] border-l dark:border-white/10">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground dark:text-gray-500">
                      Total Transaction
                    </p>
                    <p className="text-3xl font-black text-primary italic">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-md border-gray-200 dark:border-white/10 font-black uppercase tracking-widest text-[10px] h-10 px-6 gap-2 group/btn hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                  >
                    Manifest
                    <ChevronRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
