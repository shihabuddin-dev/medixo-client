"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Roles } from "@/constants/roles";
import { Route } from "@/define/types";
import { adminRoutes } from "@/routes/adminRoutes";
import { sellerRoutes } from "@/routes/sellerRoutes";
import { customerRoutes } from "@/routes/customerRoutes";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { Package2 } from "lucide-react";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];

  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.seller:
      routes = sellerRoutes;
      break;
    case Roles.customer:
      routes = customerRoutes;
      break;
    default:
      routes = [];
      break;
  }

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <Sidebar {...props} className="border-r dark:border-white/10">
      <SidebarHeader className="h-16 flex items-center px-6 border-b dark:border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-md bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Package2 className="h-5 w-5" />
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-gray-100 uppercase italic">
            Medixo
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="p-0">
            <SidebarGroupLabel className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`h-11 rounded-md px-3 transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-bold"
                            : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 font-medium"
                        }`}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3"
                        >
                          {item.icon && (
                            <item.icon
                              className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-gray-400 dark:text-gray-500"}`}
                            />
                          )}
                          <span className="text-sm uppercase tracking-tight font-black">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t dark:border-white/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="h-11 w-full rounded-md gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-black uppercase tracking-tight">
                System Logout
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
