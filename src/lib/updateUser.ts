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
