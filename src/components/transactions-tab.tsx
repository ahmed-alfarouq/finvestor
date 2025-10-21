import { TabsContent } from "@/components/ui/tabs";
import TransactionsList from "@/components/features/TransactionsList";

import { cn } from "@/lib/utils";

import { TransactionsTabProps } from "@/types";

const TransactionsTab = ({
  value,
  className,
  transactions,
}: TransactionsTabProps) => {
  return (
    <TabsContent
      value={value}
      className={cn("flex flex-col gap-4 items-center", className)}
    >
      <TransactionsList transactions={transactions} />
    </TabsContent>
  );
};

export default TransactionsTab;
