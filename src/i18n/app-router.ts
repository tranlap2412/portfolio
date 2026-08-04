import { setupI18n, type I18n, type Messages } from "@lingui/core";
import { compileMessage } from "@lingui/message-utils/compileMessage";
import { messages as en } from "@/i18n/messages/en";
import { messages as vi } from "@/i18n/messages/vi";
import { locales, resolveLocale, sourceLocale, type Locale } from "@/i18n/locales";

export const allMessages: Record<Locale, Messages> = { en, vi };

const instances = new Map<Locale, I18n>();

function createInstance(locale: Locale) {
  const i18n = setupI18n({
    locale,
    missing: (_locale, id) => id,
  });
  i18n.setMessagesCompiler(compileMessage);
  for (const item of locales) {
    i18n.load(item, allMessages[item]);
  }
  i18n.activate(locale);
  return i18n;
}

export function getI18nInstance(locale: string): I18n {
  const resolved = resolveLocale(locale);
  const existing = instances.get(resolved);
  if (existing) return existing;
  const created = createInstance(resolved);
  instances.set(resolved, created);
  return created;
}

export function getSourceI18nInstance() {
  return getI18nInstance(sourceLocale);
}
