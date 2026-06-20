import { useEffect, useState } from "react";

export function FloatingIsland() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square animate-float-slow">
      {/* Sky portal halo */}
      <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_30%,oklch(0.7_0.2_295/0.5),transparent_55%)] blur-2xl" />

      {/* Cherry tree */}
      <div className="absolute left-[18%] top-[8%]">
        <div
          className="w-3 h-12"
          style={{ background: "oklch(0.4 0.04 30)" }}
        />
        <div
          className="-mt-8 -ml-4 w-14 h-14 rounded-sm"
          style={{
            background:
              "radial-gradient(circle at 40% 30%, var(--blossom), oklch(0.6 0.16 350))",
            boxShadow: "0 0 30px -6px var(--blossom)",
          }}
        />
      </div>

      {/* Terminal altar */}
      <div className="absolute right-[18%] top-[14%]">
        <div
          className="w-16 h-12 border-2 border-grass/60 bg-[oklch(0.14_0.04_280/0.95)] p-1.5 font-mono text-[10px] text-terminal"
          style={{ boxShadow: "0 0 18px -4px var(--terminal)" }}
        >
          <div>$ irl</div>
          <div className="text-grass">install</div>
          <div>creativity</div>
        </div>
      </div>

      {/* GitHub obsidian portal */}
      <div className="absolute left-[42%] top-[26%]">
        <div
          className="w-12 h-16"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.32 0.07 295), oklch(0.18 0.05 280))",
            boxShadow:
              "inset 0 0 0 2px oklch(0.55 0.15 295), 0 0 36px -8px oklch(0.6 0.18 295)",
          }}
        />
      </div>

      {/* Grass island */}
      <div className="absolute inset-x-4 bottom-[8%] h-[42%]">
        {/* grass top */}
        <div
          className="absolute inset-x-0 top-0 h-6"
          style={{
            background:
              "linear-gradient(180deg, var(--grass) 0%, var(--grass-deep) 100%)",
            boxShadow:
              "inset 0 -2px 0 oklch(0 0 0 / 0.2), inset 0 3px 0 oklch(1 0 0 / 0.1)",
          }}
        />
        {/* dirt */}
        <div
          className="absolute inset-x-0 top-6 bottom-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, oklch(0.32 0.06 30) 0 6px, oklch(0.28 0.05 30) 6px 12px)",
            clipPath:
              "polygon(0 0,100% 0,96% 60%,88% 80%,72% 100%,30% 96%,12% 78%,4% 50%)",
          }}
        />
        {/* tiny flowers */}
        <span
          className="absolute top-[2px] left-[20%] w-1.5 h-1.5"
          style={{ background: "var(--blossom)" }}
        />
        <span
          className="absolute top-[2px] left-[60%] w-1.5 h-1.5"
          style={{ background: "var(--lantern)" }}
        />
        <span
          className="absolute top-[2px] left-[78%] w-1.5 h-1.5"
          style={{ background: "var(--accent)" }}
        />
      </div>

      {/* Lantern */}
      <Lantern className="absolute left-[8%] top-[44%]" />
      <Lantern className="absolute right-[10%] top-[50%]" delay={1.4} />

      {/* Mushrooms */}
      <span
        className="absolute left-[28%] bottom-[12%] w-2 h-3"
        style={{ background: "var(--cyan-glow)", boxShadow: "0 0 8px var(--cyan-glow)" }}
      />
    </div>
  );
}

function Lantern({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={className} style={{ animationDelay: `${delay}s` }}>
      <div className="w-1 h-4 mx-auto" style={{ background: "oklch(0.4 0.04 30)" }} />
      <div
        className="w-4 h-4 animate-pulse-glow"
        style={{
          background: "var(--lantern)",
          boxShadow: "0 0 18px var(--lantern), inset 0 -2px 0 oklch(0.6 0.16 60)",
          animationDelay: `${delay}s`,
        }}
        aria-hidden
        data-t={t}
      />
    </div>
  );
}
