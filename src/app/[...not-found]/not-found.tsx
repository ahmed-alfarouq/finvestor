"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { AiOutlineWindows } from "react-icons/ai";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-3">
      <div className="text-center max-w-md w-full">
        <span className="text-8xl sm:text-9xl font-black text-default-black dark:text-gray-6">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-foregroun mt-8 mb-4">
          Not Found!
        </h1>
        <p className="text-muted-foreground mb-4">Oops something went wrong</p>

        <Link href="/overview" className="block">
          <Button size="lg" className="w-full">
            Back to Overview <AiOutlineWindows size={24} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
