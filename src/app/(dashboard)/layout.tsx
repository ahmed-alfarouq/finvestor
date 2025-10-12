import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Loading from "./loading";
import AppSidebar from "@/components/app-sidebar";
import RefreshSession from "@/components/features/RefreshSession";
import DashboardHeader from "@/components/features/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import BanksDataProviderWrapper from "@/components/wrappers/BanksDataProviderWrapper";

import { getAccounts, getBankLoans, getBankTransactions } from "@/actions/bank";

import { Transaction } from "@/types";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) return <Loading />;

  const userId = session.user.id;

  // Fetch all bank accounts
  const accountResponse = await getAccounts(userId);
  console.log(accountResponse);

  // Handle empty or failed account fetch
  if (!accountResponse || !accountResponse.accounts?.length) {
    if (accountResponse.accounts?.length === 0) {
      redirect("/link-account");
    }

    return (
      <section className="h-svh w-full flex items-center justify-center px-2">
        <RefreshSession />
      </section>
    );
  }

  const { banks, accounts, totalAvailableBalance } = accountResponse;

  let transactions: Transaction[] = [];

  for (const account of banks) {
    const bankTransactions = await getBankTransactions(account.accessToken);
    if (bankTransactions) {
      transactions = [...transactions, ...bankTransactions];
    }
  }
  console.log(transactions);
  // Fetch loans for first liability account, if any
  const nestedLoans = (
    await Promise.all(
      banks.map(async (bank) => {
        if (bank.isLiabilityAccount)
          return await getBankLoans(bank.accessToken);
      })
    )
  ).filter((loan) => loan !== undefined);

  const loans = nestedLoans && nestedLoans.flat();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <BanksDataProviderWrapper
          data={{
            loans,
            accounts,
            transactions,
            totalAvailableBalance,
          }}
        >
          {children}
        </BanksDataProviderWrapper>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
