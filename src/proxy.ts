import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

export const locales = ["pt", "en"];
const defaultLocale = "pt";

export default function middleware(request: NextRequest): NextResponse {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  const preferredLocale = request.headers
    .get("Accept-Language")
    ?.split(",")[0]
    .split("-")[0] || defaultLocale;
  const urlLocale = pathname.split("/")[1];

  if (pathname.startsWith("/_next") || pathname.includes("/api/")) {
    return NextResponse.next();
  }

  if (!locales.includes(urlLocale)) {
    const locale = locales.includes(preferredLocale)
      ? preferredLocale : defaultLocale;

    return NextResponse.redirect(
      new URL(`/${locale}${pathname.replace(`/${urlLocale}`, "")}`, request.url)
    );
  }

  return createMiddleware({
      locales,
      defaultLocale
  })(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|app|api|favicon.ico|public).*)"],
};

