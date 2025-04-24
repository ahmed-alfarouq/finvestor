"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UseSessionContext } from "@/context/SessionContext";

import CardWrapper from "@/components/auth/CardWrapper";
import PlaidLink from "@/components/ui/plaid-link";
import Loading from "@/app/loading";

const LinkAccount = () => {
  const [collectingData, setCollectingData] = useState(false);
  const { session } = UseSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (!session) return;

    if (session.user.bankAccounts.length > 0) {
      router.push("/overview");
    }
  }, [session?.user.bankAccounts, router]);

  const handleSuccess = () => {
    setCollectingData(false);
    /**
     * This is a workaround to refresh the page after the user has linked their account
     * Can't use router because it doesn't refresh the entire session
     */
    window.location.href = "/overview";
  };

  const handleExit = () => {
    setCollectingData(false);
  };

  const handleClick = () => {
    setCollectingData(true);
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
