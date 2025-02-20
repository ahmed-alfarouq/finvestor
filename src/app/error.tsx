"use client";
import React from "react";

const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-destructive text-5xl font-bold mb-6">
        Something went wrong!
      </div>
      <p className="text-center text-xl min-h-14">
        <span className="block mb-2">
          <strong>Error Name:</strong> {error.name}
        </span>
        <strong>Description:</strong> {error.message}
      </p>
    </div>
  );
};

export default ErrorBoundary;
