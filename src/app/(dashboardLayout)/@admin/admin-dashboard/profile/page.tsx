import React from "react";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Calendar, Mail, User, CheckCircle, Edit2 } from "lucide-react";
import { ProfileUpdateForm } from "@/components/modules/profile/profile-update-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  const { data: session } = await userService.getSession();
  const user = session?.user;

  return (
    <div className="bg-linear-to-b from-background to-muted/10">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Profile Settings
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your personal information and account preferences
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit2 size={16} />
              Edit
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg bg-linear-to-b from-card to-card/80">
              <div className="h-32 bg-linear-to-r from-primary via-primary/80 to-blue-500" />
              
              <CardContent className="relative pt-0 px-6 pb-6">
                {/* Avatar */}
                <div className="flex flex-col items-center -mt-16">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 backdrop-blur-sm border-4 border-background shadow-2xl flex items-center justify-center">
                      <div className="h-28 w-28 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold">
                        {user?.name?.charAt(0) || <User size={48} />}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-4 border-background">
                      <CheckCircle size={20} />
                    </div>
                  </div>

                  <div className="mt-6 text-center space-y-2">
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                        <Shield size={14} />
                        {user?.role}
                      </Badge>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <div className="text-2xl font-bold text-primary">85%</div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="mt-8 space-y-4">
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Mail size={18} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium truncate">{user?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Calendar size={18} className="text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">Member since</p>
                        <p className="font-medium">
                          {new Date().toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <Shield size={18} className="text-green-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium text-green-600">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <Shield size={16} />
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <Calendar size={16} />
                  Activity Log
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <User size={16} />
                  Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Update your profile details and preferences
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Cancel
                    </Button>
                    <Button size="sm">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Profile Completion</span>
                      <span className="font-medium text-primary">75%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-linear-to-r from-primary to-primary/60 rounded-full w-3/4" />
                    </div>
                  </div>

                  <Separator />

                  {/* Form */}
                  <ProfileUpdateForm user={user} />
                </div>
              </CardContent>
            </Card>

            {/* Additional Settings Card */}
            <Card className="mt-6 border-0 shadow-lg bg-linear-to-br from-card to-card/80">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4 p-4 rounded-xl border bg-linear-to-br from-muted/20 to-muted/5">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage how you receive notifications and updates
                    </p>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  
                  <div className="space-y-4 p-4 rounded-xl border bg-linear-to-br from-muted/20 to-muted/5">
                    <h3 className="font-semibold text-lg">Connected Accounts</h3>
                    <p className="text-sm text-muted-foreground">
                      Link social media and other services to your account
                    </p>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;