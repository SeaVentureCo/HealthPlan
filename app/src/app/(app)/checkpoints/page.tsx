import PageHeader from "@/components/PageHeader";
import { checkpoints } from "@/data/plan";

export default function CheckpointsPage() {
  return (
    <>
      <PageHeader
        title="Plan checkpoints"
        subtitle="When to come back to Claude and what to ask for"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {checkpoints.map((cp) => (
          <div
            key={cp.title}
            className={[
              "rounded-xl px-4 py-3.5 border",
              cp.urgent
                ? "bg-coral-bg border-coral text-coral"
                : "bg-surface border-border",
            ].join(" ")}
          >
            <div
              className={`font-mono text-[10px] mb-1 ${cp.urgent ? "text-coral" : "text-text-subtle"}`}
            >
              {cp.week}
            </div>
            <div className="text-[13px] font-medium text-text mb-1">{cp.title}</div>
            <div className="text-[11px] text-text-muted leading-[1.6]">{cp.detail}</div>
          </div>
        ))}
      </div>
    </>
  );
}
