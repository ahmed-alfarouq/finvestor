"use server";
import { v4 as uuidv4 } from "uuid";
import { plaidClient } from "@/lib/plaid";
import { encryptId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { addFundingSource } from "./dwolla";
import { prisma } from "@/prisma";
import {
  createBankAccountProps,
  exchangePublicTokenProps,
  User,
} from "@/types";

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth", "transactions"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };
    const res = await plaidClient.linkTokenCreate(tokenParams);
    return { linkToken: res.data.link_token };
  } catch (err) {
    console.log(err);
  }
};

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  sharableId,
}: createBankAccountProps) => {
  try {
    await prisma.bankAccount.create({
      data: {
        id: uuidv4(),
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        sharableId,
      },
    });
  } catch (err) {
    console.log(err);
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
    const itemId = res.data.item_id;

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const allAccounts = accountsResponse.data.accounts;
    for (const accountData of allAccounts) {
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

      if (!fundingSourceUrl) throw Error;
      await createBankAccount({
        userId: user.id,
        bankId: itemId,
        accountId: accountData.account_id,
        accessToken,
        fundingSourceUrl,
        sharableId: encryptId(accountData.account_id),
      });
    }
    revalidatePath("/");

    return {
      publicTokenExchange: "complete",
    };
  } catch (err) {
    console.log(err);
  }
};
