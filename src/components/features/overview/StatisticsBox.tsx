"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import BarChart from "@/components/ui/bar-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { compareTransactionsByDate, PeriodType } from "@/lib/transactions";
import {
  daysNames,
  monthsNames,
  dummyTransactions,
  lastYearTransactions,
} from "@/constants";

import { cn } from "@/lib/utils";
import { Transaction } from "@/types";

const StatisticsBox = ({
  transactions,
  className,
}: {
  transactions: Transaction[];
  className?: string;
}) => {
  const [comparedExpenses, setComparedExpenses] = useState<{
    currentPeriod: number[];
    lastPeriod: number[];
  }>({
    currentPeriod: [],
    lastPeriod: [],
  });
  const [statisticsType, setStatisticsType] = useState<"weekly" | "yearly">(
    "weekly"
  );

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const selectStatisticsType = (value: "weekly" | "yearly") => {
    setStatisticsType(value);
  };

  useEffect(() => {
    const comparedExpensesData = compareTransactionsByDate(
      [...dummyTransactions, ...transactions, ...lastYearTransactions],
      statisticsType as PeriodType
    );
    setComparedExpenses(comparedExpensesData);
  }, [transactions, statisticsType]);

  return (
    <section className={cn("h-full flex flex-col gap-2", className)}>
      <header className="flex items-center justify-between gap-4">
        <h2 className="card-title">Statistics</h2>
        <span className="text-sm text-gray-3 dark:text-gray-5 font-medium truncate">
          * Combination of dummy and plaid transactions
        </span>
      </header>
      <div className="h-full relative flex flex-col items-center gap-4 sm:gap-6 rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-8">
        <Select value={statisticsType} onValueChange={selectStatisticsType}>
          <SelectTrigger className="w-28 xs:w-24 text-base font-semibold text-default-black dark:text-white absolute xxs:static xs:absolute top-3 left-8 sm:top-[19px] sm:left-16 md:top-7 md:left-4 lg:top-[19px] lg:left-12 capitalize shadow-none border-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        <BarChart
          labels={statisticsType === "weekly" ? daysNames : monthsNames}
          datasets={[
            {
              label: statisticsType === "weekly" ? "Last week" : "Last year",
              data: comparedExpenses.lastPeriod,
              backgroundColor: isDarkMode ? "#f1f1f1" : "#E8E8E8",
              borderColor: isDarkMode ? "#f1f1f1" : "#299D91",
            },
            {
              label: statisticsType === "weekly" ? "This week" : "This year",
              data: comparedExpenses.currentPeriod,
              backgroundColor: isDarkMode ? "#9F9F9F" : "#299D91",
              borderColor: isDarkMode ? "#9F9F9F" : "#E8E8E8",
            },
          ]}
        />
      </div>
    </section>
  );
};

export default StatisticsBox;
