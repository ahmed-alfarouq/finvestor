import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import Head from "next/head";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import { ThemeProvider } from "next-themes";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import AppSidebar from "@/components/AppSidebar";
import { cn } from "@/lib/utils";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
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
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
            <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                  <div
                    className={cn(
                      `flex items-center gap-2 px-4`,
                      locale === "ar" && "float-start"
                    )}
                  >
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-1 h-4" />
                    <h2 className="font-semibold">
                      {locale === "ar" ? "مرحبا، Ahmed" : "Hello, Ahmed"}
                    </h2>
                  </div>
                </header>
                {children}
              </SidebarInset>
              
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
