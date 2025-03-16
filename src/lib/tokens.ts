"use server";
import { prisma } from "@/prisma";
import { v4 as uuid } from "uuid";
import sendEmail from "@/actions/sendEmail";

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

export const sendVerificationEmail = async ({
  username,
  email,
  token,
}: {
  username: string;
  email: string;
  token: string;
}) => {
  const html = `
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
    <h1 style="color: #299D91; font-size: 24px; font-weight: bold;">Welcome to Finvestor, ${username}!</h1>
    <p style="color: #4b5563; font-size: 16px; margin-top: 16px;">
        We're excited to have you on board! To get started, please verify your email by clicking the button below.
    </p>
    <a href="${process.env.SITE_URL}/verify-email?token=${token}" 
        style="display: inline-block; background-color: #299D91; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px;">
        Verify Email
    </a>
    <p style="color: #4b5563; font-size: 14px; margin-top: 20px;">
        If you didn’t sign up for a Finvestor account, you can safely ignore this email.
    </p>
    <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
        Need help? Contact our support team at 
        <a href="mailto:support@finvestor.vercel.app" style="color: #2563eb; text-decoration: none;">support@finvestor.vercel.app</a>.
    </p>
    </div>
  `;
  await sendEmail({
    to: email,
    subject: `${username}, Activate Your Finvestor Account Today`,
    html,
  });
};
