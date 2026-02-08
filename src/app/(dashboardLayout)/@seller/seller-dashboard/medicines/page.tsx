import React from "react";
import { sellerService } from "@/services/seller.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SellerMedicinesPage = async () => {
  const { data: session } = await userService.getSession();
  const { data: sellerMedicines } = await sellerService.getSellerMedicines(
    session?.user?.id,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 uppercase">
            Medicine Inventory
          </h1>
          <p className="text-muted-foreground">
            Manage your pharmaceutical listings and stock levels.
          </p>
        </div>
        <Link href="/seller-dashboard/medicines/add">
          <Button className="rounded-md font-bold shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" /> Add Medicine
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm border-none ring-1 ring-gray-200 dark:ring-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-md overflow-hidden">
        <CardHeader className="bg-gray-50/50 dark:bg-white/5 border-b dark:border-white/10 py-4">
          <CardTitle className="text-lg font-black text-gray-900 dark:text-gray-100 uppercase italic">
            Your Listings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground dark:text-gray-400 uppercase bg-gray-50/30 dark:bg-white/5 border-b dark:border-white/10">
                <tr>
                  <th className="px-6 py-4 font-black">Medicine</th>
                  <th className="px-6 py-4 font-black">Stock</th>
                  <th className="px-6 py-4 font-black">Price</th>
                  <th className="px-6 py-4 text-right font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(sellerMedicines || []).map((med: any) => (
                  <tr
                    key={med.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-gray-100 dark:bg-white/5 rounded-md overflow-hidden flex items-center justify-center border dark:border-white/10">
                          {med.image ? (
                            <img
                              src={med.image}
                              alt={med.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-300 dark:text-gray-600 text-xl font-bold">
                              {med.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                            {med.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground dark:text-gray-500 font-mono truncate max-w-[120px]">
                            {med.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                          med.stock < 10
                            ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-500 border border-red-100 dark:border-red-500/20"
                            : "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-500 border border-green-100 dark:border-green-500/20"
                        }`}
                      >
                        {med.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-gray-900 dark:text-gray-100">
                      ${med.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all dark:border-white/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 hover:border-red-200 transition-all text-gray-400 dark:border-white/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!sellerMedicines || sellerMedicines.length === 0) && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-20 text-center text-muted-foreground"
                    >
                      No medicines found. Click {"Add Medicine"} to list your
                      first product.
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
