"use client";
import CountUp from "react-countup";

import { cn } from "@/lib/utils";

import { AnimatedCounterProps } from "@/types";

const AnimatedCounter = ({
  amount,
  prefix = "$",
  decimal = ".",
  decimals = 2,
  className,
}: AnimatedCounterProps) => {
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
