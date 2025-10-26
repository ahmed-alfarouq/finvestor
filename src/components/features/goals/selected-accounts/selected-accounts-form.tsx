"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Checkbox from "@/components/check-box";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";

import selectAccountsSchema, {
  SelectAccountsSchema,
} from "@/schemas/selected-accounts";
import { Form } from "@/components/ui/form";

import FormSuccess from "@/components/form-success";

import { updateSavingsGoalAccounts } from "@/actions/user/updateUser";

import { arraysEqual } from "@/lib/utils";

import { SelectAccountFormProps } from "@/types";

const SelectedAccountsForm = ({
  userId,
  checkedAccounts,
  accounts,
}: SelectAccountFormProps) => {
  const [pending, startTransation] = useTransition();
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");

  const form = useForm<SelectAccountsSchema>({
    resolver: zodResolver(selectAccountsSchema),
    defaultValues: {
      selectedAccountsIds: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: SelectAccountsSchema) => {
    setFormError("");
    setFormSuccess("");

    // Check if user didn't make any changes
    const changesMade = arraysEqual(checkedAccounts, data.selectedAccountsIds);
    if (changesMade && !!checkedAccounts.length) {
      setFormError(
        "Please select at least one different savings goal account."
      );
      return;
    }
    startTransation(async () => {
      const res = await updateSavingsGoalAccounts(
        userId,
        data.selectedAccountsIds
      );
      if (res.error) {
        setFormError(res.error);
        return;
      }

      setFormSuccess(res.success);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-96 h-[inherit] flex flex-col items-start"
      >
        <div className="grid gap-4 xl:grid-cols-2 w-full items-center my-3 max-h-[55%] sm:max-h-[8rem] overflow-y-auto">
          {accounts.map((account) => (
            <Checkbox
              key={account.id}
              register={register}
              registerName="selectedAccountsIds"
              label={`${account.name} (${account.institutionName})`}
              value={account.id}
              checked={checkedAccounts.includes(account.id)}
            />
          ))}
        </div>
        <FormError message={errors.selectedAccountsIds?.message || formError} />
        <FormSuccess message={formSuccess} />

        <Button
          type="submit"
          size="lg"
          className="mt-3 sm:mt-5"
          disabled={pending}
        >
          Save Selection
        </Button>
      </form>
    </Form>
  );
};

export default SelectedAccountsForm;
