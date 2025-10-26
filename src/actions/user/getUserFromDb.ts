"use server";
import { prisma } from "@/prisma";

import { getBaseUrl } from "@/lib/utils";

import { User } from "@/types";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { banks: true },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (userId: string): Promise<User> => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/user`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) throw Error(data.error);
    return data.user;
  } catch {
    // Catches only network-level or manual throw above
    throw Error("Something went wrong while getting user data!");
  }
};
