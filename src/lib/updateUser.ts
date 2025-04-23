"use server";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";

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

export const removeBanksByBankId = async (bankId: string) => {
  try {
    await prisma.bankAccount.deleteMany({ where: { bankId } });
    return { success: "Bank account removed successfully" };
  } catch (error) {
    console.error("An error occurred while removing the bank:", error);
    return { error: "Something went wrong while removing the bank from DB!" };
  }
};
