"use client";

import { useEffect, useState } from "react";

interface Props {
  checked: boolean;
  onChange: (next: boolean) => void;
  size?: "sm" | "md";
  ariaLabel?: string;
}

export default function Checkbox({ checked, onChange, size = "md", ariaLabel }: Props) {
  // Optimistic local state — toggles instantly, parent syncs in background
  const [local, setLocal] = useState(checked);
  useEffect(() => setLocal(checked), [checked]);

  const px = size === "sm" ? "w-[18px] h-[18px]" : "w-5 h-5";
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-checked={local}
      role="checkbox"
      onClick={(e) => {
        e.stopPropagation();
        const next = !local;
        setLocal(next);
        onChange(next);
      }}
      className={[
        "rounded-[5px] border-[1.5px] cursor-pointer flex items-center justify-center transition-colors flex-shrink-0",
        px,
        local
          ? "bg-green border-green"
          : "bg-transparent border-border-strong hover:border-green",
      ].join(" ")}
    >
      {local && (
        <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
          <path d="M2 6.5L4.5 9L10 3" stroke="#0e0f0e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
