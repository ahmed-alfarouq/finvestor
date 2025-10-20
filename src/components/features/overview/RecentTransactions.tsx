import { auth } from "@/auth";

import Link from "next/link";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TransactionsTab from "@/components/transactions-tab";

import { ArrowRight } from "lucide-react";

import { getCachedUser } from "@/lib/cache/user";
import { getCachedLatestTransactions } from "@/lib/cache/transactions";

const RecentTransactions = async () => {
  const session = await auth();
  if (!session) return;

  const user = await getCachedUser(session.user.id);

  const accessToken = user.banks.find(
    (b) => !b.areLiabilityAccounts
  )?.accessToken;

  const transactions = accessToken
    ? await getCachedLatestTransactions(user.id, accessToken, 12)
    : { all: [], revenue: [], expenses: [] };

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
      {!!transactions?.all.length ? (
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

          <TransactionsTab transactions={transactions.all} value="all" />
          <TransactionsTab
            transactions={transactions.revenue}
            value="revenue"
          />
          <TransactionsTab
            transactions={transactions.expenses}
            value="expenses"
          />
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
