"use client";
import useCurrentUser from "@/hooks/use-current-user";
import { useBanksDataContext } from "@/context/BanksDataContext";

import ExpenseGoal from "./components/expense-goal";

import { splitTransactionsByCategory } from "@/lib/transactions";
import NotAvailable from "@/components/not-available";

const ExpensesGoals = () => {
  const user = useCurrentUser();
  const { transactions } = useBanksDataContext();

  const expensesGoals = user?.expensesGoals;
  const getCategoryGoal = (category: string) =>
    expensesGoals?.find((g) => g.category === category)?.amount;

  const transactionsByCategories = splitTransactionsByCategory([
    ...transactions,
  ]);
  const categories = Object.keys(transactionsByCategories);

  return (
    <section>
      <h2 className="card-title">Expenses Goals By Category</h2>

      <div className="w-full flex flex-col xs:grid xs:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {!!categories.length ? (
          categories.map((category) => (
            <ExpenseGoal
              key={category}
              icon={transactionsByCategories[category][0].category_icon}
              category={category}
              categoryTransactions={transactionsByCategories[category]}
              goal={getCategoryGoal(category) || "0"}
            />
          ))
        ) : (
          <NotAvailable
            title=""
            message="Oops! No transactions to show. Try connecting a checking or savings account."
          />
        )}
      </div>
    </section>
  );
};

export default ExpensesGoals;
