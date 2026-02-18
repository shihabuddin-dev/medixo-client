import React from "react";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Calendar } from "lucide-react";
import { ProfileUpdateForm } from "@/components/modules/profile/profile-update-form";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  const { data: session } = await userService.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account details and keep your profile up to date.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Profile Card */}
        <Card className="lg:col-span-1 border border-border shadow-sm overflow-hidden">
          {/* Banner */}
          <div className="h-24 bg-linear-to-r from-primary/30 to-primary/10" />

          <CardContent className="relative pt-0 px-6 pb-6">
            {/* Avatar */}
            <div className="flex flex-col items-center -mt-12">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-semibold border shadow-sm">
                {user.name?.charAt(0) || "U"}
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold">{user.name}</h2>

                <p className="text-xs text-muted-foreground mt-1">
                  {user.email}
                </p>

                <span className="inline-block mt-3 text-xs px-3 py-1 rounded-md bg-primary/10 text-primary font-medium">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 space-y-4 pt-6 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Account Status
                </span>

                <span className="text-emerald-600 font-medium text-xs">
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Member Since
                </span>

                <span className="font-medium text-sm">Feb 2026</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Card */}
        <Card className="lg:col-span-2 border border-border shadow-sm">
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>

          <CardContent>
            <ProfileUpdateForm user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
