import { auth } from "@/auth";
import { getAccount, getAccounts } from "@/actions/bank";

import TotalBalanceBox from "@/components/features/overview/TotalBalanceBox";
import RecentTransactions from "@/components/features/overview/RecentTransactions";

const OverviewPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const session = await auth();
  const params = await searchParams;

  if (!session || !session.user.id) return;
  const accounts = await getAccounts(session.user.id);

  if (!accounts || !accounts.data) return;
  const accountsData = accounts.data;
  const accountBankId = (params.id as string) || accountsData[0].bankId;

  const account = await getAccount(accountBankId);

  return (
    <section className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <TotalBalanceBox
          accounts={accountsData}
          totalBanks={accounts.totalBanks}
          totalCurrentBalance={accounts.totalCurrentBalance}
        />
      </div>
      {account && (
        <RecentTransactions
          accounts={accountsData}
          transactions={account.transactions!}
          id={accountBankId!}
        />
      )}
    </section>
  );
};

export default OverviewPage;
