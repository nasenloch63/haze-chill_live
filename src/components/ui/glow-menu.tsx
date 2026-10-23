"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type GlowMenuItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  /** CSS background for the per-item radial glow (e.g. radial-gradient(...)) */
  gradient: string;
  /** Icon colour when this section is active (full Tailwind classes) */
  iconActiveClass: string;
  /** Icon colour when idle */
  iconMutedClass: string;
  /** Icon colour on row hover (full Tailwind classes, include e.g. group-hover:text-…) */
  iconHoverClass: string;
};

export type GlowMenuBarProps = {
  className?: string;
  items: GlowMenuItem[];
  /** e.g. `#menu` — highlights matching `item.href` */
  activeHref?: string;
  "aria-label"?: string;
};

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export function useActiveHash() {
  const pathname = usePathname();
  const [hash, setHash] = React.useState("");

  React.useEffect(() => {
    const read = () => {
      if (typeof window === "undefined") return;
      setHash(window.location.hash || "");
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [pathname]);

  return hash;
}

export const GlowMenuBar = React.forwardRef<HTMLElement, GlowMenuBarProps>(
  ({ className, items, activeHref, "aria-label": ariaLabel }, ref) => {
    return (
      <motion.nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-2",
          className,
        )}
        initial="initial"
        whileHover="hover"
      >
        {/* Bar hover glow — haze palette (no next-themes) */}
        <motion.div
          className="pointer-events-none absolute -inset-2 z-0 rounded-3xl bg-[radial-gradient(ellipse_85%_70%_at_50%_40%,rgba(139,92,246,0.22),rgba(16,185,129,0.12)_45%,transparent_70%)]"
          variants={navGlowVariants}
          aria-hidden
        />
        <ul className="relative z-10 flex max-w-full flex-wrap items-center justify-center gap-1 sm:gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeHref !== undefined &&
              activeHref !== "" &&
              item.href === activeHref;

            return (
              <motion.li key={item.href} className="relative">
                <Link href={item.href} aria-current={isActive ? (item.href.startsWith("#") ? "location" : "page") : undefined} className="block w-full scroll-smooth">
                  <motion.div
                    className="group relative block overflow-visible rounded-xl"
                    style={{ perspective: 600 }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-0 rounded-2xl"
                      variants={glowVariants}
                      animate={isActive ? "hover" : "initial"}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : undefined,
                        borderRadius: 14,
                      }}
                    />
                    <motion.div
                      className={cn(
                        "relative z-10 flex items-center gap-1.5 rounded-xl bg-transparent px-2.5 py-2 transition-colors sm:gap-2 sm:px-4 sm:py-2",
                        isActive
                          ? "text-white"
                          : "text-violet-200/70 group-hover:text-white",
                      )}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors duration-300 sm:h-5 sm:w-5",
                          isActive ? item.iconActiveClass : item.iconMutedClass,
                          item.iconHoverClass,
                        )}
                        strokeWidth={1.75}
                      />
                      <span className="whitespace-nowrap font-medium text-xs sm:text-sm">
                        {item.label}
                      </span>
                    </motion.div>
                    <motion.div
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 z-10 flex items-center gap-1.5 rounded-xl bg-transparent px-2.5 py-2 sm:gap-2 sm:px-4 sm:py-2",
                        isActive
                          ? "text-white"
                          : "text-violet-200/70 group-hover:text-white",
                      )}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors duration-300 sm:h-5 sm:w-5",
                          isActive ? item.iconActiveClass : item.iconMutedClass,
                          item.iconHoverClass,
                        )}
                        strokeWidth={1.75}
                      />
                      <span className="whitespace-nowrap font-medium text-xs sm:text-sm">
                        {item.label}
                      </span>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
    );
  },
);

GlowMenuBar.displayName = "GlowMenuBar";
