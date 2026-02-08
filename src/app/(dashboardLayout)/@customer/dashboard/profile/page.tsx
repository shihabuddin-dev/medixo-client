import React from "react";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Calendar } from "lucide-react";
import { ProfileUpdateForm } from "@/components/modules/profile/profile-update-form";

const ProfilePage = async () => {
  const { data: session } = await userService.getSession();
  const user = session?.user;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-primary uppercase">
          Client{" "}
          <span className="text-gray-900 dark:text-gray-100 italic">
            Credentials
          </span>
        </h1>
        <p className="text-muted-foreground dark:text-gray-400 font-medium">
          Personalize your experience and secure your health data.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        <Card className="lg:col-span-1 shadow-xl shadow-gray-100/20 dark:shadow-none border-none ring-1 ring-gray-100 dark:ring-white/10 overflow-hidden rounded-md bg-white/70 dark:bg-black/20 backdrop-blur-md">
          <div className="h-24 bg-linear-to-r from-primary/30 to-blue-500/30 w-full animate-pulse" />
          <CardContent className="relative pt-0 px-6">
            <div className="flex flex-col items-center -mt-12">
              <div className="h-24 w-24 rounded-md bg-white dark:bg-black p-1 ring-4 ring-white dark:ring-white/5 shadow-2xl overflow-hidden flex items-center justify-center text-primary text-4xl font-black bg-primary/5 border border-primary/20 transition-transform hover:scale-105 duration-500">
                {user?.name?.charAt(0)}
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 uppercase tracking-tighter italic">
                  {user?.name}
                </h2>
                <div className="mt-2 flex justify-center">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-md border border-primary/20">
                    VERIFIED {user?.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4 pt-6 border-t dark:border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground dark:text-gray-500 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                  <Shield className="h-4 w-4 text-primary" /> Profile Status
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black uppercase text-[10px] bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-md tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                  HEALTH_SECURE
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground dark:text-gray-400 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                  <Calendar className="h-4 w-4 text-primary" /> Member Since
                </span>
                <span className="font-black text-gray-900 dark:text-gray-100 uppercase text-[11px]">
                  Feb 2026
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-xl shadow-gray-100/20 dark:shadow-none border-none ring-1 ring-gray-100 dark:ring-white/10 rounded-md bg-white/70 dark:bg-black/20 backdrop-blur-md">
          <CardHeader className="bg-gray-50/50 dark:bg-white/5 rounded-t-xl border-b dark:border-white/10 px-8 py-6">
            <CardTitle className="text-lg font-black uppercase tracking-widest text-gray-900 dark:text-gray-100 italic">
              Secure Persona Protocol
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 px-8">
            <ProfileUpdateForm user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
