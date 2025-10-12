import Image from "next/image";
import Link from "next/link";

const MainBanner = () => {
  return (
    <main className="container mx-auto py-14 px-4 flex flex-wrap lg:flex-nowrap justify-center items-center lg:items-start lg:gap-4">
      <div className="flex flex-col justify-center items-center lg:items-start mb-10 lg:mb-0 text-center lg:text-left gap-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-10 lg:leading-[45px]">
          Build, Invest, Thrive.{" "}
          <span className="text-primary dark:text-primary-dark">
            Master Your Finances with Finvestor!
          </span>
        </h1>
        <p className="sm:text-md font-medium">
          Take control of your money like never before! Finvestor helps you
          track expenses, manage investments, and grow your wealth with smart
          insights—all in one powerful app. Start your journey to financial
          freedom today! 💰📈
        </p>
        <Link
          href="/register"
          className="capitalize bg-primary dark:bg-primary-dark text-white dark:text-white text-lg px-7 py-2 rounded transition-all"
        >
          try for FREE
        </Link>
      </div>
      <Image
        src="/img/finance.svg"
        alt=""
        width={650}
        height={400}
        priority
        className="lg:w-[600]"
      />
    </main>
  );
};

export default MainBanner;
