import React from "react";
import { CustomerOrdersList } from "@/components/modules/orders/CustomerOrdersList";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";

export default async function CustomerOrdersPage() {
  const { data: session } = await userService.getSession();
  const { data: myOrders } = await adminService.getAllOrders({
    customerId: session?.user?.id,
  });

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary">
          Purchase History
        </h2>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100 leading-tight uppercase">
          My <span className="text-primary italic">Orders.</span>
        </h1>
        <p className="text-muted-foreground dark:text-gray-400 font-medium max-w-2xl">
          Track your medicine deliveries, view history, and manage your health
          essentials in one place.
        </p>
      </div>

      <CustomerOrdersList orders={myOrders} />
    </div>
  );
}
