"use client";
import { useState } from "react";

import { formatDateTime } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import TargetForm from "@/components/target-form";
import ModalWrapper from "@/components/modal-wrapper";

import { EmptyGoalsBoxProps } from "@/types";

const EmptyGoalsBox = ({ title, date, className }: EmptyGoalsBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <section className={className}>
      <h2 className="card-title">{title}</h2>
      <div className="sm:h-72 flex flex-col items-center gap-4 sm:gap-6 rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5">
        <div className="flex items-center justify-between w-full border-b border-gray-6 pb-4">
          <div className="flex items-center gap-2">
            <Button onClick={toggleModal}>Add Goal</Button>
          </div>
          <span className="text-sm text-secondary-color dark:text-secondary-color-dark">
            {formatDateTime(date).dateOnly}
          </span>
        </div>

        <div className="flex flex-col justify-center items-center gap-3 w-full h-full">
          <p className="text-lg text-gray-2 dark:text-gray-7 font-semibold">
            You didn&lsquo;t add a goal yet.
          </p>
          <Button size="lg" onClick={toggleModal}>
            Add Goal
          </Button>
        </div>
      </div>
      <ModalWrapper isOpen={isOpen} close={toggleModal}>
        <TargetForm />
      </ModalWrapper>
    </section>
  );
};

export default EmptyGoalsBox;
