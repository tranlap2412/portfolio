import BlogSection from "@/components/blog/blog-section";
import ProjectSection from "@/components/project-section";
import { Reveal, RevealList, RevealRoot } from "@/components/reveal";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { initLingui } from "@/i18n/init";
import { localePath, resolveLocale } from "@/i18n/locales";
import { t } from "@/i18n/t";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Suspense } from "react";
import Markdown from "react-markdown";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const i18n = initLingui(params.locale);
  return {
    title: t(i18n, "Tran Van Lap – Frontend Developer"),
    description: t(
      i18n,
      "Portfolio of Tran Van Lap, Middle–Senior Frontend Developer with 5+ years of experience building scalable web applications, enterprise systems, and Web3 platforms.",
    ),
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const i18n = initLingui(locale);
  return (
    <RevealRoot>
    <main className="flex min-h-[100dvh] flex-col gap-y-20">
      <section id="hero">
        <RevealList play="load" className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1 space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {t(i18n, "Hi, I'm {name} 👋", { name: DATA.name })}
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-foreground sm:text-lg">
              {t(i18n, DATA.description)}
            </p>
          </div>
          <div>
            <Avatar className="size-28 shrink-0 border-0 sm:size-36">
              <AvatarImage
                alt={DATA.name}
                src={DATA.avatarUrl}
                className="object-cover"
              />
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
          </div>
        </RevealList>
      </section>

      <section id="about" className="flex flex-col gap-4">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t(i18n, "About")}
          </h2>
        </Reveal>
        <Reveal>
          <Markdown className="prose max-w-prose text-pretty font-sans text-base leading-7 text-foreground dark:prose-invert">
            {t(i18n, DATA.summary)}
          </Markdown>
        </Reveal>
      </section>

      <section id="skills" className="flex flex-col gap-4">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t(i18n, "Skills")}
          </h2>
        </Reveal>
        <RevealList className="flex flex-col gap-4">
          {DATA.skillGroups.map((group) => (
            <div
              key={group.name}
              className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
            >
              <p className="text-sm font-semibold text-foreground">
                {t(i18n, group.name)}
              </p>
              <p className="text-base leading-relaxed text-foreground/90">
                {group.skills.join(" · ")}
              </p>
            </div>
          ))}
        </RevealList>
      </section>

      <section id="work" className="flex flex-col gap-4">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t(i18n, "Work Experience")}
          </h2>
        </Reveal>
        <RevealList className="divide-y divide-border/50">
          {DATA.work.map((work, id) => (
            <div key={work.company} className="py-4 first:pt-1">
              <ResumeCard
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={t(i18n, work.title)}
                href={work.href}
                location={t(i18n, work.location)}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description ? t(i18n, work.description) : ""}
                defaultExpanded={id === 0}
                showVisit
              />
            </div>
          ))}
        </RevealList>
      </section>

      <section id="education" className="flex flex-col gap-4">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t(i18n, "Education")}
          </h2>
        </Reveal>
        <RevealList className="divide-y divide-border/50">
          {DATA.education.map((education) => (
            <div key={education.school} className="py-4 first:pt-1">
              <ResumeCard
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={t(i18n, education.degree)}
                logoShape="circle"
                period={
                  education.start === education.end
                    ? education.end
                    : `${education.start} - ${education.end}`
                }
              />
            </div>
          ))}
        </RevealList>
      </section>

      <section id="projects" className="flex flex-col gap-4">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t(i18n, "Projects")}
          </h2>
        </Reveal>
        <ProjectSection locale={locale} />
      </section>

      <section id="activities" className="flex flex-col gap-4">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t(i18n, "Professional Activities")}
          </h2>
        </Reveal>
        <RevealList className="divide-y divide-border/50">
          {DATA.activities.map((activity) => (
            <div key={activity.title} className="py-4 first:pt-1">
              <h3 className="text-base font-semibold">{t(i18n, activity.title)}</h3>
              <p className="mt-1 text-base leading-relaxed text-foreground/80">
                {t(i18n, activity.description)}
              </p>
            </div>
          ))}
        </RevealList>
      </section>

      <section id="blog" className="flex flex-col gap-4">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {t(i18n, "Trending in Crypto & Web3")}
            </h2>
            <Link href={localePath(locale, "/blog")} className="w-fit">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-foreground/15 bg-transparent text-foreground/70 shadow-none hover:border-foreground/30 hover:bg-transparent hover:text-foreground"
              >
                {t(i18n, "Discover More")}
                <ArrowRightIcon className="ml-2 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </Reveal>
        <Reveal>
          <Suspense
            fallback={
              <p className="text-sm text-muted-foreground">Loading articles…</p>
            }
          >
            <BlogSection isHome />
          </Suspense>
        </Reveal>
      </section>

      <section id="contact" className="flex flex-col gap-4 border-t border-border/50 pt-8">
        <Reveal>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {t(i18n, "Get in Touch")}
            </h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-base text-foreground">
              <Link
                href={`mailto:${DATA.contact.email}`}
                className="underline-offset-4 hover:underline"
              >
                {DATA.contact.email}
              </Link>
              <Link
                href={`tel:${DATA.contact.tel}`}
                className="underline-offset-4 hover:underline"
              >
                {DATA.contact.tel}
              </Link>
              <Link
                href={DATA.contact.social.LinkedIn.url}
                className="underline-offset-4 hover:underline"
              >
                LinkedIn
              </Link>
              <Link
                href={DATA.contact.social.Telegram.url}
                className="underline-offset-4 hover:underline"
              >
                Telegram
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              {DATA.name} · {t(i18n, DATA.location)}
            </p>
          </div>
        </Reveal>
      </section>
    </main>
    </RevealRoot>
  );
}
