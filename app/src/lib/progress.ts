import type { SessionState } from "@/components/WeekCard";
import { weeks } from "@/data/plan";

export interface OverallProgress {
  done: number;
  total: number;
  pct: number;
}

export function computeOverallProgress(state: SessionState): OverallProgress {
  const total = weeks.reduce((sum, w) => sum + w.days.length, 0);
  const done = Object.values(state).filter(Boolean).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function computeWeekProgress(state: SessionState, weekIdx: number): OverallProgress {
  const week = weeks[weekIdx];
  const total = week.days.length;
  let done = 0;
  for (let i = 0; i < total; i++) {
    if (state[`${week.weekNumber}-${i}`]) done++;
  }
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}
