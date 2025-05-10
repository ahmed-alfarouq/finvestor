"use client";
import GoalsBox from "@/components/features/overview/GoalsBox";
import LoansBox from "@/components/features/overview/LoansBox";
import EmptyGoalsBox from "@/components/features/EmptyGoalsBox";
import ExpensesBox from "@/components/features/overview/ExpensesBox";
import StatisticsBox from "@/components/features/overview/StatisticsBox";
import TotalBalanceBox from "@/components/features/overview/TotalBalanceBox";
import RecentTransactions from "@/components/features/overview/RecentTransactions";

import { useBanksDataContext } from "@/context/BanksDataContext";

import useCurrentUser from "@/hooks/use-current-user";

const OverviewPage = () => {
  const user = useCurrentUser();
  const { transactions, loans, accounts, savingsAchievedAmount } =
    useBanksDataContext();
  
  return (
    <section className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-3">
        <TotalBalanceBox
          accounts={accounts.data}
          totalAvailableBalance={accounts.totalAvailableBalance}
        />
        {user && user.savingsGoal && savingsAchievedAmount ? (
          <GoalsBox
            title="Goals"
            targetAmount={Number(user.savingsGoal)}
            achievedAmount={savingsAchievedAmount}
            thisMonthTarget={Number(user.savingsGoal)}
            date={new Date()}
          />
        ) : user && user.savingsGoal && !savingsAchievedAmount ? (
          <EmptyGoalsBox
            title="Goals"
            message="Select an account to continue setting up your goal."
            date={new Date()}
            selectedAccounts={false}
          />
        ) : (
          <EmptyGoalsBox title="Goals" date={new Date()} />
        )}
        <LoansBox loans={loans} />
      </section>
      <section className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-3">
        <RecentTransactions transactions={transactions} />
        <div className="h-full grid grid-cols-1 grid-rows-2 gap-8 md:gap-3 lg:col-span-2">
          <StatisticsBox transactions={transactions} />
          <ExpensesBox transactions={transactions} />
        </div>
      </section>
    </section>
  );
};

export default OverviewPage;
