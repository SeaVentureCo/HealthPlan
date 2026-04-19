import type { Phase } from "@/data/plan";

const phaseStyles: Record<Phase, string> = {
  Reset: "bg-blue-bg text-blue",
  Build: "bg-green-bg text-green",
  Push: "bg-coral-bg text-coral",
  Peak: "bg-amber-bg text-amber",
  Arrive: "bg-purple-bg text-purple",
};

export default function PhaseBadge({ phase }: { phase: Phase }) {
  return (
    <span className={`inline-block font-mono text-[10px] px-2.5 py-[3px] rounded ${phaseStyles[phase]}`}>
      {phase}
    </span>
  );
}
