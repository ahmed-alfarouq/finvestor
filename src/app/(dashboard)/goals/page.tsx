"use client";
import useCurrentUser from "@/hooks/use-current-user";

import GoalsBox from "@/components/features/overview/GoalsBox";
import EmptyGoalsBox from "@/components/features/EmptyGoalsBox";

import { useBanksDataContext } from "@/context/BanksDataContext";

const Goals = () => {
  const user = useCurrentUser();
  const { savingsAchievedAmount } = useBanksDataContext();

  return (
    <section className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-3">
        {user?.savingsGoal ? (
          <GoalsBox
            title="Savings Goals"
            targetAmount={Number(user.savingsGoal)}
            achievedAmount={savingsAchievedAmount}
            thisMonthTarget={Number(user.savingsGoal)}
            date={new Date()}
            className="col-span-1"
          />
        ) : (
          <EmptyGoalsBox
            title="Savings Goals"
            date={new Date()}
            className="col-span-1"
          />
        )}
      </section>
    </section>
  );
};

export default Goals;
