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
import { LogOut, Package2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

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
  }

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <Sidebar {...props} className="border-r border-border bg-background">
      {/* Header */}
      <SidebarHeader>
        <Link href="/" className="text-2xl font-semibold tracking-tight px-5">
          Medixo
        </Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-3 py-5 space-y-6">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="p-0">
            <SidebarGroupLabel className="px-3 mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`h-10 px-3 rounded-lg transition-all
                          ${
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          }
                        `}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3"
                        >
                          {item.icon && (
                            <item.icon
                              className={`h-4 w-4 ${
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          )}

                          <span className="text-sm">{item.title}</span>
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

      {/* Footer */}
      <SidebarFooter className="p-3 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="h-10 w-full rounded-lg gap-3 text-destructive hover:bg-destructive/10 transition"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
