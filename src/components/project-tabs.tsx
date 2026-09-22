"use client";

import { cn } from "@/lib/utils";
import { Children, useState } from "react";

export function ProjectTabs({
  companyLabel,
  personalLabel,
  company,
  personal,
}: {
  companyLabel: string;
  personalLabel: string;
  company: React.ReactNode;
  personal: React.ReactNode;
}) {
  const [tab, setTab] = useState<"company" | "personal">("company");

  const tabs = [
    { id: "company" as const, label: companyLabel },
    { id: "personal" as const, label: personalLabel },
  ];

  return (
    <div>
      <div
        role="tablist"
        className="flex flex-wrap gap-x-4 gap-y-1 border-b border-border/40"
      >
        {tabs.map((item) => {
          const selected = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(item.id)}
              className={cn(
                "-mb-px border-b-2 pb-2 text-sm font-medium transition-colors sm:text-base",
                selected
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="pt-4">
        {tab === "company" ? company : personal}
      </div>
    </div>
  );
}

export function ShowMore({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const items = Children.toArray(children);
  const visible = open ? items : items.slice(0, 6);

  return (
    <div>
      <div className={className}>{visible}</div>
      {!open && items.length > 6 ? (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-sm font-medium text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {label}
          </button>
        </div>
      ) : null}
    </div>
  );
}
