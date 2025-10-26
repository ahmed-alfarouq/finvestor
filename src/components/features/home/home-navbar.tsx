import Image from "next/image";

import DarkModeToggle from "@/components/dark-mode-toggle";
import NavbarLinks from "./components/navbar-links";

const HomeNavbar = () => {
  return (
    <header className="flex items-end justify-center sm:justify-between flex-wrap sm:flex-nowrap gap-10 px-4 sm:px-8 py-4">
      <Image
        src="/img/logo.webp"
        alt="Finvestor logo - Smart Investment App"
        width={180}
        height={80}
        priority
      />
      <div className="flex items-center gap-4">
        <NavbarLinks />
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default HomeNavbar;
