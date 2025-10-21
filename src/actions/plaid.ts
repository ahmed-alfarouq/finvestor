"use server";

import { plaidClient } from "@/plaid";
import { createBank } from "@/actions/bank";

import { handleError } from "@/lib/errors/handleError";

import {
  Products,
  CountryCode,
  ItemGetResponse,
  LoanAccountSubtype,
  AccountsGetResponse,
  CreditAccountSubtype,
  ItemWithConsentFields,
  LinkTokenCreateRequest,
  LiabilitiesGetResponse,
  LinkTokenAccountFilters,
  DepositoryAccountSubtype,
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
    handleError(
      err,
      "An unexpected error happened while creating link token"
    );
  }
};

export const exchangePublicToken = async ({
  user,
  publicToken,
  accountType,
  institutionName,
}: exchangePublicTokenProps) => {
  try {
    const { accessToken, itemId } = await exchangePlaidToken(publicToken);

    const userId = user.id;
    await createBank({
      name: institutionName || "Unknown Bank Name",
      userId,
      bankId: itemId,
      accessToken,
      areLiabilityAccounts: accountType === "liability",
    });

    return {
      publicTokenExchange: "complete",
    };
  } catch (err) {
    throw handleError(
      err,
      "An unexpected error happened while connecting to your bank"
    );
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

export const getPlaidAccount = async (
  accessToken: string,
  accountId: string
) => {
  const response = await plaidClient.accountsGet({
    access_token: accessToken,
    options: {
      account_ids: [accountId],
    },
  });
  return response.data;
};

export const getPlaidAccountsSafely = async (
  accessToken: string,
  type: ConnectAccountType
): Promise<LiabilitiesGetResponse | AccountsGetResponse> => {
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

export const getInstitution = async (
  accessToken: string
): Promise<ItemWithConsentFields | undefined> => {
  try {
    const res: ItemGetResponse = await plaidClient.itemGet({
      access_token: accessToken,
    });

    return res.item;
  } catch (err) {
    handleError(
      err,
      "An unexpeceted error happened while getting institution info."
    );
  }
};
