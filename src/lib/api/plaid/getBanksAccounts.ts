"use server";
import { AccountBase } from "plaid";
import { isAxiosError } from "axios";

import { getPlaidAccountsSafely } from "@/actions/plaid";
import { getInstitution, removeBank } from "@/actions/bank";

import { BankProps } from "@/types";

const getBanksAccounts = async (banks: BankProps[]) => {
  const res = await Promise.allSettled(
    banks.map(async (bank) => {
      try {
        const data = await getPlaidAccountsSafely(
          bank.accessToken,
          bank.areLiabilityAccounts ? "liability" : "normal"
        );

        const { accounts, item } = data;
        if (!accounts || !accounts.length) {
          return []; // skip if no accounts returned
        }

        const institution = await getInstitution(item.institution_id ?? "");

        if (!institution) {
          throw new Error("Failed to fetch institution info.");
        }

        return accounts.map((accountData: AccountBase) => ({
          bankId: bank.bankId,
          id: accountData.account_id!,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          institutionName: institution.name,
          name: accountData.name!,
          officialName: accountData.official_name!,
          mask: accountData.mask!,
          type: accountData.type!,
          subtype: accountData.subtype!,
          isLiabilityAccount: bank.areLiabilityAccounts,
        }));
      } catch (err) {
        if (isAxiosError(err)) {
          const code = err.response?.data?.error_code;

          if (code === "ITEM_LOGIN_REQUIRED") {
            await removeBank(bank.bankId);
          }

          throw {
            bankId: bank.bankId,
            message: `Plaid error: ${code ?? "Unknown"}`,
            type: "PLAID_ERROR",
            code,
          };
        }

        throw {
          bankId: bank.bankId,
          message: (err as Error).message ?? "Unknown error",
          type: "GENERAL_ERROR",
        };
      }
    })
  );
  console.log(res);
  const successful = res
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);

  const failed = res
    .filter((r) => r.status === "rejected")
    .map((r) => r.reason);

  return { successful, failed };
};

export default getBanksAccounts;
