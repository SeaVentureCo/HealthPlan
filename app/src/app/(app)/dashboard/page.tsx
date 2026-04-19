import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import WeekCard from "@/components/WeekCard";
import DailyChecklist from "./DailyChecklist";
import {
  weeks,
  daysToBermuda,
  currentWeekIndex,
  PROJECTED_WEIGHTS,
} from "@/data/plan";
import {
  loadAllSessions,
  loadTodayChecklist,
  loadWeights,
} from "@/lib/data";
import { computeOverallProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [sessions, today, weights] = await Promise.all([
    loadAllSessions(),
    loadTodayChecklist(),
    loadWeights(),
  ]);
  const days = daysToBermuda();
  const curWeekIdx = currentWeekIndex();
  const week = weeks[curWeekIdx];
  const overall = computeOverallProgress(sessions);

  // Most recent logged weight + projection for current week
  let currentWeight: number | null = null;
  for (let i = weights.length - 1; i >= 0; i--) {
    if (weights[i] != null) {
      currentWeight = weights[i] as number;
      break;
    }
  }
  const projectedNow = PROJECTED_WEIGHTS[Math.min(curWeekIdx + 1, PROJECTED_WEIGHTS.length - 1)];

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Your 10-week Bermuda cut — starting 20 April 2026" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
        <StatCard
          label="Current weight"
          value={currentWeight != null ? `${currentWeight.toFixed(1)}kg` : "—"}
          sub={`Target ${projectedNow.toFixed(1)}kg`}
        />
        <StatCard
          label="Current week"
          value={week.label}
          sub={`${week.phase} phase`}
        />
        <StatCard
          label="Days to Bermuda"
          value={String(days)}
          sub="9 July 2026"
          valueClassName="text-amber"
        />
        <StatCard label="Target" value="80–83kg" sub="176–183 lbs" />
      </div>

      <ProgressBar label="10-week progress" pct={overall.pct} />

      <h2 className="font-syne text-[13px] font-semibold text-text mb-3.5">This week at a glance</h2>
      <WeekCard weekIndex={curWeekIdx} initialState={sessions} />

      <h2 className="font-syne text-[13px] font-semibold text-text mb-3.5 mt-7">Today&apos;s non-negotiables</h2>
      <DailyChecklist initialState={today} />
    </>
  );
}
