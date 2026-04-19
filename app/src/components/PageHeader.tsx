export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6 md:mb-8">
      <h1 className="font-syne text-[22px] md:text-[26px] font-bold text-text tracking-tight">{title}</h1>
      {subtitle && <p className="text-[13px] text-text-muted mt-1.5">{subtitle}</p>}
    </div>
  );
}
