"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import TargetForm from "@/components/target-form";
import ModalWrapper from "@/components/modal-wrapper";
import CategoryIcon from "@/components/expenses-item/category-icon";

import { PenIcon } from "lucide-react";

import { getTotalExpenses } from "@/lib/transactions";
import { formatAmount, formatCategory } from "@/lib/utils";

import { Transaction } from "@/types";

const ExpenseGoal = ({
  icon,
  goal,
  category,
  categoryTransactions,
}: {
  icon?: string;
  category: string;
  goal: string;
  categoryTransactions: Transaction[];
}) => {
  const [modalOpened, setModalOpened] = useState(false);

  const toggleModal = () => setModalOpened((prev) => !prev);

  const totalExpenses = getTotalExpenses(categoryTransactions);

  return (
    <div className="flex gap-4 justify-between h-32 rounded-xl border bg-default dark:bg-default-dark card-shadow pl-4 pr-5 py-5">
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
      <Button
        variant="outline"
        className="font-medium my-auto text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark"
        onClick={toggleModal}
      >
        Adjust <PenIcon size={16} className="ml-2" />
      </Button>
      <ModalWrapper isOpen={modalOpened} close={toggleModal}>
        <TargetForm category={category} />
      </ModalWrapper>
    </div>
  );
};

export default ExpenseGoal;
