"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Warp } from "@paper-design/shaders-react";

const HAZE_WARP_COLORS = [
  "#050505",
  "#0a0a0a",
  "#1e0b3a",
  "#4c1d95",
  "#6d28d9",
  "#065f46",
  "#10b981",
  "#34d399",
];

/** Max shader offset (-1…1 scale); keep small so motion stays tasteful */
const OFFSET_RANGE = 0.14;
/** Extra degrees of rotation from cursor X */
const ROTATION_RANGE = 7;
const BASE_ROTATION = 12;
const LERP = 0.085;
const STOP_EPS = 0.002;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const getServerReducedMotion = () => true;

export function WarpShaderHero({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion);
  const rootRef = useRef<HTMLElement>(null);
  const targetRef = useRef({ x: 0, y: 0, rot: 0 });
  const currentRef = useRef({ x: 0, y: 0, rot: BASE_ROTATION });
  const rafRef = useRef<number>(0);
  const tickRef = useRef<() => void>(() => undefined);
  const [warpProps, setWarpProps] = useState({
    offsetX: 0,
    offsetY: 0,
    rotation: BASE_ROTATION,
  });

  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const tick = useCallback(() => {
    const cur = currentRef.current;
    const tgt = targetRef.current;

    cur.x += (tgt.x - cur.x) * LERP;
    cur.y += (tgt.y - cur.y) * LERP;
    cur.rot += (tgt.rot - cur.rot) * LERP;

    setWarpProps({
      offsetX: cur.x,
      offsetY: cur.y,
      rotation: cur.rot,
    });

    const settled =
      Math.abs(tgt.x - cur.x) < STOP_EPS &&
      Math.abs(tgt.y - cur.y) < STOP_EPS &&
      Math.abs(tgt.rot - cur.rot) < STOP_EPS;

    if (settled) {
      cur.x = tgt.x;
      cur.y = tgt.y;
      cur.rot = tgt.rot;
      setWarpProps({
        offsetX: cur.x,
        offsetY: cur.y,
        rotation: cur.rot,
      });
      rafRef.current = 0;
      return;
    }

    rafRef.current = requestAnimationFrame(tickRef.current);
  }, []);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const scheduleTick = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tickRef.current);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;

      if (!inside) {
        targetRef.current = { x: 0, y: 0, rot: BASE_ROTATION };
        scheduleTick();
        return;
      }

      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      const ox = (nx - 0.5) * 2 * OFFSET_RANGE;
      const oy = -((ny - 0.5) * 2 * OFFSET_RANGE);
      const rot = BASE_ROTATION + (nx - 0.5) * 2 * ROTATION_RANGE;

      targetRef.current = { x: ox, y: oy, rot };
      scheduleTick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      stopLoop();
    };
  }, [scheduleTick, stopLoop, reducedMotion]);

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_25%_30%,rgba(109,40,217,0.7),transparent_60%),radial-gradient(ellipse_at_80%_70%,rgba(16,185,129,0.45),transparent_60%)]">
        {!reducedMotion ? <Warp
          className="h-full min-h-[100svh] w-full"
          colors={HAZE_WARP_COLORS}
          speed={0.65}
          proportion={0.42}
          softness={0.85}
          distortion={0.55}
          swirl={0.72}
          swirlIterations={8}
          shape="stripes"
          shapeScale={0.35}
          fit="cover"
          scale={1.05}
          rotation={warpProps.rotation}
          offsetX={warpProps.offsetX}
          offsetY={warpProps.offsetY}
        /> : null}
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-[100svh] flex-col">{children}</div>
    </section>
  );
}
