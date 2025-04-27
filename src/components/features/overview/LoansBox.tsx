import Link from "next/link";

import LoanItem from "@/components/loan-item";

import { ArrowRight } from "lucide-react";

import { Loan } from "@/types";
import { cn } from "@/lib/utils";

const LoansBox = ({ loans }: { loans: Loan[] }) => {
  return (
    <section>
      <header className="flex items-center justify-between">
        <h2 className="card-title">Loans</h2>
        {loans.length > 0 && (
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
          "sm:h-72 flex flex-col items-center gap-4 sm:gap-6 rounded-xl border bg-default dark:bg-default-dark card-shadow p-4 sm:px-7 sm:py-5 overflow-y-auto",
          !loans.length && "justify-center"
        )}
      >
        {loans.length ? (
          loans.map((loan) => <LoanItem key={loan.accountId} loan={loan} />)
        ) : (
          <p className="text-center sm:text-xl text-gray-1 dark:text-gray-7">
            No loans found, please connect your student/mortgage accounts to see
            your loans
          </p>
        )}
      </div>
    </section>
  );
};

export default LoansBox;
