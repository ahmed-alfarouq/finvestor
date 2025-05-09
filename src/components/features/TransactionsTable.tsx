"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TransactionStatus from "@/components/transaction-status";

import {
  formatAmount,
  formatDateTime,
  removeSpecialCharacters,
} from "@/lib/utils";

import { Transaction, TransactionTableProps } from "@/types";

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  const [shownTransactions, setShownTransactions] = useState(
    transactions.length > 7 ? 7 : transactions.length
  );
  const [canLoadMore, setCanLoadMore] = useState(false);

  const loadMore = () => {
    if (canLoadMore) {
      if (shownTransactions + 7 < transactions.length) {
        setShownTransactions((prev) => prev + 7);
        return;
      }
      setShownTransactions(transactions.length);
      setCanLoadMore(false);
    }
  };

  useEffect(() => {
    if (shownTransactions < transactions.length) {
      setCanLoadMore(true);
    }
  }, [transactions]);

  return (
    <div className="flex flex-col items-center gap-5 pb-3 bg-default dark:bg-default-dark">
      <Table className="bg-default dark:bg-default-dark">
        <TableHeader className="bg-default dark:bg-default-black">
          <TableRow>
            <TableHead className="text-default-black dark:text-white text-center">
              Date
            </TableHead>
            <TableHead className="text-default-black dark:text-white text-center">
              Transaction
            </TableHead>
            <TableHead className="text-default-black dark:text-white text-center">
              Status
            </TableHead>
            <TableHead className="text-default-black dark:text-white text-center">
              Amount
            </TableHead>
            <TableHead className="text-default-black dark:text-white text-center">
              Channel
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.slice(0, shownTransactions).map((t: Transaction) => {
            const date = formatDateTime(new Date(t.date)).dateOnly;
            const amount = formatAmount(t.amount);

            return (
              <TableRow
                key={t.id}
                className="bg-default dark:bg-default-dark hover:bg-none !border-b-DEFAULT"
              >
                <TableCell className="min-w-32 text-center">{date}</TableCell>
                <TableCell className="max-w-[250px] text-center">
                  <h3 className="text-14 truncate font-semibold text-default-black dark:text-gray-6">
                    {removeSpecialCharacters(t.name)}
                  </h3>
                </TableCell>
                <TableCell className="text-center">
                  <TransactionStatus pending={t.pending} />
                </TableCell>
                <TableCell
                  className={`text-center font-semibold ${
                    amount[0] != "-"
                      ? "text-special-red"
                      : "text-secondary-color dark:text-gray-6"
                  }`}
                >
                  {amount[0] != "-"
                    ? `-${amount}`
                    : amount.slice(1, amount.length)}
                </TableCell>
                <TableCell className="text-center capitalize">
                  {t.paymentChannel}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button
        size="lg"
        onClick={loadMore}
        className="mx-auto my-3"
        disabled={!canLoadMore}
      >
        Load More
      </Button>
    </div>
  );
};

export default TransactionsTable;
