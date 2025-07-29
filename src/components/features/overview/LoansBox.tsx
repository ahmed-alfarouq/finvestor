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
    <section className="box">
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
          "card",
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
