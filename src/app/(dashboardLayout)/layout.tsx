import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  children,
  admin,
  customer,
  seller,
}: {
  children: React.ReactNode;
  admin?: React.ReactNode;
  customer?: React.ReactNode;
  seller?: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  const userInfo = data.user;

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo?.role === Roles.admin ? (
            admin ?? null
          ) : userInfo?.role === Roles.customer ? (
            customer ?? null
          ) : userInfo?.role === Roles.seller ? (
            seller ?? null
          ) : (
            children
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}