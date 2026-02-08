"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { updateUserStatusAction } from "@/app/actions/admin";
import { toast } from "sonner";
import { useTransition } from "react";

export function UserStatusToggle({ user }: { user: any }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const nextStatus = user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    const toastId = toast.loading(
      `${nextStatus === "ACTIVE" ? "Activating" : "Deactivating"} user...`,
    );

    startTransition(async () => {
      try {
        const { err } = await updateUserStatusAction(user.id, nextStatus);
        if (err) {
          toast.error(err.message, { id: toastId });
          return;
        }
        toast.success(`User ${nextStatus.toLowerCase()} successfully`, {
          id: toastId,
        });
      } catch (err) {
        toast.error("Failed to update user status", { id: toastId });
      }
    });
  };

  if (user.status === "ACTIVE") {
    return (
      <Button
        variant="outline"
        disabled={isPending}
        onClick={handleToggle}
        className="h-10 rounded-md px-4 font-black uppercase tracking-widest text-[10px] border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
        ) : (
          <ShieldAlert className="mr-2 h-3.5 w-3.5" />
        )}
        Deactivate
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      disabled={isPending}
      onClick={handleToggle}
      className="h-10 rounded-md px-4 font-black uppercase tracking-widest text-[10px] border-emerald-100 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm"
    >
      {isPending ? (
        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
      ) : (
        <ShieldCheck className="mr-2 h-3.5 w-3.5" />
      )}
      Authorize
    </Button>
  );
}
