"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/auth/form-input";

import { login } from "@/actions/auth/login";

import { cn } from "@/lib/utils";

import { LoginSchema, loginSchema } from "@/schemas/auth";

const LoginForm = () => {
  const router = useRouter();

  const [formError, setFormError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }: LoginSchema) => {
    setFormError("");

    startTransition(async () => {
      try {
        const res = await login({ email, password });
        if (res?.tempToken) {
          router.push(`/otp?token=${res.tempToken}`);
          return;
        }

        form.reset({ email, password: "" });
        setFormError(res?.error);
      } catch (err) {
        form.reset({ email, password: "" });
        setFormError((err as Error).message);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-6"
      >
        <FormInput
          control={form.control}
          type="email"
          name="email"
          label="Email Address"
          placeholder="ahmed.omar.alfarouq@gmail.com"
          disabled={isPending}
        />
        <FormInput
          control={form.control}
          type="password"
          name="password"
          label="Password"
          placeholder="*******"
          disabled={isPending}
        />
        <Link
          href="/forgot-password"
          className={cn(
            "w-fit self-end text-xs m-0 float-right text-primary dark:text-primary-dark",
            isPending && "pointer-events-none"
          )}
          aria-disabled={isPending}
        >
          Forgot Password?
        </Link>

        <FormError message={formError} />
        <Button
          disabled={isPending}
          type="submit"
          size="lg"
          className="text-base"
        >
          Log in
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
