"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import FormError from "@/components/form-error";
import PlaidLink from "@/components/ui/plaid-link";

import { PlaidError } from "plaid";
import { ConnectBankCardProps } from "@/types";

import { cn } from "@/lib/utils";

const ConnectBankCard = ({
  user,
  redirectTo,
  className,
}: ConnectBankCardProps) => {
  const [linksDisabled, setLinksDisabled] = useState(false);
  const [collectingData, setCollectingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const router = useRouter();

  const onClick = () => {
    setErrorMessage("");
    setLinksDisabled(true);
  };

  const onSuccess = () => {
    setCollectingData(false);
    setLinksDisabled(false);

    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  const onExit = (error: null | PlaidError) => {
    if (error) {
      setErrorMessage(error.error_message);
    }
    setCollectingData(false);
    setLinksDisabled(false);
  };

  const onError = (error: string) => {
    setErrorMessage(error);
    setLinksDisabled(false);
    setCollectingData(false);
  };

  return (
    <section
      className={cn(
        "min-h-72 flex flex-col items-center justify-center gap-3 rounded-xl bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5",
        className
      )}
    >
      <PlaidLink
        user={user}
        onClick={onClick}
        handleExit={onExit}
        handleSuccess={onSuccess}
        disabled={linksDisabled}
        onError={onError}
      />
      <p
        className="flex justify-center items-center gap-2
          before:block before:border before:border-primary before:after:border-primary-dark before:w-32 before:max-w-[30%]
          after:block after:border after:border-primary dark:after:border-primary-dark after:w-32 after:max-w-[30%]"
      >
        Or
      </p>
      <PlaidLink
        user={user}
        accountType="liability"
        title="Connect Liability Accounts"
        onClick={onClick}
        handleExit={onExit}
        handleSuccess={onSuccess}
        disabled={linksDisabled}
        onError={onError}
      />
      <p className="font-medium text-default-black dark:text-gray-7">
        {collectingData && (
          <span className="flex items-center gap-2">
            Collecting data
            <span className="bg-transparent animate-spin border border-gray-2 dark:border-gray-7 !border-b-transparent rounded-full h-5 w-5"></span>
          </span>
        )}
      </p>
      <FormError message={errorMessage} />
      {errorMessage && (
        <FormError message="Heads up: In Sandbox Mode, all test banks share the same account data. For example, 'Plaid Checking' is the same account everywhere — so you'll see 'Bank account is already linked' if you've added it before." />
      )}
    </section>
  );
};

export default ConnectBankCard;
