"use client";

import { useState } from "react";
import Checkbox from "@/components/Checkbox";
import { dailyChecklistItems } from "@/data/plan";
import { createClient } from "@/lib/supabase/client";
import { detectBrowserTz, localDateString } from "@/lib/timezone";

export default function DailyChecklist({ initialState }: { initialState: boolean[] }) {
  const [state, setState] = useState<boolean[]>(initialState);
  const supabase = createClient();

  async function toggle(i: number) {
    const next = !state[i];
    setState((s) => s.map((v, idx) => (idx === i ? next : v)));
    const today = localDateString(detectBrowserTz());
    const { error } = await supabase.from("daily_checklist").upsert(
      { item_index: i, date: today, completed: next },
      { onConflict: "item_index,date" },
    );
    if (error) {
      console.error("Failed to sync checklist:", error);
      setState((s) => s.map((v, idx) => (idx === i ? !next : v)));
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      {dailyChecklistItems.map((label, i) => (
        <button
          key={i}
          type="button"
          onClick={() => toggle(i)}
          className={[
            "flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-xl text-left transition",
            "hover:bg-card",
            state[i] ? "opacity-50" : "",
          ].join(" ")}
        >
          <Checkbox checked={state[i]} onChange={() => toggle(i)} ariaLabel={label} />
          <span className={`text-[13px] text-text flex-1 ${state[i] ? "line-through text-text-muted" : ""}`}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
