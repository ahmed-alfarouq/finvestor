"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

type props = {
  to: string;
  text: string;
  style?: string;
  active?: boolean;
  className?: string;
  beforeIcon?: React.ReactElement;
  handleClick?: () => void;
};

const NavLink = ({
  to,
  text,
  style = "primary",
  active = true,
  className,
  beforeIcon,
  handleClick = () => {},
}: props) => {
  return (
    <Link
      href={to}
      className={cn(
        "bg-transparent",
        style === "primary"
          ? "hover:bg-primary text-white"
          : "hover:bg-special-3 text-special-2",
        active && "bg-primary",
        "transition px-4 py-3 rounded flex gap-2 items-center outline-none font-semibold",
        className
      )}
      onClick={handleClick}
    >
      {beforeIcon}
      {text}
    </Link>
  );
};

export default NavLink;
