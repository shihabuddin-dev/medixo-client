import React from "react";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardList,
  Calendar,
  MapPin,
  User as UserIcon,
  Package,
} from "lucide-react";
import { redirect } from "next/navigation";

const AdminOrdersPage = async () => {
  const { data: session } = await userService.getSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { data: orders } = await adminService.getAllOrders();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <ClipboardList className="text-primary h-6 w-6" />
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 uppercase">
            LOGISTICS MONITOR
          </h1>
        </div>
        <p className="text-muted-foreground font-medium pl-8">
          Real-time transaction flow and fulfillment tracking.
        </p>
      </div>

      <div className="grid gap-6">
        {orders?.map((order: any) => (
          <Card
            key={order.id}
            className="border-none ring-1 ring-gray-100 dark:ring-white/10 shadow-xl shadow-gray-100/10 dark:shadow-none bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-md overflow-hidden group hover:ring-primary/20 transition-all duration-300"
          >
            <div
              className={`h-1.5 w-full bg-linear-to-r ${
                order.status === "DELIVERED"
                  ? "from-emerald-400 to-emerald-600"
                  : order.status === "CANCELLED"
                    ? "from-red-400 to-red-600"
                    : "from-primary to-blue-600"
              }`}
            />
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-50">
                <div className="p-8 flex-1 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-black bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-md text-gray-500 dark:text-gray-400 border dark:border-white/10">
                        ORD-{order.id.slice(-6).toUpperCase()}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-md tracking-[0.2em] shadow-sm ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-100 dark:border-emerald-500/20"
                            : order.status === "CANCELLED"
                              ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-100 dark:border-red-500/20"
                              : "bg-primary/10 text-primary border border-primary/20"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-md border border-gray-100 dark:border-white/10">
                      <Calendar className="h-3 w-3" />{" "}
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="flex items-start gap-6 py-6 border-y border-gray-50/50 dark:border-white/5">
                    <div className="h-20 w-20 rounded-md bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center p-3 shadow-inner group-hover:scale-105 transition-transform duration-500">
                      {order.medicines?.image ? (
                        <img
                          src={order.medicines.image}
                          className="object-contain h-full w-full"
                        />
                      ) : (
                        <Package className="h-10 w-10 text-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tighter uppercase leading-none">
                        {order.medicines?.name}
                      </p>
                      <div className="flex items-center gap-4">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 dark:bg-primary/10 px-2 py-1 rounded-md">
                          Quantity: {order.quantity}
                        </p>
                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                          Seller ID: #{order.medicines?.sellerId.slice(-4)}
                        </p>
                      </div>
                      <p className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter mt-2">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                        <UserIcon size={12} className="text-primary/40" />{" "}
                        Consignee Profile
                      </p>
                      <div className="bg-gray-50/50 dark:bg-white/5 p-4 rounded-md border border-gray-100 dark:border-white/10 space-y-1">
                        <p className="text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-tight">
                          {order.user?.name}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 font-mono tracking-tight">
                          {order.user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                        <MapPin size={12} className="text-secondary/40" />{" "}
                        Logistics Destination
                      </p>
                      <div className="bg-gray-50/50 dark:bg-white/5 p-4 rounded-md border border-gray-100 dark:border-white/10">
                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 leading-relaxed italic">
                          {order.shippingAddress || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {(!orders || orders.length === 0) && (
          <div className="py-24 text-center bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-100">
            <ClipboardList className="mx-auto h-16 w-16 text-gray-200 mb-4" />
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              No Transactions Found
            </h2>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto font-medium">
              The platform has not processed any orders yet. Monitor incoming
              traffic in the dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
