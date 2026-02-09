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

const statusSteps = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"];

const OrderDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: order } = await orderService.getOrderDetails(id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
        <Package className="h-14 w-14 text-muted-foreground/30" />
        <h1 className="text-xl font-semibold">Order not found</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          The order may have been removed or you don't have permission to view
          it.
        </p>
        <Link href="/dashboard/orders">
          <Button variant="outline">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/orders">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        <div>
          <h1 className="text-2xl font-semibold">Order Details</h1>
          <p className="text-xs text-muted-foreground font-mono">#{order.id}</p>
        </div>

        <div className="ml-auto">
          <span className="px-3 py-1 rounded-md text-xs font-medium bg-primary text-primary-foreground">
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Item</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
                    {order.medicines?.image ? (
                      <img
                        src={order.medicines.image}
                        alt={order.medicines.name}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <Package className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-lg">
                      {order.medicines?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {order.quantity}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-primary">
                    ${order.totalPrice.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${order.medicines?.price} per unit
                  </p>
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 pt-6 border-t space-y-2 max-w-xs ml-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Progress</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between relative">
                <div className="absolute top-4 left-0 w-full h-[2px] bg-muted" />

                <div
                  className="absolute top-4 left-0 h-[2px] bg-primary transition-all"
                  style={{
                    width:
                      currentStepIndex >= 0
                        ? `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`
                        : "0%",
                  }}
                />

                {statusSteps.map((step, index) => {
                  const completed = index <= currentStepIndex;

                  return (
                    <div
                      key={step}
                      className="flex flex-col items-center relative z-10"
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border
                          ${
                            completed
                              ? "bg-primary text-white border-primary"
                              : "bg-background border-muted text-muted-foreground"
                          }`}
                      >
                        {completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <span className="text-xs mt-2 text-muted-foreground">
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                Order Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{order.user?.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {order.shippingAddress}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <CreditCard className="h-4 w-4" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Cash on Delivery</p>
              <span className="text-xs text-yellow-600 font-medium">
                Unpaid
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
