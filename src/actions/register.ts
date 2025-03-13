"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas/auth";
import { prisma } from "@/prisma";
import { getUserByEmail } from "@/lib/getUserFromDb";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) return { error: "Invalid fields!" };
  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already exists!" };

  const hashedPassowrd = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassowrd,
    },
  });

  // TODO: Send verification token email.
  return { success: "New user created!" };
};
