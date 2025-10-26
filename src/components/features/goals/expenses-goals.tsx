import { getAllAccountTransactions } from "@/actions/transactions";
import ExpenseGoal from "./components/expense-goal";

import NotAvailable from "@/components/not-available";

import { splitTransactionsByCategory } from "@/lib/transactions";

import { BankAccount, User } from "@/types";
import { Transaction } from "plaid";

const ExpensesGoals = async ({
  expensesAccounts,
  expensesGoals,
}: {
  expensesAccounts: BankAccount[];
  expensesGoals: User["expensesGoals"];
}) => {
  const getCategoryGoal = (category: string) =>
    expensesGoals?.find((g) => g.category === category)?.amount;

  let transactions: Transaction[] = [];

  for (const expensesAccount of expensesAccounts) {
    const t = await getAllAccountTransactions(
      expensesAccount.id,
      expensesAccount.accessToken
    );
    transactions = [...transactions, ...t];
  }

  const transactionsByCategories = splitTransactionsByCategory(transactions);
  const categories = Object.keys(transactionsByCategories);

  return (
    <section>
      <h2 className="card-title">Expenses Goals By Category</h2>
      <div className="w-full flex flex-col xs:grid xs:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {categories.length ? (
          categories.map((category) => (
            <ExpenseGoal
              key={category}
              icon={
                transactionsByCategories[category][0]
                  .personal_finance_category_icon_url
              }
              category={category}
              categoryTransactions={transactionsByCategories[category]}
              goal={getCategoryGoal(category) || "0"}
            />
          ))
        ) : (
          <NotAvailable message="Oops! No categories to show. Try connecting/choosing a checking or savings account." />
        )}
      </div>
    </section>
  );
};

export default ExpensesGoals;
