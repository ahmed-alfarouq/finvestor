import TargetModal from "@/components/target-modal";
import CategoryIcon from "@/components/expenses-item/category-icon";

import { getTotalExpenses } from "@/lib/transactions";
import { formatAmount, formatCategory } from "@/lib/utils";

import { ExpenseGoalProps } from "@/types";

const ExpenseGoal = ({
  icon,
  goal,
  category,
  categoryTransactions,
}: ExpenseGoalProps) => {
  const totalExpenses = getTotalExpenses(categoryTransactions);

  return (
    <div className="relative flex gap-4 justify-between h-32 rounded-xl border bg-default dark:bg-default-dark card-shadow pl-4 pr-5 py-5">
      <CategoryIcon icon={icon} categoryName={category} itemExpanded={false} />
      <div className="w-full">
        <h3 className="capitalize font-medium mb-1 truncate text-sm text-gray-2 dark:text-gray-5">
          {formatCategory(category).toLowerCase()}
        </h3>
        <div className="flex flex-col">
          <p className="text-default-black dark:text-white text-sm font-bold">
            Goal: {formatAmount(Number(goal))}
          </p>
          <p className="text-default-black dark:text-white text-sm font-bold">
            Spend: {formatAmount(totalExpenses)}
          </p>
        </div>
      </div>
      <TargetModal category={category} />
    </div>
  );
};

export default ExpenseGoal;
