import React from "react";
import { CustomerOrdersList } from "@/components/modules/orders/CustomerOrdersList";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

export default async function CustomerOrdersPage() {
  const { data: session } = await userService.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: myOrders } = await adminService.getAllOrders({
    customerId: session?.user?.id,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border border-border shadow-sm">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">My Orders</h1>
          </div>

          <p className="text-muted-foreground text-sm max-w-2xl">
            Track your medicine deliveries, view purchase history, and manage
            your health essentials in one place.
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
            <span>Total Orders: {myOrders?.length || 0}</span>
            <span>Account: {session?.user?.email}</span>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <CustomerOrdersList orders={myOrders} />
    </div>
  );
}
