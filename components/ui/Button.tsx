import { cn } from "@/lib/utils/cn";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:scale-95 hover:-translate-y-0.5",
        variant === "primary" &&
          "bg-rose text-white shadow-[var(--shadow-soft)] hover:bg-rose/90 hover:shadow-[var(--shadow-glow)]",
        variant === "secondary" &&
          "glass text-foreground hover:bg-white/70 dark:hover:bg-white/10",
        variant === "ghost" && "text-rose hover:bg-rose/10",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-sm md:text-base",
        size === "lg" && "px-8 py-4 text-base md:text-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
