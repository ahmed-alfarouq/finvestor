"use client";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="tex-2xl font-bold mb-4">Something went wrong!</h2>
      <Button size="lg" onClick={reset}>
        Refresh
      </Button>
    </main>
  );
}
