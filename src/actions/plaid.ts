"use server";
import { revalidatePath } from "next/cache";

import { encryptId } from "@/lib/utils";
import { plaidClient } from "@/plaid";
import { createBankAccount } from "@/actions/user/updateUser";

import {
  AccountBase,
  CountryCode,
  CreditAccountSubtype,
  DepositoryAccountSubtype,
  LinkTokenAccountFilters,
  LinkTokenCreateRequest,
  LoanAccountSubtype,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { addFundingSource } from "./dwolla";

import { ConnectAccountType, exchangePublicTokenProps, User } from "@/types";

export const createLinkToken = async (
  user: User,
  accountType: ConnectAccountType
) => {
  try {
    const accountFilters = getAccountFilters(accountType);
    const products = getAccountProducts(accountType);

    const tokenParams: LinkTokenCreateRequest = {
      user: {
        client_user_id: user.id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products,
      language: "en",
      country_codes: ["US"] as CountryCode[],
      account_filters: accountFilters,
    };
    const res = await plaidClient.linkTokenCreate(tokenParams);
    return { linkToken: res.data.link_token };
  } catch (err) {
    console.error("Error creating link token:", err);
    throw new Error("Error creating link token");
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
  accountType,
}: exchangePublicTokenProps) => {
  try {
    const { accessToken, itemId } = await exchangePlaidToken(publicToken);

    const { accounts: allAccounts, item } = await getPlaidAccountsSafely(
      accessToken,
      accountType
    );

    const res = await processDwollaEligibleAccounts(
      allAccounts,
      accessToken,
      itemId,
      item.institution_name!,
      user
    );

    if (res?.error) {
      return { error: res.error };
    }

    // Handle the case of liabilities accounts
    await processLiabilityAccounts(allAccounts, accessToken, itemId, user);

    // Remove cache to show the new bank accounts
    revalidatePath("/");

    return {
      publicTokenExchange: "complete",
    };
  } catch (err) {
    console.error("Error in exchangePublicToken:", err);
    throw err; // Re-throw to handle in the UI
  }
};

const exchangePlaidToken = async (publicToken: string) => {
  const res = await plaidClient.itemPublicTokenExchange({
    public_token: publicToken,
  });
  return {
    accessToken: res.data.access_token,
    itemId: res.data.item_id,
  };
};

const getPlaidAccountsSafely = async (
  accessToken: string,
  type: ConnectAccountType
) => {
  try {
    if (type === "liability") {
      const response = await plaidClient.liabilitiesGet({
        access_token: accessToken,
      });
      return response.data;
    }
    const response = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const processDwollaEligibleAccounts = async (
  accounts: AccountBase[],
  accessToken: string,
  bankId: string,
  bankName: string,
  user: User
) => {
  /**
   ** Dwolla only supports checking and savings accounts for processor tokens
   */
  const eligibleAccounts = accounts.filter(
    (a) => a.subtype === "checking" || a.subtype === "savings"
  );

  for (const account of eligibleAccounts) {
    try {
      const processorToken = await plaidClient.processorTokenCreate({
        access_token: accessToken,
        account_id: account.account_id,
        processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
      });

      const fundingSourceUrl = await addFundingSource({
        dwollaCustomerId: user.dwollaCustomerId,
        processorToken: processorToken.data.processor_token,
        bankName: bankName || account.name,
      });

      if (!fundingSourceUrl)
        return { error: "Funding source creation failed!" };

      await createBankAccount({
        userId: user.id,
        bankId,
        accountId: account.account_id,
        accessToken,
        fundingSourceUrl,
        sharableId: encryptId(account.account_id),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      // Fallback for unknown error types
      throw new Error(`Failed Dwolla setup for account ${account.name}`);
    }
  }
};

const processLiabilityAccounts = async (
  accounts: AccountBase[],
  accessToken: string,
  bankId: string,
  user: User
) => {
  const liabilities = accounts.filter(
    (a) => a.subtype !== "checking" && a.subtype !== "savings"
  );

  for (const account of liabilities) {
    await createBankAccount({
      userId: user.id,
      bankId,
      accountId: account.account_id,
      accessToken,
      fundingSourceUrl: "",
      sharableId: encryptId(account.account_id),
    });
  }
};

const getAccountFilters = (accountType: ConnectAccountType) => {
  if (accountType === "liability") {
    const liabilitiesFilter: LinkTokenAccountFilters = {
      credit: {
        account_subtypes: [CreditAccountSubtype.CreditCard],
      },
      loan: {
        account_subtypes: [
          LoanAccountSubtype.Student,
          LoanAccountSubtype.Loan,
          LoanAccountSubtype.Mortgage,
        ],
      },
    };
    return liabilitiesFilter;
  }

  const depositoryFilter: LinkTokenAccountFilters = {
    depository: {
      account_subtypes: [
        DepositoryAccountSubtype.Checking,
        DepositoryAccountSubtype.Savings,
      ],
    },
  };
  return depositoryFilter;
};

const getAccountProducts = (accounType: ConnectAccountType) => {
  if (accounType === "liability") {
    return ["auth", "transactions", "liabilities"] as Products[];
  }
  return ["auth", "transactions"] as Products[];
};
