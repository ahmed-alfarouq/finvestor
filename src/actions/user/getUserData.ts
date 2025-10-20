"use server";

import { prisma } from "@/prisma";

export const getBanksByUserId = async (userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { banks: true },
    });
    return user?.banks;
  } catch (err) {
    throw Error((err as Error).message);
  }
};
