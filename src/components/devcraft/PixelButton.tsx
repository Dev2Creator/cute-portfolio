import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "redstone" | "blossom" | "lavender";

export const PixelButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: "sm" | "md" | "lg" }
>(({ variant = "primary", size = "md", className, children, ...props }, ref) => {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  }[size];

  const variants: Record<Variant, string> = {
    primary:
      "bg-grass text-primary-foreground hover:bg-grass-deep shadow-[0_0_24px_-6px_var(--grass)] hover:shadow-[0_0_32px_-4px_var(--grass)]",
    ghost:
      "bg-card/60 text-foreground border-border hover:bg-card hover:border-grass/60",
    redstone:
      "bg-redstone text-foreground hover:brightness-110 shadow-[0_0_22px_-6px_var(--redstone)]",
    blossom:
      "bg-blossom text-primary-foreground hover:brightness-110 shadow-[0_0_22px_-6px_var(--blossom)]",
    lavender:
      "bg-lavender text-primary-foreground hover:brightness-110 shadow-[0_0_22px_-6px_var(--lavender)]",
  };

  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2",
        "font-pixel uppercase tracking-wider font-medium",
        "border-2 border-foreground/10 transition-all duration-150",
        "active:translate-y-[2px] active:shadow-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grass focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes,
        variants[variant],
        className,
      )}
      style={{
        boxShadow:
          variant === "primary"
            ? "inset 0 -3px 0 0 oklch(0 0 0 / 0.35), inset 0 2px 0 0 oklch(1 0 0 / 0.15)"
            : "inset 0 -3px 0 0 oklch(0 0 0 / 0.35)",
      }}
    >
      <span className="relative">{children}</span>
    </button>
  );
});
PixelButton.displayName = "PixelButton";
