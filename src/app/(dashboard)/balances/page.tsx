import { auth } from "@/auth";

import PageContainer from "@/components/page-container";
import BalanceCard from "@/components/features/balances/balance-card";

import { getAccounts } from "@/actions/bank";
import ConnectBankCard from "@/components/connect-bank-card";

const BalancesPage = async () => {
  const session = await auth();
  if (!session) return;

  const accounts = await getAccounts(session.user.id);
  return (
    <PageContainer>
      <h1 className="card-title">Balances</h1>
      <section className="grid sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
        {accounts?.map((account) => (
          <BalanceCard
            key={account.id}
            id={account.id}
            userId={session.user.id}
            bankId={account.bankId}
            name={account.name}
            type={account.type}
            subtype={account.subtype}
            accountNumber={account.mask}
            totalAmount={account.availableBalance || account.currentBalance}
          />
        ))}
        <ConnectBankCard user={session.user} />
      </section>
    </PageContainer>
  );
};

export default BalancesPage;
