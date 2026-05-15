import type { ReactNode } from "react";

export interface WizardFrameProps {
  children: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  mobileHeader?: ReactNode;
  title: string;
}

export function WizardFrame({
  children,
  description,
  footer,
  mobileHeader,
  title,
}: WizardFrameProps) {
  return (
    <section className="rounded-[2rem] border border-[var(--ut-border)] bg-white shadow-[var(--ut-shadow-card)]">
      {mobileHeader ? <div className="border-b border-[var(--ut-border)] lg:hidden">{mobileHeader}</div> : null}
      <div className="p-5 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ut-blue)]">
            Wizard Pemilihan Lokasi
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--ut-blue-deep)] sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <div className="mt-3 text-base leading-7 text-[var(--ut-muted)]">{description}</div>
          ) : null}
        </div>
        <div className="mt-7">{children}</div>
      </div>
      {footer ? (
        <div className="flex flex-col gap-3 border-t border-[var(--ut-border)] bg-[var(--ut-surface)] px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
          {footer}
        </div>
      ) : null}
    </section>
  );
}
