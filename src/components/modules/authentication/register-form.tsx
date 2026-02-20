"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";
import { Roles } from "@/constants/roles";
import { env } from "@/env";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
  role: z.enum([Roles.customer, Roles.seller]),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      // callbackURL: "http://localhost:3000", // development
      // callbackURL: "https://medixo-client.vercel.app", // Production
      callbackURL: env.NEXT_PUBLIC_APP_URL,
    });

    // console.log(data);
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: Roles.customer,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user");
      try {
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Created Successfully", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <div className="py-10 relative min-h-screen flex items-center justify-center px-4 text-gray-300 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <iframe
          src="https://my.spline.design/spaceparticlesanimation-UGnU6SB7nUK6sFI6N5WzasEx"
          className="w-full h-full border-0"
        />
      </div>

      {/* Card */}
      <Card
        {...props}
        className="w-full max-w-md p-[1px] rounded-lg border border-white/10 bg-linear-to-b from-white/5 to-white/[0.02] shadow-2xl backdrop-blur-xl"
      >
        <div className="rounded-lg bg-black/60 px-8 py-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <span className="inline-block mb-2 text-white text-2xl font-semibold tracking-tight">
              Medixo
            </span>

            <h1 className="text-[42px] font-semibold tracking-[-0.05em] text-white leading-tight">
              Create Account
            </h1>

            <p className="text-gray-400 mt-1 text-lg">
              Join and start using your account
            </p>
          </div>

          {/* Form */}
          <form
            id="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <FieldGroup>
              {/* Name */}
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        placeholder="Enter Your Name"
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="bg-black/40 border border-gray-700 text-white focus:ring-2 focus:ring-white"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Email */}
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        placeholder="Enter Your Email"
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="bg-black/40 border border-gray-700 text-white focus:ring-2 focus:ring-white"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Password */}
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        placeholder="Enter Your Password"
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="bg-black/40 border border-gray-700 text-white focus:ring-2 focus:ring-white"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Role */}
              <form.Field
                name="role"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Join as</FieldLabel>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-11 rounded-md border border-gray-700 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <option value={Roles.customer}>Customer</option>
                        <option value={Roles.seller}>Seller</option>
                      </select>
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>

          {/* Actions */}
          <div className="mt-7 space-y-3">
            <Button
              form="register-form"
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-100 font-semibold"
            >
              Register
            </Button>

            <Button
              onClick={() => handleGoogleLogin()}
              variant="outline"
              type="button"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Continue with Google
            </Button>
          </div>

          {/* Footer */}
          <div className="my-7 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          <div className="text-center text-sm text-gray-400">
            Already have an account?
            <Link
              href="/login"
              className="ml-2 text-white font-semibold underline hover:no-underline"
            >
              Login
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
