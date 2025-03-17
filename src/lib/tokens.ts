"use server";
import crypto from "crypto";
import { prisma } from "@/prisma";
import { v4 as uuid } from "uuid";

// Verification Email
export const generateVerificationToken = async ({
  email,
}: {
  email: string;
}) => {
  const token = uuid();
  const expires = new Date(Date.now() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail({ email });

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
};

export const removeEmailVerificationToken = async (id: string) => {
  try {
    const removedToken = await prisma.verificationToken.delete({
      where: { id },
    });
    return removedToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async ({
  email,
}: {
  email: string;
}) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async ({
  token,
}: {
  token: string;
}) => {
  try {
    const tokenExist = await prisma.verificationToken.findFirst({
      where: { token },
    });

    return tokenExist;
  } catch {
    return null;
  }
};

// Reset Password
export const generateResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(Date.now() + 60 * 30 * 1000);

  const existingToken = await getResetTokenByEmail(email);

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
};

export const removeResetToken = async (id: string) => {
  try {
    const removedToken = await prisma.resetToken.delete({
      where: { id },
    });
    return removedToken;
  } catch {
    return null;
  }
};

export const getResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await prisma.resetToken.findFirst({
      where: { email },
    });
    return resetToken;
  } catch {
    return null;
  }
};

export const getResetTokenByToken = async (token: string) => {
  try {
    const tokenExist = await prisma.resetToken.findFirst({
      where: { token },
    });

    return tokenExist;
  } catch {
    return null;
  }
};

// Two Factor Confirmation
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(Date.now() + 60 * 30 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await prisma.twoFactorToken.delete({ where: { id: existingToken.id } });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken.token;
};

export const getTwoFactorTokenByToken = async ({
  token,
}: {
  token: string;
}) => {
  try {
    const tokenExist = await prisma.twoFactorToken.findFirst({
      where: { token },
    });

    return tokenExist;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const resetToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });
    return resetToken;
  } catch {
    return null;
  }
};
