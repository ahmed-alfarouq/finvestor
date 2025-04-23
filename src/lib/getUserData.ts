"use server";

import { prisma } from "@/prisma";

export const getBanksByUserId = async (userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { bankAccounts: true },
    });

    return user?.bankAccounts;
  } catch (error) {
    console.log(error);
  }
};

export const getBank = async (bankId: string) => {
  try {
    const bank = await prisma.bankAccount.findFirst({
      where: { bankId: bankId },
    });
    return bank;
  } catch (error) {
    console.log(error);
  }
};

export const getBankAccountsByBankId = async (bankId: string) => {
  try {
    const banks = await prisma.bankAccount.findMany({ where: { bankId } });
    return banks;
  } catch (error) {
    console.log(error);
  }
};
