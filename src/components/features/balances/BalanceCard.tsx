"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import ModalWrapper from "@/components/modal-wrapper";
import AnimatedCounter from "@/components/animated-counter";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CreditCardIcon, VisaIcon } from "@/components/icons";

import { BalanceCardProps } from "@/types";
import { removeBankAccount } from "@/actions/bank";

const BalanceCard = ({
  id,
  bankId,
  subtype,
  name,
  accountNumber,
  totalAmount,
}: BalanceCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const [pending, startTransation] = useTransition();

  const { update } = useSession();
  const validTypesForDetails = ["savings", "checking"];
  const removeAccount = () => {
    startTransation(async () => {
      const res = await removeBankAccount(bankId);
      if (res?.error) {
        setErrorMessage(res.error);
        return;
      }
      await update();
      setSuccessMessage(res?.message);
    });
  };

  const toggleModal = () => setShowModal((prev) => !prev);
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
          onClick={toggleModal}
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
      <ModalWrapper isOpen={showModal} close={toggleModal}>
        <div className="space-y-4 p-4 text-center">
          <h2 className="text-xl font-semibold text-special-red">
            Are you sure?
          </h2>
          <p className="text-sm text-gray-1 dark:text-gray-6">
            Removing this will delete <strong>all associated accounts</strong>{" "}
            linked to this bank, not just this one.
          </p>
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          <div className="flex justify-center gap-4 pt-4">
            <Button variant="outline" onClick={toggleModal} disabled={pending}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={removeAccount}
              disabled={pending}
            >
              Yes, Remove All
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </section>
  );
};

export default BalanceCard;
