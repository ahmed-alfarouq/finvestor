"use server";
import { prisma } from "@/prisma";
import { randomInt, randomBytes } from "crypto";

import { sendTwoFactorCodeEmail, sendVerificationEmail } from "../mail";

import { handleError } from "@/lib/errors/handleError";

// Verification Email
export const createVerificationToken = async ({ email }: { email: string }) => {
  try {
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 5 * 60 * 1000);

    const existingToken = await findVerificationTokenByEmail({ email });

    if (existingToken) {
      await prisma.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const verificationToken = await prisma.verificationToken.create({
      data: { email, token, expires },
    });

    return verificationToken.token;
  } catch (err) {
    throw handleError(err, "Failed to create verification token");
  }
};

export const deleteVerificationToken = async (id: string) => {
  try {
    const removedToken = await prisma.verificationToken.delete({
      where: { id },
    });
    return removedToken;
  } catch (err) {
    handleError(err, "Failed to remove email verification token");
  }
};

export const findVerificationTokenByEmail = async ({
  email,
}: {
  email: string;
}) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (err) {
    handleError(err, "Failed to find verification token by email");
  }
};

export const findVerificationTokenByToken = async ({
  token,
}: {
  token: string;
}) => {
  try {
    const tokenExist = await prisma.verificationToken.findFirst({
      where: { token },
    });

    return tokenExist;
  } catch (err) {
    handleError(err, "Failed to find verification token by token");
  }
};

export const sendVerificationEmailProcess = async ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  try {
    const verificationToken = await createVerificationToken({
      email: email,
    });

    await sendVerificationEmail({
      username,
      email,
      token: verificationToken,
    });
  } catch (err) {
    handleError(err, "Failed to handle verification email process");
  }
};

// Reset Password
export const createResetToken = async (email: string) => {
  try {
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 30 * 1000);

    const existingToken = await findResetTokenByEmail(email);

    if (existingToken) {
      await prisma.resetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const resetToken = await prisma.resetToken.create({
      data: { email, token, expires },
    });

    return resetToken.token;
  } catch (err) {
    handleError(err, "Failed to create reset token");
  }
};

export const deleteResetToken = async (id: string) => {
  try {
    const removedToken = await prisma.resetToken.delete({
      where: { id },
    });
    return removedToken;
  } catch (err) {
    handleError(err, "Failed to remove reset token");
  }
};

export const findResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await prisma.resetToken.findFirst({
      where: { email },
    });
    return resetToken;
  } catch (err) {
    handleError(err, "Failed to find reset token by email");
  }
};

export const findResetTokenByToken = async (token: string) => {
  try {
    const tokenExist = await prisma.resetToken.findFirst({
      where: { token },
    });

    return tokenExist;
  } catch (err) {
    handleError(err, "Failed to find reset token by token");
  }
};

// Two Factor Confirmation
export const createTwoFactorCode = async (email: string, tempToken: string) => {
  try {
    const code = randomInt(100_000, 1_000_000).toString();

    const expires = new Date(Date.now() + 5 * 60 * 1000);

    const existing2FA = await findTwoFactorCodeByEmail({ email });

    if (existing2FA) {
      await prisma.twoFactorOTP.delete({ where: { id: existing2FA.id } });
    }

    const twoFactorAuthOTP = await prisma.twoFactorOTP.create({
      data: {
        email,
        code,
        tempToken,
        expires,
      },
    });

    return { code: twoFactorAuthOTP.code, tempToken };
  } catch (err) {
    throw handleError(err, "Failed to create two factor code");
  }
};

export const findTwoFactorCodeByCode = async (code: string) => {
  try {
    const twoFactorCode = await prisma.twoFactorOTP.findFirst({
      where: { code },
    });

    return twoFactorCode;
  } catch (err) {
    handleError(err, "Failed to find two factor code by code");
  }
};

export const findTwoFactorCodeByEmail = async ({
  email,
}: {
  email: string;
}) => {
  try {
    const twoFactorCode = await prisma.twoFactorOTP.findFirst({
      where: { email },
    });
    return twoFactorCode;
  } catch (err) {
    handleError(err, "Failed to find two factor code by email");
  }
};

export const deleteTwoFactorCode = async (id: string) => {
  await prisma.twoFactorOTP.delete({ where: { id } });
};

export const sendTwoFactorEmailProcess = async ({
  email,
  tempToken,
  username,
}: {
  email: string;
  tempToken: string;
  username: string;
}) => {
  try {
    const { code } = await createTwoFactorCode(email, tempToken);
    await sendTwoFactorCodeEmail({
      username,
      email,
      code,
    });
  } catch (err) {
    handleError(err);
  }
};
