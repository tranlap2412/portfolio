import type { I18n } from "@lingui/core";

export function t(
  i18n: I18n,
  message: string,
  values?: Record<string, string | number>,
) {
  const translated = i18n._({ id: message, message, values });
  if (!values || !translated.includes("{")) return translated;
  return translated.replace(/\{(\w+)\}/g, (token, key) =>
    values[key] == null ? token : String(values[key]),
  );
}
