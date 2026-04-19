import PageHeader from "@/components/PageHeader";
import { workoutSessions } from "@/data/plan";

export default function WorkoutsPage() {
  return (
    <>
      <PageHeader
        title="Workout detail"
        subtitle="Exercises, sets and reps for each strength session"
      />
      <div className="space-y-4">
        {workoutSessions.map((s) => (
          <div key={s.day} className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
              <div className="font-syne text-sm font-semibold">{s.day}</div>
              <div className="text-[11px] text-text-subtle">{s.location}</div>
            </div>
            <div className="grid grid-cols-[1fr_50px_70px] md:grid-cols-[1fr_60px_80px] px-4 md:px-5 pt-2.5 pb-1 gap-3">
              <div className="font-mono text-[10px] text-text-subtle">EXERCISE</div>
              <div className="font-mono text-[10px] text-text-subtle">SETS</div>
              <div className="font-mono text-[10px] text-text-subtle">REPS</div>
            </div>
            {s.exercises.map((e) => (
              <div
                key={e.name}
                className="grid grid-cols-[1fr_50px_70px] md:grid-cols-[1fr_60px_80px] px-4 md:px-5 py-2.5 border-t border-border gap-3 items-start"
              >
                <div>
                  <div className="text-[12px] md:text-[13px] text-text mb-0.5">{e.name}</div>
                  <div className="text-[11px] text-text-subtle">{e.note}</div>
                </div>
                <div className="font-mono text-[12px] md:text-[13px] text-text-muted">{e.sets}</div>
                <div className="font-mono text-[12px] md:text-[13px] text-text-muted">{e.reps}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
