import { Route } from "@/define/types";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  UserCircle,
} from "lucide-react";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Panel",
    items: [
      {
        title: "Overview",
        url: "/seller-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Inventory",
        url: "/seller-dashboard/medicines",
        icon: Package,
      },
      {
        title: "Orders",
        url: "/seller-dashboard/orders",
        icon: ShoppingBag,
      },
      {
        title: "Profile",
        url: "/seller-dashboard/profile",
        icon: UserCircle,
      },
    ],
  },
];
