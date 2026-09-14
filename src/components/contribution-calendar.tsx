"use client";

import { useMemo } from "react";
import type { ContributionActivity } from "@/lib/github";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const LEVEL_OPACITY: Record<0 | 1 | 2 | 3 | 4, number> = {
  0: 0.08,
  1: 0.28,
  2: 0.48,
  3: 0.72,
  4: 1,
};

type Props = {
  activities: ContributionActivity[];
  cellSize?: number;
  cellGap?: number;
};

export function ContributionCalendar({
  activities,
  cellSize = 11,
  cellGap = 3,
}: Props) {
  const { weeks, monthLabels, total } = useMemo(() => {
    if (activities.length === 0) {
      return { weeks: [] as Array<Array<ContributionActivity | null>>, monthLabels: [], total: 0 };
    }

    const firstDow = new Date(`${activities[0].date}T00:00:00Z`).getUTCDay();
    const cells: Array<ContributionActivity | null> = Array(firstDow).fill(null);
    cells.push(...activities);
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks: Array<Array<ContributionActivity | null>> = [];
    for (let week = 0; week < cells.length / 7; week += 1) {
      weeks.push(cells.slice(week * 7, week * 7 + 7));
    }

    const monthLabels: Array<{ week: number; label: string }> = [];
    let lastMonth = -1;
    weeks.forEach((week, index) => {
      const first = week.find((cell) => cell !== null);
      if (!first) return;
      const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
      if (month === lastMonth) return;
      monthLabels.push({ week: index, label: MONTHS[month] });
      lastMonth = month;
    });

    const total = activities.reduce((sum, day) => sum + day.count, 0);
    return { weeks, monthLabels, total };
  }, [activities]);

  if (weeks.length === 0) return null;

  const step = cellSize + cellGap;
  const labelGutter = 28;
  const headerHeight = 16;
  const gridWidth = weeks.length * step - cellGap;
  const gridHeight = 7 * step - cellGap;

  return (
    <svg
      role="img"
      aria-label={`Contribution calendar with ${total} contributions`}
      width={labelGutter + gridWidth}
      height={headerHeight + gridHeight}
      viewBox={`0 0 ${labelGutter + gridWidth} ${headerHeight + gridHeight}`}
      className="block h-auto w-full max-w-full text-foreground"
    >
      {monthLabels.map(({ week, label }) => (
        <text
          key={`${week}-${label}`}
          x={labelGutter + week * step}
          y={10}
          fill="currentColor"
          className="text-muted-foreground"
          style={{ fontSize: 9, fontFamily: "inherit" }}
        >
          {label}
        </text>
      ))}
      {[1, 3, 5].map((day) => (
        <text
          key={WEEKDAYS[day]}
          x={0}
          y={headerHeight + day * step + cellSize - 2}
          fill="currentColor"
          className="text-muted-foreground"
          style={{ fontSize: 9, fontFamily: "inherit" }}
        >
          {WEEKDAYS[day]}
        </text>
      ))}
      {weeks.map((week, weekIndex) =>
        week.map((cell, dayIndex) => {
          if (!cell) return null;
          return (
            <rect
              key={cell.date}
              x={labelGutter + weekIndex * step}
              y={headerHeight + dayIndex * step}
              width={cellSize}
              height={cellSize}
              rx={2}
              fill="currentColor"
              opacity={LEVEL_OPACITY[cell.level]}
            >
              <title>
                {cell.count} contribution{cell.count === 1 ? "" : "s"} on {cell.date}
              </title>
            </rect>
          );
        }),
      )}
    </svg>
  );
}
