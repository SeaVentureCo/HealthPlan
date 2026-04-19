"use client";

import { useMemo, useState } from "react";
import WeekCard, { type SessionState } from "@/components/WeekCard";
import ProgressBar from "@/components/ProgressBar";
import { weeks } from "@/data/plan";
import { computeWeekProgress } from "@/lib/progress";

export default function TrainingClient({
  initialSessions,
  initialWeek,
}: {
  initialSessions: SessionState;
  initialWeek: number;
}) {
  const [sessions, setSessions] = useState<SessionState>(initialSessions);
  const [active, setActive] = useState(initialWeek);

  const weekProgressList = useMemo(
    () => weeks.map((_, i) => computeWeekProgress(sessions, i)),
    [sessions],
  );
  const activeProgress = weekProgressList[active];

  return (
    <>
      <div className="flex gap-1.5 flex-wrap mb-5">
        {weeks.map((w, i) => {
          const { pct } = weekProgressList[i];
          const done = pct === 100;
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={[
                "font-mono text-[11px] px-3.5 py-1.5 rounded-md border transition-colors",
                isActive
                  ? "bg-green-bg border-green-edge text-green"
                  : done
                  ? "border-green-edge text-green opacity-60"
                  : "border-border text-text-muted hover:border-border-strong hover:text-text",
              ].join(" ")}
            >
              {w.label}
            </button>
          );
        })}
      </div>

      <ProgressBar label={`${weeks[active].label} progress`} pct={activeProgress.pct} />

      <WeekCard
        key={active}
        weekIndex={active}
        initialState={sessions}
        onChange={(key, completed) =>
          setSessions((s) => ({ ...s, [key]: completed }))
        }
      />
    </>
  );
}
