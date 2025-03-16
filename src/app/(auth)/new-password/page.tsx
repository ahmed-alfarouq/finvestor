"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewPasswordSchema } from "@/schemas/auth";

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

type NewPasswordFields = z.infer<typeof NewPasswordSchema>;

const NewPassword = () => {
  const [formError, setFormError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewPasswordFields>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: NewPasswordFields) => {
    setFormError("");
    startTransition(() => {
      console.log(data);
      // updatePassword(data).then((data) => {
      //   setFormError(data?.error);
      // });
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
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
          <Button
            disabled={isPending}
            type="submit"
            size="lg"
            className="w-full"
          >
            Create new password
          </Button>
        </form>
      </Form>
    </>
  );
};

export default NewPassword;
