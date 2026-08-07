import { useEffect, useState } from "react";

import { detailStepCopy } from "../../content/copy";
import type { ExamLocation } from "../../types/location";
import { MapPreview } from "../location/MapPreview";

export interface LocationDetailStepProps {
  location: ExamLocation | null;
}

export function LocationDetailStep({ location }: LocationDetailStepProps) {
  const photoUrls = location ? [location.photoUrl, ...location.galleryPhotoUrls] : [];
  const [previewPhotoIndex, setPreviewPhotoIndex] = useState<number | null>(null);
  const previewPhotoUrl = previewPhotoIndex === null ? null : photoUrls[previewPhotoIndex];

  useEffect(() => {
    if (previewPhotoIndex === null || photoUrls.length === 0) {
      return;
    }

    function handlePreviewShortcut(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPreviewPhotoIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setPreviewPhotoIndex((currentIndex) =>
          currentIndex === null ? currentIndex : (currentIndex - 1 + photoUrls.length) % photoUrls.length,
        );
      }

      if (event.key === "ArrowRight") {
        setPreviewPhotoIndex((currentIndex) =>
          currentIndex === null ? currentIndex : (currentIndex + 1) % photoUrls.length,
        );
      }
    }

    window.addEventListener("keydown", handlePreviewShortcut);

    return () => {
      window.removeEventListener("keydown", handlePreviewShortcut);
    };
  }, [photoUrls.length, previewPhotoIndex]);

  if (!location) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--ut-border-strong)] bg-white px-5 py-6 text-[var(--ut-muted)]">
        {detailStepCopy.empty}
      </p>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <figure className="self-start overflow-hidden rounded-[1.75rem] border border-[var(--ut-border)] bg-white shadow-[var(--ut-shadow-card)]">
        <button
          aria-label={detailStepCopy.mainPhotoAria(location.schoolName)}
          className="block w-full cursor-zoom-in focus-visible:shadow-[var(--ut-focus-ring)]"
          onClick={() => setPreviewPhotoIndex(0)}
          type="button"
        >
          <img
            alt={detailStepCopy.mainPhotoAlt(location.schoolName)}
            className="h-56 w-full object-cover sm:h-64"
            src={location.photoUrl}
          />
        </button>
        <div className="grid grid-cols-4 gap-2 border-t border-[var(--ut-border)] bg-white p-3">
          {location.galleryPhotoUrls.map((photoUrl, index) => (
            <button
              aria-label={detailStepCopy.galleryPhotoAria(index, location.schoolName)}
              className="cursor-zoom-in rounded-xl focus-visible:shadow-[var(--ut-focus-ring)]"
              key={photoUrl}
              onClick={() => setPreviewPhotoIndex(index + 1)}
              type="button"
            >
              <img
                alt={detailStepCopy.galleryPhotoAlt(index, location.schoolName)}
                className="h-16 w-full rounded-xl border border-[var(--ut-border)] object-cover shadow-[0_8px_18px_rgba(16,32,51,0.08)]"
                src={photoUrl}
              />
            </button>
          ))}
        </div>
        <figcaption className="border-t border-[var(--ut-border)] px-5 py-3 text-sm text-[var(--ut-muted)]">
          {detailStepCopy.photoCaption}
        </figcaption>
      </figure>

      <div className="space-y-5">
        <section className="rounded-[1.75rem] border border-[var(--ut-border)] bg-white p-5 shadow-[var(--ut-shadow-soft)]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--ut-blue)]">
            {detailStepCopy.sectionTitle}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[var(--ut-blue-deep)]">{location.schoolName}</h3>
          <p className="mt-3 text-base leading-7 text-[var(--ut-muted)]">{location.description}</p>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--ut-blue-soft)] p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ut-muted)]">
                {detailStepCopy.examDate}
              </dt>
              <dd className="mt-1 space-y-1 font-bold text-[var(--ut-blue-deep)]">
                <span className="block">{location.examDate}</span>
                <span className="block text-sm font-semibold text-[var(--ut-blue)]">{location.examTime}</span>
              </dd>
            </div>
            <div className="rounded-2xl bg-[var(--ut-yellow-soft)] p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ut-muted)]">
                {detailStepCopy.quota}
              </dt>
              <dd className="mt-1 font-bold text-[var(--ut-blue-deep)]">
                {detailStepCopy.roomsAvailable(location.availableRooms)}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-[1.75rem] border border-[var(--ut-border)] bg-white p-5 shadow-[var(--ut-shadow-soft)]">
          <h3 className="text-lg font-bold text-[var(--ut-blue-deep)]">{detailStepCopy.addressTitle}</h3>
          <p className="mt-2 text-base leading-7 text-[var(--ut-muted)]">{location.address}</p>
        </section>

        <MapPreview
          address={location.address}
          label={location.schoolName}
          latitude={location.latitude}
          longitude={location.longitude}
          mapUrl={location.mapUrl}
        />
      </div>

      {previewPhotoUrl && previewPhotoIndex !== null ? (
        <div
          aria-labelledby="photo-preview-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,22,50,0.82)] p-4 backdrop-blur-sm"
          onClick={() => setPreviewPhotoIndex(null)}
          role="dialog"
        >
          <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-[var(--ut-shadow-card)]">
              <p className="text-sm font-bold text-[var(--ut-blue-deep)]" id="photo-preview-title">
                {detailStepCopy.previewTitle(location.schoolName)}
              </p>
              <button
                className="rounded-full bg-[var(--ut-blue)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--ut-blue-deep)] focus-visible:shadow-[var(--ut-focus-ring)]"
                onClick={() => setPreviewPhotoIndex(null)}
                type="button"
              >
                {detailStepCopy.close}
              </button>
            </div>
            <div className="relative">
              <button
                aria-label={detailStepCopy.prevAria}
                className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-3xl font-bold text-[var(--ut-blue-deep)] shadow-[0_14px_32px_rgba(0,0,0,0.28)] transition hover:bg-[var(--ut-yellow)] focus-visible:shadow-[var(--ut-focus-ring)]"
                onClick={() =>
                  setPreviewPhotoIndex((currentIndex) =>
                    currentIndex === null ? currentIndex : (currentIndex - 1 + photoUrls.length) % photoUrls.length,
                  )
                }
                type="button"
              >
                ‹
              </button>
              <img
                alt={detailStepCopy.previewAlt(location.schoolName)}
                className="max-h-[78vh] w-full rounded-[1.5rem] border border-white/25 object-contain shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
                src={previewPhotoUrl}
              />
              <button
                aria-label={detailStepCopy.nextAria}
                className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-3xl font-bold text-[var(--ut-blue-deep)] shadow-[0_14px_32px_rgba(0,0,0,0.28)] transition hover:bg-[var(--ut-yellow)] focus-visible:shadow-[var(--ut-focus-ring)]"
                onClick={() =>
                  setPreviewPhotoIndex((currentIndex) =>
                    currentIndex === null ? currentIndex : (currentIndex + 1) % photoUrls.length,
                  )
                }
                type="button"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
