import React from "react";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid, Layers, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const AdminCategoriesPage = async () => {
  const { data: session } = await userService.getSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { data: categories } = await adminService.getAllCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <LayoutGrid className="text-secondary h-6 w-6" />
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 uppercase">
              CLASSIFICATION
            </h1>
          </div>
          <p className="text-muted-foreground font-medium pl-8">
            Taxonomy management and medicine categorization.
          </p>
        </div>
        <Button className="rounded-md font-black uppercase tracking-widest text-xs h-12 px-6 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
          <Plus className="mr-2 h-4 w-4" /> New Category
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category: any) => (
          <Card
            key={category.id}
            className="border-none ring-1 ring-gray-100 dark:ring-white/10 shadow-sm hover:shadow-xl hover:ring-primary/20 transition-all duration-300 rounded-md overflow-hidden group bg-white/70 dark:bg-black/20 backdrop-blur-md"
          >
            <CardHeader className="p-8 pb-4">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-md bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-500 shadow-inner">
                  <Layers size={24} />
                </div>
                <span className="bg-gray-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-md border dark:border-white/10 text-gray-400">
                  ID: {category.id.slice(-4)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter uppercase mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-50 dark:border-white/5 mt-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                    Registered
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400">
                    <Calendar size={12} className="text-primary/40" />
                    <span>
                      {new Date(category.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {(!categories || categories.length === 0) && (
          <div className="col-span-full py-24 text-center bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-100">
            <LayoutGrid className="mx-auto h-16 w-16 text-gray-200 mb-4" />
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              System Empty
            </h2>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto font-medium text-sm px-6">
              No medicinal classifications found. Initialize the platform
              taxonomy by creating your first category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
