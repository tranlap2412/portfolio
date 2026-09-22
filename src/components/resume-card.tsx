"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { t } from "@/i18n/t";
import { cn } from "@/lib/utils";
import { useLingui } from "@lingui/react";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function JobCopy({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  return (
    <div className="max-w-full text-pretty font-sans text-sm leading-relaxed text-foreground/85 sm:text-base">
      {blocks.map((block) => {
        const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
        const list = lines.length > 0 && lines.every((line) => line.startsWith("- "));
        if (list) {
          return (
            <ul key={block} className="my-2 list-disc space-y-1 pl-5">
              {lines.map((line) => (
                <li key={line}>{line.slice(2)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={block} className="my-1.5">
            {block}
          </p>
        );
      })}
    </div>
  );
}

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  location?: string;
  links?: readonly { name: string; href: string; domain?: string }[];
  logoShape?: "plain" | "circle";
  defaultExpanded?: boolean;
  showVisit?: boolean;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  location,
  description,
  links,
  logoShape = "plain",
  defaultExpanded = false,
  showVisit = false,
}: ResumeCardProps) => {
  const { i18n } = useLingui();
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const toggle = () => setIsExpanded((open) => !open);

  const card = (
    <Card className="flex items-start gap-3 border-0 bg-transparent shadow-none">
        <div
          className={cn(
            "mt-0.5 flex shrink-0 items-center justify-center bg-transparent",
            logoShape === "circle"
              ? "size-10 overflow-hidden rounded-full bg-white"
              : "h-10 w-14",
          )}
        >
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={altText}
              className={cn(
                logoShape === "circle"
                  ? "size-full object-cover"
                  : "max-h-10 max-w-14 object-contain",
              )}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="text-sm font-semibold text-foreground">
              {altText[0]}
            </span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col group">
          <CardHeader>
            {description ? (
              <button type="button" className="w-full text-left" onClick={toggle}>
                <div className="flex items-baseline justify-between gap-x-3 text-base">
                  <h3 className="inline-flex min-w-0 items-center gap-1 text-sm font-semibold leading-snug sm:text-base">
                    <span className="truncate">{title}</span>
                    {badges && (
                      <span className="inline-flex gap-x-1 pl-1">
                        {badges.map((badge, index) => (
                          <Badge
                            variant="secondary"
                            className="align-middle text-xs"
                            key={index}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    )}
                    <ChevronRightIcon
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                        isExpanded ? "rotate-90" : "rotate-0",
                      )}
                    />
                  </h3>
                  <div className="shrink-0 text-xs tabular-nums text-muted-foreground text-right sm:text-sm">
                    {period}
                  </div>
                </div>
                {subtitle && (
                  <div className="pt-1 font-sans text-xs text-foreground/80 sm:text-sm">
                    {subtitle} {location && `· ${location}`}
                  </div>
                )}
              </button>
            ) : (
              <div>
                <div className="flex items-baseline justify-between gap-x-3 text-base">
                  <h3 className="text-sm font-semibold leading-snug sm:text-base">
                    {title}
                  </h3>
                  <div className="shrink-0 text-xs tabular-nums text-muted-foreground text-right sm:text-sm">
                    {period}
                  </div>
                </div>
                {subtitle && (
                  <div className="pt-1 font-sans text-xs text-foreground/80 sm:text-sm">
                    {subtitle} {location && `· ${location}`}
                  </div>
                )}
              </div>
            )}
            {showVisit && href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {t(i18n, "Visit company")}
              </a>
            ) : null}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,

                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 text-sm text-foreground/80 sm:text-base"
              onClick={(event) => event.stopPropagation()}
            >
              <JobCopy text={description} />
              {links && links.length > 0 && (
                <div
                  className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1"
                  onClick={(event) => event.stopPropagation()}
                >
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link.domain}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </Card>
  );

  if (description || !href) {
    return <div className="block">{card}</div>;
  }

  return (
    <Link href={href} className="block">
      {card}
    </Link>
  );
};
