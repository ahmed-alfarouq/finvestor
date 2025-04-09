import React from "react";
import { NavView } from "./calendar";
import { Button } from "../button";

function CaptionLabel({
  children,
  showYearSwitcher,
  navView,
  setNavView,
  displayYears,
  ...props
}: {
  showYearSwitcher?: boolean;
  navView: NavView;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  displayYears: { from: number; to: number };
} & React.HTMLAttributes<HTMLSpanElement>) {
  if (!showYearSwitcher) return <span {...props}>{children}</span>;
  return (
    <Button
      className="h-7 w-full truncate text-sm font-medium"
      variant="ghost"
      size="sm"
      onClick={() => setNavView((prev) => (prev === "days" ? "years" : "days"))}
    >
      {navView === "days"
        ? children
        : displayYears.from + " - " + displayYears.to}
    </Button>
  );
}

export default CaptionLabel;
