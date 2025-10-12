"use client";
import { createContext, useContext } from "react";

import { BankAccount, Loan, Transaction } from "@/types";

export type BanksDataContextProps = {
  loans: Loan[];
  accounts: BankAccount[];
  transactions: Transaction[];
  totalAvailableBalance: number;
};

const BanksDataContext = createContext<BanksDataContextProps>({
  loans: [],
  accounts: [],
  transactions: [],
  totalAvailableBalance: 0,
});

export const useBanksDataContext = () => useContext(BanksDataContext);

export default BanksDataContext;
