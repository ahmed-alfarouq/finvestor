"use client";
import { useBanksDataContext } from "@/context/BanksDataContext";

import PageContainer from "@/components/page-container";
import TransactionsTable from "@/components/features/TransactionsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TransactionsPage = () => {
  const { transactions } = useBanksDataContext();

  // Plaid returns negative values for revenue, and positive values for expenses
  const revenue = transactions.filter((t) => t.amount < 0);
  const expenses = transactions.filter((t) => t.amount > 0);

  return (
    <PageContainer>
      <h2 className="card-title">Recent Transactions</h2>
      {!!transactions.length ? (
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
            <TransactionsTable transactions={transactions} />
          </TabsContent>
          <TabsContent value="revenue">
            <TransactionsTable transactions={revenue} />
          </TabsContent>
          <TabsContent value="expenses">
            <TransactionsTable transactions={expenses} />
          </TabsContent>
        </Tabs>
      ) : (
        <section className="w-full h-full flex items-center justify-center bg-default dark:bg-default-dark rounded-lg py-4 px-6 card-shadow">
          <p className="text-center sm:text-xl text-gray-1 dark:text-gray-7">
            No transactions found, please connect your checking/savings accounts
            to see your transactions
          </p>
        </section>
      )}
    </PageContainer>
  );
};

export default TransactionsPage;
