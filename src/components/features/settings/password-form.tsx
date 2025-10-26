"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormInput from "@/components/auth/form-input";
import FormSuccess from "@/components/form-success";

import passwordFormSchema, {
  PasswordFormSchema,
} from "@/schemas/password-form";

import { updateUserPassword } from "@/actions/user/updateUser";
import { User } from "@/types";

const PasswordForm = ({ user }: { user: User }) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMeesage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const form = useForm<PasswordFormSchema>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: PasswordFormSchema) => {
    setErrorMeesage("");
    setSuccessMessage("");
    startTransition(async () => {
      const res = await updateUserPassword({
        userId: user.id,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      if (res.error) {
        setErrorMeesage(res.error);
        return;
      }
      setSuccessMessage(res.success);
      return;
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormInput
          type="password"
          name="oldPassword"
          label="Old Password"
          placeholder="**************************"
          control={form.control}
          disabled={isPending}
        />
        <FormInput
          type="password"
          name="newPassword"
          label="New Password"
          placeholder="**************************"
          control={form.control}
          disabled={isPending}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          label="Confirm New Password"
          placeholder="**************************"
          control={form.control}
          disabled={isPending}
        />
        <FormError message={errorMessage} />
        <FormSuccess message={successMessage} />
        <Button
          size="lg"
          type="submit"
          disabled={isPending}
          className="mt-4 w-48"
        >
          Update Password
        </Button>
      </form>
    </Form>
  );
};

export default PasswordForm;
