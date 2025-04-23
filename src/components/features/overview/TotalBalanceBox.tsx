"use client";
import BankCard from "@/components/bank-card";
import { Carousel } from "@/components/ui/carousel";
import AnimatedCounter from "@/components/animated-counter";

import { TotlaBalanceBoxProps } from "@/types";

const TotalBalanceBox = ({
  accounts = [],
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  return (
    <section>
      <h2 className="card-title">Total Balance</h2>
      <div className="h-72 flex flex-col items-center gap-4 sm:gap-6 rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5">
        <div className="flex items-center justify-between w-full border-b border-gray-6 pb-4">
          <h3 className="default-black text-[22px] font-extrabold">
            <AnimatedCounter amount={totalCurrentBalance} />
          </h3>
          <span className="text-secondary-color dark:text-secondary-color-dark text-sm font-medium">
            All Accounts
          </span>
        </div>
        <Carousel slidesPerView={1} className="w-full">
          {accounts.map((account) => (
            <BankCard
              key={account.id}
              accountNumber={account.mask}
              type={account.type}
              balance={account.currentBalance}
              bankName={account.name}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
