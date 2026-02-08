import Link from "next/link";
import { Home, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="h-32 w-32 rounded-md bg-primary/10 flex items-center justify-center text-primary animate-pulse shadow-md">
            <Package className="h-16 w-16" />
          </div>
        </div>

        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-8xl font-black text-gray-900 dark:text-gray-100 tracking-tighter">
            404
          </h1>
          <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 uppercase tracking-tight">
            Product Not Found
          </h2>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-md mx-auto leading-relaxed">
          The medicine you're looking for doesn't exist or has been removed from
          our catalog. Please check the product ID or browse our available
          products.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/shop">
            <Button className="rounded-md shadow-md gap-2 font-black uppercase tracking-widest px-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-md shadow-sm gap-2 font-black uppercase tracking-widest px-8 border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="pt-8 border-t border-gray-200 dark:border-white/10">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
}
