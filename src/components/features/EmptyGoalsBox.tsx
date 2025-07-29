"use client";
import Link from "next/link";
import { useState } from "react";

import { formatDateTime } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import TargetForm from "@/components/target-form";
import ModalWrapper from "@/components/modal-wrapper";

import { EmptyGoalsBoxProps } from "@/types";

const EmptyGoalsBox = ({
  title,
  message,
  date,
  selectedAccounts = true,
}: EmptyGoalsBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <section className="box">
      <header>
        <h2 className="card-title">{title}</h2>
      </header>
      <section className="card">
        <div className="flex items-center justify-between w-full border-b border-gray-6 pb-4">
          <div className="flex items-center gap-2">
            {selectedAccounts && (
              <Button onClick={toggleModal}>Add Goal</Button>
            )}
          </div>
          <span className="text-sm text-secondary-color dark:text-secondary-color-dark">
            {formatDateTime(date).dateOnly}
          </span>
        </div>

        <div className="flex flex-col justify-center items-center gap-3 w-full h-full">
          <p className="text-lg text-gray-2 dark:text-gray-7 font-semibold text-center">
            {message ? message : "You didn't add a goal yet."}
          </p>
          {selectedAccounts ? (
            <Button size="lg" onClick={toggleModal}>
              Add Goal
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link href="/goals">Select Accounts</Link>
            </Button>
          )}
        </div>
      </section>
      <ModalWrapper isOpen={isOpen} close={toggleModal}>
        <TargetForm />
      </ModalWrapper>
    </section>
  );
};

export default EmptyGoalsBox;
