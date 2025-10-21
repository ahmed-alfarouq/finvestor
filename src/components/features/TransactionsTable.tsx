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

import { TransactionTableProps } from "@/types";

const TransactionsTable = ({
  hasMore,
  loadMore,
  transactions,
  isLoadingMore,
}: TransactionTableProps) => {
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
          {transactions.map((t) => {
            const date = formatDateTime(new Date(t.date)).dateOnly;
            const amount = formatAmount(t.amount);

            return (
              <TableRow
                key={t.transaction_id}
                className="bg-default dark:bg-default-dark hover:bg-none !border-b-DEFAULT"
              >
                <TableCell className="min-w-32 text-center">{date}</TableCell>
                <TableCell className="max-w-[250px] text-center">
                  <h3 className="text-14 truncate font-semibold text-default-black dark:text-gray-6">
                    {t.merchant_name
                      ? removeSpecialCharacters(t.merchant_name)
                      : t.name
                      ? t.name
                      : "Unavialable Name"}
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
                  {t.payment_channel}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {hasMore && (
        <Button
          size="lg"
          onClick={loadMore}
          className="mx-auto my-3 transition-all duration-200"
        >
          {isLoadingMore ? "Loading" : "Load"} More
          {isLoadingMore && <div className="loading-spinner !size-5"></div>}
        </Button>
      )}
    </div>
  );
};

export default TransactionsTable;
