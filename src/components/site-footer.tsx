"use client";

import { DATA } from "@/data/resume";
import { t } from "@/i18n/t";
import { useLingui } from "@lingui/react";
import { useEffect, useState } from "react";

export function SiteFooter() {
  const { i18n } = useLingui();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative mt-8 pt-10 sm:mt-12 sm:pt-14">
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
      />

      <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center text-center sm:mt-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {t(i18n, "Get in Touch")}
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {t(i18n, "Let's build")}{" "}
          <span className="text-cyan-300">{t(i18n, "something together")}</span>.
        </h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-foreground/85">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="underline-offset-4 hover:underline"
          >
            {DATA.contact.email}
          </a>
          <a
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href={DATA.contact.social.Telegram.url}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            Telegram
          </a>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 border-t border-border/40 pt-6 text-[11px] tracking-wide text-muted-foreground sm:mt-16 sm:flex-row sm:justify-between sm:gap-6">
        <div className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block size-1.5 animate-pulse rounded-full bg-cyan-300"
          />
          <span>{t(i18n, "Available for new work")}</span>
        </div>

        <a
          href={DATA.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-cyan-300"
        >
          <GithubIcon />
          <span>{t(i18n, "Source code — GitHub")}</span>
        </a>

        <span>
          © {new Date().getFullYear()} {DATA.name}
        </span>
      </div>

      <button
        type="button"
        aria-label={t(i18n, "Back to top")}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          })
        }
        className={cnTop(showTop)}
      >
        <ArrowUpIcon />
      </button>
    </footer>
  );
}

function cnTop(show: boolean) {
  return [
    "fixed bottom-24 right-5 z-40 inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground/70 backdrop-blur-md transition-all duration-200 hover:border-cyan-300/50 hover:text-cyan-300 sm:bottom-28 sm:right-8",
    show
      ? "pointer-events-auto translate-y-0 opacity-100"
      : "pointer-events-none translate-y-3 opacity-0",
  ].join(" ");
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.75 5.58.75 11.98c0 5.07 3.29 9.36 7.86 10.87.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.56-3.88-1.56-.53-1.36-1.3-1.72-1.3-1.72-1.06-.74.08-.72.08-.72 1.17.08 1.79 1.22 1.79 1.22 1.04 1.8 2.73 1.28 3.4.98.1-.76.41-1.28.74-1.57-2.55-.3-5.23-1.3-5.23-5.78 0-1.28.45-2.32 1.2-3.14-.12-.3-.52-1.52.11-3.16 0 0 .98-.32 3.2 1.2a10.9 10.9 0 0 1 2.92-.4c.99 0 1.99.14 2.92.4 2.22-1.52 3.2-1.2 3.2-1.2.63 1.64.23 2.86.11 3.16.75.82 1.2 1.86 1.2 3.14 0 4.49-2.69 5.48-5.25 5.77.42.37.79 1.1.79 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.21.68.8.56A11.25 11.25 0 0 0 23.25 12C23.25 5.58 18.27.5 12 .5Z" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}
