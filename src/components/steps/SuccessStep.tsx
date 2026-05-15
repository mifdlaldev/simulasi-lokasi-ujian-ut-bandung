import { appCopy } from "../../content/copy";
import { Button } from "../ui/Button";

export interface SuccessStepProps {
  onReset?: () => void;
}

export function SuccessStep({ onReset }: SuccessStepProps) {
  return (
    <section className="rounded-[2rem] border border-[var(--ut-border)] bg-white p-6 text-center shadow-[var(--ut-shadow-card)] sm:p-10">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[var(--ut-yellow)] text-3xl font-black text-[var(--ut-blue-deep)]">
        ✓
      </div>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--ut-blue-deep)]">
        {appCopy.successTitle}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--ut-muted)]">
        {appCopy.successDescription}
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--ut-muted)]">
        Simpan ringkasan ini sebagai gambaran alur prototype. Data belum masuk ke sistem resmi
        Universitas Terbuka.
      </p>
      {onReset ? (
        <div className="mt-7 flex justify-center">
          <Button onClick={onReset} variant="secondary">
            Ulangi Simulasi
          </Button>
        </div>
      ) : null}
    </section>
  );
}
