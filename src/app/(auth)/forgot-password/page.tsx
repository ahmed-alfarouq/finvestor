"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetSchema } from "@/schemas/auth";

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
import FormSuccess from "@/components/form-success";

type ResetFields = z.infer<typeof ResetSchema>;

const ForgotPassword = () => {
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetFields>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ResetFields) => {
    setFormError("");
    setFormSuccess("");
    startTransition(() => {
      console.log(data);
      // reset(data).then((data) => {
      //   setFormError(data?.error);
      //   setFormSuccess(data?.success);
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
          <FormError message={formError} />
          <FormSuccess message={formSuccess} />
          <Button
            disabled={isPending}
            type="submit"
            size="lg"
            className="w-full capitalize"
          >
            reset password
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ForgotPassword;
