"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

import {
  UpdateUser2FAParams,
  UpdateUserInfoProps,
  createBankAccountProps,
  UpdateUserPasswordParams,
} from "@/types";

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
  accessToken,
  isLiabilityAccount,
}: createBankAccountProps) => {
  await prisma.bankAccount.create({
    data: {
      userId,
      bankId,
      accessToken,
      isLiabilityAccount,
    },
  });
};

export const removeBank = async (bankId: string) => {
  try {
    await prisma.bankAccount.deleteMany({ where: { bankId } });
    return { success: "Bank removed successfully" };
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

export const updateUserInfo = async ({
  userId,
  updateFields,
}: {
  userId: string;
  updateFields: UpdateUserInfoProps;
}) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateFields,
      },
    });
    return { success: "User info updated successfully." };
  } catch (error) {
    console.error("Something went wrong while updateing user info: ", error);
    return { error: "Failed to update user info: " + error };
  }
};

export const updateUserPassword = async ({
  userId,
  oldPassword,
  newPassword,
}: UpdateUserPasswordParams) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { error: "User not found!" };
    }

    const oldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!oldPasswordCorrect) {
      return { error: "Old Password is wrong!" };
    }

    const sameAsOld = await bcrypt.compare(newPassword, user.password);

    if (sameAsOld) {
      return {
        error: " Your new password must be different from the current one.",
      };
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedNewPassword,
      },
    });
    return { success: "Password updated successfully." };
  } catch (error) {
    console.error("Something went wrong while updating password: ", error);
    return { error: "Failed to update password: " + error };
  }
};

export const updateUser2FA = async ({
  userId,
  password,
  isTwoFactorEnabled,
}: UpdateUser2FAParams) => {
  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) {
    return { error: "User not found!" };
  }

  const validCredentials = await bcrypt.compare(password, user.password);

  if (!validCredentials) {
    return { error: "Password is wrong!" };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isTwoFactorEnabled,
      },
    });
    return { success: "2FA updated successfully." };
  } catch (error) {
    console.error("Something went wrong while updating 2FA: ", error);
    return { error: "Failed to update 2FA: " + error };
  }
};
