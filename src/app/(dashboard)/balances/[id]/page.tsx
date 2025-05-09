import { getTransactions } from "@/actions/bank";
import { getBank } from "@/actions/user/getUserData";

import NotAvailable from "@/components/not-available";
import TransactionsTable from "@/components/features/TransactionsTable";
import AccountDetailsBox from "@/components/features/balances/AccountDetailsBox";

const AccountDetails = async ({
  params,
}: {
  params: Promise<{ [key: string]: string }>;
}) => {
  const { id } = await params;

  const account = await getBank(id);

  if (!account)
    return (
      <NotAvailable
        title="Account Details"
        message="Couldn't find the desired account!"
      />
    );

  // Get all accounts' transactions
  const transactions = await getTransactions(account.accessToken);

  // Get Account transactions
  const filteredTransactions = transactions?.filter(
    (t) => t.accountId === account.accountId
  );

  return (
    <section className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
      <AccountDetailsBox accountId={account.accountId} />
      {filteredTransactions?.length ? (
        <section>
          <h2 className="card-title">Recent Transactions</h2>
          <TransactionsTable transactions={filteredTransactions} />
        </section>
      ) : (
        <NotAvailable
          title="Recent Transaction"
          message="No transactions available."
        />
      )}
    </section>
  );
};

export default AccountDetails;
