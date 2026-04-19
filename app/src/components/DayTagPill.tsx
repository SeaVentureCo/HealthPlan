import type { DayTag } from "@/data/plan";
import { tagLabel } from "@/data/plan";

const tagStyles: Record<DayTag, string> = {
  strength: "bg-blue-bg text-blue",
  zone2: "bg-green-bg text-green",
  hiit: "bg-coral-bg text-coral",
  yoga: "bg-purple-bg text-purple",
  social: "bg-pink-bg text-pink",
  rest: "bg-white/5 text-text-muted",
  travel: "bg-amber-bg text-amber",
};

export default function DayTagPill({ tag }: { tag: DayTag }) {
  return (
    <span className={`font-mono text-[10px] px-2 py-[3px] rounded inline-block whitespace-nowrap ${tagStyles[tag]}`}>
      {tagLabel(tag)}
    </span>
  );
}
