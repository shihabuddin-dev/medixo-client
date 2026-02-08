import { Route } from "@/define/types";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  ListTree,
  UserCircle,
} from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Admin Panel",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
        icon: Users,
      },
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
        icon: ShoppingBag,
      },
      {
        title: "Inventory",
        url: "/admin-dashboard/medicines",
        icon: Package,
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
        icon: ListTree,
      },
      {
        title: "Profile",
        url: "/admin-dashboard/profile",
        icon: UserCircle,
      },
    ],
  },
];
