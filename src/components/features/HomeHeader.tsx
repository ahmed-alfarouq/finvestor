"use client";

import Image from "next/image";
import Link from "next/link";

import DarkModeToggle from "../dark-mode-toggle";
import useCurrentUser from "@/hooks/use-current-user";

const HomeHeader = () => {
  const user = useCurrentUser();
  return (
    <header className="flex items-end justify-center sm:justify-between flex-wrap sm:flex-nowrap gap-10 px-4 sm:px-8 py-4">
      <Image
        src="/img/logo.webp"
        alt="Finvestor logo - Smart Investment App"
        width={180}
        height={80}
      />
      <div className="flex items-center gap-4">
        {!!user ? (
          <Link
            href="/overview"
            className="capitalize bg-primary dark:bg-primary-dark text-white dark:text-white text-lg px-7 py-2 rounded transition-all"
          >
            Dashboard
          </Link>
        ) : (
          <>
            {" "}
            <Link
              href="/register"
              className="capitalize bg-primary dark:bg-primary-dark text-white dark:text-white text-lg px-7 py-2 rounded transition-all"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="capitalize bg-transparent text-default-black border border-default-black dark:border-white dark:text-white text-lg px-7 py-2 rounded transition-all"
            >
              Login
            </Link>
          </>
        )}

        <DarkModeToggle />
      </div>
    </header>
  );
};

export default HomeHeader;
