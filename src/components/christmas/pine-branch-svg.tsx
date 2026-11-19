import type { CSSProperties } from "react";
import styles from "./christmas-decor.module.css";

type BranchSpine = {
  x0: number;
  y0: number;
  cx: number;
  cy: number;
  x1: number;
  y1: number;
  needles: number;
  maxLen: number;
};

type NeedleSegment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  layer: 0 | 1 | 2;
};

const r1 = (n: number) => Math.round(n * 10) / 10;

function buildBranchNeedles(spines: BranchSpine[]): NeedleSegment[] {
  const segments: NeedleSegment[] = [];

  for (let sIdx = 0; sIdx < spines.length; sIdx++) {
    const s = spines[sIdx];
    for (let i = 1; i <= s.needles; i++) {
      const t = i / (s.needles + 1);
      const mt = 1 - t;
      // Point on quadratic Bezier
      const px = mt * mt * s.x0 + 2 * mt * t * s.cx + t * t * s.x1;
      const py = mt * mt * s.y0 + 2 * mt * t * s.cy + t * t * s.y1;
      // Tangent vector
      const tx = 2 * mt * (s.cx - s.x0) + 2 * t * (s.x1 - s.cx);
      const ty = 2 * mt * (s.cy - s.y0) + 2 * t * (s.y1 - s.cy);
      const baseAngle = Math.atan2(ty, tx);

      // Taper needles gently toward the branch tip
      const taper = 0.45 + 0.55 * Math.sin(Math.min(1, t * 0.92 + 0.08) * Math.PI);
      const jitter = ((i * 37 + sIdx * 17) % 11) / 11; // deterministic 0..1
      const len = s.maxLen * taper * (0.76 + jitter * 0.34);

      for (const side of [-1, 1] as const) {
        const spread = 0.52 + (((i * 23 + sIdx * 13 + (side > 0 ? 5 : 0)) % 9) / 9) * 0.42;
        const angle = baseAngle + side * spread;
        const layer = ((i + sIdx + (side > 0 ? 1 : 0)) % 3) as 0 | 1 | 2;
        segments.push({
          x1: r1(px),
          y1: r1(py),
          x2: r1(px + Math.cos(angle) * len),
          y2: r1(py + Math.sin(angle) * len),
          layer,
        });
      }
    }
  }

  return segments;
}

const HERO_SPINES: BranchSpine[] = [
  // Primary upper horizontal sweep along top edge
  { x0: -8, y0: 4, cx: 112, cy: 14, x1: 248, y1: 22, needles: 30, maxLen: 24 },
  // Secondary diagonal lower bough curving gently into corner space
  { x0: -6, y0: 14, cx: 74, cy: 48, x1: 162, y1: 72, needles: 22, maxLen: 22 },
  // Short cascading vertical sprig hugging left edge
  { x0: 4, y0: 12, cx: 18, cy: 68, x1: 36, y1: 128, needles: 18, maxLen: 20 },
  // Upper-mid twig adding natural volume
  { x0: 48, y0: 10, cx: 126, cy: 36, x1: 196, y1: 48, needles: 16, maxLen: 18 },
  // Small inner shoot near corner
  { x0: 14, y0: 36, cx: 58, cy: 74, x1: 98, y1: 104, needles: 14, maxLen: 17 },
];

const HERO_NEEDLES = buildBranchNeedles(HERO_SPINES);

const LAYER_STYLES: Record<0 | 1 | 2, { stroke: string; width: number }> = {
  0: { stroke: "#091b14", width: 2.2 },
  1: { stroke: "#133629", width: 1.55 },
  2: { stroke: "#1e523f", width: 1.05 },
};

const HERO_LIGHTS = [
  { cx: 54, cy: 20, r: 9.5, duration: "6.4s", delay: "-1.2s" },
  { cx: 118, cy: 28, r: 8.5, duration: "7.6s", delay: "-3.4s" },
  { cx: 192, cy: 24, r: 8, duration: "6.8s", delay: "-2.1s" },
  { cx: 34, cy: 78, r: 8.5, duration: "7.2s", delay: "-4.5s" },
  { cx: 124, cy: 64, r: 7.5, duration: "8.0s", delay: "-0.8s" },
];

