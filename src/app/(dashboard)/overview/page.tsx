import { auth } from "@/auth";
import {
  getAccounts,
  getAccountWithTransactions,
  getBankLoans,
} from "@/actions/bank";

import GoalsBox from "@/components/features/overview/GoalsBox";
import LoansBox from "@/components/features/overview/LoansBox";
import RefreshSession from "@/components/features/RefreshSession";
import ExpensesBox from "@/components/features/overview/ExpensesBox";
import StatisticsBox from "@/components/features/overview/StatisticsBox";
import TotalBalanceBox from "@/components/features/overview/TotalBalanceBox";
import RecentTransactions from "@/components/features/overview/RecentTransactions";

import { BankAccount, Transaction } from "@/types";
import EmptyGoalsBox from "@/components/features/EmptyGoalsBox";

const OverviewPage = async () => {
  const session = await auth();

  if (!session || !session.user.id) return;
  // Get all accounts
  const accounts = await getAccounts(session.user.id);

  // If no accounts, refresh session maybe something went wrong
  if (!accounts || !accounts.data?.length) return <RefreshSession />;
  const accountsData = accounts.data;

  // Get liabilities for banks, we only want one instance of each bank
  const uniqueAccounts = accountsData.reduce((acc, account) => {
    const bankExists = acc.find((a) => a.bankId === account.bankId);
    if (!bankExists) {
      acc.push(account);
    }
    return acc;
  }, [] as BankAccount[]);

  const loans = await getBankLoans(uniqueAccounts[0]);

  // Get transactions for all accounts
  const transactions: Transaction[] = [];
  let achievedAmount: number = 0;

  for (const account of accountsData) {
    const accountDetails = await getAccountWithTransactions(account);
    if (accountDetails?.transactions) {
      if (accountDetails.data.subtype === "savings") {
        achievedAmount = accountDetails.data.availableBalance;
      }
      transactions.push(...accountDetails.transactions);
    }
  }

  return (
    <section className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-3">
        <TotalBalanceBox
          accounts={accountsData}
          totalAvailableBalance={accounts.totalAvailableBalance}
        />
        {session.user.savingsGoal ? (
          <GoalsBox
            title="Goals"
            targetAmount={Number(session.user.savingsGoal)}
            achievedAmount={achievedAmount}
            thisMonthTarget={Number(session.user.savingsGoal)}
            date={new Date()}
          />
        ) : (
          <EmptyGoalsBox title="Goals" date={new Date()} />
        )}
        <LoansBox loans={loans || []} />
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
