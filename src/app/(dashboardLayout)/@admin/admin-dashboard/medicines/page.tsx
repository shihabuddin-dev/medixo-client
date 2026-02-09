import React from "react";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Package, Hash, Tag, Store } from "lucide-react";
import { redirect } from "next/navigation";

const AdminMedicinesPage = async () => {
  const { data: session } = await userService.getSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { data: medicines } = await adminService.getAllMedicines();

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Box className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            Medicines Inventory
          </h1>
        </div>
        <p className="text-muted-foreground text-sm pl-9">
          Manage catalog items, sellers, pricing, and stock levels.
        </p>
      </div>

      {/* Table Card */}
      <Card className="border border-border shadow-sm overflow-hidden">

        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Catalog Items
            </CardTitle>

            <span className="text-xs px-3 py-1 rounded-md bg-primary/10 text-primary font-medium">
              {medicines?.length || 0} items
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">

              {/* Table Head */}
              <thead>
                <tr className="border-b text-xs uppercase tracking-wider text-muted-foreground bg-muted/30">
                  <th className="px-6 py-4">Medicine</th>
                  <th className="px-6 py-4">Seller</th>
                  <th className="px-6 py-4 text-center">Price</th>
                  <th className="px-6 py-4 text-center">Stock</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y">
                {medicines?.map((med: any) => {
                  const stockStatus =
                    med.stock > 10
                      ? {
                          label: "In Stock",
                          className:
                            "bg-emerald-500/10 text-emerald-600 border-emerald-200",
                        }
                      : med.stock > 0
                      ? {
                          label: "Low Stock",
                          className:
                            "bg-amber-500/10 text-amber-600 border-amber-200",
                        }
                      : {
                          label: "Out of Stock",
                          className:
                            "bg-destructive/10 text-destructive border-destructive/20",
                        };

                  return (
                    <tr
                      key={med.id}
                      className="hover:bg-muted/40 transition-colors"
                    >
                      {/* Medicine */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">

                          <div className="h-12 w-12 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
                            {med.image ? (
                              <img
                                src={med.image}
                                alt={med.name}
                                className="h-full w-full object-contain p-1"
                              />
                            ) : (
                              <Package size={18} className="text-muted-foreground" />
                            )}
                          </div>

                          <div className="space-y-1">
                            <p className="font-medium">{med.name}</p>

                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Hash size={12} /> {med.id.slice(-6)}
                              </span>

                              <span className="flex items-center gap-1">
                                <Tag size={12} /> Generic
                              </span>
                            </div>
                          </div>

                        </div>
                      </td>

                      {/* Seller */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-md bg-primary/10">
                            <Store size={16} className="text-primary" />
                          </div>

                          <div>
                            <p className="text-sm font-medium">
                              Seller #{med.sellerId.slice(-4)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Verified seller
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5 text-center">
                        <p className="font-semibold text-lg">
                          ${med.price.toFixed(2)}
                        </p>
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-5 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className={`px-2.5 py-0.5 text-xs rounded-md border font-medium ${stockStatus.className}`}
                          >
                            {stockStatus.label}
                          </span>

                          <span className="text-xs text-muted-foreground">
                            {med.stock} units
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMedicinesPage;