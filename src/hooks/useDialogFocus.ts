import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Fokus management untuk dialog/lightbox:
 * - pindah fokus ke elemen focusable pertama saat dibuka,
 * - jebak Tab agar tidak keluar dari dialog,
 * - kembalikan fokus ke elemen pemicu saat ditutup.
 */
export function useDialogFocus<T extends HTMLElement>(open: boolean) {
  const dialogRef = useRef<T | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((element) => !element.hasAttribute("disabled"));

    (focusableElements[0] ?? dialog).focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab" || focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  return dialogRef;
}
