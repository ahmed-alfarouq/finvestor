import React from "react";
import Link from "next/link";
import Image from "next/image";
import { randomUUID } from "crypto";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const whyFinvestor = [
  {
    id: randomUUID(),
    title: "Smart Expense & Investment Tracking",
    description:
      "Finvestor helps you effortlessly track your expenses and investments in one place, giving you clear insights into where your money is going.",
  },
  {
    id: randomUUID(),
    title: "Personalized Investment Suggestions",
    description:
      "Get AI-powered recommendations tailored to your financial goals, helping you make smarter investment decisions.",
  },
  {
    id: randomUUID(),
    title: "Secure & Privacy-Focused",
    description:
      "Your financial data is encrypted and protected, so you can manage your money with confidence.",
  },
  {
    id: randomUUID(),
    title: "User-Friendly & Intuitive Design",
    description:
      "With a clean, modern UI, Finvestor makes budgeting and investing simple and enjoyable.",
  },
];

const successStories = [
  {
    id: randomUUID(),
    name: "Ahmed Al-Farouq",
    job: "Owner of Finvestor",
    avatar: "/img/avatar.png",
    description:
      "Finvestor helped me organize my expenses and gain clearer insights into where my money goes.",
  },
  {
    id: randomUUID(),
    name: "Ashley Davis",
    job: "Entrepreneur",
    avatar: "/img/avatar.png",
    description:
      "Finvestor helped me secure my financial future with expert advice!",
  },
  {
    id: randomUUID(),
    name: "Robert Wilson",
    job: "Freelancer",
    avatar: "/img/avatar.png",
    description:
      "Trustworthy, knowledgeable, and dedicated financial advisors at Finvestor!",
  },
  {
    id: randomUUID(),
    name: "Megan Anderson",
    job: "Startup Founder",
    avatar: "/img/avatar.png",
    description:
      "Thanks to Finvestor, I’m on track to achieve my financial goals!",
  },
];

const HomePage = () => {
  return (
    <>
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 shadow-sm">
        <Image
          src="/img/logo.webp"
          alt="Finvestor logo - Smart Investment App"
          width={180}
          height={80}
        />
        <Link
          href="/login"
          className="self-end capitalize font-bold text-default-black text-lg border-b-2 border-transparent hover:border-default-black transition-all"
        >
          Log In
        </Link>
      </header>
      <main className="relative bg-[url('/img/home-banner.webp')] bg-cover bg-center bg-fixed text-white flex flex-col justify-center px-6 py-8 min-h-[500px]">
        <h1 className="text-3xl md:text-4xl font-bold leading-10 xl:leading-[55px] md:w-3/4 xl:w-2/4 mb-4 z-10">
          Build, Invest, Thrive. <br /> Master Your Finances with Finvestor!
        </h1>
        <p className="sm:text-lg font-medium z-10 md:w-3/4 xl:w-2/4">
          Take control of your money like never before! Finvestor helps you
          track expenses, manage investments, and grow your wealth with smart
          insights—all in one powerful app. Start your journey to financial
          freedom today! 💰📈
        </p>
        <div
          className="absolute top-0 right-0 left-0 bottom-0 z-0 bg-default-black opacity-60"
          aria-hidden="true"
        ></div>
      </main>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-4 px-6 py-8">
        <header>
          <h2 className="text-3xl my-3">Why Choose Finvestor</h2>
          <p>Customized insights for your financial journey.</p>
        </header>
        <article className="grid gird-cols-1 sm:grid-cols-2 gap-5 lg:col-span-2">
          {whyFinvestor.map((reason) => (
            <Card key={reason.id}>
              <CardHeader>
                <CardTitle>{reason.title}</CardTitle>
              </CardHeader>
              <CardContent>{reason.description}</CardContent>
            </Card>
          ))}
        </article>
      </section>
      <section className="grid grid-cols-1 gap-6 sm:gap-4 px-6 py-8">
        <header className="mb-3">
          <h2 className="text-3xl my-3">
            Client Success Stories & Testimonials
          </h2>
          <p className="md:w-3/4">
            Explore testimonials showcasing clients’ success stories with
            Finvestor, highlighting the transformative financial journey they’ve
            experienced.
          </p>
        </header>
        <article className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {successStories.map((story) => (
            <Card key={story.id} className="grid grid-rows-auto">
              <CardHeader>
                <CardContent className="px-2">{story.description}</CardContent>
              </CardHeader>
              <CardFooter>
                <Image
                  src={story.avatar}
                  alt=""
                  width={50}
                  height={30}
                  className="rounded-full"
                />
                <CardContent className="pb-3">
                  <CardTitle>{story.name}</CardTitle>
                  <span className="text-sm mt-2 opacity-75">{story.job}</span>
                </CardContent>
              </CardFooter>
            </Card>
          ))}
        </article>
      </section>
      <footer className="shadow p-5 min-h-12 text-center">
        &copy; All rights reserved by Ahmed Al-Farouq.
      </footer>
    </>
  );
};

export default HomePage;
