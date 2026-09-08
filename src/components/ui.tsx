import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Star } from "lucide-react";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";

const btnSizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6",
  lg: "h-13 px-8 text-base",
};

const btnVariants = {
  primary:
    "bg-gradient-brand text-primary-foreground shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--primary)_70%,transparent)] hover:brightness-110",
  solid: "bg-primary text-primary-foreground hover:brightness-110",
  outline: "border border-border bg-surface/60 text-foreground hover:border-primary hover:bg-surface-2",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-surface",
};

type BtnProps = {
  children: ReactNode;
  variant?: keyof typeof btnVariants;
  size?: keyof typeof btnSizes;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Btn({ children, variant = "primary", size = "md", className, ...rest }: BtnProps) {
  return (
    <button className={cx(btnBase, btnSizes[size], btnVariants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function BtnLink({
  children,
  variant = "primary",
  size = "md",
  className,
  ...link
}: Omit<BtnProps, "onClick" | "type"> & Record<string, unknown>) {
  return (
    <Link
      className={cx(btnBase, btnSizes[size], btnVariants[variant], className)}
      {...(link as never)}
    >
      {children}
    </Link>
  );
}

export function Pill({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: "muted" | "brand" | "galaxy" | "bubblegum" | "free";
  className?: string;
}) {
  const tones = {
    muted: "border-border bg-surface text-muted-foreground",
    brand: "border-primary/40 bg-primary/15 text-foreground",
    galaxy: "border-galaxy/40 bg-galaxy/15 text-galaxy",
    bubblegum: "border-bubblegum/40 bg-bubblegum/15 text-bubblegum",
    free: "border-galaxy/50 bg-galaxy/20 text-foreground",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Stars({ value, size = 13 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Star size={size} className="fill-bubblegum text-bubblegum" />
      <span className="text-xs font-medium text-foreground">{value.toFixed(1)}</span>
    </span>
  );
}

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cx("h-1.5 w-full overflow-hidden rounded-full bg-surface-2", className)}>
      <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${value}%` }} />
    </div>
  );
}

export function Avatar({ initials, size = 36 }: { initials: string; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 font-sans text-xs font-semibold text-foreground"
      style={{ width: size, height: size, fontSize: size / 3 }}
    >
      {initials}
    </span>
  );
}

export function Section({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cx("mx-auto w-full max-w-7xl px-5 py-10 md:px-8 md:py-14", className)}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("rounded-2xl border border-border bg-card p-5", className)}>{children}</div>
  );
}

export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="p-4">
      <p className="text-xs tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="mt-2 font-sans text-2xl font-semibold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Card>
  );
}

export function priceLabel(price: number) {
  return price === 0 ? "Free" : `$${price}`;
}
