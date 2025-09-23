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
  Products,
} from "plaid";

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

    const { accounts: allAccounts } = await getPlaidAccountsSafely(
      accessToken,
      accountType
    );

    await processAccounts(allAccounts, accountType, accessToken, itemId, user);

    // Remove cache to show the new bank accounts
    revalidatePath("/");

    return {
      publicTokenExchange: "complete",
    };
  } catch (err) {
    console.error("Error in exchangePublicToken:", err);
    throw err;
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

const processAccounts = async (
  accounts: AccountBase[],
  accountType: ConnectAccountType,
  accessToken: string,
  bankId: string,
  user: User
) => {
  for (const account of accounts) {
    await createBankAccount({
      userId: user.id,
      bankId,
      accountId: account.account_id,
      accessToken,
      sharableId: encryptId(account.account_id),
      isLiabilityAccount: accountType === "liability",
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
