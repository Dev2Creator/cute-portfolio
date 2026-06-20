export type SkillSlot = { name: string; icon: string; tip: string; color?: string };
export type SkillCategory = { name: string; items: SkillSlot[] };

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    items: [
      { name: "Python", icon: "🐍", tip: "Main crafting material for IRL, irl-besty, and local tooling.", color: "var(--grass)" },
      { name: "TypeScript", icon: "TS", tip: "Type-safe spells across frontend and tooling.", color: "var(--cyan-glow)" },
      { name: "JavaScript", icon: "JS", tip: "The everywhere language.", color: "var(--lantern)" },
      { name: "C", icon: "C", tip: "Low-level rune work.", color: "var(--lavender)" },
      { name: "C++", icon: "C++", tip: "When the runes need pointers.", color: "var(--lavender)" },
      { name: "HTML", icon: "</>", tip: "Structure of all worlds.", color: "var(--redstone)" },
      { name: "CSS", icon: "🎨", tip: "Painting voxel skies.", color: "var(--blossom)" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", icon: "⚛︎", tip: "Component crafting table.", color: "var(--cyan-glow)" },
      { name: "Next.js", icon: "▲", tip: "Server-side enchantments.", color: "var(--foreground)" },
      { name: "Tailwind", icon: "≈", tip: "Used to craft cute premium UI fast.", color: "var(--cyan-glow)" },
      { name: "Framer Motion", icon: "✦", tip: "Physics for UI.", color: "var(--accent)" },
      { name: "shadcn/ui", icon: "◐", tip: "Headless component primitives.", color: "var(--foreground)" },
    ],
  },
  {
    name: "CLI / Tooling",
    items: [
      { name: "Rich UI", icon: "▣", tip: "Terminal beauty engine.", color: "var(--terminal)" },
      { name: "PyPI", icon: "📦", tip: "Python's package crystal.", color: "var(--lantern)" },
      { name: "NPM", icon: "✦", tip: "JS redstone block.", color: "var(--redstone)" },
      { name: "GitHub", icon: "❖", tip: "Obsidian portal.", color: "var(--foreground)" },
    ],
  },
  {
    name: "AI / Runtime",
    items: [
      { name: "ONNX", icon: "🧠", tip: "Used for local offline AI runtime.", color: "var(--lavender)" },
      { name: "WebAssembly", icon: "WA", tip: "Portable bytecode magic.", color: "var(--cyan-glow)" },
      { name: "Hugging Face", icon: "🤗", tip: "Model archive.", color: "var(--lantern)" },
      { name: "Offline-first", icon: "🛡", tip: "Privacy-first principle.", color: "var(--blossom)" },
    ],
  },
  {
    name: "Cross Platform",
    items: [
      { name: "Electron", icon: "⚛", tip: "Desktop app shell.", color: "var(--cyan-glow)" },
      { name: "Capacitor", icon: "◉", tip: "Mobile bridge.", color: "var(--grass)" },
      { name: "Linux", icon: "🐧", tip: "Hacker home.", color: "var(--lantern)" },
      { name: "Windows", icon: "❒", tip: "Cross-platform target.", color: "var(--cyan-glow)" },
      { name: "Android", icon: "🤖", tip: "Pocket realm.", color: "var(--grass)" },
      { name: "macOS", icon: "", tip: "Apple realm.", color: "var(--foreground)" },
    ],
  },
  {
    name: "Values",
    items: [
      { name: "Open Source", icon: "❤", tip: "Forever.", color: "var(--accent)" },
      { name: "Privacy First", icon: "🔒", tip: "Your data, your machine.", color: "var(--lavender)" },
      { name: "Zero Telemetry", icon: "∅", tip: "No tracking, ever.", color: "var(--blossom)" },
      { name: "Human-centered", icon: "🌱", tip: "Software for humans.", color: "var(--grass)" },
    ],
  },
];
