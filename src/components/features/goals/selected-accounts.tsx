import { auth } from "@/auth";

import SelectedAccountsForm from "@/components/features/goals/selected-accounts/selected-accounts-form";

import { cn } from "@/lib/utils";
import { getCachedUser } from "@/lib/cache/user";
import { getCachedAccounts } from "@/lib/cache/accounts";

const SelectedAccounts = async ({ className }: { className?: string }) => {
  const session = await auth();

  if (!session) return;

  const user = await getCachedUser(session.user.id);
  const accounts = await getCachedAccounts(session.user.id);

  console.log(user.banks);
  const validAccounts = accounts.filter(
    (account) => account.subtype === "savings" || account.subtype === "checking"
  );

  return (
    <section className={cn("flex flex-col", className)}>
      <h2 className="card-title">Savings Accounts</h2>

      <div className="flex-1 flex flex-col gap-2 rounded-xl bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5 overflow-hidden">
        {validAccounts.length ? (
          <>
            <h3 className="default-black text-base font-bold mb-1">
              Your Linked Savings Accounts
            </h3>
            <p className="text-sm text-gray-2 dark:text-gray-7">
              Select the accounts you want to include in your Target Achieved
              total and Savings Goals.
            </p>
            <SelectedAccountsForm
              userId={user.id}
              accounts={validAccounts}
              checkedAccounts={user.savingsGoalAccounts}
            />
          </>
        ) : (
          <div className="text-xl text-center text-muted-foreground italic">
            No savings/Checking accounts linked yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectedAccounts;
