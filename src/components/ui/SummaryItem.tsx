export interface SummaryItemProps {
  label: string;
  value: string;
  valueFallback?: string;
}

export function SummaryItem({ label, value, valueFallback = "" }: SummaryItemProps) {
  return (
    <div className="rounded-2xl border border-[var(--ut-border)] bg-white px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ut-muted)]">{label}</dt>
      <dd className="mt-1 break-words text-sm font-semibold text-[var(--ut-blue-deep)]">{value || valueFallback}</dd>
    </div>
  );
}
