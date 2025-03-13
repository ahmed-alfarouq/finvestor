"use client";

import Image from "next/image";
import Link from "next/link";
import DarkModeToggle from "../dark-mode-toggle";

const HomeHeader = () => {
  return (
    <header className="flex items-end justify-between px-4 sm:px-8 py-4">
      <Image
        src="/img/logo.webp"
        alt="Finvestor logo - Smart Investment App"
        width={180}
        height={80}
      />
      <div className="flex items-center gap-4">
        <Link
          href="/register"
          className="capitalize bg-primary dark:bg-primary-dark text-white dark:text-white text-lg px-7 py-2 rounded transition-all"
        >
          Register
        </Link>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default HomeHeader;
