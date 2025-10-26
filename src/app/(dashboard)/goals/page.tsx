import { auth } from "@/auth";

import PageContainer from "@/components/page-container";
import GoalsBox from "@/components/features/overview/goals-box";
import EmptyGoalsBox from "@/components/features/empty-goals-box";
import ExpensesGoals from "@/components/features/goals/expenses-goals";
import SelectedAccounts from "@/components/features/goals/selected-accounts";

import { getCachedUser } from "@/lib/cache/user";
import { getCachedAccounts } from "@/lib/cache/accounts";

const Goals = async () => {
  const session = await auth();

  if (!session) return;
  const { id, savingsGoalAccounts, savingsGoal, expensesGoals } =
    await getCachedUser(session.user.id);

  const hasGoalAccounts = savingsGoalAccounts.length;

  const accounts = await getCachedAccounts(id);

  const expensesAccounts = accounts.filter((a) =>
    savingsGoalAccounts.includes(a.id)
  );

  return (
    <PageContainer>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-3">
        {hasGoalAccounts && savingsGoal ? (
          <GoalsBox className="md:col-span-2 lg:col-span-1" />
        ) : !hasGoalAccounts && savingsGoal ? (
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
      <ExpensesGoals
        expensesAccounts={expensesAccounts}
        expensesGoals={expensesGoals}
      />
    </PageContainer>
  );
};

export default Goals;
