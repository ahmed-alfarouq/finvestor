"use client";
import { useState } from "react";
import { PlaidError } from "plaid";

import Loading from "@/app/loading";
import FormError from "@/components/form-error";
import PlaidLink from "@/components/ui/plaid-link";
import PageContainer from "@/components/page-container";
import BalanceCard from "@/components/features/balances/BalanceCard";

import { useBanksDataContext } from "@/context/BanksDataContext";

import useCurrentUser from "@/hooks/use-current-user";

const BalancesPage = () => {
  const { user } = useCurrentUser();
  const { accounts } = useBanksDataContext();

  const [linksDisabled, setLinksDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  if (!user) return <Loading />;

  const onClick = () => {
    setErrorMessage("");
    setLinksDisabled(true);
  };
  const onSuccess = () => setLinksDisabled(false);
  const onExit = (error: null | PlaidError) => {
    if (error) {
      setErrorMessage(error.error_message);
    }
    setLinksDisabled(false);
  };
  const onError = (error: string) => {
    setErrorMessage(error);
    setLinksDisabled(false);
  };

  return (
    <PageContainer>
      <h1 className="card-title">Balances</h1>
      <section className="grid sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
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
        <section className="min-h-72 flex flex-col items-center justify-center gap-3 rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5">
          <PlaidLink
            user={user}
            onClick={onClick}
            handleExit={onExit}
            handleSuccess={onSuccess}
            disabled={linksDisabled}
            onError={onError}
          />
          <PlaidLink
            user={user}
            accountType="liability"
            title="Connect Liability Accounts"
            onClick={onClick}
            handleExit={onExit}
            handleSuccess={onSuccess}
            disabled={linksDisabled}
            onError={onError}
          />
          <FormError message={errorMessage} />
          {errorMessage && (
            <FormError message="Heads up: In Sandbox Mode, all test banks share the same account data. For example, 'Plaid Checking' is the same account everywhere — so you'll see 'Bank account is already linked' if you've added it before." />
          )}
        </section>
      </section>
    </PageContainer>
  );
};

export default BalancesPage;
