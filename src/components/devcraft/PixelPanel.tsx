import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PixelPanel({
  children,
  className,
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: "grass" | "terminal" | "blossom" | "redstone" | "lavender" | "none";
}) {
  const glowClass = {
    grass: "shadow-[0_0_40px_-12px_var(--grass)]",
    terminal: "shadow-[0_0_36px_-10px_var(--terminal)]",
    blossom: "shadow-[0_0_36px_-10px_var(--blossom)]",
    redstone: "shadow-[0_0_36px_-10px_var(--redstone)]",
    lavender: "shadow-[0_0_36px_-10px_var(--lavender)]",
    none: "",
  }[glow ?? "none"];

  return (
    <div
      className={cn(
        "relative bg-card/70 backdrop-blur-sm border-2 border-border",
        glowClass,
        className,
      )}
      style={{
        boxShadow:
          "inset 0 0 0 1px oklch(1 0 0 / 0.04), inset 0 -3px 0 0 oklch(0 0 0 / 0.35)",
      }}
    >
      <span aria-hidden className="absolute top-0 left-0 w-2 h-2 bg-border" />
      <span aria-hidden className="absolute top-0 right-0 w-2 h-2 bg-border" />
      <span aria-hidden className="absolute bottom-0 left-0 w-2 h-2 bg-border" />
      <span aria-hidden className="absolute bottom-0 right-0 w-2 h-2 bg-border" />
      {children}
    </div>
  );
}
