import React from "react";
import { sellerService } from "@/services/seller.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag, DollarSign, Activity } from "lucide-react";
import { redirect } from "next/navigation";

const SellerDashboard = async () => {
  const { data: session } = await userService.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: sellerMedicines } = await sellerService.getSellerMedicines(
    session.user.id,
  );
  const { data: sellerOrders } = await sellerService.getSellerOrders(
    session.user.id,
  );

  const totalRevenue = (sellerOrders || [])
    .filter((o: any) => o.status === "DELIVERED")
    .reduce((acc: number, o: any) => acc + o.totalPrice, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-primary uppercase">
          Marketforce Operational
        </h1>
        <p className="text-muted-foreground dark:text-gray-400 font-medium">
          Welcome back, {session?.user?.name}. Real-time business analytics as
          of
          {new Date().toLocaleDateString()}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none ring-1 ring-gray-200 dark:ring-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-md shadow-xl shadow-gray-100/50 dark:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
              Total Revenue
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-gray-900 dark:text-gray-100">
              ${totalRevenue.toFixed(2)}
            </div>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">
              +20.1% GROWTH
            </p>
          </CardContent>
        </Card>
        <Card className="border-none ring-1 ring-gray-200 dark:ring-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-md shadow-xl shadow-gray-100/50 dark:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
              Active Orders
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-500">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-gray-900 dark:text-gray-100">
              +{sellerOrders?.length || 0}
            </div>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">
              +12 THIS WEEK
            </p>
          </CardContent>
        </Card>
        <Card className="border-none ring-1 ring-gray-200 dark:ring-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-md shadow-xl shadow-gray-100/50 dark:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
              Inventory Items
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-green-500/10 flex items-center justify-center text-green-500">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-gray-900 dark:text-gray-100">
              {sellerMedicines?.length || 0}
            </div>
            <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-1">
              STOCK SYNCHRONIZED
            </p>
          </CardContent>
        </Card>
        <Card className="border-none ring-1 ring-gray-200 dark:ring-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-md shadow-xl shadow-gray-100/50 dark:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
              Order Reliability
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Activity className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-gray-900 dark:text-gray-100">
              98.2%
            </div>
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-1">
              PEAK PERFORMANCE
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none ring-1 ring-gray-200 dark:ring-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-md shadow-xl shadow-gray-100/50 dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-widest text-gray-900 dark:text-gray-100 italic">
              Recent Order Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {(sellerOrders || []).slice(0, 5).map((order: any) => (
                <div key={order.id} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary font-black shadow-inner">
                    {order.user?.name?.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-black text-gray-900 dark:text-gray-100 leading-none uppercase">
                      {order.user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.medicines?.name} x {order.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-900 dark:text-gray-100">
                      +${order.totalPrice.toFixed(2)}
                    </p>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest border ${
                        order.status === "DELIVERED"
                          ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-500 border-emerald-100 dark:border-emerald-500/20"
                          : order.status === "CANCELLED"
                            ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-100 dark:border-red-500/20"
                            : "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-500/20"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
              {(!sellerOrders || sellerOrders.length === 0) && (
                <div className="text-center py-10 text-muted-foreground">
                  No orders yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-none ring-1 ring-gray-200 dark:ring-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-md shadow-xl shadow-gray-100/50 dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-widest text-gray-900 dark:text-gray-100 italic">
              Inventory Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {(sellerMedicines || []).slice(0, 4).map((med: any) => (
                <div key={med.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-black text-gray-900 dark:text-gray-100 uppercase text-xs">
                      {med.name}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${med.stock < 10 ? "text-red-500 animate-pulse" : "text-gray-500 dark:text-gray-400"}`}
                    >
                      {med.stock} UNITS
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${med.stock < 10 ? "bg-red-500" : "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"}`}
                      style={{ width: `${Math.min(med.stock, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              {(!sellerMedicines || sellerMedicines.length === 0) && (
                <div className="text-center py-10 text-muted-foreground">
                  No medicines listed.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
