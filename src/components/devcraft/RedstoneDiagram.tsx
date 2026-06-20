import { motion } from "framer-motion";

type Step = { label: string; tone?: "grass" | "terminal" | "redstone" | "blossom" | "lavender" };

export function RedstoneDiagram({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <div className="space-y-3">
      <div className="font-pixel uppercase tracking-widest text-xs text-muted-foreground">
        {title}
      </div>
      <ol className="relative flex flex-wrap gap-2">
        {steps.map((s, i) => {
          const tone = s.tone ?? "grass";
          const color = `var(--${tone === "grass" ? "grass" : tone})`;
          return (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2"
            >
              <div
                className="px-3 py-2 border-2 font-pixel text-xs uppercase tracking-wider"
                style={{
                  borderColor: color,
                  background: `color-mix(in oklab, ${color} 12%, var(--card))`,
                  boxShadow: `inset 0 -3px 0 oklch(0 0 0 / 0.4), 0 0 18px -6px ${color}`,
                  color: "var(--foreground)",
                }}
              >
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <div
                  className="w-8 h-1.5"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 6px, transparent 6px 10px)`,
                    animation: "redstone-pulse 0.8s linear infinite",
                  }}
                />
              )}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
