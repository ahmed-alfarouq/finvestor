"use client";

import React from "react";
import { formatDateTime, formatAmount } from "@/lib/utils";

import CircledProgressBar from "@/components/circled-progress-bar";

import { EditIcon, CheckIcon, ClockIcon } from "@/components/icons";

import { GoalsBoxProps } from "@/types";

const GoalsBox = ({
  targetAmount,
  achievedAmount,
  thisMonthTarget,
  date,
}: GoalsBoxProps) => {
  return (
    <section>
      <h2 className="card-title">Goals</h2>
      <div className="sm:h-72 flex flex-col items-center gap-4 sm:gap-6 rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5">
        <div className="flex items-center justify-between w-full border-b border-gray-6 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="default-black text-[22px] font-extrabold">
              {formatAmount(targetAmount)}
            </h3>
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
              <EditIcon />
            </button>
          </div>
          <span className="text-sm text-secondary-color dark:text-secondary-color-dark">
            {formatDateTime(date).dateOnly}
          </span>
        </div>

        <div className="flex justify-between items-center sm:items-start flex-col-reverse sm:flex-row w-full ">
          <div className="w-full flex flex-wrap sm:flex-col justify-center gap-4 sm:gap-0 xs:justify-evenly items-center sm:items-start xs:space-y-0 sm:space-y-8">
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
          <CircledProgressBar
            targetAmount={targetAmount}
            achievedAmount={achievedAmount}
          />
        </div>
      </div>
    </section>
  );
};

export default GoalsBox;
