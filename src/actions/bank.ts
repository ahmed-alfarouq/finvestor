"use server";

import { revalidatePath } from "next/cache";

import { CountryCode } from "plaid";

import { plaidClient } from "@/lib/plaid";
import {
  getBanksByUserId,
  getBank,
  getBankAccountsByBankId,
} from "@/lib/getUserData";
import { removeBanksByBankId } from "@/lib/updateUser";

import { removeFundingSources } from "@/actions/dwolla";

import { BankAccountProps, Transaction } from "@/types";

export const getAccounts = async (userId: string) => {
  try {
    const banks = await getBanksByUserId(userId);

    const accounts =
      banks &&
      (await Promise.all(
        banks.map(async (bank: BankAccountProps) => {
          const accountResponse = await plaidClient.accountsGet({
            access_token: bank.accessToken,
          });
          const accountData = accountResponse.data.accounts.find(
            (account) => account.account_id === bank.accountId
          );

          if (!accountData) {
            throw Error("Account not found");
          }

          const institution = await getInstitution(
            accountResponse.data.item.institution_id!
          );

          if (!institution)
            throw Error(
              "An error occurred while getting the accounts: Line 23"
            );

          const account = {
            bankId: bank.bankId,
            id: accountData.account_id!,
            availableBalance: accountData.balances.available!,
            currentBalance: accountData.balances.current!,
            institutionId: institution?.institution_id,
            name: accountData.name!,
            officialName: accountData.official_name!,
            mask: accountData.mask!,
            type: accountData.type! as string,
            subtype: accountData.subtype! as string,
            sharableId: bank.sharableId!,
          };
          return account;
        })
      ));
    const totalBanks = accounts?.length || 0;
    const totalCurrentBalance =
      accounts?.reduce(
        (total: number, account: { availableBalance: number }) => {
          return total + account.availableBalance;
        },
        0
      ) || 0;
    return { data: accounts, totalBanks, totalCurrentBalance };
  } catch (error) {
    console.log("Error happened while getting bank accounts", error);
  }
};

export const getAccount = async (bankId: string) => {
  try {
    const bank = await getBank(bankId);
    if (bank) {
      const accountsResponse = await plaidClient.accountsGet({
        access_token: bank.accessToken,
      });
      const accountData = accountsResponse.data.accounts[0];

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
        bankId: bank.id,
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
      const sortedTransactions = [...transactions].sort(
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
