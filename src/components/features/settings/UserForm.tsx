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

import userFormSchema, { UserFormSchema } from "@/schemas/user-form";

import { updateUserInfo } from "@/actions/user/updateUser";
import { useSession } from "next-auth/react";

const UserForm = () => {
  const user = useCurrentUser();
  const { update } = useSession();

  const [errorMessage, setErrorMeesage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      address1: user?.address1,
      city: user?.city,
      state: user?.state,
      postalCode: user?.postalCode,
      email: user?.email,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = form;
  if (!user) return <RefreshSession />;

  const onSubmit = (data: UserFormSchema) => {
    setErrorMeesage("");
    setSuccessMessage("");
    startTransition(async () => {
      const res = await updateUserInfo({
        userId: user.id,
        dwollaCustomerId: user.dwollaCustomerId,
        updateFields: data,
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 sm:grid grid-cols-2 sm:gap-4">
          <FormInput
            name="address1"
            label="Address"
            placeholder={user.address1}
            control={form.control}
            disabled={isPending}
          />
          <FormInput
            name="city"
            label="City"
            placeholder={user.city}
            control={form.control}
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col gap-6 sm:grid grid-cols-2 sm:gap-4">
          <FormInput
            name="state"
            label="State"
            placeholder={user.state}
            control={form.control}
            disabled={isPending}
          />
          <FormInput
            name="postalCode"
            label="Postal Code"
            placeholder={user.postalCode}
            control={form.control}
            disabled={isPending}
          />
        </div>

        <FormInput
          type="email"
          name="email"
          label="Email Address"
          placeholder={user.email}
          control={form.control}
          disabled={isPending}
        />
        <FormError message={errorMessage} />
        <FormSuccess message={successMessage} />
        <Button
          size="lg"
          type="submit"
          disabled={isPending || !isDirty}
          className="mt-4 w-48"
        >
          Update Profile
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
