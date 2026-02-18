import React from "react";
import { sellerService } from "@/services/seller.service";
import { MedicineActions } from "@/components/modules/seller/MedicineActions";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plus,Package } from "lucide-react";
import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";

const SellerMedicinesPage = async () => {
  const { data: session } = await userService.getSession();
  const { data: sellerMedicines } = await sellerService.getSellerMedicines(
    session?.user?.id
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Medicines
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your products, pricing, and stock levels.
          </p>
        </div>

        <Link href="/seller-dashboard/add-medicine">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Medicine
          </Button>
        </Link>
      </div>

      {/* Table Card */}
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle>Your Inventory</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">

            <table className="w-full text-sm">
              <thead className="border-b bg-muted/40 text-muted-foreground text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">Medicine</th>
                  <th className="px-6 py-4 text-left font-medium">Stock</th>
                  <th className="px-6 py-4 text-left font-medium">Price</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">

                {sellerMedicines && sellerMedicines.length > 0 ? (
                  sellerMedicines.map((med: any) => (
                    <tr
                      key={med.id}
                      className="hover:bg-muted/40 transition"
                    >
                      {/* Medicine */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-md border bg-muted flex items-center justify-center overflow-hidden">
                            {med.image ? (
                              <img
                                src={med.image}
                                alt={med.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Package className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>

                          <div>
                            <p className="font-medium">
                              {med.name}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {med.id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-medium ${med.stock < 10
                            ? "bg-red-500/10 text-red-600"
                            : "bg-emerald-500/10 text-emerald-600"
                            }`}
                        >
                          {med.stock} units
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 font-medium">
                        ${med.price.toFixed(2)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <MedicineActions id={med.id} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground space-y-3">
                        <Package className="h-10 w-10 opacity-40" />
                        <p>No medicines added yet</p>
                        <Link href="/seller-dashboard/add-medicine">
                          <Button size="sm">Add your first medicine</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerMedicinesPage;