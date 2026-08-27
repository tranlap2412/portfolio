"use client";

import { DATA } from "@/data/resume";

const railSocials = Object.entries(DATA.contact.social).filter(
  ([name, social]) => social.navbar && name !== "email",
);

export function SocialRails() {
  return (
    <>
      <div className="print-hidden pointer-events-none fixed bottom-0 left-5 z-20 hidden xl:flex">
        <div className="pointer-events-auto flex flex-col items-center gap-6 pb-6">
          {railSocials.map(([name, social]) => (
            <a
              key={name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <social.icon className="size-5" />
            </a>
          ))}
          <span aria-hidden className="h-20 w-px bg-border" />
        </div>
      </div>

      <div className="print-hidden pointer-events-none fixed bottom-24 right-5 z-20 hidden xl:flex">
        <div className="pointer-events-auto flex flex-col items-center gap-5">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="text-sm tracking-[0.18em] text-muted-foreground transition-colors [writing-mode:vertical-rl] hover:text-foreground"
          >
            {DATA.contact.email}
          </a>
          <span aria-hidden className="h-20 w-px bg-border" />
        </div>
      </div>
    </>
  );
}
