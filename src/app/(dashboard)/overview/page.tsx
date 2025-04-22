import { auth } from "@/auth";
import { getAccounts, getAccount } from "@/actions/bank";

import GoalsBox from "@/components/features/overview/GoalsBox";
import TotalBalanceBox from "@/components/features/overview/TotalBalanceBox";
import RecentTransactions from "@/components/features/overview/RecentTransactions";

import { Transaction } from "@/types";

const OverviewPage = async () => {
  const session = await auth();

  if (!session || !session.user.id) return;
  const accounts = await getAccounts(session.user.id);

  if (!accounts || !accounts.data) return;
  const accountsData = accounts.data;
  const transactions: Transaction[] = [];

  for (const account of accountsData) {
    const accountDetails = await getAccount(account.bankId);
    if (accountDetails?.transactions) {
      transactions.push(...accountDetails.transactions);
    }
  }

  return (
    <section className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <TotalBalanceBox
          accounts={accountsData}
          totalCurrentBalance={accounts.totalCurrentBalance}
        />
        <GoalsBox
          targetAmount={5000}
          achievedAmount={2500}
          thisMonthTarget={1000}
          date={new Date()}
        />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <RecentTransactions transactions={transactions} />
        <div className="lg:col-span-2"></div>
      </section>
    </section>
  );
};

export default OverviewPage;
