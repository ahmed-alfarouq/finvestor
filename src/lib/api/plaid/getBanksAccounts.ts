"use server";
import { AccountBase } from "plaid";

import { getPlaidAccountsSafely } from "@/actions/plaid";

import { handleError } from "@/lib/errors/handleError";
import serializeError from "@/lib/errors/serializeError";

import { BankProps } from "@/types";

const getBanksAccounts = async (banks: BankProps[]) => {
  const res = await Promise.allSettled(
    banks.map(async (bank) => {
      try {
        const data = await getPlaidAccountsSafely(
          bank.accessToken,
          bank.areLiabilityAccounts ? "liability" : "normal"
        );

        const { accounts } = data;
        if (!accounts || !accounts.length) {
          return []; // skip if no accounts returned
        }

        return accounts.map((accountData: AccountBase) => ({
          bankId: bank.bankId,
          id: accountData.account_id!,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionName: bank.name,
          name: accountData.name!,
          officialName: accountData.official_name!,
          mask: accountData.mask!,
          type: accountData.type!,
          subtype: accountData.subtype!,
          isLiabilityAccount: bank.areLiabilityAccounts,
        }));
      } catch (err) {
        handleError(
          err,
          `An unexpected error happened while getting accounts. Bank Id: ${bank.bankId}`
        );
      }
    })
  );

  const successful = res
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);

  const failed = res
    .filter((r) => r.status === "rejected")
    .map(
      (r) =>
        serializeError(r.reason) || {
          message: "An unexpected error from getBanksAccounts.",
        }
    );

  return { successful, failed };
};

export default getBanksAccounts;
