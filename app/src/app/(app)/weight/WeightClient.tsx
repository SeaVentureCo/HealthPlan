"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { createClient } from "@/lib/supabase/client";
import { PROJECTED_WEIGHTS } from "@/data/plan";

const LABELS = ["Start", "Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8", "Wk 9", "Wk 10"];

interface Props {
  initialWeights: Array<number | null>;
  currentWeek: number;
}

export default function WeightClient({ initialWeights, currentWeek }: Props) {
  const [weights, setWeights] = useState<Array<number | null>>(initialWeights);
  const supabase = createClient();

  async function update(i: number, valueStr: string) {
    const value = valueStr.trim() === "" ? null : parseFloat(valueStr);
    if (value !== null && (isNaN(value) || value < 30 || value > 200)) return;

    setWeights((prev) => prev.map((v, idx) => (idx === i ? value : v)));

    const { error } = await supabase.from("weight_log").upsert(
      { week_number: i, weight_kg: value, logged_at: new Date().toISOString() },
      { onConflict: "week_number" },
    );
    if (error) console.error("Failed to sync weight:", error);
  }

  const data = LABELS.map((label, i) => ({
    label,
    projected: PROJECTED_WEIGHTS[i],
    actual: weights[i] ?? null,
  }));

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-7">
        {LABELS.map((label, i) => (
          <div
            key={i}
            className={[
              "bg-surface border rounded-xl p-3 text-center",
              i === currentWeek + 1 ? "border-amber" : "border-border",
            ].join(" ")}
          >
            <div className="font-mono text-[10px] text-text-subtle mb-2">{label}</div>
            <input
              type="number"
              step="0.1"
              inputMode="decimal"
              defaultValue={weights[i] ?? ""}
              onBlur={(e) => update(i, e.target.value)}
              placeholder={i === 0 ? "90.0" : "—"}
              className="w-full bg-transparent border-none outline-none text-center text-[16px] font-medium font-syne text-text placeholder:text-text-subtle placeholder:text-[13px]"
            />
            <div className="text-[10px] text-text-subtle mt-1">kg</div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-5 mb-6">
        <div className="font-syne text-[13px] font-semibold text-text mb-4">
          Progress vs projection
        </div>
        <div className="h-[220px] md:h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#55534f", fontSize: 11, fontFamily: "var(--font-dm-mono)" }}
                stroke="rgba(255,255,255,0.07)"
              />
              <YAxis
                domain={[78, 91]}
                ticks={[78, 80, 82, 84, 86, 88, 90]}
                tickFormatter={(v) => `${v}kg`}
                tick={{ fill: "#55534f", fontSize: 11, fontFamily: "var(--font-dm-mono)" }}
                stroke="rgba(255,255,255,0.07)"
              />
              <Tooltip
                contentStyle={{
                  background: "#151614",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#f0ede8",
                }}
                labelStyle={{ color: "#8a8880", fontFamily: "var(--font-dm-mono)" }}
                formatter={(v) => (v == null ? "—" : `${Number(v).toFixed(1)}kg`)}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, color: "#8a8880", paddingTop: 6 }}
                iconSize={10}
              />
              <Line
                type="monotone"
                dataKey="projected"
                stroke="rgba(125,184,122,0.45)"
                strokeWidth={1.5}
                strokeDasharray="5 3"
                dot={{ r: 3, fill: "rgba(125,184,122,0.45)", strokeWidth: 0 }}
                isAnimationActive={false}
                name="Projected"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#7db87a"
                strokeWidth={2}
                dot={{ r: 4, fill: "#7db87a", strokeWidth: 0 }}
                connectNulls={false}
                isAnimationActive={false}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
