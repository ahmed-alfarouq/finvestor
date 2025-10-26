import { auth } from "@/auth";
import { getCachedUser } from "@/lib/cache/user";
import { getCachedTransactions } from "@/lib/cache/transactions";

import PageContainer from "@/components/page-container";
import GoalsBox from "@/components/features/overview/goals-box";
import LoansBox from "@/components/features/overview/loans-box";
import ExpensesBox from "@/components/features/overview/expenses-box";
import StatisticsBox from "@/components/features/overview/statistics-box";
import TotalBalanceBox from "@/components/features/overview/total-balance-box";
import RecentTransactions from "@/components/features/overview/recent-transactions";
import {
  dummyTransactions,
  lastYearTransactions,
} from "@/constants/transactions";

const OverviewPage = async () => {
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
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-3">
        <TotalBalanceBox />
        <GoalsBox />
        <LoansBox />
      </section>
      <section className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-3">
        <RecentTransactions />
        {transactions && (
          <div className="h-full grid grid-cols-1 grid-rows-2 gap-8 md:gap-3 lg:col-span-2">
            <StatisticsBox transactions={allTransactions} />
            <ExpensesBox transactions={transactions} />
          </div>
        )}
      </section>
    </PageContainer>
  );
};

export default OverviewPage;
