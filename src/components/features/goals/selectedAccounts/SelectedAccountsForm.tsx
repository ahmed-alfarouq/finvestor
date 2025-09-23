import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Checkbox from "@/components/check-box";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";

import selectAccountsSchema, {
  SelectAccountsSchema,
} from "@/schemas/selected-accounts";
import { Form } from "@/components/ui/form";

import { BankAccount } from "@/types";
import { updateSavingsGoalAccounts } from "@/actions/user/updateUser";
import FormSuccess from "@/components/form-success";
import { arraysEqual } from "@/lib/utils";

const SelectedAccountsForm = ({
  userId,
  checkedAccounts,
  accounts,
}: {
  userId: string;
  checkedAccounts: string[];
  accounts: BankAccount[];
}) => {
  const { update } = useSession();

  const [pending, startTransation] = useTransition();
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");

  const validAccounts = ["savings", "checking"];

  const form = useForm<SelectAccountsSchema>({
    resolver: zodResolver(selectAccountsSchema),
    defaultValues: {
      selectedBankIds: [],
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
    const changesMade = arraysEqual(checkedAccounts, data.selectedBankIds);
    if (changesMade && !!checkedAccounts.length) {
      setFormError(
        "Please select at least one different savings goal account."
      );
      return;
    }

    startTransation(async () => {
      const res = await updateSavingsGoalAccounts(userId, data.selectedBankIds);
      if (res.error) {
        setFormError(res.error);
        return;
      }
      // Update session
      const updatedSession = await update();

      if (!updatedSession) {
        setFormError("Something went wrong, please refresh the page!");
        return;
      }

      setFormSuccess(res.success);
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-[inherit] flex flex-col items-start"
      >
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(125px,1fr))] w-full items-center my-3 max-h-[55%] sm:max-h-[8rem] overflow-y-auto">
          {accounts.map(
            (account) =>
              validAccounts.includes(account.subtype) && (
                <Checkbox
                  key={account.id}
                  register={register}
                  registerName="selectedBankIds"
                  label={account.name}
                  value={account.id}
                  checked={checkedAccounts.includes(account.id)}
                />
              )
          )}
        </div>
        <FormError message={errors.selectedBankIds?.message || formError} />
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
