import PageHeader from "@/components/PageHeader";
import { dailyRules, sleepProtocol } from "@/data/plan";

const colorMap = {
  text: "text-text",
  amber: "text-amber",
  green: "text-green",
} as const;

export default function RulesPage() {
  return (
    <>
      <PageHeader title="Non-negotiables" subtitle="Every single day — these are the plan" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-7">
        {dailyRules.map((r) => (
          <div
            key={r.title}
            className={[
              "bg-surface border border-border rounded-xl px-4 py-3.5",
              r.accent ? "border-l-2 border-l-green pl-3.5" : "",
            ].join(" ")}
          >
            <div className="text-[12px] font-medium text-text mb-1">{r.title}</div>
            <div className="text-[11px] text-text-muted leading-[1.5]">{r.detail}</div>
          </div>
        ))}
      </div>

      <h2 className="font-syne text-[13px] font-semibold text-text mb-3.5">Sleep protocol</h2>
      <div className="bg-surface border border-border rounded-xl overflow-hidden mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {sleepProtocol.map((p, i) => (
            <div
              key={p.label}
              className={[
                "py-4 px-4 text-center",
                i < sleepProtocol.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : "",
                i % 2 === 0 ? "border-r md:border-r" : "md:border-r",
                "border-border",
              ].join(" ")}
            >
              <div className="font-mono text-[10px] text-text-subtle uppercase mb-1.5">{p.label}</div>
              <div className={`font-syne text-[20px] md:text-[22px] font-bold ${colorMap[p.color]}`}>
                {p.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
