"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { format } from "date-fns";
import { prisma } from "@/prisma";

import { RegisterSchema } from "@/schemas/auth";
import { sendVerificationEmail } from "@/actions/mail";
import { createDwollaCustomer } from "@/actions/dwolla";
import { getUserByEmail } from "@/actions/user/getUserFromDb";
import { generateVerificationToken } from "@/actions/auth/tokens";

import { extractCustomerIdFromUrl } from "@/lib/utils";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) return { error: "Invalid fields!" };
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    dateOfBirth,
    postalCode,
    ssn,
    email,
    password,
  } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already exists!" };

  const hashedPassowrd = await bcrypt.hash(password, 10);

  const stringfiedDateOfBirth = format(
    dateOfBirth.toDateString(),
    "yyyy-MM-dd"
  );

  const dwollaCustomerUrl = await createDwollaCustomer({
    firstName,
    lastName,
    email,
    address1: address,
    city,
    state,
    postalCode,
    dateOfBirth: stringfiedDateOfBirth,
    ssn,
    type: "personal",
  });
  
  if (!dwollaCustomerUrl) return { error: "Error creating dwolla customer" };

  const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      postalCode,
      dateOfBirth: stringfiedDateOfBirth,
      ssn,
      password: hashedPassowrd,
      dwollaCustomerUrl,
      dwollaCustomerId,
    },
  });

  const token = await generateVerificationToken({ email });
  await sendVerificationEmail({
    username: `${firstName} ${lastName}`,
    email,
    token,
  });

  return {
    success:
      "New user created! Please verify your email to activate your account and log in.",
  };
};
