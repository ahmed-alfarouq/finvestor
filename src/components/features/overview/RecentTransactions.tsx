import React from "react";
import Link from "next/link";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArrowRight } from "lucide-react";
import { Transaction } from "@/types";
import TransactionsTab from "@/components/transactions-tab";

const RecentTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  // Plaid returns negative values for revenue, and positive values for expenses
  const revenue = transactions.filter((t) => t.amount < 0).slice(0, 6);
  const expenses = transactions.filter((t) => t.amount > 0).slice(0, 6);

  return (
    <section className="flex flex-col gap-2">
      <header className="flex items-center justify-between">
        <h2 className="card-title">Recent Transactions</h2>
        <Link
          href="/transactions"
          className="flex items-center gap-2 text-xs font-medium text-gray-2 dark:text-gray-7"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </header>
      {!!transactions.length ? (
        <Tabs
          defaultValue="all"
          className="w-full h-full bg-default dark:bg-default-dark rounded-lg py-4 px-6 card-shadow"
        >
          <TabsList className="mb-4 w-full bg-default dark:bg-default-dark flex flex-nowrap gap-8 p-0 overflow-x-auto overflow-y-hidden">
            <TabsTrigger value="all" className="px-0 text-base font-bold">
              All
            </TabsTrigger>
            <TabsTrigger value="revenue" className="px-0 text-base font-bold">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="expenses" className="px-0 text-base font-bold">
              Expenses
            </TabsTrigger>
          </TabsList>

          <TransactionsTab transactions={transactions} value="all" />
          <TransactionsTab transactions={revenue} value="revenue" />
          <TransactionsTab transactions={expenses} value="expenses" />
        </Tabs>
      ) : (
        <section className="w-full h-full flex items-center justify-center bg-default dark:bg-default-dark rounded-lg py-4 px-6 card-shadow">
          <p className="text-center sm:text-xl text-gray-1 dark:text-gray-7">
            No transactions found, please connect your checking/savings accounts
            to see your transactions
          </p>
        </section>
      )}
    </section>
  );
};

export default RecentTransactions;