export function HeroCornerBranch({
  side,
  className,
}: {
  side: "left" | "right";
  className?: string;
}) {
  const idPrefix = `haze-hero-pine-${side}`;
  const isRight = side === "right";

  return (
    <svg
      viewBox="0 0 280 155"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={isRight ? { transform: "scaleX(-1)" } : undefined}
    >
      <defs>
        <radialGradient id={`${idPrefix}-light`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff9e8" stopOpacity="0.95" />
          <stop offset="28%" stopColor="#fde09b" stopOpacity="0.55" />
          <stop offset="68%" stopColor="#eab664" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#eab664" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={`${idPrefix}-gold`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fbf0d4" />
          <stop offset="38%" stopColor="#d5b26e" />
          <stop offset="82%" stopColor="#856530" />
          <stop offset="100%" stopColor="#4f3918" />
        </radialGradient>

        <radialGradient id={`${idPrefix}-violet`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="36%" stopColor="#7c3aed" />
          <stop offset="80%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#261052" />
        </radialGradient>

        <radialGradient id={`${idPrefix}-mint`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="38%" stopColor="#10b981" />
          <stop offset="82%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#033124" />
        </radialGradient>
      </defs>

      {/* Dark woody stems */}
      <g stroke="#211713" strokeLinecap="round">
        {HERO_SPINES.map((s, idx) => (
          <path
            key={idx}
            d={`M ${s.x0} ${s.y0} Q ${s.cx} ${s.cy} ${s.x1} ${s.y1}`}
            strokeWidth={idx === 0 ? 3 : 2.1}
          />
        ))}
      </g>

      {/* Layered pine needles (shadow -> mid -> subtle night-mint highlight) */}
      {([0, 1, 2] as const).map((layer) => (
        <g
          key={layer}
          stroke={LAYER_STYLES[layer].stroke}
          strokeWidth={LAYER_STYLES[layer].width}
          strokeLinecap="round"
        >
          {HERO_NEEDLES.filter((n) => n.layer === layer).map((n, idx) => (
            <line key={idx} x1={n.x1} y1={n.y1} x2={n.x2} y2={n.y2} />
          ))}
        </g>
      ))}

      {/* Subtle glass ornaments in brand violet, mint & muted champagne gold */}
      <g>
        {/* Ornament 1: muted champagne gold */}
        <line x1="78" y1="30" x2="78" y2="54" stroke="#d8b878" strokeOpacity="0.45" strokeWidth="0.9" />
        <rect x="75.5" y="52.5" width="5" height="3.2" rx="0.8" fill="#d8b878" />
        <circle cx="78" cy="63" r="8.2" fill={`url(#${idPrefix}-gold)`} />
        <ellipse cx="75.2" cy="59.8" rx="2.3" ry="1.4" transform="rotate(-28 75.2 59.8)" fill="#fffdf6" fillOpacity="0.55" />

        {/* Ornament 2: deep lounge violet (or mint on right side for subtle variety) */}
        <line x1="158" y1="24" x2="158" y2="41" stroke="#d8b878" strokeOpacity="0.4" strokeWidth="0.85" />
        <rect x="156" y="39.5" width="4" height="2.8" rx="0.7" fill="#d8b878" />
        <circle
          cx="158"
          cy="48.5"
          r="6.8"
          fill={`url(#${idPrefix}-${isRight ? "mint" : "violet"})`}
        />
        <ellipse cx="155.7" cy="45.8" rx="1.9" ry="1.1" transform="rotate(-28 155.7 45.8)" fill="#ffffff" fillOpacity="0.5" />

        {/* Ornament 3: small mint (or violet on right) nestled lower left */}
        <line x1="25" y1="52" x2="25" y2="66" stroke="#d8b878" strokeOpacity="0.38" strokeWidth="0.8" />
        <rect x="23.2" y="64.8" width="3.6" height="2.4" rx="0.6" fill="#d8b878" />
        <circle
          cx="25"
          cy="72.5"
          r="5.6"
          fill={`url(#${idPrefix}-${isRight ? "violet" : "mint"})`}
        />
        <ellipse cx="23.2" cy="70.4" rx="1.5" ry="0.9" transform="rotate(-28 23.2 70.4)" fill="#ffffff" fillOpacity="0.45" />
      </g>

      {/* Warm-white fairy light points */}
      <g>
        {HERO_LIGHTS.map((light, idx) => (
          <g
            key={idx}
            className={styles.bulb}
            style={
              {
                "--bulb-duration": light.duration,
                "--bulb-delay": isRight ? `${-idx * 1.4 - 0.6}s` : light.delay,
              } as CSSProperties
            }
          >
            <circle cx={light.cx} cy={light.cy} r={light.r} fill={`url(#${idPrefix}-light)`} />
            <circle cx={light.cx} cy={light.cy} r="1.7" fill="#fffaf0" />
          </g>
        ))}
      </g>
    </svg>
  );
}
