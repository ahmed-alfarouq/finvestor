"use client";
import DetailItem from "./components/DetailItem";
import NotAvailable from "@/components/not-available";
import AnimatedCounter from "@/components/animated-counter";

import { useBanksDataContext } from "@/context/BanksDataContext";

const AccountDetailsBox = ({ accountId }: { accountId: string }) => {
  const { accounts } = useBanksDataContext();
  const account = accounts.data.find((acc) => acc.id === accountId);

  if (!account) {
    return (
      <NotAvailable
        title="Account Details"
        message="Account's data not found."
      />
    );
  }
  return (
    <section>
      <h2 className="card-title">Account Details</h2>
      <div className="sm:h-72 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5 overflow-y-auto">
        <DetailItem title="Bank Name" value={account.institutionName} />
        <DetailItem title="Account Type" value={account.subtype} />
        <div>
          <h3 className="text-gray-3 dark:text-gray-7 text-sm md:text-base">
            Account Balance
          </h3>
          <AnimatedCounter
            amount={account.currentBalance}
            className="text-default-black dark:text-white text-lg font-bold"
          />
        </div>

        <DetailItem title="Account Name" value={account.name} />

        <DetailItem
          title="Account Number"
          value={`**** **** **** ${account.mask}`}
        />
      </div>
    </section>
  );
};

export default AccountDetailsBox;
