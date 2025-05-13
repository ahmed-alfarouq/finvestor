"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TransferFormInput from "./components/TransferFormInput";
import TransferFormSelect from "./components/TransferFormSelect";

import transferFormSchema, { TransferFormSchema } from "@/schemas/transfer";

import { BankAccount, User } from "@/types";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const TransferFrom = ({
  user,
  accounts,
}: {
  user: User;
  accounts: BankAccount[];
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<TransferFormSchema>({
    resolver: zodResolver(transferFormSchema),
  });

  const handleTransfer = (data: TransferFormSchema) => {
    setErrorMessage("");
    setSuccessMessage("");
    startTransition(async () => {
      console.log(data, user);
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleTransfer)}
        className="flex flex-col mt-6 mb-3"
      >
        <header>
          <h2 className="card-title text-lg">Transfer details</h2>
          <p className="text-sm text-gray-3 dark:text-gray-7">
            Enter the details of the recipient.
          </p>
        </header>
        <TransferFormSelect
          accounts={accounts}
          name="sourceBank"
          control={form.control}
          disabled={isPending}
          title="Select Source Bank"
          description="Select the bank account you want to transfer funds from."
          placeholder="Select Account"
        />
        <div className="border-t last:border-t-0 border-gray-5 dark:border-gray-7 py-5 mt-3">
          <h2 className="card-title text-lg">Bank account details</h2>
          <p className="text-sm text-gray-3 dark:text-gray-7">
            Enter the bank account details of the recipient
          </p>
        </div>
        <TransferFormInput
          name="recipientEmail"
          control={form.control}
          disabled={isPending}
          title="Recipient's Email Address"
          placeholder="ahmed.omar.alfarouq@gmail.com"
          label=""
        />
        <TransferFormInput
          name="recipientId"
          control={form.control}
          disabled={isPending}
          title="Recipient's Plaid Sharable Id"
          placeholder="Enter the sharable id"
          label=""
        />
        <TransferFormInput
          name="amount"
          control={form.control}
          disabled={isPending}
          type="number"
          title="Amount"
          placeholder="40000"
          label=""
        />
        <FormError message={errorMessage} />
        <FormSuccess message={successMessage} />
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="mt-6 mx-auto"
        >
          Transfer Funds
        </Button>
      </form>
    </Form>
  );
};

export default TransferFrom;
