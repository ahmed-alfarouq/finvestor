import { auth } from "@/auth";

import CardWrapper from "@/components/auth/card-wrapper";
import ConnectBankCard from "@/components/connect-bank-card";

const LinkAccount = async () => {
  const session = await auth();
  if (!session) return;

  return (
    <CardWrapper logo="/img/logo.webp" backLinkText="" backLinkHref="">
      <ConnectBankCard
        user={session.user}
        redirectTo="/overview"
        className="!shadow-none"
      />
    </CardWrapper>
  );
};

export default LinkAccount;
