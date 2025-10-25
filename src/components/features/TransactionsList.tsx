import Image from "next/image";

import { BiQuestionMark } from "react-icons/bi";

import { formatCategory, formatAmount, formatDateTime } from "@/lib/utils";

import { Transaction } from "plaid";

const TransactionsList = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <ul className="w-full flex flex-col gap-4">
      {transactions.map((t) => (
        <li
          key={t.transaction_id}
          className="flex items-center justify-between py-4 border-b border-gray-7 last:border-b-0"
        >
          <div className="flex items-center gap-4">
            {t.logo_url ? (
              <Image
                src={t.logo_url}
                alt={t.merchant_name || ""}
                width={40}
                height={40}
              />
            ) : t.personal_finance_category_icon_url ? (
              <Image
                src={t.personal_finance_category_icon_url}
                alt={t.merchant_name || ""}
                width={40}
                height={40}
              />
            ) : (
              <div className="w-10 h-10 bg-gray-7 rounded-md shrink-0 flex items-center justify-center text-gray-1">
                <BiQuestionMark className="w-4 h-4" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <h3 className="text-sm xs:text-base default-black capitalize truncate max-w-32 xs:max-w-full xs:w-fit">
                {t.merchant_name?.toLowerCase()}
              </h3>
              <p className="text-[10px] xs:text-xs text-gray-3 dark:text-gray-7 capitalize">
                {t.personal_finance_category &&
                  formatCategory(
                    t.personal_finance_category.primary
                  ).toLowerCase()}
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
