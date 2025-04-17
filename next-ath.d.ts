import type { DefaultSession } from "next-auth";
import type { BankAccountProps } from "@/types/index";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
      address1: string;
      city: string;
      state: string;
      postalCode: string;
      dateOfBirth: string;
      ssn: string;
      bankAccounts: BankAccountProps[];
      dwollaCustomerUrl: string;
      dwollaCustomerId: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
    bankAccounts: BankAccountProps[];
    dwollaCustomerUrl: string;
    dwollaCustomerId: string;
    bankAccounts: BankAccountProps[];
  }
}
