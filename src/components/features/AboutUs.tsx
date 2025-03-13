import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  return (
    <section className="container mx-auto py-14 px-4">
      <header className="mb-6 w-fit mx-auto lg:w-full">
        <span className="block text-primary dark:text-primary-dark mb-2">
          About Us
        </span>
        <h2 className="capitalize text-2xl">Discover Finvestor</h2>
      </header>
      <div className=" flex flex-wrap lg:flex-nowrap">
        <div className="mb-6 lg:mb-0 text-center lg:text-left">
          <h3 className="text-xl font-semibold">
            Designed for Individuals & Business Owners Like You
          </h3>
          <p className="text-gray-1 dark:text-gray-4 mt-3">
            Finvestor simplifies financial management, helping you track
            expenses, manage investments, and achieve financial growth—all in
            one powerful tool.
          </p>
          <ul className="list-none mt-4 space-y-2">
            <li className="flex justify-center lg:justify-start items-center gap-3">
              <CheckCircle
                size={20}
                className="text-primary dark:text-primary-dark"
              />
              Gain real-time insights into your finances.
            </li>
            <li className="flex justify-center lg:justify-start items-center gap-3">
              <CheckCircle
                size={20}
                className="text-primary dark:text-primary-dark"
              />
              Receive AI-powered investment recommendations.
            </li>
            <li className="flex justify-center lg:justify-start items-center gap-3">
              <CheckCircle
                size={20}
                className="text-primary dark:text-primary-dark"
              />
              Enjoy a secure, user-friendly financial experience.
            </li>
          </ul>
          <Link
            href="/register"
            className="mt-5 mx-auto lg:mx-0 block w-fit capitalize bg-primary dark:bg-primary-dark text-white dark:text-white text-lg px-7 py-3 rounded transition-all"
          >
            Get Started
          </Link>
        </div>
        <Image
          src="/img/about.webp"
          alt=""
          width={600}
          height={400}
          className="rounded-sm w-full lg:w-[400] xl:w-[600]"
        />
      </div>
    </section>
  );
};

export default AboutUs;
