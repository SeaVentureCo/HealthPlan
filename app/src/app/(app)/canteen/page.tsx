import PageHeader from "@/components/PageHeader";
import { canteenMenu } from "@/data/plan";

const pickStyles = {
  yes: "bg-green-bg text-green border-green-edge",
  ok: "bg-amber-bg text-amber border-amber-edge",
  no: "bg-coral-bg text-coral border-coral-edge",
} as const;

export default function CanteenPage() {
  return (
    <>
      <PageHeader
        title="Canteen guide"
        subtitle="This week's Uber Amsterdam menu — best choices highlighted"
      />
      <div className="space-y-2.5">
        {canteenMenu.map((d) => (
          <div key={d.day} className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="px-4 md:px-5 py-3 border-b border-border flex justify-between items-center gap-2">
              <div className="text-[12px] md:text-[13px] font-medium">{d.day}</div>
              <span className="font-mono text-[10px] px-2.5 py-[3px] rounded bg-green-bg text-green">
                {d.training}
              </span>
            </div>
            <div className="px-4 md:px-5 pt-2.5 pb-1.5 text-[12px] text-text-muted leading-[1.5]">
              {d.verdict}
            </div>
            <div className="px-4 md:px-5 pb-3 pt-1 flex flex-wrap gap-1.5">
              {d.picks.map((p) => (
                <span
                  key={p.label}
                  className={`text-[11px] px-2 py-[3px] rounded border ${pickStyles[p.type]}`}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
