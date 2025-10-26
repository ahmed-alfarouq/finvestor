"use client";
import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/auth/card-wrapper";

import { login } from "@/actions/auth/login";

import { cn } from "@/lib/utils";

import { LoginSchema } from "@/schemas/auth";
import FormInput from "@/components/auth/form-input";
type LoginFields = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = ({ email, password, code }: LoginFields) => {
    setFormError("");

    startTransition(async () => {
      try {
        await login({ email, password, code }).then((data) => {
          if (data?.error) {
            form.reset({ email, password: "" });
            setFormError(data.error);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
            setFormError("");
          }
        });
      } catch (error) {
        setFormError((error as Error).message);
      }
    });
  };

  return (
    <CardWrapper
      logo="/img/logo.webp"
      backLinkText={!showTwoFactor ? "Create an account" : ""}
      backLinkHref={!showTwoFactor && !isPending ? "/register" : ""}
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-6"
        >
          {!showTwoFactor ? (
            <>
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
            </>
          ) : (
            <FormInput
              control={form.control}
              type="text"
              name="code"
              label="Two Factor Code"
              placeholder="132456"
              disabled={isPending}
            />
          )}
          <FormError message={formError} />
          <Button
            disabled={isPending}
            type="submit"
            size="lg"
            className="text-base"
          >
            {showTwoFactor ? "Confirm" : "Log in"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginPage;
