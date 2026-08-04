export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

export const sourceLocale: Locale = "en";

export function resolveLocale(value: string | null | undefined): Locale {
  return value === "vi" ? "vi" : sourceLocale;
}

export function localePath(locale: string, href: string) {
  const path = href.startsWith("/") ? href : `/${href}`;
  if (resolveLocale(locale) === sourceLocale) return path;
  if (path === "/") return "/vi";
  return `/vi${path}`;
}
