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
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Server,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { redirect } from "next/navigation";
import RevenueChart from "@/components/ui/RevenueChart";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
  const pendingUsers =
    users?.filter((u: any) => u.status === "PENDING").length || 0;

  const completedOrders =
    orders?.filter((o: any) => o.status === "DELIVERED").length || 0;
  const pendingOrders =
    orders?.filter((o: any) => o.status === "PENDING").length || 0;

  const lowStockMedicines = medicines?.filter((m: any) => m.stock < 10).length || 0;

  // Generate chart data (last 7 days)
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayOrders = orders?.filter((o: any) => {
      const orderDate = new Date(o.createdAt);
      return orderDate.toDateString() === date.toDateString();
    }) || [];
    
    const revenue = dayOrders.reduce((acc: number, o: any) => acc + (o.totalPrice || 0), 0);
    
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      revenue,
      orders: dayOrders.length,
    };
  });

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: `${((totalRevenue / 10000) * 100).toFixed(1)}% of target`,
      icon: DollarSign,
      trend: 12.5,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Active Users",
      value: activeUsers.toLocaleString(),
      description: `${((activeUsers / users?.length) * 100).toFixed(1)}% active rate`,
      icon: Users,
      trend: 8.3,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Orders",
      value: orders?.length?.toLocaleString() || "0",
      description: `${completedOrders} completed • ${pendingOrders} pending`,
      icon: ShoppingBag,
      trend: -3.2,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Medicines",
      value: medicines?.length?.toLocaleString() || "0",
      description: `${lowStockMedicines} low in stock`,
      icon: Package,
      trend: 5.7,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const securityItems = [
    {
      title: "Blocked Users",
      value: blockedUsers,
      description: "Requires review",
      icon: ShieldAlert,
      color: "bg-red-500/10 text-red-600",
      trend: 2,
    },
    {
      title: "Pending Users",
      value: pendingUsers,
      description: "Awaiting verification",
      icon: Clock,
      color: "bg-yellow-500/10 text-yellow-600",
      trend: 5,
    },
    {
      title: "Recent Alerts",
      value: 3,
      description: "Last 24 hours",
      icon: AlertCircle,
      color: "bg-orange-500/10 text-orange-600",
      trend: 0,
    },
  ];

  return (
    <div className=" bg-linear-to-br from-background via-background to-muted/5 p-4 md:p-6 lg:p-8">
      <div className=" space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time overview of platform performance and analytics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-2">
              <Activity size={14} />
              Live
            </Badge>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Last updated: Just now
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card 
              key={stat.title} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-linear-to-br from-card to-card/80 overflow-hidden group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trend > 0 ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span className={stat.trend > 0 ? "text-green-500" : "text-red-500"}>
                      {Math.abs(stat.trend)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>

                <Progress value={Math.min(Math.abs(stat.trend) * 10, 100)} className="mt-4 h-1.5" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts & Security Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-linear-to-br from-card to-card/80">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Revenue Analytics
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Last 7 days</Badge>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                    +12.5% growth
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="h-[300px]">
                <RevenueChart data={chartData} />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">Avg. Order Value</p>
                  <p className="text-xl font-semibold mt-1">
                    ${(totalRevenue / (orders?.length || 1)).toFixed(2)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">Conversion Rate</p>
                  <p className="text-xl font-semibold mt-1">
                    {((orders?.length / (users?.length || 1)) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Overview */}
          <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <ShieldAlert className="h-5 w-5 text-primary" />
                Security Overview
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {securityItems.map((item) => (
                <div 
                  key={item.title} 
                  className="flex items-center gap-4 p-4 rounded-xl border bg-linear-to-br from-muted/20 to-muted/5 hover:bg-muted/30 transition-colors"
                >
                  <div className={`p-3 rounded-lg ${item.color.split(' ')[0]}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{item.title}</p>
                      <Badge variant="secondary" className="text-xs">
                        {item.trend > 0 ? `+${item.trend}` : item.trend}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-2xl font-bold">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-xl bg-linear-to-r from-primary/5 to-primary/10 border border-primary/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">All systems operational</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Security protocols are active and running
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health & Quick Stats */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* System Health */}
          <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Server className="h-5 w-5 text-primary" />
                System Health
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {[
                { label: "Server Load", value: 75, status: "Optimal" },
                { label: "Database", value: 92, status: "High" },
                { label: "Cache", value: 65, status: "Normal" },
                { label: "API", value: 88, status: "Optimal" },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-primary">{item.status}</span>
                  </div>
                  <Progress 
                    value={item.value} 
                    className="h-2"
                    indicatorClassName={
                      item.value > 90 ? "bg-red-500" : 
                      item.value > 75 ? "bg-orange-500" : 
                      "bg-green-500"
                    }
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-xl font-semibold">42ms</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="text-xl font-semibold">99.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {[
                { action: "New order placed", user: "John Doe", time: "2 min ago", type: "order" },
                { action: "User registration", user: "Sarah Smith", time: "5 min ago", type: "user" },
                { action: "Medicine stock updated", user: "System", time: "15 min ago", type: "inventory" },
                { action: "Payment processed", user: "Mike Johnson", time: "30 min ago", type: "payment" },
                { action: "Admin login", user: session.user.name, time: "1 hour ago", type: "security" },
              ].map((activity) => (
                <div 
                  key={activity.time} 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'order' ? 'bg-green-500/10' :
                    activity.type === 'user' ? 'bg-blue-500/10' :
                    activity.type === 'inventory' ? 'bg-purple-500/10' :
                    activity.type === 'payment' ? 'bg-yellow-500/10' : 'bg-red-500/10'
                  }`}>
                    {activity.type === 'order' && <ShoppingBag className="h-4 w-4 text-green-500" />}
                    {activity.type === 'user' && <Users className="h-4 w-4 text-blue-500" />}
                    {activity.type === 'inventory' && <Package className="h-4 w-4 text-purple-500" />}
                    {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-yellow-500" />}
                    {activity.type === 'security' && <ShieldAlert className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;