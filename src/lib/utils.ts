import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { AccountType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the base url from env file SITE_URL, VERCEL_URL (EX: http://localhost:4001)
 * @returns base url
 */

export const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.SITE_URL ?? "http://localhost:3000";
};

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const monthShortOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
  };

  const monthLongOptions: Intl.DateTimeFormatOptions = {
    month: "long", // full month name (e.g., 'October')
  };

  const monthNumericOptions: Intl.DateTimeFormatOptions = {
    month: "2-digit", // numeric month (e.g., '10')
  };

  const dayOnlyOptions: Intl.DateTimeFormatOptions = {
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const daywithWeekdayOptions: Intl.DateTimeFormatOptions = {
    day: "numeric", // numeric day of the month (e.g., '25')
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  // Custom format for dateOnly
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`;

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  const formattedMonthShort: string = new Date(dateString).toLocaleString(
    "en-US",
    monthShortOptions
  );

  const formattedMonthLong: string = new Date(dateString).toLocaleString(
    "en-US",
    monthLongOptions
  );

  const formattedMonthNumeric: string = new Date(dateString).toLocaleString(
    "en-US",
    monthNumericOptions
  );

  const formattedDayOnly: string = new Date(dateString).toLocaleString(
    "en-US",
    dayOnlyOptions
  );

  const formattedDaywithWeekday: string = new Date(dateString).toLocaleString(
    "en-US",
    daywithWeekdayOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
    monthShort: formattedMonthShort,
    monthLong: formattedMonthLong,
    monthNumeric: formattedMonthNumeric,
    dayOnly: formattedDayOnly,
    daywithWeekday: formattedDaywithWeekday,
  };
};

/**
 * Formats number into currency
 * @params {
 *  amount number,
 * useKFormat boolean,
 * minimumFractionDigits number default = 2
 * }
 * @returns formated number with $ symbol
 */

export function formatAmount(
  amount: number,
  useKFormat: boolean = false,
  minimumFractionDigits: number = 2
): string {
  if (amount === 0) {
    return "$0";
  }

  if (useKFormat && Math.abs(amount) >= 1000) {
    const formattedNumber = (amount / 1000).toFixed(0);
    return `$${formattedNumber}k`;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits,
  });

  return formatter.format(amount);
}

/**
 * Removes _ from category name and convert it to lowercase
 * @param category string
 * @returns formated category in lowercase
 */
export const formatCategory = (category: string) => {
  return category.replace(/_/g, " ").toLowerCase();
};

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

export function getAccountTypeColors(type: AccountType) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

/**
 * Sorts an array of elements by their date values in descending order (newest first)
 * @param array The array to sort
 * @param getDate A function that extracts the date from each element
 * @returns A new sorted array
 */
export function sortByDate<T>(
  array: T[],
  getDate: (item: T) => Date | string | number
): T[] {
  return [...array].sort((a, b) => {
    const dateA = new Date(getDate(a)).getTime();
    const dateB = new Date(getDate(b)).getTime();
    return dateA - dateB;
  });
}

/**
 * Filters an array of elements by a given array of dates
 * @param array The array to filter
 * @param dates The dates to filter by
 * @returns A new filtered array
 */
export const filterByDates = <T>(
  array: T[],
  dates: string[],
  getDate: (item: T) => Date | string | number
) => {
  return array.filter((item) =>
    dates.includes(formatDateTime(new Date(getDate(item))).dateOnly)
  );
};

/**
 * Filters an array of elements by a given year
 * @param array The array to filter
 * @param year The year to filter by
 * @returns A new filtered array
 */
export const filterByYear = <T>(
  array: T[],
  year: number,
  getDate: (item: T) => Date | string | number
) => {
  return array.filter((item) => new Date(getDate(item)).getFullYear() === year);
};

/**
 * Check if two arrays are equal
 * @param a The first array
 * @param b The seconda array
 * @returns Boolean
 */
export const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!b.includes(a[i])) return false;
  }
  return true;
};
