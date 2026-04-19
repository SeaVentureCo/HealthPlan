"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Dumbbell, Utensils, Scale, MoreHorizontal } from "lucide-react";

const tabs = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/training", label: "Training", icon: Dumbbell },
  { href: "/meals", label: "Meals", icon: Utensils },
  { href: "/weight", label: "Weight", icon: Scale },
  { href: "/more", label: "More", icon: MoreHorizontal },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href === "/more" && [
            "/more", "/workouts", "/canteen", "/prep", "/rules", "/checkpoints",
          ].includes(pathname));
          return (
            <Link
              key={href}
              href={href}
              className={[
                "flex flex-col items-center justify-center py-2 gap-0.5 transition-colors",
                active ? "text-green" : "text-text-muted",
              ].join(" ")}
            >
              <Icon size={20} strokeWidth={1.6} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
