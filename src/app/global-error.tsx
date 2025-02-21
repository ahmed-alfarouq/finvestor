"use client";
import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";

import React from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";

const GlobalError = () => {
  const reload = () => window.location.reload();
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
};

export default GlobalError;
