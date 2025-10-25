import Link from "next/link";

import ExpensesItemBody from "./expenses-item-body";
import CategoryIcon from "./category-icon";
import IncreaseDecreaseIndicator from "@/components/increase-decrease-indicator";

import { FiArrowRight } from "react-icons/fi";

import { cn, formatAmount, formatCategory } from "@/lib/utils";
import { getTotalExpenses, compareExpenses } from "@/lib/transactions";

import { ExpensesItemProps } from "@/types";

const ExpenseItem = ({
  currentMonthTransactions,
  lastMonthTransactions,
  expanded,
  className,
}: ExpensesItemProps) => {
  const categoryName =
    currentMonthTransactions[0].personal_finance_category?.primary;
  const categoryIcon =
    currentMonthTransactions[0].personal_finance_category_icon_url;
  const currentExpenses = getTotalExpenses(currentMonthTransactions);
  const percentage = compareExpenses(
    currentMonthTransactions,
    lastMonthTransactions
  );
  return (
    <section
      className={cn(
        expanded && "bg-default dark:bg-default-dark rounded-xl",
        className
      )}
    >
      <header
        className={cn(
          "flex gap-3 sm:pl-2 xl:pl-4 pr-5 pb-5 pt-2",
          expanded &&
            "pl-4 xl:pl-6 pt-3 bg-gray-5 dark:bg-default-black rounded-tl-lg rounded-tr-lg"
        )}
      >
        <CategoryIcon
          icon={categoryIcon}
          categoryName={categoryName || "Unknown Category Name"}
          itemExpanded={expanded}
        />
        <div className="w-full">
          <h3
            className={cn(
              "capitalize font-medium mb-1 truncate",
              expanded
                ? "text-base text-gray-1 dark:text-gray-7"
                : "text-sm text-gray-2 dark:text-gray-5"
            )}
          >
            {formatCategory(
              categoryName || "Unknown Category Name"
            ).toLowerCase()}
          </h3>
          <div className="flex items-center justify-between">
            <p
              className={cn(
                "text-sm text-default-black dark:text-white",
                expanded ? "text-lg font-extrabold" : "text-base font-bold"
              )}
            >
              {formatAmount(currentExpenses)}
            </p>
            {!expanded && (
              <Link
                href="/expenses"
                className="text-xl text-primary  dark:text-primary-dark"
              >
                <FiArrowRight />
              </Link>
            )}
            {expanded && (
              <IncreaseDecreaseIndicator
                percentage={percentage}
                textClassName="font-semibold text-gray-1"
              />
            )}
          </div>
          {!expanded && <IncreaseDecreaseIndicator percentage={percentage} />}
        </div>
      </header>
      {expanded &&
        currentMonthTransactions.map((t) => (
          <ExpensesItemBody
            key={t.transaction_id}
            name={t.name}
            amount={t.amount}
            date={t.date}
          />
        ))}
    </section>
  );
};

export default ExpenseItem;
