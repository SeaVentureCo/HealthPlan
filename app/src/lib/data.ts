import "server-only";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import type { SessionState } from "@/components/WeekCard";
import { dailyChecklistItems } from "@/data/plan";
import { localDateString, readTzFromCookies } from "@/lib/timezone";

/**
 * Server-side: load all session completion state keyed by `${week_number}-${day_index}`.
 */
export async function loadAllSessions(): Promise<SessionState> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("sessions")
    .select("week_number, day_index, completed")
    .eq("completed", true);
  if (error || !data) return {};
  const out: SessionState = {};
  for (const row of data) {
    out[`${row.week_number}-${row.day_index}`] = row.completed;
  }
  return out;
}

export async function loadTodayChecklist(): Promise<boolean[]> {
  const supabase = createClient();
  const tz = readTzFromCookies(cookies());
  const today = localDateString(tz);
  const { data } = await supabase
    .from("daily_checklist")
    .select("item_index, completed")
    .eq("date", today);
  const out = Array(dailyChecklistItems.length).fill(false);
  if (data) {
    for (const row of data) {
      if (row.item_index >= 0 && row.item_index < out.length) {
        out[row.item_index] = row.completed;
      }
    }
  }
  return out;
}

export async function loadWeights(): Promise<Array<number | null>> {
  const supabase = createClient();
  const { data } = await supabase
    .from("weight_log")
    .select("week_number, weight_kg")
    .order("week_number");
  const out: Array<number | null> = Array(11).fill(null);
  if (data) {
    for (const row of data) {
      if (row.week_number >= 0 && row.week_number <= 10) {
        out[row.week_number] = row.weight_kg;
      }
    }
  }
  return out;
}
