"use client";

import { useTheme } from "next-themes";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { formatAmount } from "@/lib/utils";

import { CircledProgressBarProps } from "@/types";

const CircledProgressBar = ({
  targetAmount,
  achievedAmount,
}: CircledProgressBarProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const progress = (achievedAmount / targetAmount) * 100;

  return (
    <div className="relative w-2/3 xs:w-[60%] md:w-[38%] lg:w-[28%] xl:w-5/12 2xl:w-[29%] 3xl:w-4/12 4xl:w-2/12 mx-auto 3xl:mx-1">
      <CircularProgressbar
        value={progress}
        strokeWidth={8}
        circleRatio={0.5}
        styles={buildStyles({
          rotation: 0.75,
          pathColor: "rgb(45, 182, 163)",
          trailColor: isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        })}
      />

      <span className="absolute top-2/3 -left-1 transform -translate-y-2/3">
        {formatAmount(0, true)}
      </span>
      <span className="absolute top-2/3 -right-1 transform -translate-y-2/3">
        {formatAmount(targetAmount, true)}
      </span>

      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-center">
        <p className="font-semibold text-default-black dark:text-gray-7">
          {formatAmount(achievedAmount, true)}
        </p>
      </div>
      <p className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-2/3 w-full text-xs font-medium text-default-black dark:text-gray-7 mt-2 text-center whitespace-nowrap">
        Target vs Achievement
      </p>
    </div>
  );
};

export default CircledProgressBar;
