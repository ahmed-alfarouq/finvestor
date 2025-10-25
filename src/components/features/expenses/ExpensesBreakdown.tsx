import ExpenseItem from "@/components/expenses-item/expenses-item";
import { splitTransactionsByCategory } from "@/lib/transactions";

import { cn } from "@/lib/utils";

import { Transaction } from "plaid";

const ExpensesBreakdown = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const lastMonth = new Date(new Date().setMonth(currentMonth - 1)).getMonth();

  const currentMonthTransactions: Transaction[] = transactions.filter(
    (transaction) => {
      const transactionYear = new Date(transaction.date).getFullYear();
      const transactionMonth = new Date(transaction.date).getMonth();

      return (
        currentMonth === transactionMonth && currentYear === transactionYear
      );
    }
  );

  const lastMonthTransactions: Transaction[] = transactions.filter(
    (transaction) => {
      const transactionYear = new Date(transaction.date).getFullYear();
      const transactionMonth = new Date(transaction.date).getMonth();
      return lastMonth === transactionMonth && currentYear === transactionYear;
    }
  );

  const currentMonthCategorised = splitTransactionsByCategory(
    currentMonthTransactions
  );

  const lastMonthCategorised = splitTransactionsByCategory(
    lastMonthTransactions
  );

  const categories: string[] = Object.keys(currentMonthCategorised);
  return (
    <section className="my-6">
      <div className="flex justify-between items-center">
        <h2 className="card-title">Expenses Breakdown</h2>
        <span className="text-sm text-gray-3 dark:text-gray-5 font-medium">
          *Compare to last month
        </span>
      </div>

      <div
        className={cn(
          categories.length > 0
            ? "grid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] gap-5"
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
                  expanded={true}
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

export default ExpensesBreakdown;
