import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-6 space-y-6">
      {/* Icon */}
      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Package className="h-8 w-8" />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          404 Page Not Found
        </h1>

        <p className="text-muted-foreground max-w-md">
          The page you are looking for doesn’t exist or may have been moved.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/shop">Browse Medicines</Link>
        </Button>
      </div>
    </div>
  );
}
