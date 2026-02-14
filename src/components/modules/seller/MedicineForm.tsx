"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addMedicineAction, updateMedicineAction } from "@/app/actions/seller";
import { useRouter } from "next/navigation";
import { Package, ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const medicineSchema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.string().url("Must be a valid URL"),
    stock: z.number().min(0, "Stock cannot be negative"),
    price: z.number().min(1, "Price must be at least 1"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    categoriesId: z.string().min(1, "Category is required"),
});

export function MedicineForm({
    categories,
    initialData,
}: {
    categories: any[];
    initialData?: any;
}) {
    const router = useRouter();
    const [preview, setPreview] = useState(initialData?.image || "");
    const isEdit = !!initialData;

    const form = useForm({
        defaultValues: {
            name: initialData?.name || "",
            image: initialData?.image || "",
            stock: initialData?.stock || 0,
            price: initialData?.price || 0,
            description: initialData?.description || "",
            categoriesId: initialData?.categoriesId || categories?.[0]?.id || "",
        },
        validators: {
            onChange: medicineSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading(
                isEdit ? "Updating medicine..." : "Adding medicine..."
            );
            try {
                let res;
                if (isEdit) {
                    res = await updateMedicineAction(initialData.id, value);
                } else {
                    res = await addMedicineAction(value);
                }

                const { err } = res;

                if (err) {
                    toast.error(err.message, { id: toastId });
                    return;
                }

                toast.success(
                    isEdit ? "Medicine updated successfully" : "Medicine added successfully",
                    { id: toastId }
                );
                router.push("/seller-dashboard/medicines");
                router.refresh();
            } catch {
                toast.error("Something went wrong", { id: toastId });
            }
        },
    });

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <Link
                    href="/seller-dashboard/medicines"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to medicines
                </Link>

                <h1 className="text-3xl font-semibold tracking-tight">
                    {isEdit ? "Edit Medicine" : "Add Medicine"}
                </h1>
                <p className="text-muted-foreground text-sm">
                    {isEdit
                        ? "Update the details of your product."
                        : "Fill in the details below to list a new product."}
                </p>
            </div>

            {/* Form Card */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                className="space-y-6 border border-border rounded-xl p-6 shadow-sm bg-background"
            >
                <FieldGroup>
                    {/* Name */}
                    <form.Field
                        name="name"
                        children={(field) => (
                            <Field>
                                <FieldLabel>Medicine Name</FieldLabel>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="Paracetamol 500mg"
                                />
                                <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>
                            </Field>
                        )}
                    />

                    {/* Image */}
                    <form.Field
                        name="image"
                        children={(field) => (
                            <Field>
                                <FieldLabel>Image URL</FieldLabel>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) => {
                                        field.handleChange(e.target.value);
                                        setPreview(e.target.value);
                                    }}
                                    onBlur={field.handleBlur}
                                    placeholder="https://..."
                                />

                                {preview && (
                                    <div className="mt-3 border rounded-md overflow-hidden w-28 h-28 flex items-center justify-center bg-muted">
                                        <img
                                            src={preview}
                                            alt="preview"
                                            className="object-contain max-h-full"
                                        />
                                    </div>
                                )}

                                <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>
                            </Field>
                        )}
                    />

                    {/* Stock + Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <form.Field
                            name="stock"
                            children={(field) => (
                                <Field>
                                    <FieldLabel>Stock</FieldLabel>
                                    <Input
                                        type="number"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                        onBlur={field.handleBlur}
                                    />
                                    <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>
                                </Field>
                            )}
                        />

                        <form.Field
                            name="price"
                            children={(field) => (
                                <Field>
                                    <FieldLabel>Price ($)</FieldLabel>
                                    <Input
                                        type="number"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                        onBlur={field.handleBlur}
                                    />
                                    <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>
                                </Field>
                            )}
                        />
                    </div>

                    {/* Category */}
                    <form.Field
                        name="categoriesId"
                        children={(field) => (
                            <Field>
                                <FieldLabel>Category</FieldLabel>
                                <select
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    className="w-full h-10 border rounded-md px-3 bg-background"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>
                            </Field>
                        )}
                    />

                    {/* Description */}
                    <form.Field
                        name="description"
                        children={(field) => (
                            <Field>
                                <FieldLabel>Description</FieldLabel>
                                <Textarea
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="Usage, dosage, warnings..."
                                />
                                <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>
                            </Field>
                        )}
                    />
                </FieldGroup>

                {/* Submit */}
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                            className="w-full h-11"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {isEdit ? "Updating..." : "Saving..."}
                                </>
                            ) : (
                                <>
                                    {isEdit ? (
                                        <Save className="mr-2 h-4 w-4" />
                                    ) : (
                                        <Package className="mr-2 h-4 w-4" />
                                    )}
                                    {isEdit ? "Update Medicine" : "Add Medicine"}
                                </>
                            )}
                        </Button>
                    )}
                />
            </form>
        </div>
    );
}
