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
      <div role="tablist" className="flex flex-wrap gap-2">
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
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors sm:text-base",
                selected
                  ? "border-foreground text-foreground"
                  : "border-border text-foreground/60 hover:border-foreground/40 hover:text-foreground",
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
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/60"
        >
          {label}
        </button>
      ) : null}
    </div>
  );
}
