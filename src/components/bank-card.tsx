"use client";
import React from "react";
import Image from "next/image";
import AnimatedCounter from "./animated-counter";

import { cn } from "@/lib/utils";
import { BankCardProps } from "@/types";

const BankCard = ({
  accountNumber,
  type,
  balance,
  className,
  bankName,
}: BankCardProps) => {
  const getCardTypeIcon = () => {
    switch (type) {
      case "visa":
        return "/icons/visa.svg";
      case "mastercard":
        return "/icons/mastercard.svg";
      default:
        return "/icons/mastercard.svg";
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-32 rounded-xl overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />

      <div className="relative p-2 xs:p-6 h-full flex justify-between items-center text-white">
        <div className="flex flex-col xs:justify-between items-start gap-1">
          <h3 className="text-sm font-medium">Bank Name</h3>
          <div className="text-lg font-medium">{bankName}</div>
          <div className="text-sm font-medium text-gray-6">
            {`**** **** **** ${accountNumber}`}
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-[22px]">
          <div className="w-10 h-7 xs:w-14 xs:h-10 relative">
            <Image src={getCardTypeIcon()} alt={type} fill />
          </div>
          <AnimatedCounter
            amount={balance}
            className="text-lg xs:text-xl sm:text-2xl font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default BankCard;
