"use client";
import useCurrentUser from "@/hooks/use-current-user";

import PageContainer from "@/components/page-container";
import GoalsBox from "@/components/features/overview/GoalsBox";
import EmptyGoalsBox from "@/components/features/EmptyGoalsBox";
import ExpensesGoals from "@/components/features/goals/ExpensesGoals";
import SelectedAccounts from "@/components/features/goals/SelectedAccounts";

import { useBanksDataContext } from "@/context/BanksDataContext";

const Goals = () => {
  const user = useCurrentUser();
  const { savingsAchievedAmount } = useBanksDataContext();

  return (
    <PageContainer>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-3">
        {user && user.savingsGoal && savingsAchievedAmount ? (
          <GoalsBox
            title="Goals"
            targetAmount={Number(user.savingsGoal)}
            achievedAmount={savingsAchievedAmount}
            thisMonthTarget={Number(user.savingsGoal)}
            date={new Date()}
            className="md:col-span-1"
          />
        ) : user && user.savingsGoal && !savingsAchievedAmount ? (
          <EmptyGoalsBox
            title="Goals"
            message="Select an account to continue setting up your goal."
            date={new Date()}
            selectedAccounts={false}
            className="md:col-span-1"
          />
        ) : (
          <EmptyGoalsBox
            title="Goals"
            date={new Date()}
            className="md:col-span-1"
          />
        )}
        <SelectedAccounts className="md:col-span-2" />
      </section>
      <ExpensesGoals />
    </PageContainer>
  );
};

export default Goals;
