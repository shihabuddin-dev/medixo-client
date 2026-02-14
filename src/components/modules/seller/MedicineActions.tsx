"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteMedicineAction } from "@/app/actions/seller";
import { toast } from "sonner";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function MedicineActions({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const toastId = toast.loading("Deleting medicine...");

        try {
            const { err } = await deleteMedicineAction(id);
            if (err) {
                toast.error(err.message || "Failed to delete medicine", { id: toastId });
            } else {
                toast.success("Medicine deleted successfully", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex justify-end gap-2">
            <Link href={`/seller-dashboard/medicines/edit/${id}`}>
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                </Button>
            </Link>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-500 border-red-200 hover:bg-red-500/10"
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            medicine from your inventory.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                            onClick={handleDelete}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
