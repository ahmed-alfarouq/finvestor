import { auth } from "@/auth";

import NotAvailable from "@/components/not-available";
import PageContainer from "@/components/page-container";
import AccountDetailsBox from "@/components/features/balances/account-details-box";
import AccountTransactions from "@/components/features/balances/account-transactions";

import { getCachedAccounts } from "@/lib/cache/accounts";

import { getBank } from "@/actions/bank";

const AccountDetails = async (props: PageProps<"/balances/[bankId]/[id]">) => {
  const session = await auth();
  if (!session) return;

  const { bankId, id } = await props.params;

  const bank = await getBank(bankId);

  if (!bank)
    return (
      <NotAvailable
        title="Account Details"
        message="Couldn't find the desired account!"
        className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12"
      />
    );

  const accounts = await getCachedAccounts(session.user.id);
  const account = accounts?.find((a) => a.id === id);

  if (!account)
    return (
      <NotAvailable
        title="Account Details"
        message="Couldn't find the desired account!"
        className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12"
      />
    );

  return (
    <PageContainer>
      <AccountDetailsBox account={account} />
      <AccountTransactions accessToken={bank.accessToken} account={account} />
    </PageContainer>
  );
};

export default AccountDetails;
