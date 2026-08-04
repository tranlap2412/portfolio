import { NextRequest, NextResponse } from "next/server";
import { locales, resolveLocale, sourceLocale } from "@/i18n/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  const locale = hasLocale ? pathname.split("/")[1] : sourceLocale;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", resolveLocale(locale));

  if (pathname === `/${sourceLocale}` || pathname.startsWith(`/${sourceLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(new RegExp(`^/${sourceLocale}`), "") || "/";
    return NextResponse.redirect(url);
  }

  if (hasLocale) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${sourceLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
