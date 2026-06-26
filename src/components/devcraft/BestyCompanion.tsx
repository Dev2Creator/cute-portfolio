import { useEffect, useRef, useState } from "react";

const lines = [
  "IRL doctor says the realm is healthy 🌱",
  "Try `irl install chalk` in the terminal 📦",
  "IRL Wisdom packed a Moai thought for later 🗿",
  "Besty encrypted a secret into emoji soup ☠️",
  "The heart signal reached Builders' Grove 💖",
  "Tiny kindness buff applied to the build ✨",
  "Hydration quest is still open 💧",
  "Posture check: shoulders down, crown up 🌿",
  "Local-first magic feels cozy today 💜",
  "No telemetry, just warm terminal sparks 🔒",
  "A star on GitHub feeds the campfire ⭐",
  "Wisdom card copied to the pocket scroll 📜",
  "Emoji cipher engine is purring softly 🧪",
  "Developer wellness layer is online 🌼",
  "Open source forever, but with better snacks 🍪",
  "Your next command might unlock something 👀",
];

const petLines = [
  "Besty says: ship the tiny useful thing 💚",
  "Besty found a hidden heart signal 💖",
  "Besty saved your vibe checkpoint ✨",
  "Besty whispers: try `irl-wisdom moai` 🗿",
  "Besty approves this open-source side quest ⭐",
  "Besty converted stress into sparkles 🌱",
];

function randomLine(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

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
      setBubble(randomLine(lines));
      setTimeout(() => setBubble(null), 4200);
    }, 6500);
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
        <div className="absolute bottom-full right-0 mb-3 max-w-[min(18rem,calc(100vw-5rem))] animate-spawn">
          <div className="relative whitespace-normal font-pixel text-xs leading-relaxed bg-card border-2 border-grass/60 text-foreground px-3 py-2 shadow-[0_0_24px_-6px_var(--grass)]">
            {bubble}
            <span className="absolute -bottom-1 right-6 w-2 h-2 bg-card border-r-2 border-b-2 border-grass/60 rotate-45" />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setBubble(randomLine(petLines));
          setTimeout(() => setBubble(null), 3200);
          setPos(() => ({
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
