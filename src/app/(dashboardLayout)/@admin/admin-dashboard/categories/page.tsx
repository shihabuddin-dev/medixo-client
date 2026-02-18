import React from "react";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LayoutGrid, Layers, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

const AdminCategoriesPage = async () => {
  const { data: session } = await userService.getSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { data: categories } = await adminService.getAllCategories();

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <LayoutGrid className="text-primary h-6 w-6" />
            <h1 className="text-3xl font-bold tracking-tight">
              Categories
            </h1>

            {categories?.length > 0 && (
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                {categories.length} total
              </span>
            )}
          </div>

          <p className="text-muted-foreground text-sm">
            Manage taxonomy and medicine classifications.
          </p>
        </div>

        {/* <Button className="h-11 px-6 rounded-lg shadow-md">
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Button> */}

      </div>

      {/* Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {categories?.map((category: any) => (
          <Card
            key={category.id}
            className="group border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 rounded-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">

              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Layers size={20} />
              </div>

              <span className="text-[10px] font-medium px-2 py-1 rounded-md bg-muted text-muted-foreground">
                ID: {category.id.slice(-4)}
              </span>

            </CardHeader>

            <CardContent className="pt-0">

              <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition">
                {category.name}
              </h3>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={14} />
                {new Date(category.createdAt).toLocaleDateString()}
              </div>

            </CardContent>
          </Card>
        ))}

        {/* Empty State */}
        {(!categories || categories.length === 0) && (
          <div className="col-span-full py-24 text-center border border-dashed rounded-xl bg-muted/30">
            <LayoutGrid className="mx-auto h-12 w-12 text-muted-foreground mb-4" />

            <h2 className="text-lg font-semibold">
              No categories yet
            </h2>

            <p className="text-muted-foreground text-sm mt-2 max-w-sm mx-auto">
              Start organizing your medicines by creating your first category.
            </p>

            <Button className="mt-6">
              <Plus className="mr-2 h-4 w-4" />
              Create Category
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategoriesPage;