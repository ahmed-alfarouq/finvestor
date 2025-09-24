import Link from "next/link";
import { auth } from "@/auth";

const NavbarLinks = async () => {
  const session = await auth();

  return (
    <>
      {session ? (
        <Link
          href="/overview"
          className="capitalize bg-primary dark:bg-primary-dark text-white dark:text-white text-lg px-7 py-2 rounded transition-all"
        >
          Dashboard
        </Link>
      ) : (
        <>
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
    </>
  );
};

export default NavbarLinks;
