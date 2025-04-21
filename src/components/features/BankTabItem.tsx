"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { cn, formUrlQuery } from "@/lib/utils";
import { BankTabItemProps } from "@/types";

export const BankTabItem = ({ account, id, className }: BankTabItemProps) => {
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
        `text-secondary-color dark:text-secondary-color-dark py-1 transition-all`,
        className,
        isActive &&
          "text-primary dark:text-primary-dark border-b-2 border-primary dark:border-primary-dark"
      )}
    >
      <p className="text-base line-clamp-1 flex-1 font-bold">
        {account.name}
      </p>
    </div>
  );
};
