
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Credentials({
    credentials: {
      email: {},
      password: {},
      keepMe: {}
    },
    authorize: async (credentials) => {
      console.log(credentials.email, credentials.password, credentials.keepMe)
      if (typeof credentials.password !== "string") {
        throw new Error("Invalid credentials.");
      }

      let user = null;
      const pwHash = bcrypt.hash(credentials.password, 10);
      user = {}
      console.log(pwHash)

      if (!user) {
        throw new Error("Invalid credentials.");
      }
      return user;

    },
  })],
})