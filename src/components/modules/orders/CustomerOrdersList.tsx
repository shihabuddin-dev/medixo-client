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
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const statusConfig: Record<
  string,
  { color: string; icon: any; label: string }
> = {
  PLACED: { color: "bg-blue-500", icon: Clock, label: "Pending" },
  PROCESSING: { color: "bg-indigo-500", icon: Truck, label: "Processing" },
  SHIPPED: { color: "bg-indigo-500", icon: Truck, label: "Shipped" },
  DELIVERED: { color: "bg-emerald-600", icon: CheckCircle2, label: "Delivered" },
  CANCELLED: { color: "bg-red-500", icon: XCircle, label: "Cancelled" },
};

export function CustomerOrdersList({ orders }: { orders: any[] }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-5">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <ShoppingBag className="h-8 w-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold">No orders yet</h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            You haven’t placed any orders yet. Start browsing medicines.
          </p>
        </div>

        <Button asChild>
          <Link href="/shop">Browse Medicines</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const config = statusConfig[order.status] || statusConfig.PLACED;
        const StatusIcon = config.icon;

        return (
          <Card
            key={order.id}
            className="border border-border shadow-sm hover:shadow-md transition"
          >
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-center gap-5">

                {/* Left */}
                <div className="flex items-center gap-4 flex-1">

                  {/* Image */}
                  <div className="h-16 w-16 rounded-lg border bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                    {order.medicines?.image ? (
                      <img
                        src={order.medicines.image}
                        alt={order.medicines?.name}
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <Package className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold leading-tight">
                      {order.medicines?.name}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>Qty: {order.quantity}</span>
                      <span>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span className="font-mono">
                        #{order.id.slice(-6)}
                      </span>
                    </div>

                    <Badge
                      className={`${config.color} text-white border-none flex items-center gap-1 w-fit`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </Badge>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 min-w-[140px]">

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-lg font-semibold text-primary">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="gap-1"
                  >
                    <Link href={`/dashboard/orders/${order.id}`}>
                      Details
                      <ChevronRight className="h-4 w-4" />
                    </Link>
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