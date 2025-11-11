import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getOnlyUserByEmail, getUserById } from "@/actions/user/getUserFromDb";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
      },
      async authorize(credentials) {
        const { email } = credentials as {
          email: string;
        };
        const user = await getOnlyUserByEmail(email);
        if (!user) return null;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      session.user.banks = token.banks;
      session.user.name = token.name;

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.name = `${existingUser.firstName}`;
      token.banks = existingUser.banks;

      console.log(token.banks);
      return token;
    },
  },
} satisfies NextAuthConfig;
