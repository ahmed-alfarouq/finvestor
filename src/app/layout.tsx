import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";

import Head from "next/head";
import { auth } from "@/auth";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { ThemeProvider } from "next-themes";

import SessionProviderWrapper from "@/components/auth/SessionProviderWrapper";

export const metadata: Metadata = {
  title: {
    default: "Finvestor",
    template: "Finvestor | %s",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = (await cookies()).get("theme")?.value || "light";
  const session = await auth();
  return (
    <html lang="en" className={theme} suppressHydrationWarning>
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
        className={`bg-body text-black dark:bg-body-dark dark:text-white ${inter.className} overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProviderWrapper session={session}>
            {children}
          </SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
