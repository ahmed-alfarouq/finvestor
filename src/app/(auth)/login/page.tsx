"use client";
import React, { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/auth";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormError from "@/components/form-error";
import CardWrapper from "@/components/auth/CardWrapper";
import { login } from "@/actions/auth/login";
import Link from "next/link";

import { cn } from "@/lib/utils";

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

  const onSubmit = (data: LoginFields) => {
    setFormError("");
    startTransition(() => {
      login(data).then((data) => {
        if (data?.error) {
          form.reset();
          setFormError(data.error);
        }
        if (data?.twoFactor) {
          setShowTwoFactor(true);
          setFormError("");
        }
      });
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ahmed.omar.alfarouq@gmail.com"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className={cn(
                          "text-xs m-0 float-right text-primary dark:text-primary-dark",
                          isPending && "pointer-events-none"
                        )}
                        aria-disabled={isPending}
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Code</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="123456"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
