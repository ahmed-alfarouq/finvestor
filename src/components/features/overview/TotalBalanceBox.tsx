import React from "react";
import AnimatedCounter from "@/components/animated-counter";
import DoughnutChart from "@/components/doughnut-chart";

import { TotlaBalanceBoxProps } from "@/types";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  return (
    <section>
      <h2 className="text-2xl text-gray-2 dark:text-gray-7 mb-2">
        Total Balance
      </h2>
      <div className="flex items-center gap-4 rounded-xl border bg-white dark:bg-[#131629] shadow-xl shadow-shadow-1/10 p-4 sm:gap-6 sm:p-6">
        <div className="flex size-full max-w-[100px] items-center sm:max-w-[120px]">
          <DoughnutChart accounts={accounts} />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-default-black dark:text-white">
            Bank Accounts: {totalBanks}
          </h2>
          <div className="text-2xl lg:text-3xl flex-1 font-semibold text-gray-900 dark:text-gray-7 flex-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
