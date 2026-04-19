import PageHeader from "@/components/PageHeader";
import { loadWeights } from "@/lib/data";
import { currentWeekIndex } from "@/data/plan";
import WeightClient from "./WeightClient";

export const dynamic = "force-dynamic";

export default async function WeightPage() {
  const weights = await loadWeights();
  return (
    <>
      <PageHeader
        title="Weight log"
        subtitle="Weigh every morning, enter the weekly average each Monday"
      />
      <div className="bg-surface border border-border rounded-xl p-5 mb-6 text-[13px] text-text-muted leading-[1.6]">
        Weigh yourself every morning after waking, before eating. Daily weight fluctuates 1–2kg
        with water and sodium. Log your{" "}
        <strong className="text-text">7-day average</strong> each Monday — judge the trend, not the
        daily number.
      </div>
      <WeightClient initialWeights={weights} currentWeek={currentWeekIndex()} />
    </>
  );
}
