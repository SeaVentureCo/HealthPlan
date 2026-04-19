import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Dumbbell, Coffee, ChefHat, ListChecks, MapPin, ClipboardList } from "lucide-react";

const items = [
  { href: "/workouts", label: "Workout detail", desc: "Sets, reps and coaching notes per session", icon: Dumbbell },
  { href: "/canteen", label: "Canteen guide", desc: "This week's Uber Amsterdam menu picks", icon: Coffee },
  { href: "/prep", label: "Sunday prep", desc: "9 meals in 2 hours — step-by-step", icon: ChefHat },
  { href: "/rules", label: "Non-negotiables", desc: "Daily rules + sleep protocol", icon: ListChecks },
  { href: "/checkpoints", label: "Plan checkpoints", desc: "When to come back to Claude", icon: MapPin },
];

export default function MorePage() {
  return (
    <>
      <PageHeader title="More" subtitle="Everything else" />
      <div className="space-y-2">
        {items.map(({ href, label, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 bg-surface border border-border rounded-xl px-4 py-3.5 hover:bg-card transition"
          >
            <span className="w-9 h-9 rounded-lg bg-card flex items-center justify-center text-text-muted">
              <Icon size={18} strokeWidth={1.6} />
            </span>
            <span className="flex-1">
              <span className="block text-[13px] font-medium text-text">{label}</span>
              <span className="block text-[11px] text-text-muted mt-0.5">{desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
