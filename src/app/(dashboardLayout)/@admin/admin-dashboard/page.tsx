import React from "react";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";
import { redirect } from "next/navigation";

const AdminDashboardPage = async () => {
  const { data: session } = await userService.getSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { data: users } = await adminService.getAllUsers();
  const { data: orders } = await adminService.getAllOrders();
  const { data: medicines } = await adminService.getAllMedicines();

  const totalRevenue =
    orders
      ?.filter((o: any) => o.status === "DELIVERED")
      .reduce((acc: number, o: any) => acc + o.totalPrice, 0) || 0;

  const activeUsers =
    users?.filter((u: any) => u.status === "ACTIVE").length || 0;
  const blockedUsers =
    users?.filter((u: any) => u.status === "BLOCKED").length || 0;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      description: "Accumulated from all successful sales",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Platform Users",
      value: users?.length || 0,
      description: `${activeUsers} active accounts currently`,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "Total Orders",
      value: orders?.length || 0,
      description: "Total transactions processed",
      icon: ShoppingBag,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      title: "Medicine Catalog",
      value: medicines?.length || 0,
      description: "Verified items in inventory",
      icon: Package,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
  ];

  return (
    <div className="space-y-8 p-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-2 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100 leading-none uppercase">
            Platform <span className="text-primary italic">Nexus</span>
          </h1>
        </div>
        <p className="text-muted-foreground font-medium pl-5">
          Global platform overview and real-time operations monitor.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className={`border-none ring-1 ring-gray-200 dark:ring-white/10 shadow-sm overflow-hidden group hover:ring-primary/20 transition-all rounded-md bg-white/70 dark:bg-black/20 backdrop-blur-md`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <div
                className={`${stat.bg} dark:bg-white/5 ${stat.color} p-2 rounded-md group-hover:scale-110 transition-transform`}
              >
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tighter text-gray-900 dark:text-gray-100">
                {stat.value}
              </div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-tight">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none ring-1 ring-gray-100 dark:ring-white/10 shadow-xl shadow-gray-100/20 dark:shadow-none rounded-md overflow-hidden bg-white/70 dark:bg-black/20 backdrop-blur-md">
          <CardHeader className="bg-gray-50/50 dark:bg-white/5 border-b dark:border-white/10 py-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-black tracking-tight text-gray-900 dark:text-gray-100 uppercase italic">
                System Health
              </CardTitle>
              <TrendingUp className="text-blue-500 h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-black text-gray-600 dark:text-gray-400 uppercase tracking-widest text-[10px]">
                    Core Operational Node
                  </span>
                  <span className="font-black text-emerald-500 text-[10px]">
                    100% STABLE
                  </span>
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="p-4 rounded-md bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                    Response Delta
                  </p>
                  <p className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter">
                    42ms
                  </p>
                </div>
                <div className="p-4 rounded-md bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                    API Throughput
                  </p>
                  <p className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter">
                    1.2k rps
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none ring-1 ring-red-100 dark:ring-red-500/10 shadow-sm rounded-md overflow-hidden bg-white/70 dark:bg-black/20 backdrop-blur-md">
          <CardHeader className="bg-red-50/30 dark:bg-red-500/5 border-b border-red-50 dark:border-red-500/10 py-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-black tracking-tight text-red-900 dark:text-red-400 uppercase italic">
                Security Pulse
              </CardTitle>
              <ShieldAlert className="text-red-500 h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-md bg-red-50/50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                <span className="text-3xl font-black text-red-600 dark:text-red-500">
                  {blockedUsers}
                </span>
                <div className="space-y-0.5">
                  <p className="text-xs font-black text-red-900 dark:text-red-400 uppercase tracking-widest">
                    Blocked Identities
                  </p>
                  <p className="text-[10px] font-bold text-red-500 dark:text-red-600 italic uppercase">
                    Awaiting Review
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                  Recent Anomalies
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400 bg-white dark:bg-white/5 p-2 rounded-md border dark:border-white/10 shadow-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                    <span>Cross-origin login attempt blocked</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400 bg-white dark:bg-white/5 p-2 rounded-md border dark:border-white/10 shadow-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    <span>Frequent metadata mutation detected</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
