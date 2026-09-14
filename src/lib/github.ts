export type ContributionActivity = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionsResponse = {
  total: Record<string, number>;
  contributions: ContributionActivity[];
};

const ENDPOINT = "https://github-contributions-api.jogruber.de/v4";

export async function fetchContributions(
  username: string,
  year: number,
  signal?: AbortSignal,
): Promise<ContributionsResponse> {
  const url = `${ENDPOINT}/${encodeURIComponent(username)}?y=${year}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to load contributions (${response.status})`);
  }
  const data = (await response.json()) as ContributionsResponse;
  return {
    total: data.total ?? {},
    contributions: (data.contributions ?? []).map((item) => ({
      date: item.date,
      count: item.count,
      level: clampLevel(item.level),
    })),
  };
}

function clampLevel(level: number): ContributionActivity["level"] {
  if (level <= 0) return 0;
  if (level >= 4) return 4;
  return level as ContributionActivity["level"];
}

export type YearStats = {
  total: number;
  activeDays: number;
  bestDay: { date: string; count: number } | null;
  longestStreak: number;
  currentStreak: number;
};

export function contributionStats(data: ContributionActivity[]): YearStats {
  let total = 0;
  let activeDays = 0;
  let bestDay: YearStats["bestDay"] = null;
  for (const day of data) {
    total += day.count;
    if (day.count > 0) activeDays += 1;
    if (!bestDay || day.count > bestDay.count) {
      bestDay = { date: day.date, count: day.count };
    }
  }

  let longestStreak = 0;
  let run = 0;
  for (const day of data) {
    if (day.count > 0) {
      run += 1;
      if (run > longestStreak) longestStreak = run;
    } else {
      run = 0;
    }
  }

  let currentStreak = 0;
  for (let index = data.length - 1; index >= 0; index -= 1) {
    if (data[index].count > 0) currentStreak += 1;
    else break;
  }

  return { total, activeDays, bestDay, longestStreak, currentStreak };
}
