"use client";

import Loading from "@/app/loading";
import PlaidLink from "@/components/ui/plaid-link";
import BalanceCard from "@/components/features/balances/BalanceCard";

import { useBanksDataContext } from "@/context/BanksDataContext";
import useCurrentUser from "@/hooks/use-current-user";

const BalancesPage = () => {
  const user = useCurrentUser();
  const { accounts } = useBanksDataContext();

  if (!user) return <Loading />;

  return (
    <section className="flex w-full flex-1 flex-col gap-3 px-5 sm:px-8 py-7 lg:py-12">
      <h1 className="card-title">Balances</h1>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
        {accounts.data.map((account) => (
          <BalanceCard
            key={account.id}
            id={account.id}
            bankId={account.bankId}
            name={account.name}
            type={account.type}
            subtype={account.subtype}
            accountNumber={account.mask}
            totalAmount={account.availableBalance || account.currentBalance}
          />
        ))}
        <section className="min-h-72 flex items-center justify-center rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5">
          <PlaidLink user={user} />
        </section>
      </section>
    </section>
  );
};

export default BalancesPage;
