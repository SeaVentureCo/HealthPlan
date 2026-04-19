import PageHeader from "@/components/PageHeader";
import { dailyStructure, weekendMeals, macroTargets } from "@/data/plan";

export default function MealsPage() {
  return (
    <>
      <PageHeader
        title="Meal plan"
        subtitle="Daily food structure — smoothie, canteen, prepped dinner"
      />

      <div className="bg-surface border border-border rounded-xl p-5 mb-5">
        <div className="font-syne text-[13px] font-semibold text-text mb-3.5">
          Daily structure — every weekday
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-0">
          {dailyStructure.map((slot, i) => (
            <div
              key={slot.label}
              className={[
                "py-3 md:py-0",
                i < dailyStructure.length - 1 ? "md:border-r md:border-border md:pr-4" : "md:pl-4",
                i > 0 ? "md:pl-4" : "",
              ].join(" ")}
            >
              <div className="font-mono text-[10px] text-text-subtle uppercase tracking-[0.1em] mb-1.5">
                {slot.label}
              </div>
              <div className="text-[13px] text-text mb-1">{slot.title}</div>
              <div className="text-[11px] text-text-muted leading-[1.5]">{slot.detail}</div>
              <div className="font-mono text-[10px] text-text-subtle mt-1.5">{slot.kcal}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-5 mb-5">
        <div className="font-syne text-[13px] font-semibold text-text mb-3">Macro targets</div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="font-mono text-[10px] text-text-subtle uppercase mb-1">Protein</div>
            <div className="font-syne text-[20px] font-bold text-green">{macroTargets.protein}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-text-subtle uppercase mb-1">Calories</div>
            <div className="font-syne text-[14px] font-medium text-text">{macroTargets.calories}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-text-subtle uppercase mb-1">Water</div>
            <div className="font-syne text-[20px] font-bold text-blue">{macroTargets.water}</div>
          </div>
        </div>
      </div>

      <h2 className="font-syne text-[13px] font-semibold text-text mb-3.5">Weekend meals</h2>
      <div className="space-y-3">
        {weekendMeals.map((d) => (
          <div key={d.day} className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="px-4 md:px-5 py-3 border-b border-border flex justify-between items-center gap-2">
              <div className="text-[12px] md:text-[13px] font-medium">{d.day}</div>
              <div className="font-mono text-[10px] md:text-[11px] text-text-subtle text-right">{d.total}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              {d.meals.map((m, i) => (
                <div
                  key={m.slot}
                  className={[
                    "p-4",
                    i < d.meals.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : "",
                  ].join(" ")}
                >
                  <div className="font-mono text-[9px] text-text-subtle uppercase tracking-[0.1em] mb-1.5">
                    {m.slot}
                  </div>
                  <div className="text-[12px] text-text leading-[1.4] mb-1.5">{m.food}</div>
                  <div className="font-mono text-[10px] text-text-subtle">{m.kcal}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
