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
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold text-red-600 sm:text-5xl">
        Something went wrong!
      </h1>

      <div className="mb-6 max-w-2xl text-left">
        <p className="mb-2 text-lg">
          <span className="font-semibold text-gray-300">Error Name: </span>
          <span className="text-gray-100">{error.name}</span>
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-300">Description: </span>
          <span className="text-gray-100">{error.message}</span>
        </p>
      </div>

      {process.env.NODE_ENV === "development" && error.stack && (
        <div className="w-full max-w-2xl text-left">
          <h2 className="mb-2 text-lg font-semibold text-gray-300">
            Stack Trace:
          </h2>
          <pre className="max-h-[60vh] w-full overflow-auto rounded-lg bg-[#1e1e1e] p-4 text-sm text-gray-100">
            <code>{error.stack}</code>
          </pre>
        </div>
      )}

      <Button
        size="lg"
        className="mt-6 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
        onClick={reload}
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorBoundary;
