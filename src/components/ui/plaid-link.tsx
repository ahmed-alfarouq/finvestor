import { useCallback, useEffect, useState } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { useRouter } from "next/navigation";

import { createLinkToken, exchangePublicToken } from "@/actions/plaid";

import { Button } from "./button";
import { PlaidLinkProps } from "@/types";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      if (data && data.linkToken) setToken(data?.linkToken);
    };
    getLinkToken();
  }, []);

  const onSuccess = useCallback(
    async (public_token: string) => {
      await exchangePublicToken({ publicToken: public_token, user });
      router.push("/");
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <Button variant={variant} onClick={() => open()} disabled={!ready}>
      Connect Bank
    </Button>
  );
};

export default PlaidLink;
