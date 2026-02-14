import React from "react";
import { sellerService } from "@/services/seller.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Calendar, CheckCircle2, Clock } from "lucide-react";
import { OrderStatusActions } from "@/components/modules/seller/OrderStatusActions";

const SellerOrdersPage = async () => {
  const { data: session } = await userService.getSession();
  const { data: sellerOrders } = await sellerService.getSellerOrders(
    session?.user?.id,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-primary uppercase">
          Order Requests
        </h1>
        <p className="text-muted-foreground">
          Monitor and fulfill incoming orders for your products.
        </p>
      </div>

      <div className="grid gap-6">
        {sellerOrders && sellerOrders.length > 0 ? (
          sellerOrders.map((order: any) => (
            <Card
              key={order.id}
              className="shadow-sm border-none ring-1 ring-gray-200 dark:ring-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-md overflow-hidden hover:ring-primary/20 transition-all"
            >
              <div
                className={`h-1 bg-linear-to-r ${order.status === "DELIVERED"
                  ? "from-green-400 to-green-600"
                  : order.status === "CANCELLED"
                    ? "from-red-400 to-red-600"
                    : "from-blue-400 to-blue-600"
                  }`}
              />
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  <div className="p-6 flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md text-gray-500 dark:text-gray-400 font-bold tracking-tighter border dark:border-white/10">
                          ORD-{order.id.slice(-6).toUpperCase()}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-widest ${order.status === "DELIVERED"
                            ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-500 border border-green-100 dark:border-green-500/20"
                            : order.status === "CANCELLED"
                              ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-500 border border-red-100 dark:border-red-500/20"
                              : "bg-primary/10 text-primary border border-primary/20"
                            }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-2 border-y border-gray-50 dark:border-white/5">
                      <div className="h-12 w-12 rounded-md bg-gray-50 dark:bg-white/5 border dark:border-white/10 flex items-center justify-center overflow-hidden">
                        {order.medicines?.image ? (
                          <img
                            src={order.medicines.image}
                            className="object-cover h-full w-full"
                          />
                        ) : (
                          <Package className="h-6 w-6 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          {order.medicines?.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                          Qty: {order.quantity}
                        </p>
                      </div>
                      <p className="text-xl font-black text-primary">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Customer Details
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-xs ring-1 ring-primary/10">
                          {order.user?.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-700 dark:text-gray-300 leading-tight">
                            {order.user?.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-medium">
                            {order.user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:w-80 bg-gray-50/30 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                          <MapPin className="h-3 w-3" /> Delivery Address
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed italic">
                          {order.shippingAddress}
                        </p>
                      </div>
                    </div>

                    <OrderStatusActions order={order} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-24 text-center bg-gray-50/50 rounded-md border-2 border-dashed border-gray-100">
            <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-200 ring-4 ring-gray-100">
              <Clock size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              No pending orders
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xs mx-auto text-sm">
              Orders for your products will appear here. Keep your inventory
              updated to attract more customers!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrdersPage;
