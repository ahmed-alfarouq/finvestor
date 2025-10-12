"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import Timer from "@/components/timer";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormInput from "@/components/auth/FormInput";
import FormSuccess from "@/components/form-success";

import { updatePassword } from "@/actions/user/updateUser";
import { getUserByEmail } from "@/actions/user/getUserFromDb";
import { getResetTokenByToken, removeResetToken } from "@/actions/auth/tokens";

import { NewPasswordSchema } from "@/schemas/auth";

type NewPasswordFields = z.infer<typeof NewPasswordSchema>;

const UpdatePasswordForm = () => {
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-6"
      >
        <FormInput
          name="password"
          type="password"
          label="Password"
          control={form.control}
          placeholder="********"
          disabled={isPending || passwordUpdated}
        />
        <FormInput
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          control={form.control}
          placeholder="********"
          disabled={isPending || passwordUpdated}
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
        <Button disabled={isPending || passwordUpdated} type="submit" size="lg">
          Create new password
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
