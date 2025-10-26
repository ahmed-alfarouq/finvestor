"use server";
import { plaidClient } from "@/plaid";

import { handleError } from "@/lib/errors/handleError";

import { Loan } from "@/types";
import {
  StudentLoan,
  LiabilitiesObject,
  MortgageLiability,
  CreditCardLiability,
} from "plaid";

/**
 * Pass bank's access token with liability accounts
 * @param accessToken
 * @returns Loans[]
 */
export const getLoans = async (accessToken: string) => {
  try {
    const liabilitiesResponse = await plaidClient.liabilitiesGet({
      access_token: accessToken,
    });

    const liabilities = liabilitiesResponse.data.liabilities;
    const loans: Loan[] = [];
    // Get mortgage and student loans only
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
  } catch (err) {
    handleError(err, "An unexpected error occured while getting loans");
  }
};
