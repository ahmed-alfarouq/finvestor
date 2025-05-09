"use client";
import Link from "next/link";
import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/animated-counter";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CreditCardIcon, VisaIcon } from "@/components/icons";

import { BalanceCardProps } from "@/types";

const BalanceCard = ({
  id,
  bankId,
  subtype,
  name,
  accountNumber,
  totalAmount,
}: BalanceCardProps) => {
  const [pending, startTransation] = useTransition();

  const validTypesForDetails = ["savings", "checking"];
  const removeAccount = () => {
    startTransation(async () => {
      console.log(bankId);
    });
  };
  return (
    <section className="rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5">
      <header className="h-12 flex justify-between items-center border-b border-special pb-2">
        <h2 className="text-base text-gray-2 font-bold dark:text-gray-6">
          {name}
        </h2>
        {subtype === "credit card" ? (
          <CreditCardIcon className="w-10 h-10" />
        ) : subtype === "checking" ? (
          <VisaIcon className="w-10 h-10" />
        ) : (
          <span className="text-sm text-gray-1 font-medium dark:text-gray-7 uppercase">
            {subtype}
          </span>
        )}
      </header>
      <div className="flex flex-col gap-4 pt-6 pb-3">
        <div className="text-default-black dark:text-white text-xl font-semibold">
          <p>**** **** **** {accountNumber}</p>
          <span className="text-sm text-gray-3 dark:text-gray-7">
            Account Number
          </span>
        </div>
        <div className="text-default-black dark:text-white text-xl font-semibold">
          <AnimatedCounter amount={totalAmount} />
          <span className="text-sm text-gray-3 dark:text-gray-7">
            Total amount
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <Button
          size="lg"
          variant="ghost"
          className="text-left p-0 hover:bg-transparent hover:text-special-red"
          onClick={removeAccount}
          disabled={pending}
        >
          Remove
        </Button>
        {validTypesForDetails.includes(subtype) && (
          <Button size="lg" className="px-5 py-1" disabled={pending}>
            <Link href={`/balances/${id}`} className="flex items-center gap-3">
              Details <MdOutlineKeyboardArrowRight size={25} />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default BalanceCard;
