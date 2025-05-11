"use client";
import { useBanksDataContext } from "@/context/BanksDataContext";

import PageContainer from "@/components/page-container";
import StatisticsBox from "@/components/features/overview/StatisticsBox";
import ExpensesBreakdown from "@/components/features/expenses/ExpensesBreakdown";

import { dummyTransactions } from "@/constants";

const ExpensesPage = () => {
  const { transactions } = useBanksDataContext();
  const allTransactions = [...transactions, ...dummyTransactions];

  return (
    <PageContainer>
      <StatisticsBox
        transactions={allTransactions}
        className="!h-[350px]"
      />
      <ExpensesBreakdown transactions={allTransactions} />
    </PageContainer>
  );
};

export default ExpensesPage;
