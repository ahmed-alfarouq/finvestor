import { formatDateTime } from "@/lib/utils";

import AnimatedCounter from "@/components/animated-counter";

import { Loan } from "@/types";

const LoanItem = ({ loan }: { loan: Loan }) => {
  return (
    <div className="w-full flex items-center gap-3 border-b border-gray-6 pb-4 last:border-b-0">
      <div className="flex flex-col justify-center items-center bg-special-1 rounded-lg py-2 px-3">
        <p className="text-xs text-gray-1 dark:text-gray-7">
          {formatDateTime(new Date(loan.nextPaymentDueDate)).monthShort}
        </p>
        <p className="text-xl font-extrabold text-default-black dark:text-white">
          {formatDateTime(new Date(loan.nextPaymentDueDate)).dayOnly}
        </p>
      </div>
      <div className="flex flex-col justify-between h-full">
        <p className="capitalize font-bold text-secondary-color dark:text-secondary-color-dark">
          {loan.name}
        </p>
        {loan.isOverdue ? (
          <p className="text-xs xs:text-sm text-special-red">
            Overdue by ${loan.lastPaymentAmount.toFixed(0)}
          </p>
        ) : (
          <p className="text-xs xs:text-sm text-gray-3">
            last payment - ${loan.lastPaymentAmount.toFixed(0)}
          </p>
        )}
        <p className="text-xs xs:text-sm text-gray-3">
          last charge -{" "}
          {formatDateTime(new Date(loan.lastPaymentDate)).dateOnly}
        </p>
      </div>
      <AnimatedCounter
        amount={loan.nextMonthlyPayment}
        decimals={0}
        className="min-w-[65px] xs:min-w-20 w-fit text-xs xs:text-sm font-bold flex justify-center items-center ml-auto text-secondary-color dark:text-secondary-color-dark border border-gray-5 rounded-md p-3"
      />
    </div>
  );
};

export default LoanItem;
