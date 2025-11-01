import type { DefaultSession } from "next-auth";
import type { User } from "@/types/index";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    banks: User["banks"];
  }
}
