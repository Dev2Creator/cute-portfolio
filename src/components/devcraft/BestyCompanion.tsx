import { useEffect, useRef, useState } from "react";

const lines = [
  "Anika, the build passed ✨",
  "Touch grass command ready 🌱",
  "Secret file converted to emoji soup ☠️",
  "Offline AI sanctuary is safe 💜",
  "Did you hydrate today? 💧",
  "Spawning tiny package crates 📦",
];

export function BestyCompanion() {
  const [pos, setPos] = useState({ x: 24, y: 24 });
  const [bubble, setBubble] = useState<string | null>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const len = Math.hypot(dx, dy) || 1;
      setLook({ x: (dx / len) * 2, y: (dy / len) * 2 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setBubble(lines[Math.floor(Math.random() * lines.length)]);
      setTimeout(() => setBubble(null), 3500);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed z-40 select-none"
      style={{ right: pos.x, bottom: pos.y }}
      role="img"
      aria-label="Besty, a voxel fox companion"
    >
      {bubble && (
        <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap animate-spawn">
          <div className="font-pixel text-xs bg-card border-2 border-grass/60 text-foreground px-3 py-2 shadow-[0_0_24px_-6px_var(--grass)]">
            {bubble}
            <span className="absolute -bottom-1 right-6 w-2 h-2 bg-card border-r-2 border-b-2 border-grass/60 rotate-45" />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setBubble("🦊 *purrs in open source*");
          setTimeout(() => setBubble(null), 2500);
          // wander
          setPos((p) => ({
            x: 24 + Math.random() * 40,
            y: 24 + Math.random() * 40,
          }));
        }}
        className="block animate-float hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grass rounded-sm"
        aria-label="Pet Besty"
      >
        <BestyVoxel look={look} />
      </button>
    </div>
  );
}

function BestyVoxel({ look }: { look: { x: number; y: number } }) {
  // 8x8-ish blocky fox
  const px = (c: string) => ({ background: c });
  const O = "transparent";
  const F = "var(--lantern)"; // fur
  const D = "oklch(0.62 0.18 50)"; // darker
  const W = "oklch(1 0 0)";
  const B = "oklch(0.18 0.05 280)";
  const grid = [
    [O, O, D, O, O, D, O, O],
    [O, D, F, D, D, F, D, O],
    [D, F, F, F, F, F, F, D],
    [D, F, B, F, F, B, F, D],
    [D, F, F, W, W, F, F, D],
    [O, D, F, F, F, F, D, O],
    [O, O, D, F, F, D, O, O],
    [O, O, O, D, D, O, O, O],
  ];
  return (
    <div
      className="grid grid-cols-8 grid-rows-8 gap-0 [filter:drop-shadow(0_4px_12px_oklch(0_0_0/0.4))]"
      style={{
        width: 56,
        height: 56,
        transform: `translate(${look.x}px,${look.y}px)`,
        transition: "transform 0.15s",
      }}
    >
      {grid.flat().map((c, i) => (
        <span key={i} className="block" style={px(c)} />
      ))}
    </div>
  );
}
