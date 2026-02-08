"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateOrderStatusAction } from "@/app/actions/seller";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function OrderStatusActions({ order }: { order: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUpdateStatus = (newStatus: string) => {
    const toastId = toast.loading(`Updating order status to ${newStatus}...`);

    startTransition(async () => {
      try {
        const { err } = await updateOrderStatusAction(order.id, newStatus);

        if (err) {
          toast.error(err.message, { id: toastId });
          return;
        }

        toast.success(`Order status updated to ${newStatus}`, { id: toastId });
        router.refresh();
      } catch (err) {
        toast.error("Failed to update status", { id: toastId });
      }
    });
  };

  if (order.status === "DELIVERED" || order.status === "CANCELLED") {
    return null;
  }

  return (
    <div className="space-y-2">
      {order.status === "Pending" && (
        <Button
          onClick={() => handleUpdateStatus("SHIPPED")}
          disabled={isPending}
          className="w-full rounded-md font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Ship Order
        </Button>
      )}

      {order.status === "SHIPPED" && (
        <Button
          onClick={() => handleUpdateStatus("DELIVERED")}
          disabled={isPending}
          className="w-full rounded-md font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Mark as Delivered
        </Button>
      )}

      <Button
        variant="outline"
        onClick={() => handleUpdateStatus("CANCELLED")}
        disabled={isPending}
        className="w-full rounded-md font-bold border-red-100 text-red-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Cancel Order
      </Button>
    </div>
  );
}
