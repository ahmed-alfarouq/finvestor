"use client";
import { useState } from "react";

import { formatDateTime, formatAmount } from "@/lib/utils";

import TargetForm from "@/components/target-form";
import ModalWrapper from "@/components/modal-wrapper";
import CircledProgressBar from "@/components/circled-progress-bar";

import { EditIcon, CheckIcon, ClockIcon } from "@/components/icons";

import { GoalsBoxProps } from "@/types";

const GoalsBox = ({
  title,
  targetAmount,
  achievedAmount,
  thisMonthTarget,
  date,
}: GoalsBoxProps) => {
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
            <h3 className="default-black text-[22px] font-extrabold">
              {formatAmount(targetAmount)}
            </h3>
            <button
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
              onClick={toggleModal}
            >
              <EditIcon />
            </button>
          </div>
          <span className="text-sm text-secondary-color dark:text-secondary-color-dark">
            {formatDateTime(date).dateOnly}
          </span>
        </div>

        <div className="flex flex-col justify-between items-center sm:items-start w-full 3xl:flex-row-reverse mt-2">
          <CircledProgressBar
            targetAmount={targetAmount}
            achievedAmount={achievedAmount}
          />
          <div className="w-full flex flex-wrap justify-center gap-4 xs:justify-evenly items-center 3xl:flex-col 3xl:space-y-8 3xl:w-fit">
            <div className="flex gap-2">
              <CheckIcon className="w-6 h-6 p-1 rounded-full dark:bg-green-100 bg-green-900" />
              <div>
                <h4 className="text-xs text-gray-2 dark:text-gray-6 mb-[6px]">
                  Target Achieved
                </h4>
                <p className="text-base font-bold text-default-black dark:text-gray-7">
                  {formatAmount(achievedAmount)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <ClockIcon className="w-6 h-6 p-1 rounded-full bg-blue-100 dark:bg-blue-900" />
              <div>
                <h4 className="text-xs text-gray-2 dark:text-gray-6 mb-[6px]">
                  This month Target
                </h4>
                <p className="text-base font-bold text-default-black dark:text-gray-7">
                  {formatAmount(thisMonthTarget)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalWrapper isOpen={isOpen} close={toggleModal}>
        <TargetForm />
      </ModalWrapper>
    </section>
  );
};

export default GoalsBox;
