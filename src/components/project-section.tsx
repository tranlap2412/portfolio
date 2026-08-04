import { ProjectTabs, ShowMore } from "@/components/project-tabs";
import { DATA } from "@/data/resume";
import { initLingui } from "@/i18n/init";
import { t } from "@/i18n/t";
import { ArrowUpRightIcon } from "lucide-react";

type Props = {
  locale?: string;
};

function host(href: string) {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export default function ProjectSection({ locale = "en" }: Props) {
  const i18n = initLingui(locale);
  const ecosystem = DATA.projects.filter(
    (project) => project.active && project.title !== "Recruitment Management Platform",
  );
  const readMore = t(i18n, "Read more");
  const card =
    "group flex h-full flex-col rounded-2xl border border-border/60 bg-transparent px-4 py-4 transition-colors duration-300 hover:border-foreground/20";

  return (
    <ProjectTabs
      companyLabel={t(i18n, "Production")}
      personalLabel={t(i18n, "Prototypes")}
      company={
        <ShowMore label={readMore} className="grid gap-3 sm:grid-cols-2">
          {ecosystem.map((project) => (
            <a
              key={project.title}
              href={project.href || "https://pionegroup.com/solutions"}
              target="_blank"
              rel="noopener noreferrer"
              className={card}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-base font-semibold text-foreground">
                  {t(i18n, project.title)}
                </span>
                <ArrowUpRightIcon className="size-4 shrink-0 text-foreground/35 transition-colors duration-300 group-hover:text-foreground/70" />
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-foreground/90">
                {t(i18n, project.description)}
              </span>
            </a>
          ))}
        </ShowMore>
      }
      personal={
        <ShowMore label={readMore} className="flex flex-col gap-3">
          {DATA.personalProjects.map((project) => (
            <a
              key={project.href}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={card}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-base font-semibold leading-snug text-foreground">
                  {t(i18n, project.title)}
                </span>
                <ArrowUpRightIcon className="mt-1 size-4 shrink-0 text-foreground/35 transition-colors duration-300 group-hover:text-foreground/70" />
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-foreground/90">
                {t(i18n, project.description)}
              </span>
              <span className="mt-2 block text-xs text-muted-foreground">
                {host(project.href)}
              </span>
            </a>
          ))}
        </ShowMore>
      }
    />
  );
}
