"use server"
import { prisma } from "@/prisma";

export const updateEmailVerification = async (id: string) => {
  await prisma.user.update({
    where: { id },
    data: { emailVerified: new Date() },
  });
};