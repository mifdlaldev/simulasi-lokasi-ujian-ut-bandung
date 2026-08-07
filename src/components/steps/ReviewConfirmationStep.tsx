import { useEffect, useState } from "react";
import { appCopy, reviewStepCopy } from "../../content/copy";
import type { ExamLocation, ExamRegion, StudentIdentity } from "../../types/location";
import { Button } from "../ui/Button";
import { SummaryItem } from "../ui/SummaryItem";

export interface ReviewConfirmationStepProps {
  acknowledgementAccepted: boolean;
  identity: StudentIdentity;
  location: ExamLocation | null;
  onAcknowledgementChange: (accepted: boolean) => void;
  onConfirm: () => void;
  region: ExamRegion | null;
}

export function ReviewConfirmationStep({
  acknowledgementAccepted,
  identity,
  location,
  onAcknowledgementChange,
  onConfirm,
  region,
}: ReviewConfirmationStepProps) {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  useEffect(() => {
    if (!confirmationModalOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setConfirmationModalOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [confirmationModalOpen]);

  function handleFinalConfirm() {
    setConfirmationModalOpen(false);
    onConfirm();
  }

  return (
    <div className="space-y-6">
      <dl className="grid gap-3 sm:grid-cols-2">
        <SummaryItem label={reviewStepCopy.rows.nim} value={identity.nim} valueFallback={reviewStepCopy.valueFallback} />
        <SummaryItem label={reviewStepCopy.rows.name} value={identity.name} valueFallback={reviewStepCopy.valueFallback} />
        <SummaryItem label={reviewStepCopy.rows.programStudy} value={identity.programStudy} valueFallback={reviewStepCopy.valueFallback} />
        <SummaryItem label={reviewStepCopy.rows.contact} value={identity.email || identity.phone} valueFallback={reviewStepCopy.valueFallback} />
        <SummaryItem label={reviewStepCopy.rows.region} value={region?.name ?? ""} valueFallback={reviewStepCopy.valueFallback} />
        <SummaryItem label={reviewStepCopy.rows.school} value={location?.schoolName ?? ""} valueFallback={reviewStepCopy.valueFallback} />
        <SummaryItem label={reviewStepCopy.rows.examDate} value={location?.examDate ?? ""} valueFallback={reviewStepCopy.valueFallback} />
        <SummaryItem label={reviewStepCopy.rows.quota} value={location ? reviewStepCopy.quotaValue(location.availableRooms) : ""} valueFallback={reviewStepCopy.valueFallback} />
      </dl>

      <section className="rounded-[1.5rem] border border-[var(--ut-border)] bg-[var(--ut-surface)] p-5">
        <h3 className="text-lg font-bold text-[var(--ut-blue-deep)]">{reviewStepCopy.addressTitle}</h3>
        <p className="mt-2 text-base leading-7 text-[var(--ut-muted)]">
          {location?.address ?? reviewStepCopy.noLocationAddress}
        </p>
      </section>

      <label className="flex gap-3 rounded-[1.5rem] border border-[var(--ut-border-strong)] bg-white p-4 text-sm leading-6 text-[var(--ut-ink)]">
        <input
          checked={acknowledgementAccepted}
          className="mt-1 size-5 shrink-0 accent-[var(--ut-blue)] focus-visible:shadow-[var(--ut-focus-ring)]"
          onChange={(event) => onAcknowledgementChange(event.target.checked)}
          type="checkbox"
        />
        <span>{appCopy.acknowledgement}</span>
      </label>
      {!acknowledgementAccepted ? (
        <p className="-mt-3 text-sm font-medium leading-6 text-[var(--ut-danger)]">
          {reviewStepCopy.checkboxHint}
        </p>
      ) : null}

      <div className="rounded-[1.5rem] border border-[var(--ut-yellow)] bg-[var(--ut-yellow-soft)] p-4 text-sm leading-6 text-[var(--ut-blue-deep)]">
        {appCopy.prototypeDisclaimer}
      </div>

      <Button className="w-full" disabled={!acknowledgementAccepted} onClick={() => setConfirmationModalOpen(true)}>
        {reviewStepCopy.confirmButton}
      </Button>

      {confirmationModalOpen ? (
        <div
          aria-describedby="final-confirmation-description"
          aria-labelledby="final-confirmation-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,22,50,0.78)] p-4 backdrop-blur-sm"
          onClick={() => setConfirmationModalOpen(false)}
          role="dialog"
        >
          <section
            className="w-full max-w-xl rounded-[2rem] border border-white/30 bg-white p-6 shadow-[0_28px_90px_rgba(0,0,0,0.32)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--ut-blue)]">
              {reviewStepCopy.modalEyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[var(--ut-blue-deep)]" id="final-confirmation-title">
              {reviewStepCopy.modalTitle}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--ut-muted)]" id="final-confirmation-description">
              {reviewStepCopy.modalDescription}
            </p>

            <dl className="mt-5 grid gap-3 rounded-[1.5rem] bg-[var(--ut-blue-soft)] p-4 text-sm text-[var(--ut-blue-deep)]">
              <div>
                <dt className="font-semibold">{reviewStepCopy.modalSchool}</dt>
                <dd>{location?.schoolName ?? reviewStepCopy.modalSchoolFallback}</dd>
              </div>
              <div>
                <dt className="font-semibold">{reviewStepCopy.modalSchedule}</dt>
                <dd>{location ? `${location.examDate} · ${location.examTime}` : reviewStepCopy.modalScheduleFallback}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                className="rounded-full border border-[var(--ut-border-strong)] bg-white px-5 py-3 text-sm font-bold text-[var(--ut-blue-deep)] transition hover:border-[var(--ut-blue)] focus-visible:shadow-[var(--ut-focus-ring)]"
                onClick={() => setConfirmationModalOpen(false)}
                type="button"
              >
                {reviewStepCopy.modalCancel}
              </button>
              <button
                className="rounded-full bg-[var(--ut-blue)] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(0,80,158,0.22)] transition hover:bg-[var(--ut-blue-deep)] focus-visible:shadow-[var(--ut-focus-ring)]"
                onClick={handleFinalConfirm}
                type="button"
              >
                {reviewStepCopy.modalConfirm}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
