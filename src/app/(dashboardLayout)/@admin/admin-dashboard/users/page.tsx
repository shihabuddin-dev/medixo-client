import React from "react";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  UserCog,
  ShieldCheck,
  ShieldAlert,
  Mail,
  User as UserIcon,
} from "lucide-react";
import { redirect } from "next/navigation";
import { UserStatusToggle } from "@/components/modules/admin/UserStatusToggle";

const AdminUsersPage = async () => {
  const { data: session } = await userService.getSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { data: users } = await adminService.getAllUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <UserCog className="text-primary h-6 w-6" />
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 uppercase">
              IDENTITIES
            </h1>
          </div>
          <p className="text-muted-foreground font-medium pl-8">
            Access control and account status synchronization.
          </p>
        </div>
      </div>

      <Card className="border-none ring-1 ring-gray-100 dark:ring-white/10 shadow-xl shadow-gray-100/20 dark:shadow-none bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-md overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-6 px-8">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
              Global Registry
            </CardTitle>
            <span className="bg-white dark:bg-white/5 px-3 py-1 rounded-md text-[10px] font-black border dark:border-white/10 tracking-widest text-gray-900 dark:text-gray-100">
              {users?.length || 0} TOTAL USERS
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white dark:bg-white/5 border-b dark:border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                  <th className="px-8 py-5">User Profile</th>
                  <th className="px-8 py-5">Role/Status</th>
                  <th className="px-8 py-5">Onboarding Date</th>
                  <th className="px-8 py-5 text-right">Access Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users?.map((user: any) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/30 dark:hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-12 w-12 rounded-md flex items-center justify-center border shadow-sm group-hover:scale-110 transition-transform ${
                            user.status === "ACTIVE"
                              ? "bg-white dark:bg-white/5 border-primary/20 dark:border-primary/40"
                              : "bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20"
                          }`}
                        >
                          <UserIcon
                            className={
                              user.status === "ACTIVE"
                                ? "text-primary"
                                : "text-red-400"
                            }
                            size={20}
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="font-black text-gray-900 dark:text-gray-100 leading-none uppercase tracking-tight">
                            {user.name}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                            <Mail size={10} />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                          {user.role}
                        </span>
                        <span
                          className={`inline-flex items-center w-fit px-2.5 py-0.5 rounded-md text-[10px] font-black tracking-widest border ${
                            user.status === "ACTIVE"
                              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-100 dark:border-emerald-500/20"
                              : user.status === "BLOCKED"
                                ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border-red-100 dark:border-red-500/20"
                                : "bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-white/10"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-black text-gray-500 dark:text-gray-400 tracking-tighter uppercase whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <UserStatusToggle user={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
