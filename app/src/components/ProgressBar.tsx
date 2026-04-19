interface Props {
  label: string;
  pct: number;
}

export default function ProgressBar({ label, pct }: Props) {
  const safe = Math.max(0, Math.min(100, Math.round(pct)));
  return (
    <div className="bg-surface border border-border rounded-xl px-5 py-4 mb-7">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-medium text-text-muted">{label}</span>
        <span className="font-mono text-[13px] text-green">{safe}%</span>
      </div>
      <div className="h-1 bg-card rounded-sm overflow-hidden">
        <div
          className="h-full bg-green rounded-sm transition-all duration-500 ease-out"
          style={{ width: `${safe}%` }}
        />
      </div>
    </div>
  );
}
