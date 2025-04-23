"use client";
import React, { useTransition, useState } from "react";

import { removeBankAccount } from "@/actions/bank";

import BankCard from "@/components/bank-card";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import AnimatedCounter from "@/components/animated-counter";
import { NotificationAlert } from "@/components/ui/notification-alert";

import { Trash2 } from "lucide-react";

import { TotlaBalanceBoxProps } from "@/types";
import { useRouter } from "next/navigation";
const TotalBalanceBox = ({
  accounts = [],
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErorMessage] = useState("");

  const handleRemoveAccount = (bankId: string) => {
    setSuccessMessage("");
    setErorMessage("");

    startTransition(async () => {
      try {
        const res = await removeBankAccount(bankId);
        if (res && res.error) {
          setErorMessage(res.error);
          return;
        }
        setSuccessMessage("Bank account removed");
        router.refresh();
      } catch {
        setErorMessage("Failed to remove bank account");
      }
    });
  };

  return (
    <section>
      {successMessage && (
        <NotificationAlert
          title={successMessage}
          message="Your bank account has been removed successfully."
          status="success"
        />
      )}
      {errorMessage && (
        <NotificationAlert
          title={errorMessage}
          message="Please try again."
          status="error"
        />
      )}
      <h2 className="card-title">Total Balance</h2>
      <div className="h-72 flex flex-col items-center gap-4 sm:gap-6 rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5">
        <div className="flex items-center justify-between w-full border-b border-gray-6 pb-4">
          <h3 className="default-black text-[22px] font-extrabold">
            <AnimatedCounter amount={totalCurrentBalance} />
          </h3>
          <span className="text-secondary-color dark:text-secondary-color-dark text-sm font-medium">
            All Accounts
          </span>
        </div>
        <Carousel slidesPerView={1} className="w-full">
          {accounts.map((account) => (
            <>
              <Button
                variant="destructive"
                className="mb-3"
                disabled={pending}
                onClick={() => handleRemoveAccount(account.bankId)}
              >
                <Trash2 className="w-4 h-4" />
                Remove Account
              </Button>
              {pending ? (
                <div className="text-center text-sm text-gray-500">
                  Removing Bank Account...
                </div>
              ) : (
                <BankCard
                  key={account.id}
                  accountNumber={account.mask}
                  type={account.type}
                  balance={account.currentBalance}
                  bankName={account.name}
                />
              )}
            </>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
