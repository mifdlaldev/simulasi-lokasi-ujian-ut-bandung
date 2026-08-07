import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cx } from "../../utils/cx";

type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const baseClassName =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:shadow-[var(--ut-focus-ring)] disabled:cursor-not-allowed disabled:opacity-55";

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--ut-blue)] text-white shadow-[0_12px_26px_rgba(3,70,148,0.24)] hover:bg-[var(--ut-blue-deep)] disabled:hover:bg-[var(--ut-blue)]",
  secondary:
    "border border-[var(--ut-border-strong)] bg-white text-[var(--ut-blue)] hover:border-[var(--ut-blue)] hover:bg-[var(--ut-blue-soft)] disabled:hover:border-[var(--ut-border-strong)] disabled:hover:bg-white",
};

export function Button({
  children,
  className,
  disabled,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(baseClassName, variantClassNames[variant], className)}
      disabled={disabled}
      type={type}
      aria-disabled={disabled || undefined}
      {...props}
    >
      {children}
    </button>
  );
}
