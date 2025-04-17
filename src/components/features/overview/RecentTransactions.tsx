import React from "react";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "../BankTabItem";
import TransactionsTable from "../TransactionsTable";

import { RecentTransactionsProps } from "@/types";

const RecentTransactions = ({
  accounts,
  transactions,
  id,
}: RecentTransactionsProps) => {
  const currentTransactions = transactions.slice(0, 4);
  
  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-20 md:text-24 font-semibold text-default-black dark:text-white">
          Recent Transactions
        </h2>
        <Link
          href="transactions"
          className="text-sm font-semibold text-default-black dark:text-gray-7 hover:text-white transition"
        >
          View All
        </Link>
      </header>
      <Tabs defaultValue={id} className="w-full">
        <TabsList className="mb-8 flex w-full flex-nowrap">
          {accounts.map((account) => (
            <TabsTrigger key={account.bankId} value={account.bankId}>
              <BankTabItem id={id} account={account} />
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((account) => (
          <TabsContent
            key={account.bankId}
            value={account.bankId}
            className="space-y-4"
          >
            <TransactionsTable transactions={currentTransactions} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
