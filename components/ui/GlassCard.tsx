import { cn } from "@/lib/utils/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-3xl p-6 shadow-[var(--shadow-soft)] md:p-8",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]",
        className
      )}
    >
      {children}
    </div>
  );
}
