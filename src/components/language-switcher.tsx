"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const isVi = pathname === "/vi" || pathname.startsWith("/vi/");
  const rest = isVi ? pathname.replace(/^\/vi/, "") || "/" : pathname;
  const enHref = rest;
  const viHref = rest === "/" ? "/vi" : `/vi${rest}`;

  const options = [
    { code: "en", label: "EN", href: enHref, active: !isVi },
    { code: "vi", label: "VI", href: viHref, active: isVi },
  ] as const;

  return (
    <div
      role="group"
      aria-label="Language"
      className="mx-1 flex h-9 shrink-0 items-center self-center rounded-full border border-foreground/15 p-0.5"
    >
      {options.map((option) => (
        <Link
          key={option.code}
          href={option.href}
          hrefLang={option.code}
          scroll={false}
          aria-current={option.active ? "page" : undefined}
          className={cn(
            "flex h-8 items-center rounded-full px-2.5 text-[11px] font-medium tracking-wide transition-colors",
            option.active
              ? "text-foreground/75 ring-1 ring-inset ring-foreground/25"
              : "text-foreground/40 hover:text-foreground/70",
          )}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
