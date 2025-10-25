"use server";
import { plaidClient } from "@/plaid";

import { handleError } from "@/lib/errors/handleError";

import { Transaction } from "plaid";
import { AxiosResponse } from "axios";
import { TransactionsSyncResponse } from "plaid";

export const getAccountTransactions = async (
  accountId: string,
  accessToken: string,
  nextCursor?: string
): Promise<{
  transactions: Transaction[];
  nextCursor?: string;
  hasMore: boolean;
}> => {
  try {
    if (!accessToken) {
      return {
        transactions: [],
        nextCursor: undefined,
        hasMore: false,
      };
    }

    const response: AxiosResponse<TransactionsSyncResponse> =
      await plaidClient.transactionsSync({
        access_token: accessToken,
        cursor: nextCursor,
        count: 5,
        options: {
          account_id: accountId,
        },
      });

    return {
      transactions: response.data.added,
      nextCursor: response.data.next_cursor,
      hasMore: response.data.has_more,
    };
  } catch (err) {
    handleError(
      err,
      "An unexpected error happened while getting account transactions"
    );

    return {
      transactions: [],
      nextCursor: undefined,
      hasMore: false,
    };
  }
};

export const getTransactions = async (
  accessToken: string,
  cursor?: string
): Promise<{
  transactions: Transaction[];
  nextCursor?: string;
  hasMore: boolean;
}> => {
  try {
    if (!accessToken) {
      return {
        transactions: [],
        nextCursor: undefined,
        hasMore: false,
      };
    }

    const response: AxiosResponse<TransactionsSyncResponse> =
      await plaidClient.transactionsSync({
        access_token: accessToken,
        cursor,
        count: 10,
      });

    return {
      transactions: response.data.added,
      nextCursor: response.data.next_cursor,
      hasMore: response.data.has_more,
    };
  } catch (err) {
    handleError(
      err,
      "An unexpected error occurred while getting the transactions."
    );
    return {
      transactions: [],
      nextCursor: undefined,
      hasMore: false,
    };
  }
};

export const getRecentTransactions = async (
  accessToken: string,
  count: number
): Promise<
  | {
      all: Transaction[];
      revenue: Transaction[];
      expenses: Transaction[];
    }
  | undefined
> => {
  const transactionsRes: AxiosResponse<TransactionsSyncResponse> =
    await plaidClient.transactionsSync({
      access_token: accessToken,
      count,
    });

  if (!transactionsRes.data.added.length) return;

  const transactions = transactionsRes.data.added;

  const all = [];
  const revenue = [];
  const expenses = [];

  for (const transaction of transactions) {
    all.push(transaction);
    if (transaction.amount < 0) {
      revenue.push(transaction);
      continue;
    }
    expenses.push(transaction);
  }

  return { all, revenue, expenses };
};
