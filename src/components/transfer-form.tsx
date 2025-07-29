"use client";
import React, { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormItem, FormField, FormMessage } from "./ui/form";

import transferFormSchema, { TransferFormSchema } from "@/schemas/transfer";

import FormError from "./form-error";
import FormSuccess from "./form-success";
import { Button } from "./ui/button";
import SourceBankSelect from "./features/transfer/SourceBankSelect";

import FormInput from "./auth/FormInput";

const TransferForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMeesage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const form = useForm<TransferFormSchema>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      sourceBank: "",
      note: "",
      recipientEmail: "",
      recipientId: "",
      amount: "0",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: TransferFormSchema) => {
    startTransition(async () => {
      console.log("we");
      console.log(data);
      setErrorMeesage("");
      setSuccessMessage("");
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <section className="transfer-section">
          <section className="md:w-1/4">
            <h4 className="text-sm font-medium mb-2">Select Source Bank</h4>
            <p className="text-xs">
              Select the bank account you want to transfer funds from
            </p>
          </section>
          <SourceBankSelect control={control} />
        </section>
        <section className="transfer-section">
          <section className="md:w-1/4">
            <h4 className="text-sm font-medium mb-2">
              Transfer Note (Optional)
            </h4>
            <p className="text-xs">
              Please provide any additional information or instructions related
              to the transfer
            </p>
          </section>
          <FormField
            control={control}
            name="note"
            render={({ field }) => (
              <FormItem className="w-11/12 lg:w-5/12">
                <FormControl>
                  <textarea {...field} className="transfer-input h-52" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="transfer-section">
          <header>
            <h3 className="text-lg font-semibold mb-1">Bank account details</h3>
            <p className="text-sm">
              Enter the bank account details of the recipient
            </p>
          </header>
        </section>

        <section className="transfer-section">
          <section className="md:w-1/4">
            <h4 className="text-sm font-medium mb-2">
              Recipient&apos;s Email Address
            </h4>
          </section>
          <FormInput
            control={control}
            type="email"
            name="recipientEmail"
            label=""
            placeholder="ahmed.omar.alfarouq@gmail.com"
            disabled={isPending}
            className="w-11/12 lg:w-5/12"
          />
        </section>
        <section className="transfer-section">
          <section className="md:w-1/4">
            <h4 className="text-sm font-medium mb-2">
              Recipient&apos;s plaid sharable ID
            </h4>
          </section>
          <FormInput
            control={control}
            type="text"
            name="recipientId"
            label=""
            placeholder="Enter the account ID"
            disabled={isPending}
            className="w-11/12 lg:w-5/12"
          />
        </section>
        <section className="transfer-section">
          <section className="md:w-1/4">
            <h4 className="text-sm font-medium mb-2">Amount</h4>
          </section>
          <FormInput
            control={control}
            type="text"
            name="amount"
            label=""
            placeholder="4000"
            disabled={isPending}
            className="w-11/12 lg:w-5/12"
          />
        </section>
        <FormError message={errorMessage} />
        <FormSuccess message={successMessage} />
        <Button
          disabled={isPending}
          type="submit"
          size="lg"
          className="text-base my-5"
        >
          Transfer Funds
        </Button>
      </form>
    </Form>
  );
};

export default TransferForm;
