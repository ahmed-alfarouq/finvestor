"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import {
  PlaidLinkError,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";

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
  onError = () => {},
  disabled = false,
  className,
}: PlaidLinkProps) => {
  const { update } = useSession();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user, accountType);
      if (data && data.linkToken) setToken(data?.linkToken);
    };
    getLinkToken();
  }, []);

  const onSuccess = useCallback(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      try {
        const res = await exchangePublicToken({
          user,
          accountType,
          publicToken: public_token,
          institutionName: metadata.institution && metadata.institution.name,
        });

        await update();
        if (res && res.publicTokenExchange === "complete") {
          handleSuccess();
        }
      } catch (error) {
        if (typeof error === "string") {
          onError(error);
          return;
        }

        if (error instanceof Error) {
          onError(error.message);
          return;
        }

        onError("An unkown error ocuured while connecting your bank!");
      }
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    onExit: (error: null | PlaidLinkError) => handleExit(error),
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
      disabled={!ready || disabled}
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
