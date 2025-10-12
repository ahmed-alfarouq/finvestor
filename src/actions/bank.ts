"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";

import { plaidClient } from "@/plaid";
import { getPlaidAccountsSafely } from "./plaid";
import {
  AccountBase,
  CountryCode,
  StudentLoan,
  CreditCardLiability,
  LiabilitiesObject,
  MortgageLiability,
  Transaction as PlaidTransaction,
} from "plaid";

import { getBank, getBanksByUserId } from "@/actions/user/getUserData";
import { removeBank } from "@/actions/user/updateUser";

import { BankAccount, BankAccountProps, Transaction, Loan } from "@/types";

export const getAccounts = async (userId: string) => {
  try {
    const banks = await getBanksByUserId(userId);

    if (!banks) return { error: "No banks found" };

    // Get accounts from plaid
    const nestedAccounts = await fetchingAllBanksDetails(banks);

    const accounts = nestedAccounts.flat();

    if (!accounts)
      return { error: "No accounts found for the connected banks." };

    const totalAvailableBalance =
      accounts.reduce(
        (total: number, currentValue: BankAccount | undefined) => {
          return total + (currentValue?.availableBalance || 0);
        },
        0
      ) || 0;
    return { accounts, banks, totalAvailableBalance };
  } catch (err) {
    if (err instanceof Error && err.message === "NEXT_REDIRECT") {
      throw err;
    }

    throw new Error("Error happened while getting bank accounts:", {
      cause: err,
    });
  }
};

const fetchingAllBanksDetails = async (banks: BankAccountProps[]) =>
  await Promise.all(
    banks.map(async (bank) => {
      try {
        const data = await getPlaidAccountsSafely(
          bank.accessToken,
          bank.isLiabilityAccount ? "liability" : "normal"
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
          isLiabilityAccount: bank.isLiabilityAccount,
        }));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.error_code === "ITEM_LOGIN_REQUIRED") {
            await removeBankAccount(bank.bankId);
          }
        }

        return [];
      }
    })
  );

export const getBankTransactions = async (
  accessToken: string
): Promise<Transaction[] | undefined> => {
  try {
    // Get transfer transactions from plaid
    const transactions = await getTransactions(accessToken);

    if (!transactions)
      throw Error(
        "Something went wrong while fetching account's transactions from plaid!"
      );

    // sort transactions by date such that the most recent transaction is first
    const sortedTransactions = transactions.sort((a, b) =>
      b.date.localeCompare(a.date)
    );

    return sortedTransactions;
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
  }
};

export const getBankLoans = async (accessToken: string) => {
  try {
    const liabilitiesResponse = await plaidClient.liabilitiesGet({
      access_token: accessToken,
    });

    const liabilities = liabilitiesResponse.data.liabilities;
    const loans: Loan[] = [];
    // Get mortgage and student loans
    for (const key in liabilities) {
      if (key !== "credit") {
        const liability = liabilities[key as keyof LiabilitiesObject];
        liability?.map(
          (
            liability: CreditCardLiability | MortgageLiability | StudentLoan
          ) => {
            // Used for TS to tell it's not CreditCardLiability type
            if ("ytd_interest_paid" in liability) {
              loans.push({
                name: key,
                accountId: liability.account_id!,
                lastPaymentAmount: liability.last_payment_amount!,
                lastPaymentDate: liability.last_payment_date!,
                nextPaymentDueDate: liability.next_payment_due_date!,
                nextMonthlyPayment:
                  "next_monthly_payment" in liability
                    ? liability.next_monthly_payment!
                    : liability.minimum_payment_amount!,
                isOverdue:
                  "is_overdue" in liability
                    ? (liability.is_overdue! as boolean)
                    : liability.past_due_amount! > 0,
                ytdTotalPaid:
                  liability.ytd_interest_paid! + liability.ytd_principal_paid!,
              });
            }
          }
        );
      }
    }
    return loans;
  } catch (error) {
    console.error("An error occured while getting loans", error);
  }
};

export const getInstitution = async (institutionId: string) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    return institutionResponse.data.institution;
  } catch (error) {
    console.error("An error occurred while getting the institution:", error);
  }
};

export const getTransactions = async (
  accessToken: string
): Promise<Transaction[] | undefined> => {
  let hasMore = true;
  let transactions: Transaction[] = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });
      const data = response.data;

      transactions = data.added.map((transaction: PlaidTransaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        date: transaction.date,
        image: transaction.logo_url,
        category: transaction.personal_finance_category,
        category_icon: transaction.personal_finance_category_icon_url,
      }));

      hasMore = data.has_more;
    }

    return transactions;
  } catch (error) {
    console.error("An error occurred while getting the transactions:", error);
  }
};

export const removeBankAccount = async (bankId: string) => {
  try {
    const bankAccount = await getBank(bankId);
    if (!bankAccount) return { error: "Bank not found!" };

    // remove bank accounts from db first in case of error
    const removeBanksRes = await removeBank(bankId);

    if (removeBanksRes.error) return { error: removeBanksRes.error };

    // all accounts from the same bank are removed
    const plaidRemoveRes = await plaidClient.itemRemove({
      access_token: bankAccount.accessToken,
    });

    if (plaidRemoveRes.status !== 200)
      return {
        error: "Something went wrong while removing the account from plaid!",
      };

    revalidatePath("/");
    return {
      message: "Account removed successfully",
      requestId: plaidRemoveRes.data.request_id,
    };
  } catch (error) {
    console.error("An error occurred while removing the account:", error);
  }
};
