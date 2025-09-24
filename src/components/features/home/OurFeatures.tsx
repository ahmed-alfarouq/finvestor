import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TrendingUp, Sparkles, ShieldCheck } from "lucide-react";

const whyFinvestor = [
  {
    id: 1,
    icon: (
      <TrendingUp
        size={70}
        className="text-primary dark:text-primary-dark mx-auto"
      />
    ),
    description:
      "Effortlessly track your expenses and investments with clear financial insights.",
  },
  {
    id: 2,
    icon: (
      <Sparkles
        size={70}
        className="text-primary dark:text-primary-dark mx-auto"
      />
    ),
    description:
      "Get AI-driven recommendations tailored to your financial goals.",
  },
  {
    id: 3,
    icon: (
      <ShieldCheck
        size={70}
        className="text-primary dark:text-primary-dark mx-auto"
      />
    ),
    description:
      " Your data is encrypted and protected for complete peace of mind.",
  },
];

const OurFeatures = () => {
  return (
    <section className="container mx-auto py-14 px-4">
      <header className="mb-6 w-fit mx-auto lg:w-full">
        <span className="block text-primary dark:text-primary-dark mb-2">
          Our Features
        </span>
        <h2 className="capitalize text-2xl">provide our features</h2>
      </header>
      <div className="flex items-center lg:items-stretch justify-center gap-5 flex-wrap lg:flex-nowrap">
        <Image
          src="/img/feature.webp"
          alt=""
          width={600}
          height={400}
          className="rounded-sm w-full lg:w-[500px] xl:w-[600px]"
        />
        <div>
          <p className="text-center lg:text-left mb-5">
            Finvestor empowers you to track and manage your finances with
            precision and ease.
          </p>
          <article className="grid gird-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-4">
            {whyFinvestor.map((reason) => (
              <Card key={reason.id} className="text-center">
                <CardHeader>
                  <CardTitle>{reason.icon}</CardTitle>
                </CardHeader>
                <CardContent>{reason.description}</CardContent>
              </Card>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
};

export default OurFeatures;
