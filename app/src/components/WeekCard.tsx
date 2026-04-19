"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { weeks, tagLabel } from "@/data/plan";
import Checkbox from "@/components/Checkbox";
import DayTagPill from "@/components/DayTagPill";
import PhaseBadge from "@/components/PhaseBadge";

export interface SessionState {
  [key: string]: boolean; // key = `${week_number}-${day_index}`
}

interface Props {
  weekIndex: number; // 0-based
  initialState: SessionState;
  showHeader?: boolean;
  onChange?: (key: string, completed: boolean) => void;
}

export default function WeekCard({ weekIndex, initialState, showHeader = true, onChange }: Props) {
  const week = weeks[weekIndex];
  const [state, setState] = useState<SessionState>(initialState);
  const supabase = createClient();

  async function toggle(dayIndex: number) {
    const key = `${week.weekNumber}-${dayIndex}`;
    const next = !state[key];
    setState((s) => ({ ...s, [key]: next }));
    onChange?.(key, next);

    // Upsert to Supabase in background
    const { error } = await supabase.from("sessions").upsert(
      {
        week_number: week.weekNumber,
        day_index: dayIndex,
        completed: next,
        completed_at: next ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "week_number,day_index" },
    );
    if (error) {
      console.error("Failed to sync session:", error);
      // Revert optimistic update
      setState((s) => ({ ...s, [key]: !next }));
    }
  }

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {showHeader && (
        <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
          <div className="font-syne text-sm font-semibold">
            {week.label} · {week.dates}
          </div>
          <PhaseBadge phase={week.phase} />
        </div>
      )}
      {week.days.map((d, i) => {
        const key = `${week.weekNumber}-${i}`;
        const done = !!state[key];
        return (
          <div
            key={i}
            className={[
              "grid items-center gap-3 md:gap-4 px-4 md:px-5 py-3 border-b border-border last:border-b-0 transition-opacity",
              "grid-cols-[80px_92px_1fr_28px] md:grid-cols-[90px_120px_1fr_36px]",
              done ? "opacity-45" : "",
            ].join(" ")}
          >
            <div className="text-[12px] md:text-[13px] font-medium text-text">{d.name}</div>
            <div>
              <DayTagPill tag={d.tag} />
            </div>
            <div className="text-[11px] md:text-[12px] text-text-muted leading-[1.5]">{d.detail}</div>
            <Checkbox
              checked={done}
              onChange={() => toggle(i)}
              ariaLabel={`Mark ${d.name} ${tagLabel(d.tag)} ${done ? "incomplete" : "complete"}`}
            />
          </div>
        );
      })}
    </div>
  );
}
