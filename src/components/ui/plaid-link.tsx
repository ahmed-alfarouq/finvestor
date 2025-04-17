import { useCallback, useEffect, useState } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { createLinkToken, exchangePublicToken } from "@/actions/plaid";

import { Button } from "./button";
import { PlaidLinkProps } from "@/types";

const PlaidLink = ({ user, variant, icon, className }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      if (data && data.linkToken) setToken(data?.linkToken);
    };
    getLinkToken();
  }, []);

  const onSuccess = useCallback(
    async (public_token: string) => {
      setDisabled(true);
      await exchangePublicToken({ publicToken: public_token, user });
      router.push("/overview");
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <Button
      variant={variant}
      onClick={() => open()}
      disabled={!ready || disabled}
      className={className}
    >
      {icon && (
        <Image src={icon} alt="Connect bank account" width={24} height={24} />
      )}
      Connect Bank
    </Button>
  );
};

export default PlaidLink;
