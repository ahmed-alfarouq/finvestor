"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

import { Button } from "@/components/ui/button";

import { createLinkToken, exchangePublicToken } from "@/actions/plaid";

import { PlaidLinkProps } from "@/types";

const PlaidLink = ({
  user,
  variant,
  title,
  icon,
  accountType = "normal",
  handleSuccess = () => {},
  handleExit = () => {},
  onClick = () => {},
  disableLink = false,
  className,
}: PlaidLinkProps) => {
  const { update } = useSession();
  const [token, setToken] = useState("");
  const [disabled, setDisabled] = useState(disableLink);

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user, accountType);
      if (data && data.linkToken) setToken(data?.linkToken);
    };
    getLinkToken();
  }, []);

  const onSuccess = useCallback(
    async (public_token: string) => {
      setDisabled(true);
      const res = await exchangePublicToken({
        publicToken: public_token,
        user,
        accountType,
      });
      await update();
      if (res && res.publicTokenExchange === "complete") {
        handleSuccess();
      }
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    onExit: () => handleExit(),
  };

  const { open, ready } = usePlaidLink(config);

  const handleClick = () => {
    onClick();
    open();
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      disabled={!ready || disabled || disableLink}
      className={className}
    >
      {icon && (
        <Image src={icon} alt="Connect bank account" width={24} height={24} />
      )}
      {title ? title : "Connect Bank"}
    </Button>
  );
};

export default PlaidLink;
