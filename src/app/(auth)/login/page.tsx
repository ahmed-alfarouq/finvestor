"use client";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/auth";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { handleGoogleLogin, login } from "@/actions/login";
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

type LoginFields = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const [formError, setFormError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFields) => {
    setFormError("");
    startTransition(() => {
      login(data).then((data) => {
        setFormError(data?.error);
      });
    });
  };

  return (
    <>
      <Image
        src="/img/logo.webp"
        alt="logo"
        aria-hidden="true"
        width={300}
        height={300}
        className="mx-auto"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-[400px] mt-6 px-4 mx-auto flex flex-col justify-center gap-3"
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
          </div>
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
          </div>
          <FormError message={formError} />
          <Link
            href="/forgot-password"
            className="text-sm text-primary dark:text-primary-dark my-2"
          >
            forgot password?
          </Link>
          <Button
            disabled={isPending}
            type="submit"
            size="lg"
            className="w-full"
          >
            Log in
          </Button>
        </form>
      </Form>

      <div className="w-fit mx-auto my-8 text-gray-7 dark:text-primary-dark text-sm text-center relative before:absolute before:bottom-[9px] before:-left-28 before:h-[1px] before:w-24 before:bg-third-color before:opacity-25 after:absolute after:bottom-[9px] after:-right-28 after:h-[1px] after:w-24 after:bg-third-color after:opacity-25">
        Or signin with
      </div>

      <form action={handleGoogleLogin} className="w-full sm:w-[400px] p-4 pt-0 mx-auto">
        <Button
          type="submit"
          variant="secondary"
          className="flex w-full text-base capitalize"
          size="lg"
        >
          <FcGoogle size={24} />
          continue with google
        </Button>
      </form>
      <Link href="/register" className=" text-primary dark:text-primary-dark">
        Don&apos;t have an account?
      </Link>
    </>
  );
};

export default LoginPage;
