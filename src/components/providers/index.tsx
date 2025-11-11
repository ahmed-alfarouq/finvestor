"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./react-query-provider";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ReactQueryProvider>
          <SpeedInsights />
          <Analytics />
          {children}
        </ReactQueryProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
