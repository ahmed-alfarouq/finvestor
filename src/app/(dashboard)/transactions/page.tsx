"use client";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import PageLoader from "@/components/page-loader";
import SelectBank from "@/components/select-bank";
import PageContainer from "@/components/page-container";
import TransactionsTable from "@/components/features/TransactionsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getTransactions } from "@/actions/transactions";
import NotAvailable from "@/components/not-available";

const TransactionsPage = () => {
  const [accessToken, setAccessToken] = useState("");

  const { data, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [`transactions-${accessToken}`],
      queryFn: async ({ pageParam }: { pageParam?: string }) =>
        await getTransactions(accessToken, pageParam),
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      initialPageParam: undefined,
    });

  const transactions = data?.pages.flatMap((p) => p?.transactions ?? []);

  const revenue = transactions?.filter((t) => t && t.amount < 0) ?? [];

  const expenses = transactions?.filter((t) => t && t.amount > 0) ?? [];

  const handleAccountChange = (accessToken: string) =>
    setAccessToken(accessToken);

  const hasMore = data?.pages[data.pages.length - 1]?.hasMore ?? false;

  if (isLoading) return <PageLoader />;

  return (
    <PageContainer>
      <h2 className="card-title">All Transactions</h2>
      <SelectBank value={accessToken} onChange={handleAccountChange} />
      {transactions?.length ? (
        <Tabs defaultValue="all">
          <TabsList className="mb-4 w-full flex flex-nowrap gap-8 p-0 overflow-x-auto overflow-y-hidden">
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
          <TabsContent value="all">
            <TransactionsTable
              hasMore={hasMore}
              loadMore={fetchNextPage}
              transactions={transactions}
              isLoadingMore={isFetchingNextPage}
            />
          </TabsContent>
          <TabsContent value="revenue">
            {revenue.length ? (
              <TransactionsTable
                hasMore={hasMore}
                transactions={revenue}
                loadMore={fetchNextPage}
                isLoadingMore={isFetchingNextPage}
              />
            ) : (
              <NotAvailable message="No transactions found." />
            )}
          </TabsContent>
          <TabsContent value="expenses">
            {expenses.length ? (
              <TransactionsTable
                hasMore={hasMore}
                transactions={expenses}
                loadMore={fetchNextPage}
                isLoadingMore={isFetchingNextPage}
              />
            ) : (
              <NotAvailable message="No transactions found." />
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <section className="w-full h-full flex flex-col items-center justify-center bg-default dark:bg-default-dark rounded-lg py-4 px-6 card-shadow">
          <p className="text-center sm:text-xl text-gray-1 dark:text-gray-7 mb-2">
            No transactions found. Please do one of the options bellow:
          </p>
          <ul className="space-y-1">
            <ol>
              1. Connect your checking/savings accounts to see your
              transactions.
            </ol>
            <ol>2. Choose one of the banks to display its transactions.</ol>
          </ul>
        </section>
      )}
    </PageContainer>
  );
};

export default TransactionsPage;
