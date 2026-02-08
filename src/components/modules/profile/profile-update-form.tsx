"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateProfile } from "@/app/actions/user";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
});

export function ProfileUpdateForm({ user }: { user: any }) {
  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
    validators: {
      onChange: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating profile...");
      try {
        const { data, err } = await updateProfile(value);

        if (err) {
          toast.error(err.message, { id: toastId });
          return;
        }

        toast.success("Profile updated successfully", { id: toastId });
      } catch (err) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    },
  });

  return (
    <form
      id="profile-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <Label
            htmlFor="name"
            className="text-xs font-bold uppercase tracking-widest text-gray-500"
          >
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <form.Field
              name="name"
              children={(field) => (
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  className="pl-10 h-11 border-gray-200 focus:ring-primary focus:border-primary transition-all"
                />
              )}
            />
          </div>
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="email"
            className="text-xs font-bold uppercase tracking-widest text-gray-500"
          >
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              value={user?.email}
              disabled
              className="pl-10 h-11 bg-gray-50/50 border-gray-200 text-gray-500 font-medium"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label
          htmlFor="phone"
          className="text-xs font-bold uppercase tracking-widest text-gray-500"
        >
          Phone Number
        </Label>
        <form.Field
          name="phone"
          children={(field) => (
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
              placeholder="+1 (555) 000-0000"
              className="h-11 border-gray-200 focus:ring-primary focus:border-primary"
            />
          )}
        />
      </div>

      <div className="space-y-3">
        <Label
          htmlFor="address"
          className="text-xs font-bold uppercase tracking-widest text-gray-500"
        >
          Full Shipping Address
        </Label>
        <form.Field
          name="address"
          children={(field) => (
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                field.handleChange(e.target.value)
              }
              rows={4}
              className="w-full rounded-lg border border-gray-200 bg-background px-3 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground"
              placeholder="House #, Street name, City, Country"
            />
          )}
        />
      </div>

      <div className="pt-6 border-t flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground max-w-[60%] italic">
          Your data is encrypted and secure. We never share your personal
          information with third parties.
        </p>
        <div className="flex gap-3 shrink-0">
          <Button
            variant="ghost"
            type="button"
            className="text-gray-500"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all min-w-[140px]"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Update Profile
              </Button>
            )}
          />
        </div>
      </div>
    </form>
  );
}
