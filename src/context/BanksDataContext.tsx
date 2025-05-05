"use client";
import { createContext, useContext } from "react";

import { BankAccount, Loan, Transaction } from "@/types";

export type BanksDataContextProps = {
  transactions: Transaction[];
  loans: Loan[];
  accounts: {
    data: BankAccount[];
    totalBanks: number;
    totalAvailableBalance: number;
  };
  savingsAchievedAmount: number;
};

const BanksDataContext = createContext<BanksDataContextProps>({
  transactions: [],
  loans: [],
  accounts: {
    data: [],
    totalBanks: 0,
    totalAvailableBalance: 0,
  },
  savingsAchievedAmount: 0,
});

export const useBanksDataContext = () => useContext(BanksDataContext);

export default BanksDataContext;
