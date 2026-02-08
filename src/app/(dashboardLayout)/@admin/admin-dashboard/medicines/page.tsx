import React from "react";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Package, Hash, Tag, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const AdminMedicinesPage = async () => {
  const { data: session } = await userService.getSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { data: medicines } = await adminService.getAllMedicines();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Box className="text-primary h-6 w-6" />
          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">
            INVENTORY COMMAND
          </h1>
        </div>
        <p className="text-muted-foreground font-medium pl-8">
          Global catalog management and stock synchronization.
        </p>
      </div>

      <Card className="border-none ring-1 ring-gray-100 shadow-xl shadow-gray-100/20 rounded-[32px] overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-6 px-8">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">
              Master Catalog
            </CardTitle>
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-md text-[10px] font-black tracking-widest border border-primary/20">
              {medicines?.length || 0} TOTAL STOCK ITEMS
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  <th className="px-8 py-6">Product Core</th>
                  <th className="px-8 py-6">Listing Source</th>
                  <th className="px-8 py-6 text-center">Asset Value</th>
                  <th className="px-8 py-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {medicines?.map((med: any) => (
                  <tr
                    key={med.id}
                    className="hover:bg-gray-50/20 transition-all duration-300 group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="h-14 w-14 rounded-md bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center p-2 shadow-sm group-hover:shadow-md transition-shadow">
                          {med.image ? (
                            <img
                              src={med.image}
                              alt={med.name}
                              className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <Package className="text-gray-200" size={24} />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="font-black text-gray-900 tracking-tighter uppercase text-base leading-none group-hover:text-primary transition-colors">
                            {med.name}
                          </p>
                          <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5">
                            <span className="flex items-center gap-1">
                              <Hash size={10} className="text-primary/40" />{" "}
                              {med.id.slice(-8)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Tag size={10} className="text-secondary/40" />{" "}
                              GENERIC
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100">
                          <Store size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                            Authenticated Seller
                          </p>
                          <p className="text-xs font-bold text-gray-900 uppercase">
                            Apothecary #{med.sellerId.slice(-4)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="space-y-1">
                        <p className="text-lg font-black text-gray-900 tracking-tighter">
                          ${med.price.toFixed(2)}
                        </p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Unit Price
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-[0.1em] border uppercase ${
                            med.stock > 10
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : med.stock > 0
                                ? "bg-amber-50 text-amber-600 border-amber-100"
                                : "bg-red-50 text-red-600 border-red-100"
                          }`}
                        >
                          {med.stock > 10
                            ? "Optimal"
                            : med.stock > 0
                              ? "Low Stock"
                              : "Depleted"}
                        </span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase font-mono">
                          {med.stock} UNITS
                        </p>
                      </div>
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

export default AdminMedicinesPage;
