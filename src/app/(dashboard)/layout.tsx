import { auth } from "@/auth";

import {
  getAccounts,
  getAccountWithTransactions,
  getBankLoans,
} from "@/actions/bank";

import Loading from "./loading";
import AppSidebar from "@/components/app-sidebar";
import RefreshSession from "@/components/features/RefreshSession";
import DashboardHeader from "@/components/features/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { BankAccount, Transaction } from "@/types";
import BanksDataProviderWrapper from "@/components/wrappers/BanksDataProviderWrapper";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session || !session.user.id) return <Loading />;

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <BanksDataProviderWrapper
          data={{
            transactions,
            loans: loans ? loans : [],
            accounts,
            savingsAchievedAmount: achievedAmount,
          }}
        >
          {children}
        </BanksDataProviderWrapper>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
