import {
  filterByDates,
  filterByYear,
  formatDateTime,
  sortByDate,
} from "@/lib/utils";
import { Transaction } from "plaid";

export enum PeriodType {
  WEEKLY = "weekly",
  YEARLY = "yearly",
}

export interface PeriodResult {
  currentPeriod: number[];
  lastPeriod: number[];
}

export interface DateGrouping {
  getKey: (date: Date) => string;
  getRange: (date: Date) => string[];
}

const dateGroupings: Record<PeriodType, DateGrouping> = {
  [PeriodType.WEEKLY]: {
    getKey: (date) => formatDateTime(date).dateOnly,
    getRange: (date) => {
      const today = new Date(date);
      const dayOfWeek = today.getDay(); // 0 is Sunday
      const daysFromSunday = dayOfWeek;
      const days: string[] = [];

      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        // Start from Sunday by subtracting days from current date to get to Sunday
        // Then add index to get subsequent days
        d.setDate(today.getDate() - daysFromSunday + i);
        days.push(formatDateTime(d).dateOnly);
        return;
      });
      return days;
    },
  },
  [PeriodType.YEARLY]: {
    getKey: (date) => formatDateTime(date).monthLong,
    getRange: (date) => {
      const year = date.getFullYear();
      return Array.from({ length: 12 }, (_, i) => {
        const d = new Date(year, i, 1);
        return formatDateTime(d).monthLong;
      });
    },
  },
};

/**
 * Generic function to calculate expenses by date grouping
 * @param transactions List of transactions
 * @param grouping Date grouping strategy
 * @returns Array of amounts grouped by the specified period
 */
const calculateExpensesByGrouping = (
  transactions: Transaction[],
  grouping: DateGrouping
): number[] => {
  if (!transactions.length) return [];

  const sortedTransactions = sortByDate(transactions, (t) => t.date);
  const amounts: number[] = [];
  let currentGroup = "";
  let totalAmount = 0;

  sortedTransactions.forEach((transaction) => {
    // Ignore transactions with amount <= 0, because they are fund transfers
    if (transaction.amount <= 0) return;

    const groupKey = grouping.getKey(new Date(transaction.date));

    if (currentGroup === "") {
      currentGroup = groupKey;
      totalAmount = transaction.amount;
    } else if (groupKey === currentGroup) {
      totalAmount += transaction.amount;
    } else {
      amounts.push(totalAmount);
      currentGroup = groupKey;
      totalAmount = transaction.amount;
    }
  });

  // Push the last date's total
  if (totalAmount !== 0) {
    amounts.push(totalAmount);
  }

  return amounts;
};

export const compareTransactionsByDate = (
  transactions: Transaction[],
  type: PeriodType
): PeriodResult => {
  if (!transactions.length) {
    return {
      currentPeriod: [],
      lastPeriod: [],
    };
  }

  const today = new Date();
  const grouping = dateGroupings[type];

  if (type === PeriodType.WEEKLY) {
    const thisWeekRange = grouping.getRange(today);
    const lastWeekRange = thisWeekRange.map((dateStr) => {
      const date = new Date(dateStr);
      date.setDate(date.getDate() - 7);
      return formatDateTime(date).dateOnly;
    });

    const currentPeriodTransactions = filterByDates(
      transactions,
      thisWeekRange,
      (t) => t.date
    );
    const lastPeriodTransactions = filterByDates(
      transactions,
      lastWeekRange,
      (t) => t.date
    );

    return {
      currentPeriod: calculateExpensesByGrouping(
        currentPeriodTransactions,
        grouping
      ),
      lastPeriod: calculateExpensesByGrouping(lastPeriodTransactions, grouping),
    };
  }

  // yearly
  const currentYear = today.getFullYear();
  const lastYear = currentYear - 1;

  const currentYearTransactions = filterByYear(
    transactions,
    currentYear,
    (t) => t.date
  );
  const lastYearTransactions = filterByYear(
    transactions,
    lastYear,
    (t) => t.date
  );
  return {
    currentPeriod: calculateExpensesByGrouping(
      currentYearTransactions,
      grouping
    ),
    lastPeriod: calculateExpensesByGrouping(lastYearTransactions, grouping),
  };
};

/**
 * Splits an array of transactions by their category
 * @param transactions The transactions to split
 * @returns A new array of transactions grouped by category
 */
export const splitTransactionsByCategory = (transactions: Transaction[]) => {
  const categorisedTransactions: Record<string, Transaction[]> = {};

  transactions.forEach((transaction) => {
    const category = transaction.personal_finance_category;
    if (!category) return;

    // If the category doesn't exist, create it and add the transaction to it
    if (!categorisedTransactions[category.primary]) {
      categorisedTransactions[category.primary] = [transaction];
    } else {
      // If the category exists, add the transaction to it
      categorisedTransactions[category.primary].push(transaction);
    }
  });

  return categorisedTransactions;
};

/**
 * Get the total expenses from an array of transactions
 * @param transactions The transactions to get the total expenses from
 * @returns The total expenses
 */
export const getTotalExpenses = (transactions: Transaction[]) => {
  return transactions.reduce((acc, curr) => {
    // Ignore transactions with amount < 0, because they are fund transfers
    if (curr.amount < 0) return acc;
    return acc + curr.amount;
  }, 0);
};

/**
 * @param currentPeriod
 * @param lastPeriod
 * @returns percentage of increase (+) or decrease (-)
 */
export const compareExpenses = (
  currentPeriod: Transaction[],
  lastPeriod: Transaction[]
) => {
  const currentPeriodTotal = getTotalExpenses(currentPeriod);
  const lastPeriodTotal = getTotalExpenses(lastPeriod);

  if (lastPeriodTotal === 0) return 0;
  const percentage =
    ((currentPeriodTotal - lastPeriodTotal) / lastPeriodTotal) * 100;
  return Number(percentage.toFixed(1));
};
