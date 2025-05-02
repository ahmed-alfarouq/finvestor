import React from "react";
import Image from "next/image";

import { BiQuestionMark } from "react-icons/bi";
import { Transaction } from "@/types";

import { formatCategory, formatAmount, formatDateTime } from "@/lib/utils";

const TransactionsList = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <ul className="flex flex-col gap-4">
      {transactions.map((t) => (
        <li
          key={t.id}
          className="flex items-center justify-between py-4 border-b border-gray-7 last:border-b-0"
        >
          <div className="flex items-center gap-4">
            {t.image ? (
              <Image
                src={t.image}
                alt={t.name}
                width={36}
                height={36}
                className="rounded-md"
              />
            ) : (
              <div className="w-[36px] h-[36px] bg-gray-7 rounded-md shrink-0 flex items-center justify-center text-gray-1">
                <BiQuestionMark className="w-4 h-4" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <h3 className="text-sm xs:text-base default-black capitalize truncate max-w-32 xs:max-w-full xs:w-fit">
                {t.name.toLowerCase()}
              </h3>
              <p className="text-[10px] xs:text-xs text-gray-3 dark:text-gray-7 capitalize">
                {t.category && formatCategory(t.category.primary).toLowerCase()}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <p className="text-sm sm:text-base font-semibold text-secondary-color dark:text-secondary-color-dark">
              {formatAmount(Math.abs(t.amount))}
            </p>
            <p className="text-xs xs:text-sm text-gray-3 dark:text-gray-7">
              {formatDateTime(new Date(t.date)).dateOnly}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionsList;
