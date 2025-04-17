"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { cn, formUrlQuery } from "@/lib/utils";
import { BankTabItemProps } from "@/types";

export const BankTabItem = ({ account, id }: BankTabItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isActive = id === account?.bankId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.bankId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={cn(
        `px-2 sm:px-4 py-2 transition-all`,
        isActive &&
          "text-primary dark:text-primary-dark border-b-2 border-primary dark:border-primary-dark"
      )}
    >
      <p className="text-base line-clamp-1 flex-1 font-medium">
        {account.name}
      </p>
    </div>
  );
};
