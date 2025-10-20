"use client";
import ExpenseItem from "@/components/expenses-item/expenses-item";

import { splitTransactionsByCategory } from "@/lib/transactions";

import { dummyTransactions } from "@/constants";

import { Transaction } from "@/types";
import { cn } from "@/lib/utils";

const ExpensesBox = ({ transactions }: { transactions: Transaction[] }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const lastMonth = new Date(new Date().setMonth(currentMonth - 1)).getMonth();

  const currentMonthTransactions: Transaction[] = [
    ...dummyTransactions,
    ...transactions,
  ].filter((transaction) => {
    const transactionYear = new Date(transaction.date).getFullYear();
    const transactionMonth = new Date(transaction.date).getMonth();

    return currentMonth === transactionMonth && currentYear === transactionYear;
  });

  const lastMonthTransactions: Transaction[] = [
    ...dummyTransactions,
    ...transactions,
  ].filter((transaction) => {
    const transactionYear = new Date(transaction.date).getFullYear();
    const transactionMonth = new Date(transaction.date).getMonth();
    return (
      lastMonth === transactionMonth && currentYear === transactionYear
    );
  });

  const currentMonthCategorised = splitTransactionsByCategory(
    currentMonthTransactions
  );

  const lastMonthCategorised = splitTransactionsByCategory(
    lastMonthTransactions
  );

  const categories: string[] = Object.keys(currentMonthCategorised);
  return (
    <section className="flex flex-col h-full">
      <header className="flex items-center justify-between gap-2">
        <h2 className="card-title">Expenses Breakdown</h2>
        <span className="text-sm text-gray-3 dark:text-gray-5 font-medium">
          *Compare to last month
        </span>
      </header>
      <div
        className={cn(
          `flex-1 items-center self-stretch rounded-xl bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-8 overflow-x-auto overflow-y-hidden`,
          categories.length > 0
            ? "grid grid-rows-2 grid-flow-col auto-cols-[170px] xs:auto-cols-[220px] gap-3"
            : "flex  justify-center h-full"
        )}
      >
        {categories.length > 0 ? (
          categories.map(
            (category) =>
              category !== "INCOME" && (
                <ExpenseItem
                  key={category}
                  currentMonthTransactions={currentMonthCategorised[category]}
                  lastMonthTransactions={lastMonthCategorised[category] || []}
                  expanded={false}
                />
              )
          )
        ) : (
          <p className="text-gray-3 dark:text-gray-5">
            There&apos;s not enough data to show for this month yet
          </p>
        )}
      </div>
    </section>
  );
};

export default ExpensesBox;
