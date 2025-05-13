"use client";
import useCurrentUser from "@/hooks/use-current-user";

import PageContainer from "@/components/page-container";
import RefreshSession from "@/components/features/RefreshSession";
import TransferFrom from "@/components/features/transfer/TransferFrom";
import { useBanksDataContext } from "@/context/BanksDataContext";

const TransferPage = () => {
  const user = useCurrentUser();
  const { accounts } = useBanksDataContext();
  const validAccounts = accounts.data.filter(
    (account) => account.subtype === "checking" || account.subtype === "savings"
  );

  if (!user) return <RefreshSession />;

  return (
    <PageContainer>
      <header className="space-y-2">
        <h1 className="card-title">Payment Transfer</h1>
        <p className="text-sm font-bold text-gray-3 dark:text-gray-7">
          Please provide any specific details or notes related to the payment
          transfer
        </p>
      </header>
      <TransferFrom user={user} accounts={validAccounts} />
    </PageContainer>
  );
};

export default TransferPage;
