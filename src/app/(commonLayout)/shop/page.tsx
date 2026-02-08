import React from "react";
import { ShopFilters } from "@/components/modules/shop/ShopFilters";
import { ProductCard } from "@/components/modules/shop/ProductCard";
import { adminService } from "@/services/admin.service";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const { data: medicines } = await adminService.getAllMedicines({
    searchTerm: params.searchTerm as string,
    categoriesId: params.categoriesId as string,
    sortBy: params.sortBy as string,
    sortOrder: params.sortOrder as string,
  });
  const { data: categories } = await adminService.getAllCategories();

  return (
    <div className="bg-[#FAFAFA] dark:bg-background min-h-screen pt-24 pb-32 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="space-y-4 mb-16 text-center lg:text-left">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary">
            Medixo Pharmacy
          </h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
            Explore Our{" "}
            <span className="text-primary italic text-shadow-sm">Catalog.</span>
          </h1>
          <p className="text-muted-foreground dark:text-gray-400 font-medium max-w-2xl">
            From daily multivitamin boosters to specialized over-the-counter
            care, find everything you need for a healthier lifestyle.
          </p>
        </div>

        <ShopFilters categories={categories || []} />

        {/* Product Grid */}
        {medicines && medicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {medicines.map((med: any) => (
              <ProductCard key={med.id} product={med} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
            <div className="h-32 w-32 rounded-md bg-primary/10 flex items-center justify-center text-primary shadow-xl shadow-primary/20 mb-8 animate-pulse">
              <svg
                className="h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-gray-100 uppercase tracking-tighter mb-4">
              No Medicines Found
            </h3>
            <p className="text-muted-foreground dark:text-gray-400 font-medium max-w-md mb-8 uppercase tracking-widest text-sm leading-relaxed">
              We couldn't find any products matching your criteria. Try
              adjusting your filters or check back later.
            </p>
            <div className="flex gap-4">
              <a
                href="/shop"
                className="px-8 py-3 bg-primary text-white rounded-md font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/30"
              >
                Clear Filters
              </a>
            </div>
          </div>
        )}

        {/* Pagination Placeholder */}
        {medicines && medicines.length > 0 && (
          <div className="mt-24 flex items-center justify-center gap-4">
            <div className="h-2 w-2 rounded-md bg-primary" />
            <div className="h-2 w-2 rounded-md bg-primary/20" />
            <div className="h-2 w-2 rounded-md bg-primary/20" />
            <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground dark:text-gray-500 ml-4">
              Load More Results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
