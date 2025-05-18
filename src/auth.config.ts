import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { LoginSchema } from "./schemas/auth";

import { getUserByEmail, getUserById } from "./actions/user/getUserFromDb";

import type { NextAuthConfig } from "next-auth";
import { getTwoFactorConfirmationByUserId } from "./actions/auth/twoFactorConfirmation";
import { prisma } from "./prisma";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        try {
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await getUserByEmail(email);

            if (!user || !user.password) return null;

            const passwordsMatch = await bcrypt.compare(
              password,
              user.password
            );
            if (passwordsMatch) return user;
          }
        } catch (error) {
          console.log(error);
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (user.id) {
        const existingUser = await getUserById(user.id);

        if (existingUser?.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id
          );
          if (!twoFactorConfirmation) return false;
          await prisma.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id },
          });
        }
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      const {
        firstName,
        lastName,
        ssn,
        postalCode,
        address1,
        city,
        state,
        dwollaCustomerId,
        dwollaCustomerUrl,
        bankAccounts,
        savingsGoal,
        expensesGoals,
        savingsGoalAccounts,
        isTwoFactorEnabled
      } = token;

      Object.assign(session.user, {
        firstName,
        lastName,
        postalCode,
        address1,
        city,
        state,
        ssn,
        dwollaCustomerId,
        dwollaCustomerUrl,
        bankAccounts,
        savingsGoal,
        expensesGoals,
        savingsGoalAccounts,
        isTwoFactorEnabled
      });
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      Object.assign(token, existingUser);

      return token;
    },
  },
} satisfies NextAuthConfig;
