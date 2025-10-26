import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { successStories } from "@/constants";

const SuccessStories = () => {
  return (
    <section className="container mx-auto py-14 px-4">
      <header className="mb-6 w-fit mx-auto lg:w-full">
        <span className="block text-primary dark:text-primary-dark mb-2">
          Success Stories
        </span>
        <h2 className="capitalize text-2xl">Finvestor&apos;s clients</h2>
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
  );
};

export default SuccessStories;
