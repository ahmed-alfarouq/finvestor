"use server";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

import {
  deleteTwoFactorCode,
  findTwoFactorCodeByCode,
  sendTwoFactorEmailProcess,
  sendVerificationEmailProcess,
} from "@/actions/auth/tokens";
import { getUserByEmail } from "@/actions/user/getUserFromDb";

import { handleError } from "@/lib/errors/handleError";

import { loginSchema, LoginSchema } from "@/schemas/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const login = async (values: LoginSchema) => {
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };
    const { email, password } = validatedFields.data;

    const user = await getUserByEmail(email);
    if (!user) return { error: "Invalid email or password!" };

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) return { error: "Invalid email or password!" };

    if (!user.emailVerified) {
      sendVerificationEmailProcess({ email, username: user.firstName });
      return {
        error: "Please verify your email to activate your account and log in.",
      };
    }

    if (user.isTwoFactorEnabled) {
      const tempToken = randomBytes(32).toString("hex");
      sendTwoFactorEmailProcess({
        email,
        tempToken,
        username: user.firstName,
      });

      (await cookies()).set("email", email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 5 * 60,
        sameSite: "strict",
        ...(process.env.NODE_ENV === "production" && { domain: ".vercel.app" }),
      });

      return {
        tempToken,
      };
    }

    await signIn("credentials", {
      email,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    throw handleError(err);
  }
};

export const loginWith2FA = async ({
  code,
  token,
}: {
  code: string;
  token: string;
}) => {
  try {
    const cookieStore = await cookies();
    const cookieEmail = cookieStore.get("email");
    const email = cookieEmail?.value;

    if (!email) return { error: "Session expired. Please log in again." };

    const user = await getUserByEmail(email);
    if (!user) return { error: "Session expired. Please log in again." };

    const codeRecord = await findTwoFactorCodeByCode(code);
    if (!codeRecord) return { error: "Invalid or expired verification code." };

    if (token !== codeRecord.tempToken)
      return { error: "Invalid or expired verification code." };

    if (codeRecord.expires < new Date()) {
      cookieStore.delete("email");
      await deleteTwoFactorCode(codeRecord.id);
      return {
        error: "Verification code has expired. Please request a new one.",
      };
    }
    cookieStore.delete("email");
    await deleteTwoFactorCode(codeRecord.id);

    await signIn("credentials", { email, redirectTo: DEFAULT_LOGIN_REDIRECT });
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    handleError(err, "Failed to validate the code");
  }
};
