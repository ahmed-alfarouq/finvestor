"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas/auth";
import { signIn } from "@/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


import { getUserByEmail } from "@/actions/user/getUserFromDb";
import {
  generateTwoFactorToken,
  generateVerificationToken,
  getTwoFactorTokenByEmail,
} from "@/actions/auth/tokens";

import { getTwoFactorConfirmationByUserId } from "@/actions/auth/twoFactorConfirmation";

import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/actions/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "Email doesn't exist!" };

  if (existingUser.password) {
    const validCredentials = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!validCredentials) return { error: "Invalid credentials!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken({
      email: existingUser.email,
    });

    await sendVerificationEmail({
      username: `${existingUser.firstName} ${existingUser.lastName}` || "",
      email,
      token: verificationToken,
    });
    return {
      error:
        "Please verify your email to proceed. A verification email has been sent to your inbox!",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Code expired!" };

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail({
        username: `${existingUser.firstName} ${existingUser.lastName}` || "",
        email: existingUser.email,
        token: twoFactorToken,
      });
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
    throw error;
  }
};
