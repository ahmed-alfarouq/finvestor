"use client";
import React from "react";

const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-2xl font-bold mb-4">Something went wrong!</div>
      <p className="text-center">{error.message}</p>
    </div>
  );
};

export default ErrorBoundary;
