import { redirect } from "next/navigation";
import { localePath, resolveLocale } from "@/i18n/locales";

export default function Page({ params }: { params: { locale: string } }) {
  redirect(localePath(resolveLocale(params.locale), "/"));
}
