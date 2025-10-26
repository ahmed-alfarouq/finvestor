import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";

import { Metadata } from "next";
import { cookies } from "next/headers";

import Providers from "@/components/providers";
import ScreenSizeBadge from "@/components/screen-size-badge";

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

  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <head>
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
      </head>
      <body
        className={`bg-body text-black dark:bg-body-dark dark:text-white ${inter.className} overflow-x-hidden`}
      >
        <ScreenSizeBadge />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
