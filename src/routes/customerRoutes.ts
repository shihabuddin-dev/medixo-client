import { Route } from "@/define/types";
import { LayoutDashboard, ShoppingBag, UserCircle } from "lucide-react";

export const customerRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My Orders",
        url: "/dashboard/orders",
        icon: ShoppingBag,
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: UserCircle,
      },
    ],
  },
];
