import React from "react";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog, Mail, User as UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { UserRowActions } from "@/components/modules/admin/UserRowActions";

const AdminUsersPage = async () => {
  const { data: session } = await userService.getSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { data: users } = await adminService.getAllUsers();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <UserCog className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            Users Management
          </h1>
        </div>
        <p className="text-muted-foreground text-sm pl-9">
          Manage users, roles, and account access control.
        </p>
      </div>

      {/* Users Table */}
      <Card className="border border-border shadow-sm overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              User Registry
            </CardTitle>
            <span className="text-xs px-3 py-1 rounded-md bg-primary/10 text-primary font-medium">
              {users?.length || 0} users
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              {/* Table Head */}
              <thead>
                <tr className="border-b text-xs uppercase tracking-wider text-muted-foreground bg-muted/30">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role & Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y">
                {users?.map((user: any) => (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    {/* User Info */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-11 w-11 rounded-lg flex items-center justify-center border bg-muted ${user.status === "ACTIVE"
                            ? "text-primary"
                            : "text-destructive"
                            }`}
                        >
                          <UserIcon size={18} />
                        </div>

                        <div className="space-y-1">
                          <p className="font-medium">{user.name}</p>

                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail size={12} />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role + Status */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="font-medium text-primary uppercase">
                          {user.role}
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded-md w-fit font-medium ${user.status === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : user.status === "BLOCKED"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-muted text-muted-foreground"
                            }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </td>

                    {/* Created */}
                    <td className="px-6 py-5 text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <UserRowActions user={user} />
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
