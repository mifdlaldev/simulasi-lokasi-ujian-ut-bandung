import type { ExamLocation, ExamRegion, StudentIdentity } from "../../types/location";
import { summaryCopy } from "../../content/copy";

export interface SelectionSummaryProps {
  identity?: StudentIdentity;
  location: ExamLocation | null;
  region: ExamRegion | null;
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--ut-border)] bg-white px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ut-muted)]">{label}</dt>
      <dd className="mt-1 break-words text-sm font-semibold text-[var(--ut-blue-deep)]">{value}</dd>
    </div>
  );
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
        <SummaryItem label={summaryCopy.student} value={identity?.name || summaryCopy.studentFallback} />
        <SummaryItem label={summaryCopy.programStudy} value={identity?.programStudy || summaryCopy.programStudyFallback} />
        <SummaryItem label={summaryCopy.contact} value={contact} />
        <SummaryItem label={summaryCopy.region} value={region?.name || summaryCopy.regionFallback} />
        <SummaryItem label={summaryCopy.school} value={location?.schoolName || summaryCopy.schoolFallback} />
        <SummaryItem label={summaryCopy.date} value={examSchedule} />
      </dl>
      <p className="mt-5 rounded-2xl bg-[var(--ut-blue-soft)] px-4 py-3 text-sm leading-6 text-[var(--ut-blue-deep)]">
        {summaryCopy.footnote}
      </p>
    </section>
  );
}
