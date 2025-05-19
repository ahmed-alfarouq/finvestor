import Link from "next/link";
import { ArrowRight } from "lucide-react";

import LoanItem from "@/components/loan-item";

import { cn } from "@/lib/utils";

import { Loan } from "@/types";

type LoansBoxProps = {
  loans: Loan[];
  show: number;
};

const LoansBox = ({ loans, show }: LoansBoxProps) => {
  const hasLoans = loans.length > 0;
  const displayedLoans = loans.slice(0, show);

  return (
    <section>
      <header className="flex items-center justify-between">
        <h2 className="card-title">Loans</h2>
        {hasLoans && (
          <Link
            href="/loans"
            className="flex items-center gap-2 text-xs font-medium text-gray-2 dark:text-gray-7"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </header>

      <div
        className={cn(
          "sm:h-72 flex flex-col gap-4 sm:gap-6 rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5 overflow-y-auto",
          hasLoans ? "items-start" : "items-center justify-center"
        )}
      >
        {hasLoans ? (
          displayedLoans.map((loan) => (
            <LoanItem key={loan.accountId} loan={loan} />
          ))
        ) : (
          <p className="text-center sm:text-xl text-gray-1 dark:text-gray-7">
            No loans found. Please connect your student or mortgage accounts to
            see your loans.
          </p>
        )}
      </div>
    </section>
  );
};

export default LoansBox;
