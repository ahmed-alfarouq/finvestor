"use client";
import React, { startTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-destructive dark:text-primary-dark text-5xl font-bold mb-6">
        Something went wrong!
      </div>
      <p className="text-center text-xl min-h-14">
        <span className="block mb-2">
          <strong>Error Name:</strong> {error.name}
        </span>
        <strong>Description:</strong> {error.message}
      </p>
      <Button size="lg" className="mt-3" onClick={reload}>Try Again</Button>
    </div>
  );
};

export default ErrorBoundary;
