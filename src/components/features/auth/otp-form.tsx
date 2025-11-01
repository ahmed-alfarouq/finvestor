"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/auth/form-input";

import { otpSchema, OTPSchema } from "@/schemas/auth";
import { loginWith2FA } from "@/actions/auth/login";

const OTPForm = ({ token }: { token: string }) => {
  const [formError, setFormError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<OTPSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = ({ code }: OTPSchema) => {
    setFormError("");

    startTransition(async () => {
      try {
        const res = await loginWith2FA({ code, token });

        if (res?.error) {
          setFormError(res.error);
        }
      } catch (error) {
        setFormError((error as Error).message);
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
          type="text"
          name="code"
          label="Code"
          placeholder="132456"
          disabled={isPending}
        />

        <FormError message={formError} />
        <Button
          disabled={isPending}
          type="submit"
          size="lg"
          className="text-base"
        >
          Confirm
        </Button>
      </form>
    </Form>
  );
};

export default OTPForm;
