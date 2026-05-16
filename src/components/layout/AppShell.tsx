import type { ReactNode } from "react";

import { brandName } from "../../content/brand";
import { appCopy } from "../../content/copy";
import { Stepper, type StepperItem } from "../ui/Stepper";

export interface AppShellProps {
  children: ReactNode;
  currentStepId: string;
  steps: StepperItem[];
  summary?: ReactNode;
}

export function AppShell({ children, currentStepId, steps, summary }: AppShellProps) {
  return (
    <main className="ut-campus-surface min-h-screen px-4 py-6 text-[var(--ut-ink)] sm:px-6 lg:px-10">
      <a
        className="ut-sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--ut-yellow)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[var(--ut-blue-deep)]"
        href="#wizard-content"
      >
        Lewati ke isi wizard
      </a>
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="ut-official-card overflow-hidden rounded-[2rem] bg-[var(--ut-blue)] text-white">
          <div className="relative px-6 py-7 sm:px-8 lg:px-10">
            <div className="absolute right-[-5.75rem] top-[-5.75rem] h-28 w-28 rounded-bl-[3rem] bg-[var(--ut-yellow)]/95 lg:right-0 lg:top-0 lg:h-32 lg:w-32 lg:rounded-bl-[5rem]" aria-hidden="true" />
            <div className="absolute bottom-0 right-14 h-1.5 w-48 rounded-full bg-[var(--ut-yellow)]" aria-hidden="true" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ut-yellow)]">
              {brandName}
            </p>
            <h1 className="relative mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              {appCopy.title}
            </h1>
            <p className="relative mt-4 max-w-2xl text-base leading-7 text-white/82">
              {appCopy.subtitle}
            </p>
          </div>
        </header>

        <section className="rounded-[2rem] border border-[var(--ut-border)] bg-white/88 p-4 shadow-[var(--ut-shadow-card)] backdrop-blur sm:p-5">
          <Stepper currentStepId={currentStepId} steps={steps} />
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div id="wizard-content">{children}</div>
          {summary ? <aside className="hidden lg:block">{summary}</aside> : null}
        </div>
      </div>
    </main>
  );
}
