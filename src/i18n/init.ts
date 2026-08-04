import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "@/i18n/app-router";
import { resolveLocale } from "@/i18n/locales";

export function initLingui(locale: string) {
  const i18n = getI18nInstance(resolveLocale(locale));
  setI18n(i18n);
  return i18n;
}
