import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./schemas/auth";
import { getUserByEmail } from "./lib/getUserFromDb";

import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google,
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
            console.log(email, password);
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
} satisfies NextAuthConfig;
