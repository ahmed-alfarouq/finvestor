"use client";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { compareTransactionsByDate, PeriodType } from "@/lib/transactions";

import { daysNames, monthsNames } from "@/constants";

import { StatisticsBoxProps } from "@/types";

const BarChart = dynamic(() => import("@/components/ui/bar-chart"), {
  ssr: false,
  loading: () => null,
});

const StatisticsBox = ({ transactions, className }: StatisticsBoxProps) => {
  const [statisticsType, setStatisticsType] = useState<"weekly" | "yearly">(
    "weekly"
  );

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const selectStatisticsType = (value: "weekly" | "yearly") => {
    setStatisticsType(value);
  };

  const comparedExpenses = useMemo(
    () => compareTransactionsByDate(transactions, statisticsType as PeriodType),
    [transactions, statisticsType]
  );

  const labels = useMemo(
    () => (statisticsType === "weekly" ? daysNames : monthsNames),
    [statisticsType]
  );

  const datasets = useMemo(
    () => [
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
    ],
    [statisticsType, isDarkMode, comparedExpenses]
  );

  return (
    <section className={cn("h-full flex flex-col gap-2", className)}>
      <header>
        <h2 className="card-title">Statistics</h2>
      </header>

      <div className="h-full relative flex flex-col items-center gap-4 sm:gap-6 rounded-xl bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-8">
        <Select value={statisticsType} onValueChange={selectStatisticsType}>
          <SelectTrigger className="w-28 xs:w-24 text-base font-semibold text-default-black dark:text-white absolute xxs:static xs:absolute top-3 left-8 sm:top-[19px] sm:left-16 md:top-7 md:left-4 lg:top-[19px] lg:left-12 capitalize shadow-none border-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        <BarChart labels={labels} datasets={datasets} />
      </div>
    </section>
  );
};

export default StatisticsBox;
