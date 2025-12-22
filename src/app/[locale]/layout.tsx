import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { getMessages } from "@lib/request";
import { locales } from "@src/proxy";
import ClientProvider from "./ClientProvider";

export const metadata: Metadata = {
  title: "Portfólio",
  description: "Página portfólio de Igor Borges Kühl"
};

interface Params {
  locale: string;
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<Params>;
};

export default async function RootLayout({
  children, params
}: LayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="light">
          <ClientProvider locale={locale} messages={messages}>
            {children}
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
