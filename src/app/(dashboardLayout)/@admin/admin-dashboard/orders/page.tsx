import React from "react";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { Card, CardContent } from "@/components/ui/card";
import {
  ClipboardList,
  Calendar,
  MapPin,
  User as UserIcon,
  Package,
} from "lucide-react";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

const AdminOrdersPage = async () => {
  const { data: session } = await userService.getSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { data: orders } = await adminService.getAllOrders();

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            Orders Monitor
          </h1>
        </div>
        <p className="text-muted-foreground text-sm pl-9">
          Track real-time orders, payments, and delivery status.
        </p>
      </div>

      {/* Orders */}
      <div className="grid gap-6">
        {orders?.map((order: any) => {
          const statusColor =
            order.status === "DELIVERED"
              ? "bg-emerald-500"
              : order.status === "CANCELLED"
              ? "bg-destructive"
              : "bg-primary";

          return (
            <Card
              key={order.id}
              className="border border-border shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Status bar */}
              <div className={`h-1 w-full ${statusColor}`} />

              <CardContent className="p-6 space-y-6">

                {/* Top row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-md bg-muted text-muted-foreground">
                      ORD-{order.id.slice(-6).toUpperCase()}
                    </span>

                    <span
                      className={`text-[10px] uppercase px-3 py-1 rounded-md font-semibold tracking-widest
                        ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : order.status === "CANCELLED"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-primary/10 text-primary"
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-md">
                    <Calendar className="h-3 w-3" />
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {/* Product */}
                <div className="flex items-start gap-6 border-t border-b py-6">
                  <div className="h-20 w-20 rounded-lg bg-muted border flex items-center justify-center">
                    {order.medicines?.image ? (
                      <img
                        src={order.medicines.image}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <p className="text-lg font-semibold">
                      {order.medicines?.name}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs">
                      <span className="px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                        Qty: {order.quantity}
                      </span>

                      <span className="text-muted-foreground">
                        Seller ID: #{order.medicines?.sellerId.slice(-4)}
                      </span>
                    </div>

                    <p className="text-2xl font-bold text-foreground">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Bottom info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <UserIcon size={12} />
                      Customer
                    </p>
                    <div className="rounded-md border bg-muted/40 p-4">
                      <p className="font-medium">{order.user?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <MapPin size={12} />
                      Shipping Address
                    </p>
                    <div className="rounded-md border bg-muted/40 p-4 text-sm text-muted-foreground">
                      {order.shippingAddress || "N/A"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Empty state */}
        {(!orders || orders.length === 0) && (
          <div className="py-24 text-center border border-dashed rounded-xl bg-muted/30">
            <ClipboardList className="mx-auto h-14 w-14 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">
              No orders yet
            </h2>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              Orders will appear here once customers start purchasing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;