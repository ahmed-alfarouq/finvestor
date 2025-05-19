"use client";
import Link from "next/link";
import { useState, useTransition } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button";
import FormSuccess from "@/components/form-success";
import DateInput from "@/components/auth/DateInput";
import FormInput from "@/components/auth/FormInput";
import CardWrapper from "@/components/auth/CardWrapper";

import { register } from "@/actions/auth/register";

type RegisterFields = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFields>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: undefined,
      ssn: "",
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
    <CardWrapper
      logo="/img/logo.webp"
      headerLabel="Create an account"
      backLinkText="Already have an account?"
      backLinkHref="/login"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-6"
        >
          <div className="flex flex-col gap-6 sm:grid grid-cols-2 sm:gap-4">
            <FormInput
              name="firstName"
              label="First Name"
              placeholder="Ahmed"
              control={form.control}
              disabled={isPending}
            />
            <FormInput
              name="lastName"
              label="Last Name"
              placeholder="Omar"
              control={form.control}
              disabled={isPending}
            />
          </div>
          <FormInput
            name="address"
            label="Address"
            placeholder="Enter your specific address"
            control={form.control}
            disabled={isPending}
          />
          <FormInput
            name="city"
            label="City"
            placeholder="New York"
            control={form.control}
            disabled={isPending}
          />
          <div className="flex flex-col gap-6 sm:grid grid-cols-2 sm:gap-4">
            <FormInput
              name="state"
              label="State"
              placeholder="Example: NY"
              control={form.control}
              disabled={isPending}
            />
            <FormInput
              name="postalCode"
              label="Postal Code"
              placeholder="Example: 11101"
              control={form.control}
              disabled={isPending}
            />
          </div>
          <div className="flex flex-col gap-6 sm:grid grid-cols-2 sm:gap-4">
            <DateInput
              name="dateOfBirth"
              label="Date of birth"
              error={form.formState.errors.dateOfBirth}
              control={form.control}
              endMonth={new Date(new Date().getFullYear() - 21, 11)}
              disabled={isPending}
              dateFormat="yyyy-MM-dd"
            />
            <FormInput
              name="ssn"
              label="SSN"
              placeholder="Example: 123456789"
              control={form.control}
              disabled={isPending}
            />
          </div>
          <FormInput
            type="email"
            name="email"
            label="Email Address"
            placeholder="ahmed.omar.alfarouq@gmail.com"
            control={form.control}
            disabled={isPending}
          />
          <FormInput
            type="password"
            name="password"
            label="Password"
            placeholder="********"
            control={form.control}
            disabled={isPending}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="********"
            control={form.control}
            disabled={isPending}
          />

          <FormError message={formError} />
          <FormSuccess message={formSuccess} />
          <p className="text-third-color dark:text-primary-color-dark text-sm font-light">
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
            className="text-base"
          >
            Sign up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterPage;
