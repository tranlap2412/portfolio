"use client";

import { ContributionCalendar } from "@/components/contribution-calendar";
import { DATA } from "@/data/resume";
import { t } from "@/i18n/t";
import {
  contributionStats,
  fetchContributions,
  type ContributionsResponse,
} from "@/lib/github";
import { cn } from "@/lib/utils";
import { useLingui } from "@lingui/react";
import { useEffect, useMemo, useState } from "react";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 4 }, (_, index) => currentYear - index);

const stack = (() => {
  const total = DATA.stackLanguages.reduce((sum, item) => sum + item.weight, 0);
  return DATA.stackLanguages
    .map((item) => ({
      name: item.name,
      pct: Math.round((item.weight / total) * 100),
    }))
    .sort((a, b) => b.pct - a.pct);
})();

export function GithubSection() {
  const { i18n } = useLingui();
  const username = DATA.contact.github;
  const [year, setYear] = useState(currentYear);
  const [cache, setCache] = useState<Record<number, ContributionsResponse>>({});
  const [loadingYear, setLoadingYear] = useState<number | null>(null);
  const [failedYear, setFailedYear] = useState<number | null>(null);

  useEffect(() => {
    if (cache[year]) return;
    const controller = new AbortController();
    setLoadingYear(year);
    setFailedYear(null);
    fetchContributions(username, year, controller.signal)
      .then((data) => {
        setCache((current) => ({ ...current, [year]: data }));
        setLoadingYear((current) => (current === year ? null : current));
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setFailedYear(year);
        setLoadingYear((current) => (current === year ? null : current));
        console.error(error);
      });
    return () => controller.abort();
  }, [cache, username, year]);

  const shown = cache[year];
  const loading = loadingYear === year && !shown;
  const stats = useMemo(
    () => (shown ? contributionStats(shown.contributions) : null),
    [shown],
  );
  const bestDay = stats?.bestDay
    ? new Date(`${stats.bestDay.date}T00:00:00Z`).toLocaleDateString(
        i18n.locale === "vi" ? "vi-VN" : "en-US",
        { month: "short", day: "numeric", timeZone: "UTC" },
      )
    : "";

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t(i18n, "GitHub")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {t(i18n, "Pulse from the")}{" "}
            <span className="text-cyan-300">{t(i18n, "repo")}</span>.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-base">
            {t(i18n, "Year at a glance for")}{" "}
            <a
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-300 hover:underline"
            >
              @{username}
            </a>{" "}
            — {t(i18n, "contributions, streaks, and the stack in heavy rotation.")}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={t(i18n, "Contribution year")}
          className="inline-flex w-fit shrink-0 items-center gap-0.5 rounded-full border border-border/60 bg-background/40 p-1"
        >
            {years.map((item) => {
              const selected = item === year;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setYear(item)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium tabular-nums transition-colors sm:text-sm",
                    selected
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
          <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              label={t(i18n, "Contributions")}
              value={stats ? stats.total.toLocaleString(i18n.locale) : "—"}
              hint={shown ? t(i18n, "{year} so far", { year }) : undefined}
            />
            <StatCard
              label={t(i18n, "Current streak")}
              value={stats ? `${stats.currentStreak}d` : "—"}
              hint={t(i18n, "consecutive days")}
            />
            <StatCard
              label={t(i18n, "Longest streak")}
              value={stats ? `${stats.longestStreak}d` : "—"}
              hint={t(i18n, "best run this year")}
            />
            <StatCard
              label={t(i18n, "Active days")}
              value={stats ? stats.activeDays.toLocaleString(i18n.locale) : "—"}
              hint={
                bestDay
                  ? t(i18n, "Best day {date}", { date: bestDay })
                  : undefined
              }
            />
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-4 sm:p-5">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-cyan-300/10 blur-3xl"
            />
            <div className="relative mb-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span
                  className={cn(
                    "size-1.5 rounded-full bg-cyan-300",
                    loading && "animate-pulse",
                  )}
                  style={{ opacity: loading ? 1 : 0.5 }}
                />
                <span className="font-medium uppercase tracking-wider text-foreground/70">
                  {year}
                </span>
                <span>·</span>
                <span className="tabular-nums">
                  {loading
                    ? t(i18n, "Loading…")
                    : stats
                      ? t(i18n, "{count} contributions", {
                          count: stats.total.toLocaleString(i18n.locale),
                        })
                      : failedYear === year
                        ? t(i18n, "Couldn't load contributions.")
                        : t(i18n, "No activity this year.")}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span>{t(i18n, "Less")}</span>
                {[0.08, 0.25, 0.45, 0.7, 1].map((opacity) => (
                  <span
                    key={opacity}
                    className="size-2.5 rounded-[2px] bg-cyan-300"
                    style={{ opacity }}
                  />
                ))}
                <span>{t(i18n, "More")}</span>
              </span>
            </div>
            <div className="relative min-w-0 overflow-hidden">
              {shown && shown.contributions.length > 0 ? (
                <ContributionCalendar activities={shown.contributions} />
              ) : (
                <div className="h-28" />
              )}
            </div>
          </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-5 items-center justify-center rounded-md border border-cyan-300/40 bg-cyan-300/10 text-cyan-300">
                <CodeIcon />
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                {t(i18n, "Stack snapshot")}
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">
              {t(i18n, "{count} languages", { count: stack.length })}
            </span>
          </div>
          <div className="my-4 h-px w-full bg-gradient-to-r from-border via-cyan-300/30 to-transparent" />
          <ul className="flex flex-col gap-2.5">
            {stack.map((item) => (
              <li key={item.name} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-xs text-foreground/80 sm:w-24 sm:text-sm">
                  {item.name}
                </span>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-300 to-cyan-200/80"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                  {item.pct}%
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] text-muted-foreground">
            {t(i18n, "Based on the languages I reach for most across recent work.")}
          </p>
        </div>

        <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-cyan-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t(i18n, "Open source")}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold sm:text-xl">
              {t(i18n, "See the work on")}{" "}
              <span className="text-cyan-300">GitHub</span>.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/75">
              {t(
                i18n,
                "Side projects, experiments, and the occasional fix for tools I use.",
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-foreground px-3.5 py-1.5 text-sm font-medium text-background"
            >
              @{username}
            </a>
            <a
              href={`${DATA.contact.social.GitHub.url}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {t(i18n, "Browse repos")} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-4">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
        <span aria-hidden className="size-1.5 rounded-full bg-cyan-300/60" />
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
      ) : (
        <p className="mt-1 min-h-4 text-[11px]" />
      )}
    </div>
  );
}

function CodeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
