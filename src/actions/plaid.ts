"use server";
import { revalidatePath } from "next/cache";

import { encryptId } from "@/lib/utils";
import { plaidClient } from "@/plaid";
import { createBankAccount } from "@/actions/user/updateUser";

import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { addFundingSource } from "./dwolla";

import { exchangePublicTokenProps, User } from "@/types";

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth", "transactions", "liabilities"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };
    const res = await plaidClient.linkTokenCreate(tokenParams);
    return { linkToken: res.data.link_token };
  } catch (err) {
    console.error("Error creating link token:", err);
    throw Error("Error creating link token");
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    const res = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = res.data.access_token;
    const bankId = res.data.item_id;

    const accountsResponse = await plaidClient.liabilitiesGet({
      access_token: accessToken,
    });

    const allAccounts = accountsResponse.data.accounts;

    // Filter accounts to only those that can be used for processor tokens
    /**
     ** Dwolla only supports checking and savings accounts for processor tokens
     */
    const dwollaEligibleAccounts = allAccounts.filter(
      (account) =>
        account.type === "depository" &&
        (account.subtype === "checking" || account.subtype === "savings")
    );

    if (dwollaEligibleAccounts.length) {
      for (const accountData of dwollaEligibleAccounts) {
        try {
          const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
          };

          const processorTokenResponse = await plaidClient.processorTokenCreate(
            request
          );
          const processorToken = processorTokenResponse.data.processor_token;

          const fundingSourceUrl: string | null | undefined =
            await addFundingSource({
              dwollaCustomerId: user.dwollaCustomerId,
              processorToken,
              bankName: accountData.name,
            });

          if (!fundingSourceUrl) {
            throw new Error("Failed to create funding source");
          }

          await createBankAccount({
            userId: user.id,
            bankId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            sharableId: encryptId(accountData.account_id),
          });
        } catch (error) {
          console.error("Error processing account:", accountData.name, error);
          // Continue with next account even if one fails
          continue;
        }
      }
    }

    // Handle the case of liabilities accounts
    const liabilitiesAccounts = allAccounts.filter(
      (account) =>
        account.subtype !== "checking" && account.subtype !== "savings"
    );

    for (const account of liabilitiesAccounts) {
      await createBankAccount({
        userId: user.id,
        bankId,
        accountId: account.account_id,
        accessToken,
        fundingSourceUrl: "",
        sharableId: encryptId(account.account_id),
      });
    }

    // Revalidate path to show the new bank accounts
    revalidatePath("/");

    return {
      publicTokenExchange: "complete",
    };
  } catch (err) {
    console.error("Error in exchangePublicToken:", err);
    throw err; // Re-throw to handle in the UI
  }
};
