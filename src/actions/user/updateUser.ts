"use server";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma";
import { v4 as uuidv4 } from "uuid";

import { createBankAccountProps } from "@/types";
import { revalidatePath } from "next/cache";

export const updateEmailVerification = async (id: string) => {
  await prisma.user.update({
    where: { id },
    data: { emailVerified: new Date() },
  });
};

export const updatePassword = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    return { success: "Password update successfully! go to login" };
  } catch {
    return { error: "Something went wrong!" };
  }
};

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  sharableId,
}: createBankAccountProps) => {
  try {
    await prisma.bankAccount.create({
      data: {
        id: uuidv4(),
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        sharableId,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeBanksByBankId = async (bankId: string) => {
  try {
    await prisma.bankAccount.deleteMany({ where: { bankId } });
    return { success: "Bank account removed successfully" };
  } catch (error) {
    console.error("An error occurred while removing the bank:", error);
    return { error: "Something went wrong while removing the bank from DB!" };
  }
};

export const updateSavingsGoal = async (userId: string, amount: string) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        savingsGoal: amount,
      },
    });
    revalidatePath("/");
    return { success: "Your goal was updated successfully!" };
  } catch (error) {
    console.error("An error occurred while updating savings goal:", error);
    return {
      error: `Something went wrong while updating savings goal!`,
    };
  }
};

export const updateSavingsGoalAccounts = async (
  userId: string,
  accounts: string[]
) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        savingsGoalAccounts: accounts,
      },
    });
    revalidatePath("/");
    return { success: "Your savings goal accounts were updated successfully!" };
  } catch (error) {
    console.error(
      "An error occurred while updating savings goal accounts:",
      error
    );
    return {
      error: `Something went wrong while updating savings goal accounts!`,
    };
  }
};

export const updateExpensesGoal = async (
  userId: string,
  category: string,
  amount: string
) => {
  try {
    await prisma.expensesGoal.upsert({
      where: {
        userId_category: {
          userId,
          category,
        },
      },
      update: {
        amount,
        lastModified: new Date(),
      },
      create: {
        userId,
        category,
        amount,
        lastModified: new Date(),
      },
    });
    revalidatePath("/");
    return { success: "Amount updated successfully!" };
  } catch (error) {
    console.error("An error occurred while updating expenses goal:", error);
    return {
      error: "Something went wrong while updating expenses goal!",
    };
  }
};
