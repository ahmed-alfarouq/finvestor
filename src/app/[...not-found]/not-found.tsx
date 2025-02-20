"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md w-full">
        <span className="border-4 border-destructive rounded-full px-4 py-10 text-6xl font-black text-destructive">
          404
        </span>
        <h1 className="text-3xl font-bold text-foregroun mt-14 mb-4">Not Found!</h1>
        <p className="text-muted-foreground mb-4">Please, go back to home page.</p>
        <Link href="/" className="block">
          <Button variant="default" size="lg" className="w-full">
            Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
