import React from "react";
import { ProductDetails } from "@/components/modules/shop/ProductDetails";
import { adminService } from "@/services/admin.service";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MedicineDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: product, err } = await adminService.getSingleMedicine(id);

  if (err || !product) {
    notFound();
  }

  return (
    <div className="bg-gray-50 dark:bg-background min-h-screen pt-24 pb-32 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-12">
          <Link
            href="/"
            className="hover:text-primary transition-colors flex items-center gap-2"
          >
            <Home className="h-4 w-4" /> Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-gray-100 truncate max-w-[200px]">
            {product.name}
          </span>
        </div>

        <ProductDetails product={product} />

        {/* Product Information Section */}
        <div className="mt-24 space-y-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-gray-900 dark:text-gray-100 uppercase tracking-tight">
              Product Information
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium text-lg">
              This medicine is manufactured by certified pharmaceutical partners
              and stored in temperature-controlled environments to ensure
              maximum efficacy. Please consult with a healthcare professional
              before use.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Indications Card */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-md border border-gray-200 dark:border-white/10 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                <h4 className="font-black text-sm uppercase tracking-widest text-primary flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Indications
                </h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                  Used for temporary relief of minor aches and pains due to
                  headache, muscular aches, and common cold. Suitable for adults
                  and children over 12 years of age.
                </p>
              </div>

              {/* Storage Card */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-md border border-gray-200 dark:border-white/10 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                <h4 className="font-black text-sm uppercase tracking-widest text-primary flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Storage
                </h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                  Store at room temperature 15-30°C (59-86°F). Protect from
                  excessive heat and direct sunlight. Keep out of reach of
                  children.
                </p>
              </div>

              {/* Dosage Card */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-md border border-gray-200 dark:border-white/10 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                <h4 className="font-black text-sm uppercase tracking-widest text-primary flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Dosage
                </h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                  Adults and children 12 years and over: Take 1-2 tablets every
                  4-6 hours as needed. Do not exceed 8 tablets in 24 hours
                  unless directed by a doctor.
                </p>
              </div>

              {/* Warnings Card */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-md border border-gray-200 dark:border-white/10 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                <h4 className="font-black text-sm uppercase tracking-widest text-primary flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Warnings
                </h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                  Do not use if allergic to any ingredients. Consult a doctor if
                  pregnant, breastfeeding, or taking other medications. Stop use
                  and seek medical help if symptoms persist.
                </p>
              </div>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-md p-6">
            <p className="text-sm font-black text-amber-800 dark:text-amber-400 uppercase tracking-widest text-center">
              ⚠️ Always read the label and follow directions for use. If
              symptoms persist, consult your healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
