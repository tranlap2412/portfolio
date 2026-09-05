"use client";

import { DATA } from "@/data/resume";
import { t } from "@/i18n/t";
import { useLingui } from "@lingui/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function ResumeSection() {
  const { i18n } = useLingui();
  const [open, setOpen] = useState(false);
  const fileName = DATA.resumeFileName;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {t(i18n, "Resume")}
        </h2>
        <p className="mt-2 max-w-xl text-base leading-relaxed text-foreground/80">
          {t(
            i18n,
            "The full story of where I've worked and what I've shipped. Open the viewer, or grab a copy.",
          )}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t(i18n, "Open {file} in viewer", { file: fileName })}
        className="group relative block w-full overflow-hidden rounded-2xl border border-border/60 bg-background/40 text-left transition-colors hover:border-foreground/25"
      >
        <div className="pointer-events-none relative h-56 sm:h-72 md:h-80">
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.04] to-transparent" />
          <div className="absolute left-1/2 top-8 w-[70%] -translate-x-1/2 sm:w-[56%]">
            <div className="absolute inset-x-6 -top-2 h-full rotate-[-3deg] rounded-md bg-foreground/[0.03] ring-1 ring-foreground/5" />
            <div className="absolute inset-x-3 -top-1 h-full rotate-[2deg] rounded-md bg-foreground/[0.05] ring-1 ring-foreground/5" />
            <div className="relative rounded-md bg-foreground/[0.08] p-6 shadow-2xl shadow-black/30 ring-1 ring-foreground/10 sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="size-9 rounded-full bg-foreground/15" />
                <div className="space-y-1.5">
                  <div className="h-2.5 w-32 rounded bg-foreground/30" />
                  <div className="h-2 w-20 rounded bg-foreground/15" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-full rounded bg-foreground/15" />
                <div className="h-1.5 w-[92%] rounded bg-foreground/15" />
                <div className="h-1.5 w-[80%] rounded bg-foreground/15" />
              </div>
              <div className="mb-2 mt-5 h-1.5 w-24 rounded bg-cyan-300/70" />
              <div className="space-y-2">
                <div className="h-1.5 w-[95%] rounded bg-foreground/15" />
                <div className="h-1.5 w-[88%] rounded bg-foreground/15" />
                <div className="h-1.5 w-[70%] rounded bg-foreground/15" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="space-y-1.5 rounded bg-foreground/5 p-2">
                  <div className="h-1.5 w-16 rounded bg-foreground/25" />
                  <div className="h-1 w-full rounded bg-foreground/10" />
                  <div className="h-1 w-3/4 rounded bg-foreground/10" />
                </div>
                <div className="space-y-1.5 rounded bg-foreground/5 p-2">
                  <div className="h-1.5 w-20 rounded bg-foreground/25" />
                  <div className="h-1 w-full rounded bg-foreground/10" />
                  <div className="h-1 w-2/3 rounded bg-foreground/10" />
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border/50 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex size-10 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-cyan-300 transition-colors group-hover:border-cyan-300/40">
              <PdfIcon />
            </div>
            <div>
              <div className="font-mono text-sm text-foreground sm:text-base">
                {fileName}
              </div>
              <div className="text-xs text-muted-foreground">
                {t(i18n, DATA.resumeMeta)}
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/50 px-3.5 py-2 text-sm text-foreground/75 transition-colors group-hover:border-foreground/25 group-hover:text-foreground">
            {t(i18n, "Open viewer")}
            <ArrowIcon />
          </span>
        </div>
      </button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-label={t(i18n, "Resume viewer")}
              onClick={() => setOpen(false)}
            >
              <div
                className="flex h-[min(92vh,980px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white">
                  <p className="truncate font-mono text-sm">{fileName}</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={DATA.resumeUrl}
                      download={fileName}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:text-white"
                    >
                      {t(i18n, "Download")}
                    </a>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:text-white"
                    >
                      {t(i18n, "Close")}
                    </button>
                  </div>
                </div>
                <iframe
                  title={fileName}
                  src={`${DATA.resumeUrl}#view=FitH`}
                  className="h-full w-full bg-white"
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

function PdfIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5">
      <path d="M2 7h10" />
      <path d="M8 3l4 4-4 4" />
    </svg>
  );
}
