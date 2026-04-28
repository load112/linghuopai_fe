import { cn } from "@/shared/utils/cn";

interface BadgeProps {
  tone?: "amber" | "slate" | "graphite" | "info" | "success" | "danger";
  children: React.ReactNode;
  className?: string;
}

const toneMap: Record<NonNullable<BadgeProps["tone"]>, string> = {
  amber: "border border-linghuo-amber text-linghuo-amber bg-bone-cream-dim",
  slate: "border border-misty-slate text-misty-slate bg-bone-cream-dim",
  graphite: "border border-ash-veil text-graphite bg-bone-cream-dim",
  info: "border border-misty-slate text-misty-slate bg-bone-cream-dim",
  success: "border border-misty-slate text-misty-slate bg-bone-cream-dim",
  danger: "border border-error text-error bg-bone-cream-dim",
};

export function Badge({ tone = "graphite", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-xs rounded px-2 py-0.5 font-label text-[11px] leading-none tracking-wide",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
