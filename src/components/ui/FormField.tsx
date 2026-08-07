import { cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

import { wizardCopy } from "../../content/copy";
import { cx } from "../../utils/cx";

interface FormFieldControlProps {
  id?: string;
  className?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

export interface FormFieldProps {
  id: string;
  label: string;
  children: ReactElement<FormFieldControlProps>;
  error?: string;
  helperText?: ReactNode;
  required?: boolean;
}

const controlClassName =
  "w-full rounded-2xl border bg-white px-4 py-3 text-base text-[var(--ut-ink)] transition-colors duration-200 placeholder:text-[var(--ut-muted)] focus:border-[var(--ut-blue)] focus-visible:shadow-[var(--ut-focus-ring)]";

export function FormField({
  children,
  error,
  helperText,
  id,
  label,
  required = false,
}: FormFieldProps) {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  const control = isValidElement<FormFieldControlProps>(children)
    ? cloneElement(children, {
        id,
        "aria-describedby": describedBy,
        "aria-invalid": Boolean(error),
        className: cx(
          controlClassName,
          error
            ? "border-[var(--ut-danger)]"
            : "border-[var(--ut-border-strong)]",
          children.props.className,
        ),
      })
    : children;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[var(--ut-blue-deep)]" htmlFor={id}>
        {label}
        {required ? (
          <>
            <span aria-hidden="true"> *</span>
            <span className="ut-sr-only">{wizardCopy.requiredSrOnly}</span>
          </>
        ) : null}
      </label>
      {control}
      {helperText ? (
        <p className="text-sm leading-6 text-[var(--ut-muted)]" id={helperId}>
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm font-medium leading-6 text-[var(--ut-danger)]" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
