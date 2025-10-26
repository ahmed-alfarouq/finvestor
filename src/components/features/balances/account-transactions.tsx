"use client";
import { useInfiniteQuery } from "@tanstack/react-query";

import PageLoader from "@/components/page-loader";
import NotAvailable from "@/components/not-available";
import TransactionsTable from "@/components/features/transactions-table";

import { getAccountTransactions } from "@/actions/transactions";

import { AccountTransactionsProps } from "@/types";

const AccountTransactions = ({
  accessToken,
  account,
}: AccountTransactionsProps) => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["account-transactions", account.id],
      queryFn: async ({ pageParam }: { pageParam?: string }) =>
        await getAccountTransactions(account.id, accessToken, pageParam),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: undefined,
    });

  const transactions = data?.pages.flatMap((p) => p?.transactions ?? []);
  const hasMore = data?.pages[data.pages.length - 1]?.hasMore ?? false;

  if (isLoading) return <PageLoader />;

  if (!transactions?.length)
    return (
      <NotAvailable title="Transactions" message="No transactions available." />
    );

  return (
    <section>
      <h2 className="card-title">Transactions</h2>
      <TransactionsTable
        hasMore={hasMore}
        loadMore={fetchNextPage}
        transactions={transactions}
        isLoadingMore={isFetchingNextPage}
      />
    </section>
  );
};

export default AccountTransactions;
