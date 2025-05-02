import React from "react";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionsList from "../TransactionsList";

import { ArrowRight } from "lucide-react";
import { Transaction } from "@/types";

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
      <Tabs
        defaultValue="revenue"
        className="w-full h-full bg-default dark:bg-default-dark rounded-lg py-4 px-6 card-shadow"
      >
        <TabsList className="mb-4 w-full flex flex-nowrap gap-8 p-0 overflow-x-auto overflow-y-hidden">
          <TabsTrigger value="revenue" className="px-0 text-base font-bold">
            Revenue
          </TabsTrigger>
          <TabsTrigger value="expenses" className="px-0 text-base font-bold">
            Expenses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <TransactionsList transactions={revenue} />
        </TabsContent>
        <TabsContent value="expenses" className="space-y-4">
          <TransactionsList transactions={expenses} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
