"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UseSessionContext } from "@/context/SessionContext";

import CardWrapper from "@/components/auth/CardWrapper";
import PlaidLink from "@/components/ui/plaid-link";
import Loading from "@/app/loading";

import { cn } from "@/lib/utils";

const LinkAccount = () => {
  const router = useRouter();
  const { session } = UseSessionContext();

  const [collectingData, setCollectingData] = useState(false);
  const [disableLinks, setDisableLinks] = useState(false);

  useEffect(() => {
    if (!session) return;

    if (session.user.bankAccounts.length > 0) {
      router.push("/overview");
    }
  }, [session?.user.bankAccounts, router]);

  const handleSuccess = () => {
    setCollectingData(false);
    router.push("/overview");
  };

  const handleExit = () => {
    setCollectingData(false);
    setDisableLinks(false);
  };

  const handleClick = () => {
    setCollectingData(true);
    setDisableLinks(true);
  };

  return !session ? (
    <Loading />
  ) : (
    <CardWrapper logo="/img/logo.webp" backLinkText="" backLinkHref="">
      <div className="flex flex-col gap-4 justify-center items-center">
        <PlaidLink
          user={session.user}
          handleSuccess={handleSuccess}
          handleExit={handleExit}
          onClick={handleClick}
          disableLink={disableLinks}
        />
        <p
          className={cn(
            "flex justify-center items-center gap-2",
            "before:block before:border before:border-primary before:after:border-primary-dark before:w-32 before:max-w-[30%]",
            "after:block after:border after:border-primary dark:after:border-primary-dark after:w-32 after:max-w-[30%]"
          )}
        >
          Or
        </p>
        <PlaidLink
          user={session.user}
          handleSuccess={handleSuccess}
          handleExit={handleExit}
          onClick={handleClick}
          accountType="liability"
          title="Connect Liability Accounts"
          disableLink={disableLinks}
        />
        <p className="font-medium text-default-black dark:text-gray-7">
          {collectingData && (
            <span className="flex items-center gap-2">
              Collecting data
              <span className="bg-transparent animate-spin border border-gray-2 dark:border-gray-7 !border-b-transparent rounded-full h-5 w-5"></span>
            </span>
          )}
        </p>
      </div>
    </CardWrapper>
  );
};

export default LinkAccount;
