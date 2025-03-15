"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { RegisterSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { FcGoogle } from "react-icons/fc";

import { handleGoogleLogin } from "@/actions/login";
import { register } from "@/actions/register";

type RegisterFields = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFields>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFields) => {
    setFormError("");
    setFormSuccess("");
    startTransition(() => {
      register(data).then((data) => {
        setFormError(data?.error);
        setFormSuccess(data?.success);
      });
    });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-3 mb-3">
        <Image
          src="/img/logo.webp"
          alt="logo"
          aria-hidden="true"
          width={300}
          height={300}
          className="mx-auto"
        />
        <h1 className="text-primary-color dark:text-primary-color-dark font-bold text-xl">
          Create an account
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-[400px] mt-6 px-4 mx-auto flex flex-col justify-center gap-3"
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="Ahmed Al-Farouq"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="ahmed.omar.alfarouq@gmail.com"
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
                      disabled={isPending}
                      type="password"
                      placeholder="********"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={formError} />
          <FormSuccess message={formSuccess} />
          <p className="text-third-color dark:text-primary-color-dark text-sm font-light my-3">
            By continuing, you agree to our{" "}
            <Link
              href="/terms-of-service"
              className="text-primary dark:text-primary-dark"
            >
              terms of service.
            </Link>
          </p>
          <Button
            disabled={isPending}
            type="submit"
            size="lg"
            className="w-full"
          >
            Sign up
          </Button>
        </form>
      </Form>
      <div className="w-fit mx-auto my-6 text-gray-7 dark:text-primary-color-dark text-sm text-center relative before:absolute before:bottom-[9px] before:-left-28 before:h-[1px] before:w-24 before:bg-third-color before:opacity-25 after:absolute after:bottom-[9px] after:-right-28 after:h-[1px] after:w-24 after:bg-third-color after:opacity-25">
        Or sign up with
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
      <p className="text-gray-7 dark:text-primary-color-dark">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary dark:text-primary-dark font-medium"
        >
          Login here.
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
