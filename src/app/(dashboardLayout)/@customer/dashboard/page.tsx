import React from "react";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Package, 
  CheckCircle, 
  Clock, 
  Truck, 
  User, 
  MapPin, 
  Calendar,
  ChevronRight,
  Award,
  TrendingUp,
  Bell,
  Wallet
} from "lucide-react";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const CustomerDashboard = async () => {
  const { data: session } = await userService.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: orders } = await orderService.getMyOrders();

  const totalOrders = orders?.length || 0;
  const pendingOrders = orders?.filter((o: any) => o.status === "PLACED").length || 0;
  const deliveredOrders = orders?.filter((o: any) => o.status === "DELIVERED").length || 0;
  const processingOrders = orders?.filter((o: any) => 
    o.status === "PROCESSING" || o.status === "SHIPPED"
  ).length || 0;

  const totalSpent = orders
    ?.filter((o: any) => o.status === "DELIVERED")
    .reduce((acc: number, o: any) => acc + o.totalPrice, 0) || 0;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: `${((deliveredOrders / totalOrders) * 100 || 0).toFixed(0)}% delivered`,
      trend: 12,
    },
    {
      title: "Total Spent",
      value: `$${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Wallet,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Across all orders",
      trend: 8,
    },
    {
      title: "Processing",
      value: processingOrders,
      icon: Package,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      description: "In transit or packaging",
      trend: -2,
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      description: "Awaiting confirmation",
      trend: 5,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "CANCELLED": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "PROCESSING": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "SHIPPED": return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      default: return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DELIVERED": return <CheckCircle className="h-4 w-4" />;
      case "CANCELLED": return <CheckCircle className="h-4 w-4" />;
      case "PROCESSING": return <Package className="h-4 w-4" />;
      case "SHIPPED": return <Truck className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-linear-to-br from-background via-background to-muted/5 p-4 md:p-6 lg:p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Welcome back, <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">{session?.user?.name}</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's your personal dashboard with order tracking and account insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2">
              <Bell size={14} />
              Updates
            </Badge>
            <Button size="sm" variant="outline">
              Quick Order
            </Button>
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
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${stat.trend > 0 ? 'text-green-500 border-green-500/20' : 'text-red-500 border-red-500/20'}`}
                  >
                    {stat.trend > 0 ? '+' : ''}{stat.trend}%
                  </Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>

                <Progress 
                  value={Math.min(Math.abs(stat.trend) * 10, 100)} 
                  className="mt-4 h-1.5"
                  indicatorClassName={stat.trend > 0 ? "bg-green-500" : "bg-red-500"}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-linear-to-br from-card to-card/80">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Recent Orders
                </CardTitle>
                {totalOrders > 0 && (
                  <Link href="/orders">
                    <Button variant="ghost" size="sm" className="gap-2">
                      View all
                      <ChevronRight size={14} />
                    </Button>
                  </Link>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {totalOrders > 0 ? (
                <div className="space-y-3">
                  {orders.slice(0, 6).map((order: any) => (
                    <Link key={order.id} href={`/orders/${order.id}`}>
                      <div className="flex items-center gap-4 p-4 rounded-xl border hover:bg-muted/30 transition-all duration-200 group cursor-pointer">
                        <div className={`p-3 rounded-lg ${getStatusColor(order.status).split(' ')[0]}`}>
                          {getStatusIcon(order.status)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold truncate">
                              Order #{order.id.slice(-8)}
                            </p>
                            <p className="text-sm font-bold text-primary">
                              ${order.totalPrice.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            {order.items && (
                              <span className="text-xs text-muted-foreground">
                                {order.items.length} item{order.items.length > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Start shopping to see your orders here
                  </p>
                  <Button>Browse Products</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80 overflow-hidden">
              <div className="h-24 bg-linear-to-r from-primary/20 to-blue-500/20" />
              
              <CardContent className="relative pt-0 px-6 pb-6">
                <div className="flex flex-col items-center -mt-12">
                  <div className="h-20 w-20 rounded-full bg-linear-to-br from-primary/20 to-primary/5 backdrop-blur-sm border-4 border-background shadow-lg flex items-center justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                      {session?.user?.name?.charAt(0)}
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <h3 className="text-xl font-bold">{session?.user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                    
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Badge variant="secondary" className="gap-1.5">
                        <User size={12} />
                        Member
                      </Badge>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4 pt-6 border-t">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Calendar className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Member Since</p>
                      <p className="font-medium">Feb 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Award className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Loyalty Tier</p>
                      <p className="font-medium">Silver Member</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="p-2 rounded-lg bg-orange-500/10">
                      <MapPin className="h-4 w-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Default Address</p>
                      <p className="font-medium">Add address</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/products">
                  <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                    <ShoppingCart size={18} />
                    Browse Products
                  </Button>
                </Link>
                <Link href="/orders">
                  <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                    <Package size={18} />
                    Track Orders
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                    <User size={18} />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/support">
                  <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                    <Bell size={18} />
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Order Progress */}
            {processingOrders > 0 && (
              <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Order Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Order Completion</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="text-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Packaging</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <Clock className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        {deliveredOrders > 0 && (
          <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Award className="h-5 w-5 text-primary" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">{deliveredOrders}</div>
                  <p className="font-medium">Orders Delivered</p>
                  <p className="text-xs text-muted-foreground mt-1">Successfully received</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-linear-to-br from-green-500/5 to-green-500/10 border border-green-500/20">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${totalSpent.toFixed(0)}
                  </div>
                  <p className="font-medium">Total Spent</p>
                  <p className="text-xs text-muted-foreground mt-1">Loyal customer</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-linear-to-br from-purple-500/5 to-purple-500/10 border border-purple-500/20">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {totalOrders > 0 ? ((deliveredOrders / totalOrders) * 100).toFixed(0) : 0}%
                  </div>
                  <p className="font-medium">Success Rate</p>
                  <p className="text-xs text-muted-foreground mt-1">Order completion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;