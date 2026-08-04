"use client";

import { setupI18n, type Messages } from "@lingui/core";
import { compileMessage } from "@lingui/message-utils/compileMessage";
import { I18nProvider } from "@lingui/react";
import { useState } from "react";
import { locales } from "@/i18n/locales";
import { allMessages } from "@/i18n/app-router";

export function LinguiClientProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [i18n] = useState(() => {
    const instance = setupI18n({
      locale,
      missing: (_currentLocale, id) => id,
    });
    instance.setMessagesCompiler(compileMessage);
    for (const item of locales) {
      instance.load(item, allMessages[item] as Messages);
    }
    instance.activate(locale);
    return instance;
  });

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
