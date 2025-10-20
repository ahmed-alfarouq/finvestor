"use server";
import { prisma } from "@/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

import { plaidClient } from "@/plaid";

import { CountryCode } from "plaid";

import { getBaseUrl } from "@/lib/utils";
import { createBankProps, FetchAllAccountsResponse } from "@/types";

export const createBank = async ({
  userId,
  bankId,
  accessToken,
  areLiabilityAccounts,
}: createBankProps) => {
  await prisma.bank.create({
    data: {
      userId,
      bankId,
      accessToken,
      areLiabilityAccounts,
    },
  });

  revalidateTag("accounts");
};

export const getBank = async (bankId: string) => {
  try {
    const bank = await prisma.bank.findFirst({
      where: { bankId },
    });
    return bank;
  } catch {
    return null;
  }
};

export const removeBank = async (bankId: string) => {
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

    revalidateTag("accounts");
    revalidatePath("/");
    return {
      message: "Account removed successfully",
      requestId: plaidRemoveRes.data.request_id,
    };
  } catch (error) {
    console.error("An error occurred while removing the account:", error);
  }
};

export const getAccounts = async (userId: string) => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/plaid/accounts`, {
      method: "POST",
      body: JSON.stringify({ data: { userId } }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw Error("Failed to fetch accounts");

    const data: FetchAllAccountsResponse = await res.json();
    return data.accounts;
  } catch {
    // Catches only network-level or manual throw above
    throw Error("Failed to fetch accounts");
  }
};

export const getInstitution = async (institutionId: string) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    return institutionResponse.data.institution;
  } catch (error) {
    console.error("An error occurred while getting the institution:", error);
  }
};
