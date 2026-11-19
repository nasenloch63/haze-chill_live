import type { CSSProperties } from "react";
import { HeroCornerBranch } from "./pine-branch-svg";
import styles from "./christmas-decor.module.css";

/*
 * Dezente Weihnachtsdekoration für den bestehenden Hero:
 * - filigrane warmweiße Lichterkette an der Oberkante
 * - dunkle Tannenzweige mit kleinen Kugeln in den oberen äußeren Ecken
 *
 * Rein dekorativ: absolut positioniert, pointer-events: none, aria-hidden.
 * Alle Koordinaten sind deterministisch (kein Math.random) → keine Hydration-Abweichungen.
 */

const SEGMENT_WIDTH = 150;
const SEGMENT_COUNT = 20; // 3000px – deckt auch sehr breite Viewports ab, wird mittig zugeschnitten
const STRING_WIDTH = SEGMENT_WIDTH * SEGMENT_COUNT;
const STRING_HEIGHT = 34;
const HOOK_Y = 2;
const SAG_CONTROL_Y = 24;

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Punkt auf dem Durchhang eines Segments (quadratische Bézierkurve, x linear). */
function sagY(t: number) {
  const mt = 1 - t;
  return mt * mt * HOOK_Y + 2 * mt * t * SAG_CONTROL_Y + t * t * HOOK_Y;
}

const WIRE_PATH = Array.from({ length: SEGMENT_COUNT }, (_, i) => {
  const x0 = i * SEGMENT_WIDTH;
  const start = i === 0 ? `M ${x0} ${HOOK_Y} ` : "";
  return `${start}Q ${x0 + SEGMENT_WIDTH / 2} ${SAG_CONTROL_Y} ${x0 + SEGMENT_WIDTH} ${HOOK_Y}`;
}).join(" ");

const STRING_BULBS = Array.from({ length: SEGMENT_COUNT * 2 }, (_, i) => {
  const segment = Math.floor(i / 2);
  const t = i % 2 === 0 ? 1 / 3 : 2 / 3;
  return {
    x: r1(segment * SEGMENT_WIDTH + t * SEGMENT_WIDTH),
    y: r1(sagY(t)),
    optional: i % 2 === 1,
    duration: `${(6.4 + (i % 4) * 0.7).toFixed(1)}s`,
    delay: `${(-((i * 1.7) % 7)).toFixed(1)}s`,
  };
});

function HeroLightString() {
  return (
    <svg
      viewBox={`0 0 ${STRING_WIDTH} ${STRING_HEIGHT}`}
      width={STRING_WIDTH}
      height={STRING_HEIGHT}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="absolute left-1/2 top-0 max-w-none -translate-x-1/2 opacity-90"
    >
      <defs>
        <radialGradient id="haze-hero-string-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8e6" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#fde4a8" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#eab664" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Dünner dunkler Draht mit feinem Champagner-Glanz */}
      <path d={WIRE_PATH} stroke="#140f0b" strokeWidth="1.2" strokeLinecap="round" />
      <path
        d={WIRE_PATH}
        stroke="#e9d3a4"
        strokeOpacity="0.28"
        strokeWidth="0.5"
        strokeLinecap="round"
      />

      {STRING_BULBS.map((bulb, idx) => (
        <g key={idx} className={bulb.optional ? styles.optionalBulb : undefined}>
          <rect
            x={bulb.x - 1.1}
            y={bulb.y - 0.4}
            width="2.2"
            height="2.4"
            rx="0.5"
            fill="#3b3024"
          />
          <g
            className={styles.bulb}
            style={
              {
                "--bulb-duration": bulb.duration,
                "--bulb-delay": bulb.delay,
              } as CSSProperties
            }
          >
            <circle cx={bulb.x} cy={bulb.y + 5} r="7.5" fill="url(#haze-hero-string-halo)" />
            <ellipse cx={bulb.x} cy={bulb.y + 4.8} rx="1.7" ry="2.3" fill="#fff6e2" />
          </g>
        </g>
      ))}
    </svg>
  );
}

export function ChristmasHeroDecor() {
  return (
    <div
      aria-hidden="true"
      data-seasonal-decor="christmas"
      className="pointer-events-none absolute inset-0 z-[12] overflow-hidden select-none"
    >
      <HeroLightString />

      {/* Tannenzweige in den oberen äußeren Ecken – liegen unter dem Textblock (z-20) */}
      <HeroCornerBranch
        side="left"
        className="absolute -left-3 -top-1 w-[104px] opacity-[0.85] sm:left-0 sm:top-0 sm:w-[180px] sm:opacity-95 lg:w-[230px] xl:w-[260px]"
      />
      <HeroCornerBranch
        side="right"
        className="absolute -right-3 -top-1 w-[104px] opacity-[0.85] sm:right-0 sm:top-0 sm:w-[180px] sm:opacity-95 lg:w-[230px] xl:w-[260px]"
      />
    </div>
  );
}
