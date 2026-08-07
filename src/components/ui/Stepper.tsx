import { stepperCopy } from "../../content/copy";

export interface StepperItem {
  id: string;
  label: string;
}

export interface StepperProps {
  currentStepId: string;
  steps: StepperItem[];
}

function getStepState(index: number, currentIndex: number): "completed" | "current" | "upcoming" {
  if (index < currentIndex) {
    return "completed";
  }

  if (index === currentIndex) {
    return "current";
  }

  return "upcoming";
}

export function Stepper({ currentStepId, steps }: StepperProps) {
  const currentIndex = Math.max(
    steps.findIndex((step) => step.id === currentStepId),
    0,
  );

  return (
    <nav aria-label={stepperCopy.navLabel}>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => {
          const state = getStepState(index, currentIndex);
          const isCurrent = state === "current";
          const isCompleted = state === "completed";

          return (
            <li key={step.id}>
              <div
                className="flex min-h-14 items-center gap-3 rounded-2xl border border-[var(--ut-border)] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(16,32,51,0.06)]"
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`${step.label}: ${isCurrent ? stepperCopy.stateCurrent : isCompleted ? stepperCopy.stateCompleted : stepperCopy.stateUpcoming}`}
              >
                <span
                  className={[
                    "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                    isCompleted ? "bg-[var(--ut-blue)] text-white" : "",
                    isCurrent ? "bg-[var(--ut-yellow)] text-[var(--ut-blue-deep)] ring-2 ring-[var(--ut-blue)]" : "",
                    state === "upcoming" ? "bg-[var(--ut-blue-soft)] text-[var(--ut-blue)]" : "",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {isCompleted ? "✓" : index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--ut-muted)]">
                    {isCurrent ? stepperCopy.statusCurrent : isCompleted ? stepperCopy.statusCompleted : stepperCopy.statusUpcoming}
                  </span>
                  <span className="block truncate text-sm font-semibold text-[var(--ut-ink)]">
                    {step.label}
                  </span>
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
