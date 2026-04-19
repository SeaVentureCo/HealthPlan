"use client";

import { LayoutDashboard, Dumbbell, Utensils, Scale, MoreHorizontal, ListChecks, Calendar, ChefHat, Coffee, ClipboardList, MapPin } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/checkpoints", label: "Plan checkpoints", icon: MapPin },
    ],
  },
  {
    label: "Training",
    items: [
      { href: "/training", label: "Weekly schedule", icon: Calendar },
      { href: "/workouts", label: "Workout detail", icon: Dumbbell },
    ],
  },
  {
    label: "Nutrition",
    items: [
      { href: "/meals", label: "Meal plan", icon: Utensils },
      { href: "/canteen", label: "Canteen guide", icon: Coffee },
      { href: "/prep", label: "Sunday prep", icon: ChefHat },
    ],
  },
  {
    label: "Daily",
    items: [
      { href: "/rules", label: "Non-negotiables", icon: ListChecks },
      { href: "/weight", label: "Weight log", icon: Scale },
    ],
  },
];

export default function Sidebar({ daysToBermuda }: { daysToBermuda: number }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex bg-surface border-r border-border flex-col sticky top-0 h-screen overflow-y-auto w-[220px] py-7">
      <div className="px-6 pb-7 border-b border-border mb-4">
        <div className="font-syne text-[15px] font-bold tracking-tight text-text">Blair — Bermuda Cut</div>
        <div className="font-mono text-[11px] text-text-subtle mt-0.5">9 July 2026 · 10 weeks</div>
      </div>

      <nav className="flex-1">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="px-6 pt-2 pb-1 font-mono text-[9px] font-semibold text-text-subtle tracking-[0.12em] uppercase mt-2">
              {section.label}
            </div>
            {section.items.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "flex items-center gap-2.5 px-6 py-2.5 cursor-pointer border-l-2 transition-colors text-[13px]",
                    active
                      ? "text-text border-green bg-green-bg"
                      : "text-text-muted border-transparent hover:text-text hover:bg-card",
                  ].join(" ")}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? "bg-green" : "bg-text-subtle"}`} />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-5 px-6 border-t border-border">
        <div className="bg-amber-bg border border-amber-edge rounded-lg px-3 py-2.5">
          <div className="font-syne text-[28px] font-bold text-amber leading-none">{daysToBermuda}</div>
          <div className="text-[11px] text-text-muted mt-0.5">days to Bermuda</div>
        </div>
      </div>
    </aside>
  );
}
