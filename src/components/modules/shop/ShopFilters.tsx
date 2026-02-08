"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

export function ShopFilters({ categories }: { categories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );
  const debouncedSearch = useDebounce(searchTerm, 500);

  const activeCategory = searchParams.get("categoriesId");
  const sortBy = searchParams.get("sortBy");

  const updateFilters = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    router.push(`/shop?${newParams.toString()}`);
  };

  useEffect(() => {
    updateFilters({ searchTerm: debouncedSearch || null });
  }, [debouncedSearch]);

  const activeCategoryName = categories.find(
    (c) => c.id === activeCategory,
  )?.name;

  return (
    <div className="flex flex-col gap-6 mb-12">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search within 5,000+ medicines..."
            className="h-14 pl-12 pr-4 rounded-md border-none ring-1 ring-gray-200 dark:ring-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-md shadow-xl shadow-gray-100/50 dark:shadow-none focus:ring-2 focus:ring-primary/20 transition-all text-base"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`h-14 px-6 rounded-md border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-md font-bold gap-2 ${activeCategory ? "border-primary ring-1 ring-primary/20 bg-primary/5 dark:bg-primary/20" : ""}`}
              >
                <Filter className="h-4 w-4" />
                {activeCategoryName || "Category"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 p-2 rounded-md border-gray-100 shadow-2xl"
            >
              <DropdownMenuItem
                className="rounded-md py-3 font-bold cursor-pointer"
                onClick={() => updateFilters({ categoriesId: null })}
              >
                All Categories
              </DropdownMenuItem>
              {categories.map((cat) => (
                <DropdownMenuItem
                  key={cat.id}
                  className="rounded-md py-3 font-bold cursor-pointer"
                  onClick={() => updateFilters({ categoriesId: cat.id })}
                >
                  {cat.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`h-14 px-6 rounded-md border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-md font-bold gap-2 ${sortBy ? "border-primary ring-1 ring-primary/20 bg-primary/5 dark:bg-primary/20" : ""}`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {sortBy === "price"
                  ? "Price"
                  : sortBy === "createdAt"
                    ? "Newest"
                    : "Sort By"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 p-2 rounded-md border-gray-100 shadow-2xl"
            >
              <DropdownMenuItem
                className="rounded-md py-3 font-bold cursor-pointer"
                onClick={() =>
                  updateFilters({ sortBy: "price", sortOrder: "asc" })
                }
              >
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-md py-3 font-bold cursor-pointer"
                onClick={() =>
                  updateFilters({ sortBy: "price", sortOrder: "desc" })
                }
              >
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-md py-3 font-bold cursor-pointer"
                onClick={() =>
                  updateFilters({ sortBy: "createdAt", sortOrder: "desc" })
                }
              >
                Newest Arrivals
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filters / Results Info */}
      <div className="flex flex-wrap items-center gap-4">
        {activeCategory && (
          <Badge
            variant="secondary"
            className="bg-primary/5 text-primary border-none font-bold py-2 px-4 rounded-md flex items-center gap-2"
          >
            {activeCategoryName}{" "}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => updateFilters({ categoriesId: null })}
            />
          </Badge>
        )}
        {sortBy && (
          <Badge
            variant="secondary"
            className="bg-blue-500/5 text-blue-500 border-none font-bold py-2 px-4 rounded-md flex items-center gap-2"
          >
            Sorted by {sortBy === "price" ? "Price" : "Date"}{" "}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => updateFilters({ sortBy: null, sortOrder: null })}
            />
          </Badge>
        )}
      </div>
    </div>
  );
}
