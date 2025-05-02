"use client";
import React, { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetSchema } from "@/schemas/auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Timer from "@/components/auth/Timer";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import CardWrapper from "@/components/auth/CardWrapper";

import { reset } from "@/actions/auth/reset";

type ResetFields = z.infer<typeof ResetSchema>;

const ForgotPassword = () => {
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [canResend, setCanResend] = useState<boolean>(true);
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
      reset(data.email).then((data) => {
        setFormError(data?.error);
        if (data.success) {
          setFormSuccess(data.success);
          setCanResend(false);
        }
      });
    });
  };

  return (
    <CardWrapper
      logo="/img/logo.webp"
      headerLabel="Forgot Password?"
      headerText="Enter your email address to get the password reset link."
      backLinkText="Back to login"
      backLinkHref="/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-6"
        >
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
                    disabled={isPending || !canResend}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={formError} />
          <FormSuccess message={formSuccess} />
          {!canResend && (
            <p className="text-primary dark:text-primary-dark">
              You can request another reset email after{" "}
              <Timer duration={30} onComplete={() => setCanResend(true)} />.
            </p>
          )}
          <Button
            disabled={isPending || !canResend}
            type="submit"
            size="lg"
            className="capitalize text-base"
          >
            reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotPassword;
