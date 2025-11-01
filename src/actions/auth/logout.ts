"use server";
import { signOut } from "@/auth";
import { revalidateTag } from "next/cache";

export const logout = async (userId: string) => {
  revalidateTag(`user-${userId}`);
  await signOut({ redirectTo: "/", redirect: true });
};
