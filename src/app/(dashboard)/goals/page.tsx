import { auth } from "@/auth";

import PageContainer from "@/components/page-container";
import GoalsBox from "@/components/features/overview/GoalsBox";
import EmptyGoalsBox from "@/components/features/EmptyGoalsBox";
import ExpensesGoals from "@/components/features/goals/ExpensesGoals";
import SelectedAccounts from "@/components/features/goals/SelectedAccounts";

import { getCachedUser } from "@/lib/cache/user";

const Goals = async () => {
  const session = await auth();

  if (!session) return;
  const user = await getCachedUser(session.user.id);

  const hasGoalAccounts = !!user.savingsGoalAccounts.length;

  return (
    <PageContainer>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-3">
        {user && user.savingsGoal && hasGoalAccounts ? (
          <GoalsBox className="md:col-span-2 lg:col-span-1" />
        ) : user && user.savingsGoal && !hasGoalAccounts ? (
          <EmptyGoalsBox
            title="Goals"
            message="Select an account to continue setting up your goal."
            date={new Date()}
            showButton={false}
            selectedAccounts={false}
            className="md:col-span-2 lg:col-span-1"
          />
        ) : (
          <EmptyGoalsBox
            title="Goals"
            date={new Date()}
            className="md:col-span-2 lg:col-span-1"
          />
        )}
        <SelectedAccounts className="lg:col-span-2" />
      </section>
      <ExpensesGoals expensesGoals={user.expensesGoals} />
    </PageContainer>
  );
};

export default Goals;
