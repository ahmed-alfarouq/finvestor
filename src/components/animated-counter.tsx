"use client";
import React from "react";
import CountUp from "react-countup";

import { cn } from "@/lib/utils";

const AnimatedCounter = ({
  amount,
  prefix = "$",
  decimal = ".",
  className,
}: {
  amount: number;
  prefix?: string;
  decimal?: string;
  className?: string;
}) => {
  return (
    <div className={cn("w-full", className)}>
      <CountUp decimals={2} prefix={prefix} decimal={decimal} end={amount} />
    </div>
  );
};

export default AnimatedCounter;
