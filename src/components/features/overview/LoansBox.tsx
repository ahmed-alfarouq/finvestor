import { auth } from "@/auth";

import LoanItem from "@/components/loan-item";

import { getCachedLoans } from "@/lib/cache/loans";
import { getCachedUser } from "@/lib/cache/user";

import { cn } from "@/lib/utils";

const LoansBox = async () => {
  const session = await auth();
  if (!session) return;

  const user = await getCachedUser(session.user.id);
  const liabilityBank = user.banks.find((b) => b.areLiabilityAccounts);

  const loans = liabilityBank
    ? await getCachedLoans(user.id, liabilityBank.accessToken)
    : [];

  const hasLoans = loans.length > 0;

  return (
    <section className="box">
      <header className="flex items-center justify-between">
        <h2 className="card-title">Loans</h2>
      </header>

      <div
        className={cn(
          "card overflow-y-auto",
          hasLoans ? "items-start" : "items-center justify-center"
        )}
      >
        {hasLoans ? (
          loans.map((loan) => <LoanItem key={loan.accountId} loan={loan} />)
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
