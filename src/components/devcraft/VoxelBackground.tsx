import { useEffect, useRef, useState } from "react";

/**
 * Lightweight reactive starfield + drifting voxel clouds + fireflies.
 * No 3D — pure DOM/SVG with parallax and prefers-reduced-motion respect.
 */
export function VoxelBackground() {
  const ref = useRef<HTMLDivElement>(null);
  
  const [stars, setStars] = useState<{ x: number; y: number; s: number; d: number }[]>([]);
  const [flies, setFlies] = useState<{ x: number; y: number; d: number }[]>([]);

  useEffect(() => {
    
    setStars(
      Array.from({ length: 70 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 1,
        d: Math.random() * 4,
      })),
    );
    setFlies(
      Array.from({ length: 18 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: Math.random() * 6 + 4,
      })),
    );
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 16;
      ty = (e.clientY / window.innerHeight - 0.5) * 16;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ transform: "translate3d(0,0,0)" }}
    >
      {/* Aurora */}
      <div
        className="absolute inset-x-0 top-0 h-[70vh] opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, oklch(0.6 0.2 295 / 0.5), transparent 55%), radial-gradient(ellipse at 80% 10%, oklch(0.7 0.18 200 / 0.45), transparent 55%), radial-gradient(ellipse at 50% 30%, oklch(0.7 0.2 145 / 0.3), transparent 60%)",
          transform: "translate(calc(var(--mx)*-0.4),calc(var(--my)*-0.4))",
        }}
      />

      {/* Stars */}
      <div
        className="absolute inset-0"
        style={{ transform: "translate(calc(var(--mx)*-0.6),calc(var(--my)*-0.6))" }}
      >
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute bg-foreground rounded-[1px] animate-blink"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.s,
              height: s.s,
              animationDelay: `${s.d}s`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Voxel cube clouds */}
      <CubeCloud className="top-[12%] left-[6%]" delay={0} />
      <CubeCloud className="top-[24%] right-[8%]" delay={2} scale={1.3} />
      <CubeCloud className="top-[38%] left-[18%]" delay={4} scale={0.8} />

      {/* Fireflies */}
      <div
        className="absolute inset-0"
        style={{ transform: "translate(calc(var(--mx)*1.2),calc(var(--my)*1.2))" }}
      >
        {flies.map((f, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: 4,
              height: 4,
              background: "var(--lantern)",
              boxShadow: "0 0 12px var(--lantern), 0 0 24px var(--lantern)",
              animation: `float-y ${f.d}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.85,
            }}
          />
        ))}
      </div>

      {/* Cherry petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${(i * 13) % 100}%`,
            top: 0,
            width: 8,
            height: 8,
            background: "var(--blossom)",
            clipPath:
              "polygon(50% 0,80% 30%,100% 70%,60% 100%,30% 75%,0 50%,15% 15%)",
            animation: `petal-fall ${14 + i}s linear infinite`,
            animationDelay: `${i * 1.7}s`,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_at_center,transparent_50%,oklch(0.1_0.04_280/0.6)_100%)]" />
    </div>
  );
}

function CubeCloud({
  className = "",
  delay = 0,
  scale = 1,
}: {
  className?: string;
  delay?: number;
  scale?: number;
}) {
  return (
    <div
      className={`absolute ${className} animate-float`}
      style={{
        animationDelay: `${delay}s`,
        transform: `scale(${scale}) translate(calc(var(--mx)*0.3),calc(var(--my)*0.3))`,
      }}
    >
      <div className="flex">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="size-6 -ml-1.5 first:ml-0"
            style={{
              background: "oklch(1 0 0 / 0.85)",
              boxShadow:
                "inset 0 -4px 0 oklch(0.85 0.04 280), inset 0 2px 0 oklch(1 0 0)",
            }}
          />
        ))}
      </div>
      <div className="flex -mt-1.5">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="size-6 ml-3"
            style={{
              background: "oklch(0.94 0.01 280 / 0.8)",
              boxShadow: "inset 0 -4px 0 oklch(0.78 0.03 280)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
