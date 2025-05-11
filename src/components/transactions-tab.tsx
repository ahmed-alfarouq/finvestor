"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import TransactionsList from "@/components/features/TransactionsList";

import { cn } from "@/lib/utils";

import { TransactionsTabProps } from "@/types";
import DetailedTransactionsList from "./features/DetailedTransactionsList";

const TransactionsTab = ({
  transactions,
  value,
  detailed = false,
  itemsToLoad = 6,
  loadMore = false,
  className,
}: TransactionsTabProps) => {
  const [hasMore, setHasMore] = useState(false);
  const [visibleTransactions, setVisibleTransactions] = useState(
    transactions.slice(0, itemsToLoad)
  );

  const handleLoadMore = () => {
    const newTransactions = transactions.slice(
      0,
      visibleTransactions.length + itemsToLoad
    );
    setVisibleTransactions(newTransactions);
    console.log(newTransactions.length, transactions.length);
    if (newTransactions.length >= transactions.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (visibleTransactions.length < transactions.length) {
      setHasMore(true);
    }
  }, []);

  return (
    <TabsContent
      value={value}
      className={cn("flex flex-col gap-4 items-center", className)}
    >
      {detailed ? (
        <DetailedTransactionsList transactions={transactions} />
      ) : (
        <TransactionsList transactions={visibleTransactions} />
      )}
      {loadMore && hasMore && (
        <Button size="lg" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </TabsContent>
  );
};

export default TransactionsTab;
