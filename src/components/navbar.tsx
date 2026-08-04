"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { localePath } from "@/i18n/locales";
import { t } from "@/i18n/t";
import { cn } from "@/lib/utils";
import { useLingui } from "@lingui/react";
import Link from "next/link";

export default function Navbar() {
  const { i18n } = useLingui();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center pb-4">
      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      <Dock className="pointer-events-auto relative z-50 h-14 items-center border-border/60 bg-background/75 px-1 backdrop-blur-md">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={localePath(i18n.locale, item.href)}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12"
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t(i18n, item.label)}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="mx-0.5 h-6" />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        <Separator orientation="vertical" className="mx-0.5 h-6" />
        <LanguageSwitcher />
      </Dock>
    </div>
  );
}
