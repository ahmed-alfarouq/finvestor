"use server";
import { prisma } from "@/prisma";

import { plaidClient } from "@/plaid";

import { handleError } from "@/lib/errors/handleError";

import { getBaseUrl } from "@/lib/utils";
import { createBankProps, FetchAllAccountsResponse } from "@/types";
import { revalidateAll, revalidateBankTransactions } from "./cache/revalidate";

export const createBank = async ({
  name,
  userId,
  bankId,
  accessToken,
  areLiabilityAccounts,
}: createBankProps) => {
  try {
    await prisma.bank.create({
      data: {
        name,
        userId,
        bankId,
        accessToken,
        areLiabilityAccounts,
      },
    });

    await revalidateAll(userId, areLiabilityAccounts);
  } catch (err) {
    handleError(err, "An error occurred while connecting to the bank");
  }
};

export const getBank = async (bankId: string) => {
  try {
    const bank = await prisma.bank.findFirst({
      where: { bankId },
    });
    return bank;
  } catch (err) {
    handleError(err, "An error occurred while getting the bank");
  }
};

export const removeBank = async (bankId: string, userId: string) => {
  try {
    const bankAccount = await getBank(bankId);
    if (!bankAccount) return { error: "Bank not found!" };

    // remove bank accounts from db first in case of error
    await prisma.bank.delete({
      where: { id: bankAccount.id },
    });

    // all accounts from the same bank are removed
    const plaidRemoveRes = await plaidClient.itemRemove({
      access_token: bankAccount.accessToken,
    });

    if (plaidRemoveRes.status !== 200)
      return {
        error: "An error occured while removing the account from plaid!",
      };

    await revalidateAll(userId);
    await revalidateBankTransactions(userId, bankAccount.accessToken);

    return {
      message: "Account removed successfully",
      requestId: plaidRemoveRes.data.request_id,
    };
  } catch (err) {
    handleError(err, "An error occurred while removing the account");
  }
};

export const getAccounts = async (userId: string) => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/plaid/accounts`, {
      method: "POST",
      body: JSON.stringify({ data: { userId } }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const data = await res.json();

      if (data.error === "User has no accounts.") return [];

      throw Error(data.error);
    }

    const data: FetchAllAccountsResponse = await res.json();

    if (!data.success) {
      const newError = new Error(data.failed[0].message);
      newError.stack = data.failed[0].stack;

      throw newError;
    }

    // TODO as a future feature: mark unfectched accounts with not connected tag
    return data.accounts;
  } catch (err) {
    handleError(err);
  }
};
