import { useEffect, useState } from "react";
import { PixelButton } from "./PixelButton";

const lines = [
  "Generating Anika's DevCraft Realm...",
  "Loading voxel sky...",
  "Spawning Besty companion...",
  "Opening GitHub portal...",
  "Planting TransPower sanctuary...",
  "Compiling IRL terminal...",
  "Encrypting secrets into emoji soup...",
  "World ready.",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 250);
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= lines.length - 1) {
          clearInterval(id);
          setTimeout(onDone, 150);
          return s;
        }
        return s + 1;
      });
    }, 110);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, [onDone]);

  const pct = Math.round(((step + 1) / lines.length) * 100);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      role="status"
      aria-label="Loading DevCraft Realm"
    >
      <div className="w-[min(90vw,520px)] space-y-6">
        <div className="font-pixel text-xs uppercase tracking-widest text-grass text-glow-grass">
          DevCraft Realm
        </div>
        <div className="font-display text-3xl md:text-4xl text-foreground">
          Loading the world<span className="animate-blink">_</span>
        </div>

        {/* Progress bar */}
        <div
          className="h-5 border-2 border-grass/60 bg-[oklch(0.14_0.04_280)] relative overflow-hidden"
          style={{ boxShadow: "inset 0 -2px 0 oklch(0 0 0 / 0.5)" }}
        >
          <div
            className="absolute inset-y-0 left-0 transition-all duration-300"
            style={{
              width: `${pct}%`,
              background:
                "repeating-linear-gradient(45deg, var(--grass) 0 8px, var(--grass-deep) 8px 16px)",
              boxShadow: "0 0 20px var(--grass)",
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center font-pixel text-xs text-foreground mix-blend-difference"
          >
            {pct}%
          </div>
        </div>

        <div className="font-mono text-sm text-muted-foreground space-y-0.5 h-32 overflow-hidden">
          {lines.slice(0, step + 1).map((l, i) => (
            <div key={i} className={i === step ? "text-terminal" : ""}>
              <span className="text-grass">▸</span> {l}
            </div>
          ))}
        </div>

        {showSkip && (
          <div className="flex justify-end">
            <PixelButton size="sm" variant="ghost" onClick={onDone}>
              Skip intro →
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
}
