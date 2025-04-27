import { auth } from "@/auth";
import {
  getAccounts,
  getAccountWithTransactions,
  getBankLoans,
} from "@/actions/bank";

import GoalsBox from "@/components/features/overview/GoalsBox";
import RefreshSession from "@/components/features/RefreshSession";
import TotalBalanceBox from "@/components/features/overview/TotalBalanceBox";
import RecentTransactions from "@/components/features/overview/RecentTransactions";
import LoansBox from "@/components/features/overview/LoansBox";

import { BankAccount, Transaction } from "@/types";

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

  for (const account of accountsData) {
    const accountDetails = await getAccountWithTransactions(account);
    if (accountDetails?.transactions) {
      transactions.push(...accountDetails.transactions);
    }
  }

  return (
    <section className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <TotalBalanceBox
          accounts={accountsData}
          totalAvailableBalance={accounts.totalAvailableBalance}
        />
        <GoalsBox
          targetAmount={5000}
          achievedAmount={2500}
          thisMonthTarget={1000}
          date={new Date()}
        />
        <LoansBox loans={loans || []} />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <RecentTransactions transactions={transactions} />
        <div className="lg:col-span-2"></div>
      </section>
    </section>
  );
};

export default OverviewPage;
