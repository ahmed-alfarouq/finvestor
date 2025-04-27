"use client";
import React from "react";
import CountUp from "react-countup";

import { cn } from "@/lib/utils";

const AnimatedCounter = ({
  amount,
  prefix = "$",
  decimal = ".",
  decimals = 2,
  className,
}: {
  amount: number;
  prefix?: string;
  decimal?: string;
  decimals?: number;
  className?: string;
}) => {
  return (
    <div className={cn("w-full", className)}>
      <CountUp
        decimals={decimals}
        prefix={prefix}
        decimal={decimal}
        end={amount}
      />
    </div>
  );
};

export default AnimatedCounter;
