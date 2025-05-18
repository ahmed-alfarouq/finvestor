import { auth } from "@/auth";
import { redirect } from "next/navigation";

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

import { Transaction } from "@/types";
import BanksDataProviderWrapper from "@/components/wrappers/BanksDataProviderWrapper";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) return <Loading />;

  const userId = session.user.id;
  const savingsGoalAccounts = session.user.savingsGoalAccounts;
  const liabilitiesTypes = ["checking", "savings"];

  // Fetch all bank accounts
  const accountResponse = await getAccounts(userId);
  const allAccounts = accountResponse?.data ?? [];

  // Handle empty or failed account fetch
  if (!accountResponse || !accountResponse.data?.length) {
    if (accountResponse.data?.length === 0) {
      redirect("/link-account");
    }

    return (
      <section className="h-svh w-full flex items-center justify-center px-2">
        <RefreshSession />
      </section>
    );
  }

  // Filter liability (loan/credit) accounts and transaction-supported accounts
  const liabilityAccounts = allAccounts.filter(
    (acc) => !liabilitiesTypes.includes(acc.subtype)
  );

  const transactionAccounts = allAccounts.filter((acc) =>
    liabilitiesTypes.includes(acc.subtype)
  );

  // Fetch loans for first liability account, if any
  const loans = liabilityAccounts.length
    ? (await getBankLoans(liabilityAccounts[0])) || []
    : [];

  // Calculate total achieved savings goal
  const savingsAchievedAmount = allAccounts.reduce((total, acc) => {
    return savingsGoalAccounts.includes(acc.id)
      ? total + (acc.availableBalance ?? 0)
      : total;
  }, 0);

  // Fetch transactions for distinct banks only once
  const fetchedBanks = new Set<string>();
  const transactions: Transaction[] = [];

  for (const account of transactionAccounts) {
    if (!fetchedBanks.has(account.bankId)) {
      const accountDetails = await getAccountWithTransactions(account);
      if (accountDetails?.transactions?.length) {
        transactions.push(...accountDetails.transactions);
      }
      fetchedBanks.add(account.bankId);
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
            loans: loans,
            accounts: accountResponse,
            savingsAchievedAmount,
          }}
        >
          {children}
        </BanksDataProviderWrapper>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
