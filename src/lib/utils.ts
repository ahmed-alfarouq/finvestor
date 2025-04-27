/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

import type { AccountTypes } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
    monthShort: formattedMonthShort,
    monthLong: formattedMonthLong,
    monthNumeric: formattedMonthNumeric,
    dayOnly: formattedDayOnly,
  };
};

export function formatAmount(
  amount: number,
  useKFormat: boolean = false
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
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const formatCategory = (category: string) => {
  return category.replace(/_/g, " ");
};

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
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

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};
