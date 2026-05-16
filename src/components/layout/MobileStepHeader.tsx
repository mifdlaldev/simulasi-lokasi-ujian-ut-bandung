import type { ReactNode } from "react";

export interface MobileStepHeaderProps {
  currentStepIndex: number;
  currentStepLabel: string;
  summary?: ReactNode;
  totalSteps: number;
}

export function MobileStepHeader({
  currentStepIndex,
  currentStepLabel,
  summary,
  totalSteps,
}: MobileStepHeaderProps) {
  const safeTotal = Math.max(totalSteps, 1);
  const safeCurrent = Math.min(Math.max(currentStepIndex, 1), safeTotal);
  const stepFraction = `${safeCurrent}/${safeTotal}`;

  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ut-muted)]">
            Langkah {safeCurrent} dari {safeTotal}
          </p>
          <h2 className="mt-1 text-lg font-bold text-[var(--ut-blue-deep)]">{currentStepLabel}</h2>
        </div>
        <div
          aria-label={`Langkah ${safeCurrent} dari ${safeTotal}`}
          aria-valuemax={safeTotal}
          aria-valuemin={1}
          aria-valuenow={safeCurrent}
          aria-valuetext={`Langkah ${safeCurrent} dari ${safeTotal}`}
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[var(--ut-yellow)] text-sm font-black text-[var(--ut-blue-deep)]"
          role="progressbar"
        >
          {stepFraction}
        </div>
      </div>

      {summary ? (
        <details className="rounded-2xl border border-[var(--ut-border)] bg-white px-4 py-3">
          <summary className="cursor-pointer text-sm font-semibold text-[var(--ut-blue)] focus-visible:shadow-[var(--ut-focus-ring)]">
            Lihat ringkasan pilihan
          </summary>
          <div className="mt-3">{summary}</div>
        </details>
      ) : null}
    </div>
  );
}
