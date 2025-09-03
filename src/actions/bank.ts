"use server";
import axios from "axios";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { plaidClient } from "@/plaid";
import { CountryCode, LiabilitiesObject } from "plaid";

import {
  getBanksByUserId,
  getBank,
  getBankAccountsByBankId,
} from "@/actions/user/getUserData";
import { removeBanksByBankId } from "@/actions/user/updateUser";
import { removeFundingSources } from "@/actions/dwolla";

import { BankAccount, BankAccountProps, Transaction, Loan } from "@/types";

const getPlaidDataSafly = async (
  hasFundingSource: boolean,
  accessToken: string
) => {
  if (!hasFundingSource) {
    const res = await plaidClient.liabilitiesGet({
      access_token: accessToken,
    });
    return res.data;
  }

  const res = await plaidClient.accountsGet({
    access_token: accessToken,
  });
  return res.data;
};

const fetchingAllBanksDetails = async (banks: BankAccountProps[]) =>
  await Promise.all(
    banks.map(async (bank) => {
      try {
        const data = await getPlaidDataSafly(
          !!bank.fundingSourceUrl.length,
          bank.accessToken
        );

        const { accounts, item } = data;
        if (!accounts || !accounts.length) {
          return []; // skip if no accounts returned
        }

        const institution = await getInstitution(item.institution_id ?? "");

        if (!institution) {
          throw new Error("Failed to fetch institution info.");
        }

        return accounts.map((accountData) => ({
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
          sharableId: bank.sharableId!,
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

export const getAccounts = async (userId: string) => {
  try {
    const banks = await getBanksByUserId(userId);

    if (!banks) return { error: "No banks found" };

    // Remove duplicate banks, because plaid returns all accounts for a bank/institution
    const uniqueBanks = banks.reduce((acc, bank) => {
      const bankExists = acc.find((b) => b.bankId === bank.bankId);
      if (!bankExists) {
        acc.push(bank);
      }
      return acc;
    }, [] as BankAccountProps[]);

    // Get accounts from plaid
    const nestedAccounts = await fetchingAllBanksDetails(uniqueBanks);

    const accounts = nestedAccounts.flat();

    if (!accounts)
      return { error: "No accounts found for the connected banks." };

    const totalBanks = accounts.length || 0;
    const totalAvailableBalance =
      accounts.reduce(
        (total: number, currentValue: BankAccount | undefined) => {
          return total + (currentValue?.availableBalance || 0);
        },
        0
      ) || 0;
    return { data: accounts, totalBanks, totalAvailableBalance };
  } catch (err) {
    if (err instanceof Error && err.message === "NEXT_REDIRECT") {
      throw err;
    }

    throw new Error("Error happened while getting bank accounts:", {
      cause: err,
    });
  }
};

export const getAccountWithTransactions = async (account: BankAccount) => {
  // Dwolla and Plaid only supports checking and savings accounts for transactions
  if (account.subtype !== "savings" && account.subtype !== "checking") {
    return {
      error:
        "Transactions are not available for this account type. valid types 'savings', and 'checking'",
    };
  }

  try {
    const accountId = account.id;
    const bank = await getBank(accountId);

    if (bank) {
      const accountsResponse = await plaidClient.accountsGet({
        access_token: bank.accessToken,
      });
      const accountData = accountsResponse.data.accounts.find(
        (account) => account.account_id === bank.accountId
      );

      if (!accountData) throw Error("Account not found");

      // get institution info from plaid
      const institution = await getInstitution(
        accountsResponse.data.item.institution_id!
      );

      // Get transfer transactions from plaid
      const transactions = await getTransactions(bank?.accessToken);

      if (!transactions)
        throw Error(
          "Something went wrong while fetching account's transactions from plaid!"
        );

      const account = {
        id: accountData.account_id,
        bankId: bank.bankId,
        availableBalance: accountData.balances.available!,
        currentBalance: accountData.balances.current!,
        institutionId: institution?.institution_id,
        name: accountData.name,
        officialName: accountData.official_name,
        mask: accountData.mask!,
        type: accountData.type as string,
        subtype: accountData.subtype! as string,
      };

      // sort transactions by date such that the most recent transaction is first
      const sortedTransactions = transactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      return {
        data: account,
        transactions: sortedTransactions,
      };
    }
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
  }
};

export const getBankLoans = async (account: BankAccount) => {
  try {
    const accountId = account.id;
    const bank = await getBank(accountId);
    if (!bank) throw Error("Bank not found");

    const liabilitiesResponse = await plaidClient.liabilitiesGet({
      access_token: bank.accessToken,
    });

    const liabilities = liabilitiesResponse.data.liabilities;
    const loans: Loan[] = [];
    // Get mortgage and student loans
    for (const key in liabilities) {
      if (key !== "credit") {
        const liability = liabilities[key as keyof LiabilitiesObject];
        liability?.map((liability) => {
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
        });
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

export const getTransactions = async (accessToken: string) => {
  let hasMore = true;
  let transactions: Transaction[] = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });
      const data = response.data;

      transactions = data.added.map((transaction) => ({
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
    const bankAccounts = await getBankAccountsByBankId(bankId);
    if (!bankAccounts) return { error: "Bank not found!" };

    // remove bank accounts from db first in case of error
    const removeBanksRes = await removeBanksByBankId(bankId);

    if (removeBanksRes.error) return { error: removeBanksRes.error };

    const removeFundingSourcesRes = await removeFundingSources(bankAccounts);

    if (removeFundingSourcesRes.error)
      return {
        error: removeFundingSourcesRes.error,
      };

    // all accounts from the same bank are removed
    const plaidRemoveRes = await plaidClient.itemRemove({
      access_token: bankAccounts[0].accessToken,
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
