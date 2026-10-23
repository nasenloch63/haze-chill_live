import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function LegalPageShell({
  backLabel,
  children,
  className,
}: {
  backLabel: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl px-4 sm:px-6", className)}>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-violet-300/80 transition-colors hover:text-emerald-300"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        {backLabel}
      </Link>
      <div className="mt-10">{children}</div>
    </div>
  );
}

export const legalProseClass =
  "space-y-4 text-sm leading-relaxed text-violet-200/80 sm:text-base [&_a]:text-emerald-300/95 [&_a]:underline-offset-4 hover:[&_a]:text-emerald-200";

export function LegalH1({ children }: { children: ReactNode }) {
  return (
    <h1 className="break-words font-display text-3xl font-bold tracking-tight text-white [hyphens:auto] sm:text-4xl">
      {children}
    </h1>
  );
}

export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 font-display text-lg font-semibold text-emerald-200/95 first:mt-0 sm:text-xl">
      {children}
    </h2>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p className="mt-3 first:mt-0">{children}</p>;
}

export function LegalUl({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 first:mt-0">{children}</ul>
  );
}
