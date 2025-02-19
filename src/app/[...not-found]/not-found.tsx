"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md w-full space-y-6">
        <div className="flex justify-center mb-4">
          <AlertCircle
            className="text-destructive"
            size={64}
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-3xl font-bold text-foreground">
          something went wrong!
        </h1>

        <p className="text-muted-foreground">Go to home page.</p>

        <Link href="/" className="block">
          <Button variant="default" size="lg" className="w-full">
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
