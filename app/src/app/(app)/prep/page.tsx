import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import { prepStats, prepSteps } from "@/data/plan";

export default function PrepPage() {
  return (
    <>
      <PageHeader
        title="Sunday meal prep"
        subtitle="9 meals in ~2 hours — covers all weeknight dinners + weekend lunch & dinner"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
        <StatCard label="Meals prepped" value={prepStats.meals} sub="All dinners + wknd lunch" />
        <StatCard label="Prep time" value={prepStats.prepTime} sub="After yoga" />
        <StatCard label="Containers" value={prepStats.containers} sub="MCIRCO 10-set covers it" />
        <StatCard label="Est. cost" value={prepStats.estCost} sub="Albert Heijn or Jumbo" />
      </div>

      <h2 className="font-syne text-[13px] font-semibold text-text mb-3.5">
        Cooking order — Sunday afternoon
      </h2>
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {prepSteps.map((s, i) => (
          <div
            key={i}
            className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-4 px-4 md:px-5 py-3.5 border-b border-border last:border-b-0"
          >
            <div className="font-mono text-[12px] text-amber pt-0.5">{s.time}</div>
            <div>
              <div className="text-[13px] font-medium text-text mb-1">{s.title}</div>
              <div className="text-[12px] text-text-muted leading-[1.5]">{s.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
