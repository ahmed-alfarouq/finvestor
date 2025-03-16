"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas/auth";
import { signIn } from "@/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

import { getUserByEmail } from "@/lib/getUserFromDb";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/tokens";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "Email doesn't exist!" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken({
      email: existingUser.email,
    });

    await sendVerificationEmail({
      username: existingUser.name || "",
      email,
      token: verificationToken,
    });
    return {
      error:
        "Please verify your email to proceed. A verification email has been sent to your inbox!",
    };
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

export const handleGoogleLogin = async () => {
  await signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
};
