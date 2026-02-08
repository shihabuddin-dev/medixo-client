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
import { addMedicineAction } from "@/app/actions/seller";
import { useRouter } from "next/navigation";
import { Package, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const medicineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Must be a valid URL"),
  stock: z.number().min(0, "Stock cannot be negative"),
  price: z.number().min(1, "Price must be at least 1"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoriesId: z.string().min(1, "Category is required"),
});

export function AddMedicineForm({ categories }: { categories: any[] }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      image: "",
      stock: 0,
      price: 0,
      description: "",
      categoriesId: categories[0]?.id || "",
    },
    validators: {
      onChange: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Listing medicine...");
      try {
        const { data, err } = await addMedicineAction(value);

        if (err) {
          toast.error(err.message, { id: toastId });
          return;
        }

        toast.success("Medicine listed successfully", { id: toastId });
        router.push("/seller-dashboard/medicines");
        router.refresh();
      } catch (err) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link
          href="/seller-dashboard/medicines"
          className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-4 uppercase tracking-widest"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inventory
        </Link>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100 uppercase">
          LIST NEW <span className="text-primary italic">MEDICINE</span>
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Add a new pharmaceutical product to the Medixo marketplace.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8 bg-white/70 dark:bg-black/20 backdrop-blur-md p-8 rounded-md ring-1 ring-gray-200 dark:ring-white/10 shadow-xl shadow-gray-100/50 dark:shadow-none"
      >
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Medicine Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  placeholder="e.g. Paracetamol 500mg"
                  className="h-12 rounded-md bg-gray-50/50 dark:bg-white/5 border-none ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 dark:text-gray-100"
                />
                <FieldError>
                  {(field.state.meta.errors?.[0] as any)?.message ||
                    field.state.meta.errors?.[0]}
                </FieldError>
              </Field>
            )}
          />

          <form.Field
            name="image"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  placeholder="https://example.com/medicine.jpg"
                  className="h-12 rounded-md bg-gray-50/50 dark:bg-white/5 border-none ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 dark:text-gray-100"
                />
                <p className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-widest">
                  Provide a high-quality product image link
                </p>
                <FieldError>
                  {(field.state.meta.errors?.[0] as any)?.message ||
                    field.state.meta.errors?.[0]}
                </FieldError>
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <form.Field
              name="stock"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Stock Quantity</FieldLabel>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(Number(e.target.value))
                    }
                    className="h-12 rounded-md bg-gray-50/50 dark:bg-white/5 border-none ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 dark:text-gray-100"
                  />
                  <FieldError>
                    {(field.state.meta.errors?.[0] as any)?.message ||
                      field.state.meta.errors?.[0]}
                  </FieldError>
                </Field>
              )}
            />

            <form.Field
              name="price"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Price ($)</FieldLabel>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(Number(e.target.value))
                    }
                    className="h-12 rounded-md bg-gray-50/50 dark:bg-white/5 border-none ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 dark:text-gray-100"
                  />
                  <FieldError>
                    {(field.state.meta.errors?.[0] as any)?.message ||
                      field.state.meta.errors?.[0]}
                  </FieldError>
                </Field>
              )}
            />
          </div>

          <form.Field
            name="categoriesId"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Classification</FieldLabel>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    field.handleChange(e.target.value)
                  }
                  className="flex h-12 w-full rounded-md border-none ring-1 ring-gray-200 dark:ring-white/10 bg-gray-50/50 dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:1.2em_1.2em] bg-[right_0.5rem_center] bg-no-repeat shadow-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <FieldError>
                  {(field.state.meta.errors?.[0] as any)?.message ||
                    field.state.meta.errors?.[0]}
                </FieldError>
              </Field>
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Product Description
                </FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    field.handleChange(e.target.value)
                  }
                  placeholder="Detailed information about the medicine, usage, and warnings..."
                  className="min-h-[120px] rounded-md p-4 bg-gray-50/50 dark:bg-white/5 border-none ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 dark:text-gray-100"
                />
                <FieldError>
                  {(field.state.meta.errors?.[0] as any)?.message ||
                    field.state.meta.errors?.[0]}
                </FieldError>
              </Field>
            )}
          />
        </FieldGroup>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full h-14 rounded-md text-base font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Package className="mr-2 h-5 w-5" />
              )}
              {isSubmitting ? "Processing..." : "Verify & List Product"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
