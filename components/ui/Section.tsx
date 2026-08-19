import { cn } from "@/lib/utils/cn";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
}

export function Section({ id, children, className, title, subtitle, badge }: SectionProps) {
  return (
    <section id={id} className={cn("section-padding journey-section relative", className)}>
      <div className="mx-auto max-w-6xl">
        {(badge || title || subtitle) && (
          <header className="mb-12 text-center md:mb-16">
            {badge && (
              <span className="mb-4 inline-block rounded-full bg-rose/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-rose">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/70 md:text-lg">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
