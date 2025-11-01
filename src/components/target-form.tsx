"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { targetSchema, TargetSchema } from "@/schemas/target";

import Timer from "@/components/timer";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormInput from "@/components/auth/form-input";
import FormSuccess from "@/components/form-success";

import { logout } from "@/actions/auth/logout";
import {
  updateExpensesGoal,
  updateSavingsGoal,
} from "@/actions/user/updateUser";

import { useSession } from "next-auth/react";

import useCurrentUser from "@/hooks/use-current-user";

const TargetForm = ({
  category,
  onSuccess = () => {},
}: {
  category?: string;
  onSuccess?: () => void;
}) => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [pending, startTransition] = useTransition();

  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [sessionError, setSessionError] = useState<boolean>(false);

  const form = useForm<TargetSchema>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      target: "",
    },
  });

  const handleLogout = async () => await logout(user?.id || "");

  const onSubmit = (data: TargetSchema) => {
    setFormError("");
    setFormSuccess("");
    startTransition(async () => {
      if (!user) {
        setFormError("Something went wrong with your session!");
        setSessionError(true);
        return;
      }

      let res;
      if (category) {
        res = await updateExpensesGoal(user.id, category, data.target);
      } else {
        res = await updateSavingsGoal(user.id, data.target);
      }
      if (res.error) {
        setFormError(res.error);
        setSessionError(true);
        return;
      }
      // Update session
      const updatedSession = await update();

      if (!updatedSession) {
        setFormError("Something went wrong, please refresh the page!");
        return;
      }

      setFormSuccess(res.success);
      form.reset();
      onSuccess();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          control={form.control}
          type="number"
          name="target"
          label="Target Amount"
          placeholder="5000000"
          disabled={pending}
        />
        <FormError message={formError} />
        <FormSuccess message={formSuccess} />
        {sessionError && (
          <div className="bg-destructive/15 p-3 flex items-center gap-x-2 text-sm text-destructive dark:text-destructive-dark">
            <p>
              You will be loged out after{" "}
              <Timer duration={2} onComplete={handleLogout} />
            </p>
          </div>
        )}
        <Button
          type="submit"
          size="lg"
          className="w-40 h-10 sm:w-48 sm:h-12 block mx-auto"
          disabled={pending}
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default TargetForm;
