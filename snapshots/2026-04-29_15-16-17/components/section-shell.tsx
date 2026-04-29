import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  outerClassName?: string;
  innerClassName?: string;
  children: ReactNode;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SectionShell({
  id,
  outerClassName,
  innerClassName,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("w-full py-2 sm:py-3 lg:py-5", outerClassName)}>
      <div className={cn("content-shell", innerClassName)}>{children}</div>
    </section>
  );
}
