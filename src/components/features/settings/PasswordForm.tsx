"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import useCurrentUser from "@/hooks/use-current-user";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormInput from "@/components/auth/FormInput";
import FormSuccess from "@/components/form-success";
import RefreshSession from "@/components/features/RefreshSession";

import passwordFormSchema, {
  PasswordFormSchema,
} from "@/schemas/password-form";

import { updateUserPassword } from "@/actions/user/updateUser";
import { useSession } from "next-auth/react";

const PasswordForm = () => {
  const {user} = useCurrentUser();
  const { update } = useSession();

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

  if (!user) return <RefreshSession />;

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
      await update();
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
