import type { ExamLocation, ExamRegion, StudentIdentity } from "../../types/location";
import { summaryCopy } from "../../content/copy";
import { SummaryItem } from "../ui/SummaryItem";

export interface SelectionSummaryProps {
  identity?: StudentIdentity;
  location: ExamLocation | null;
  region: ExamRegion | null;
}

export function SelectionSummary({ identity, location, region }: SelectionSummaryProps) {
  const contact = identity?.email || identity?.phone || summaryCopy.contactFallback;
  const examSchedule = location
    ? `${location.examDate} · ${location.examTime}`
    : summaryCopy.scheduleFallback;

  return (
    <section aria-label={summaryCopy.ariaLabel} className="rounded-[2rem] border border-[var(--ut-border)] bg-white p-4 shadow-[var(--ut-shadow-card)] sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ut-blue)]">
        {summaryCopy.title}
      </p>
      <h2 className="mt-2 text-xl font-bold text-[var(--ut-blue-deep)]">{summaryCopy.statusTitle}</h2>
      <dl className="mt-5 grid gap-3">
        <SummaryItem label={summaryCopy.student} value={identity?.name ?? ""} valueFallback={summaryCopy.studentFallback} />
        <SummaryItem label={summaryCopy.programStudy} value={identity?.programStudy ?? ""} valueFallback={summaryCopy.programStudyFallback} />
        <SummaryItem label={summaryCopy.contact} value={contact} />
        <SummaryItem label={summaryCopy.region} value={region?.name ?? ""} valueFallback={summaryCopy.regionFallback} />
        <SummaryItem label={summaryCopy.school} value={location?.schoolName ?? ""} valueFallback={summaryCopy.schoolFallback} />
        <SummaryItem label={summaryCopy.date} value={examSchedule} />
      </dl>
      <p className="mt-5 rounded-2xl bg-[var(--ut-blue-soft)] px-4 py-3 text-sm leading-6 text-[var(--ut-blue-deep)]">
        {summaryCopy.footnote}
      </p>
    </section>
  );
}
