import React from "react";
import { orderService } from "@/services/order.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const OrderDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { data: order } = await orderService.getOrderDetails(id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <Package className="h-16 w-16 text-gray-200 mb-4" />
        <h1 className="text-2xl font-bold">Order Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The order you're looking for doesn't exist or you don't have
          permission to view it.
        </p>
        <Link href="/dashboard/orders">
          <Button variant="link" className="mt-4">
            Back to My Orders
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/orders">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-md">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order Details</h1>
          <p className="text-sm text-muted-foreground font-mono">
            ID: {order.id}
          </p>
        </div>
        <div className="ml-auto">
          <span
            className={`px-4 py-1 rounded-md text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
              order.status === "DELIVERED"
                ? "bg-green-500 text-white"
                : order.status === "CANCELLED"
                  ? "bg-red-500 text-white"
                  : "bg-primary text-white font-bold"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-none ring-1 ring-gray-200 dark:ring-white/10 overflow-hidden dark:bg-black/20 backdrop-blur-md">
            <CardHeader className="bg-gray-50/50 dark:bg-white/5 border-b">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6 flex items-center justify-between group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 bg-gray-100 dark:bg-white/5 rounded-md flex items-center justify-center border dark:border-white/10 overflow-hidden">
                    {order.medicines?.image ? (
                      <img
                        src={order.medicines.image}
                        alt={order.medicines.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Package className="h-10 w-10 text-gray-300" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {order.medicines.name}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">
                      Quantity:{" "}
                      <span className="text-gray-900">{order.quantity}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-gray-900">
                    ${order.totalPrice.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-tighter self-end">
                    ${order.medicines.price} per unit
                  </p>
                </div>
              </div>

              <div className="bg-gray-50/80 p-8 flex justify-end">
                <div className="w-full max-w-[240px] space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-xl font-black pt-4 border-t border-gray-200 text-primary">
                    <span>Total</span>
                    <span>${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-none ring-1 ring-gray-200 p-8">
            <div className="relative flex justify-between">
              <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 -z-0" />
              <div
                className={`absolute top-5 left-0 h-[2px] bg-primary transition-all duration-1000 -z-0 ${
                  order.status.toUpperCase() === "PENDING"
                    ? "w-[0%]"
                    : order.status.toUpperCase() === "PROCESSING"
                      ? "w-[33%]"
                      : order.status.toUpperCase() === "SHIPPED"
                        ? "w-[66%]"
                        : order.status.toUpperCase() === "DELIVERED"
                          ? "w-[100%]"
                          : "w-0"
                }`}
              />

              {["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"].map(
                (step, idx) => {
                  const currentStatus = order.status.toUpperCase();
                  const statusChain = [
                    "PENDING",
                    "PROCESSING",
                    "SHIPPED",
                    "DELIVERED",
                  ];
                  const statusIndex = statusChain.indexOf(currentStatus);
                  const isCompleted = idx <= statusIndex;

                  return (
                    <div
                      key={step}
                      className="flex flex-col items-center relative z-10"
                    >
                      <div
                        className={`h-10 w-10 rounded-md flex items-center justify-center border-4 ${
                          isCompleted
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                            : "bg-white dark:bg-black border-gray-100 dark:border-white/10 text-gray-300 dark:text-gray-600"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-black mt-3 tracking-widest uppercase ${isCompleted ? "text-gray-900" : "text-gray-300"}`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                },
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm border-none ring-1 ring-gray-200 dark:ring-white/10 overflow-hidden dark:bg-black/20 backdrop-blur-md">
            <CardHeader className="bg-primary/5 pb-3 border-b border-primary/10">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Order Date
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {new Date(order.createdAt).toLocaleString(undefined, {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-none ring-1 ring-gray-200 dark:ring-white/10 overflow-hidden dark:bg-black/20 backdrop-blur-md">
            <CardHeader className="bg-primary/5 pb-3 border-b border-primary/10">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {order.user?.name?.charAt(0)}
                </div>
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {order.user?.name}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {order.shippingAddress}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-none ring-1 ring-gray-200 dark:ring-white/10 overflow-hidden dark:bg-black/20 backdrop-blur-md">
            <CardHeader className="bg-primary/5 pb-3 border-b border-primary/10">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Payment Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-yellow-50/50 dark:bg-yellow-500/5 p-4 rounded-md border border-yellow-100 dark:border-yellow-500/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-yellow-800 dark:text-yellow-500 uppercase tracking-widest mb-1">
                    Method
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    Cash on Delivery
                  </p>
                </div>
                <div className="text-[10px] font-black text-white bg-yellow-600 px-2 py-0.5 rounded-md tracking-tighter">
                  UNPAID
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
