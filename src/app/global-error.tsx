"use client";
import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";

import React, { useEffect }  from "react";
import * as Sentry from "@sentry/nextjs";

import Head from "next/head";
import Error from "next/error";

import { Button } from "@/components/ui/button";

export default function GlobalError({ error }: { error: Error }) {
  const reload = () => window.location.reload();
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body
        className={`bg-white text-black dark:bg-gray-900 dark:text-white ${inter.className}`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="tex-2xl font-bold mb-4">Something went wrong!</h2>
          <Button size="lg" onClick={reload}>
            Refresh
          </Button>
        </div>
      </body>
    </html>
  );
}