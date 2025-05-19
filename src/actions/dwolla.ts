"use server";

import {
  AddFundingSourceParams,
  CreateFundingSourceOptions,
  NewDwollaCustomerParams,
  TransferParams,
  BankAccountProps,
  UpdateDwollaCutomerInfoParams,
  DwollaError,
  DwollaApiError,
} from "@/types";
import { Client } from "dwolla-v2";

const getEnvironment = (): "production" | "sandbox" => {
  const environment = process.env.DWOLLA_ENV as string;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to `sandbox` or `production`"
      );
  }
};

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch {
    throw new Error("Creating an On Demand Authorization Failed");
  }
};

// Create a Dwolla Funding Source using a Plaid Processor Token
export const createFundingSource = async (
  options: CreateFundingSourceOptions
): Promise<string> => {
  try {
    const res = await dwollaClient.post(
      `customers/${options.customerId}/funding-sources`,
      {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      }
    );
    return res.headers.get("location")!;
  } catch (error: unknown) {
    // If error is a Dwolla error object (with code and message)
    if (
      typeof error === "object" &&
      error !== null &&
      "body" in error &&
      typeof error.body === "object" &&
      error.body !== null
    ) {
      const dwollaError = error as DwollaApiError;

      if (dwollaError.body.code === "DuplicateResource") {
        throw new Error("This bank account is already linked.");
      }

      throw new Error(dwollaError.message);
    }

    // If error is a normal Error instance
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    // Fallback for unknown error types
    throw new Error("An unknown Dwolla error occurred.");
  }
};

export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams): Promise<string> => {
  try {
    // create dwolla auth link
    const dwollaAuthLinks = await createOnDemandAuthorization();

    // add funding source to the dwolla customer & get the funding source url
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };
    return await createFundingSource(fundingSourceOptions);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    // Fallback for unknown error types
    throw new Error("An unknown Dwolla error occurred.");
  }
};

export const removeFundingSources = async (
  bankAccounts: BankAccountProps[]
) => {
  try {
    for (const bankAccount of bankAccounts) {
      // Some accounts are not Dwolla accounts, so we need to check if the there is a funding source url
      if (bankAccount.fundingSourceUrl) {
        const response = await dwollaClient.post(bankAccount.fundingSourceUrl, {
          removed: true,
        });
        if (response.status !== 200) {
          return { error: "Failed to remove funding source" };
        }
      }
    }
    return { success: "Funding sources removed successfully" };
  } catch (error) {
    console.error("Error removing funding source:", error);
    return { error: "Failed to remove funding source" };
  }
};

export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
) => {
  try {
    return await dwollaClient
      .post("customers", newCustomer)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Dwolla Customer Failed: ", err);
    throw err; // For UI handling
  }
};

export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };
    return await dwollaClient
      .post("transfers", requestBody)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};

export const updateDwollaCustomerInfo = async ({
  dwollaCustomerId,
  updateFields,
}: UpdateDwollaCutomerInfoParams) => {
  try {
    await dwollaClient.post(`customers/${dwollaCustomerId}`, updateFields);
    return { success: "Dwolla customer info updated successfully" };
  } catch (error: unknown) {
    const dwollaError = error as DwollaError;
    console.error("Failed to update customer info: ", dwollaError.message);
    throw new Error("Failed to update customer info: " + dwollaError.message);
  }
};
