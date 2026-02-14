"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreHorizontal,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  UserX,
} from "lucide-react";
import { updateUserStatusAction } from "@/app/actions/admin";
import { toast } from "sonner";

export function UserRowActions({ user }: { user: any }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"BLOCK" | "DELETE" | null>(null);

  const handleStatusUpdate = async (status: "ACTIVE" | "BLOCKED" | "DELETED") => {
    const toastId = toast.loading("Updating user status...");
    try {
      const { err } = await updateUserStatusAction(user.id, status);
      if (err) {
        toast.error(err.message, { id: toastId });
      } else {
        toast.success(`User status updated to ${status}`, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsDialogOpen(false);
      setActionType(null);
    }
  };

  const handleActionClick = (type: "BLOCK" | "DELETE") => {
    setActionType(type);
    setIsDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigator.clipboard.writeText(user.id)}
          >
            Copy User ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {user.status !== "ACTIVE" && (
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50"
              onClick={() => handleStatusUpdate("ACTIVE")}
            >
              <ShieldCheck className="h-4 w-4" />
              Activate User
            </DropdownMenuItem>
          )}

          {user.status !== "BLOCKED" && (
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer text-orange-600 focus:text-orange-600 focus:bg-orange-50"
              onClick={() => handleActionClick("BLOCK")}
            >
              <ShieldAlert className="h-4 w-4" />
              Block User
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
            onClick={() => handleActionClick("DELETE")}
          >
            <Trash2 className="h-4 w-4" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "BLOCK"
                ? "This will prevent the user from logging in and accessing their account. You can unblock them later."
                : "This action cannot be undone. This will permanently delete the user account and remove their data from our servers."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={
                actionType === "DELETE"
                  ? "bg-destructive hover:bg-destructive/90"
                  : "bg-orange-500 hover:bg-orange-600"
              }
              onClick={() =>
                handleStatusUpdate(actionType === "BLOCK" ? "BLOCKED" : "DELETED")
              }
            >
              {actionType === "BLOCK" ? "Block User" : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
