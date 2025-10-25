import AnimatedCounter from "@/components/animated-counter";

import { formatDateTime } from "@/lib/utils";

import { ExpensesItemBodyProps } from "@/types";

const ExpensesItemBody = ({ name, amount, date }: ExpensesItemBodyProps) => {
  return (
    <div className="flex justify-between pl-4 xl:pl-6 pt-3 pr-5 pb-5 border-b last:border-b-0 border-special-1 dark:border-gray-5">
      <h3 className="text-base font-semibold text-secondary-color dark:text-secondary-color-dark">
        {name}
      </h3>
      <div className="flex flex-col gap-1 text-right">
        <AnimatedCounter
          amount={amount}
          className="text-base font-semibold text-secondary-color dark:text-secondary-color-dark"
        />
        <span className="text-sm text-gray-3 dark:text-gray-5">
          {formatDateTime(new Date(date)).dateOnly}
        </span>
      </div>
    </div>
  );
};

export default ExpensesItemBody;
