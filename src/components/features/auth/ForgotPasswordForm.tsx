"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Timer from "@/components/timer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { reset } from "@/actions/auth/reset";

import { ResetSchema } from "@/schemas/auth";

type ResetFields = z.infer<typeof ResetSchema>;

const ForgotPasswordForm = () => {
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
  );
};

export default ForgotPasswordForm;
