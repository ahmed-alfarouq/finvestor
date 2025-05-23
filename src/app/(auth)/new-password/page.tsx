"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import CardWrapper from "@/components/auth/CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { updatePassword } from "@/actions/user/updateUser";
import { getUserByEmail } from "@/actions/user/getUserFromDb";
import { getResetTokenByToken, removeResetToken } from "@/actions/auth/tokens";

import { NewPasswordSchema } from "@/schemas/auth";
import Timer from "@/components/timer";

type NewPasswordFields = z.infer<typeof NewPasswordSchema>;

const NewPassword = () => {
  const router = useRouter();
  const [formError, setFormError] = useState<string | undefined>("");
  const [passwordUpdated, setPasswordUpdated] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const form = useForm<NewPasswordFields>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: NewPasswordFields) => {
    setFormError("");
    startTransition(async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setFormError("Missing token.");
          return;
        }

        const existingToken = await getResetTokenByToken(token);
        if (!existingToken) {
          setFormError("Invalid or expired token.");
          return;
        }

        if (new Date(existingToken.expires) <= new Date()) {
          setFormError("Reset password link has expired.");
          return;
        }

        const user = await getUserByEmail(existingToken.email);
        if (!user) {
          setFormError("User not found.");
          return;
        }

        await updatePassword({ id: user.id, password: data.password });
        await removeResetToken(existingToken.id);
        setPasswordUpdated(true);
      } catch {
        setFormError("Something went wrong!");
      }
    });
  };

  const redirectUser = () => router.push("/login");
  return (
    <CardWrapper
      logo="/img/logo.webp"
      headerLabel="Create New Password"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    disabled={isPending || passwordUpdated}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    disabled={isPending || passwordUpdated}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={formError} />
          <FormSuccess
            message={passwordUpdated ? "Password updated successfully" : ""}
          />

          {passwordUpdated && (
            <p>
              You will be redirected to login page in{" "}
              <Timer duration={5} onComplete={redirectUser} />
            </p>
          )}
          <Button
            disabled={isPending || passwordUpdated}
            type="submit"
            size="lg"
          >
            Create new password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPassword;
