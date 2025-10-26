"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateAccounts = async (userId: string) =>
  revalidateTag(`accounts-${userId}`);

export const revalidateAll = async (
  userId: string,
  revalidatedLoan?: boolean
) => {
  if (revalidatedLoan) {
    return await Promise.all([
      revalidateTag(`user-${userId}`),
      revalidateTag(`accounts-${userId}`),
      revalidateTag(`loans-${userId}`),
    ]);
  }

  return await Promise.all([
    revalidateTag(`user-${userId}`),
    revalidateTag(`accounts-${userId}`),
  ]);
};

export const revalidateRecentTransactions = async (userId: string) =>
  revalidatePath(`recent-transactions-${userId}`);

export const revalidateBankTransactions = async (
  userId: string,
  accessToken: string
) => revalidatePath(`${accessToken}-transactions-${userId}`);
