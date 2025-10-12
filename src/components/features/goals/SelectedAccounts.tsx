"use client";
import useCurrentUser from "@/hooks/use-current-user";
import { useBanksDataContext } from "@/context/BanksDataContext";

import SelectedAccountsForm from "@/components/features/goals/selectedAccounts/SelectedAccountsForm";

import { cn } from "@/lib/utils";

const SelectedAccounts = ({ className }: { className?: string }) => {
  const { user } = useCurrentUser();
  const { accounts } = useBanksDataContext();

  const hasAccounts = accounts.find(
    (account) => account.subtype === "savings" || account.subtype === "checking"
  );

  return (
    <section className={cn("flex flex-col", className)}>
      <h2 className="card-title">Savings Accounts</h2>

      <div className="flex-1 flex flex-col gap-2 rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5 overflow-hidden">
        <h3 className="default-black text-base font-bold mb-1">
          Your Linked Savings Accounts
        </h3>
        <p className="text-sm text-gray-2 dark:text-gray-7">
          Select the accounts you want to include in your Target Achieved total.
        </p>

        {hasAccounts ? (
          <SelectedAccountsForm
            checkedAccounts={user?.savingsGoalAccounts || []}
            userId={user?.id || ""}
            accounts={accounts}
          />
        ) : (
          <div className="text-sm text-muted-foreground italic">
            No savings/Checking accounts linked yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectedAccounts;
