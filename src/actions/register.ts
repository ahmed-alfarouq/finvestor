"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma";

import { RegisterSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/lib/getUserFromDb";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/tokens";

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

  const token = await generateVerificationToken({ email });
  await sendVerificationEmail({ username: name, email, token });

  return {
    success:
      "New user created! Please verify your email to activate your account and log in.",
  };
};
