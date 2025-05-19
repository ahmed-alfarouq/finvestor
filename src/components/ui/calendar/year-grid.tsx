"use client";
import { useDayPicker } from "react-day-picker";

import { Button } from "../button";
import { NavView } from "./calendar";

import { cn } from "@/lib/utils";

function YearGrid({
  className,
  displayYears,
  setNavView,
  ...props
}: {
  className?: string;
  displayYears: { from: number; to: number };
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { goToMonth, selected } = useDayPicker();

  return (
    <div className={cn("grid grid-cols-4 gap-y-2", className)} {...props}>
      {Array.from(
        { length: displayYears.to - displayYears.from + 1 },
        (_, i) => {
          return (
            <Button
              key={i}
              className={cn(
                "h-7 w-full text-sm font-normal text-foreground",
                displayYears.from + i === new Date().getFullYear() &&
                  "bg-accent font-medium text-accent-foreground"
              )}
              variant="ghost"
              onClick={() => {
                setNavView("days");
                goToMonth(
                  new Date(
                    displayYears.from + i,
                    (selected as Date | undefined)?.getMonth() ?? 0
                  )
                );
              }}
            >
              {displayYears.from + i}
            </Button>
          );
        }
      )}
    </div>
  );
}
export default YearGrid;
