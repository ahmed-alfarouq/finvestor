import PageContainer from "@/components/page-container";
import StatisticsBox from "@/components/features/overview/statistics-box";
import ExpensesBreakdown from "@/components/features/expenses/expenses-breakdown";

import {
  dummyTransactions,
  lastYearTransactions,
} from "@/constants/transactions";
import { auth } from "@/auth";

import { getCachedUser } from "@/lib/cache/user";

import { getCachedTransactions } from "@/lib/cache/transactions";

const ExpensesPage = async () => {
  const session = await auth();

  if (!session) return;

  const user = await getCachedUser(session.user.id);
  const { transactions } = await getCachedTransactions(
    session.user.id,
    user.banks[0].accessToken
  );

  const allTransactions = [
    ...transactions,
    ...dummyTransactions,
    ...lastYearTransactions,
  ];

  return (
    <PageContainer>
      <StatisticsBox transactions={allTransactions} className="!h-[350px]" />
      <ExpensesBreakdown transactions={allTransactions} />
    </PageContainer>
  );
};

export default ExpensesPage;
