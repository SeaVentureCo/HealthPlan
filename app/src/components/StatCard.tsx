interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  valueClassName?: string;
}

export default function StatCard({ label, value, sub, valueClassName }: StatCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl px-4 py-4 md:px-[18px] md:py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-subtle mb-2">
        {label}
      </div>
      <div className={`font-syne text-[22px] md:text-[24px] font-bold tracking-tight text-text ${valueClassName ?? ""}`}>
        {value}
      </div>
      {sub && <div className="text-[11px] text-text-subtle mt-1">{sub}</div>}
    </div>
  );
}
