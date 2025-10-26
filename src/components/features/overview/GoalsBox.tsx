import { auth } from "@/auth";

import TargetModal from "@/components/target-modal";
import CircledProgressBar from "@/components/circled-progress-bar";

import { CheckIcon, ClockIcon } from "@/components/icons";

import { formatDateTime, formatAmount, cn } from "@/lib/utils";

import { getCachedUser } from "@/lib/cache/user";
import { getCachedAccounts } from "@/lib/cache/accounts";

const GoalsBox = async ({ className }: { className?: string }) => {
  const session = await auth();

  if (!session) return;

  const user = await getCachedUser(session.user.id);
  const accounts = await getCachedAccounts(session.user.id);

  const targetAmount = Number(user.savingsGoal);
  const achievedAmount = accounts.reduce((total, acc) => {
    return user.savingsGoalAccounts?.find((sa) => sa.id === acc.id)
      ? total + (acc.availableBalance ?? 0)
      : total;
  }, 0);

  return (
    <section className={cn("box", className)}>
      <header>
        <h2 className="card-title">Goals</h2>
      </header>
      <section className="card">
        <div className="flex items-center justify-between w-full border-b border-gray-6 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="default-black text-[22px] font-extrabold">
              {formatAmount(targetAmount, true)}
            </h3>
            <TargetModal />
          </div>
          <span className="text-sm text-secondary-color dark:text-secondary-color-dark">
            {formatDateTime(new Date()).dateOnly}
          </span>
        </div>

        <div className="flex flex-col justify-between items-center sm:items-start w-full 3xl:flex-row-reverse mt-2">
          <CircledProgressBar
            targetAmount={targetAmount}
            achievedAmount={achievedAmount}
          />
          <div className="w-full flex flex-wrap justify-center gap-4 xs:justify-evenly items-center 3xl:flex-col 3xl:space-y-8 3xl:w-fit">
            <div className="flex gap-2">
              <CheckIcon className="w-6 h-6 p-1 rounded-full dark:bg-green-100 bg-green-900" />
              <div>
                <h4 className="text-xs text-gray-2 dark:text-gray-6 mb-[6px]">
                  Target Achieved
                </h4>
                <p className="text-base font-bold text-default-black dark:text-gray-7">
                  {formatAmount(achievedAmount)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <ClockIcon className="w-6 h-6 p-1 rounded-full bg-blue-100 dark:bg-blue-900" />
              <div>
                <h4 className="text-xs text-gray-2 dark:text-gray-6 mb-[6px]">
                  This month Target
                </h4>
                <p className="text-base font-bold text-default-black dark:text-gray-7">
                  {formatAmount(targetAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default GoalsBox;
