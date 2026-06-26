export type Project = {
  id: "irl" | "wisdom" | "besty" | "transpower";
  name: string;
  tagline: string;
  biome: string;
  description: string;
  repoUrl: string;
  installCommand: string;
  colorTheme: { glow: string; accent: string; bg: string };
  features: { title: string; command?: string; desc: string }[];
  tech: string[];
  terminalDemo: string[];
  microcopy: string;
};

export const projects: Project[] = [
  {
    id: "irl",
    name: "IRL",
    tagline: "Software for Humans.",
    biome: "Grass Terminal Plains",
    description:
      "IRL is a universal Python package installer from the Dev2Creator IRL- repo. It detects NPM packages, PyPI modules, GitHub repositories, and direct downloads, then wraps the install flow in Rich-powered terminal UI and developer wellness commands.",
    repoUrl: "https://github.com/Dev2Creator/IRL-",
    installCommand: "pip install irl-pkg",
    colorTheme: { glow: "var(--grass)", accent: "var(--terminal)", bg: "oklch(0.26 0.1 142 / 0.35)" },
    features: [
      { title: "Universal Install", command: "irl install requests", desc: "Figures out whether a package belongs to NPM, PyPI, GitHub, or a direct download." },
      { title: "Doctor Diagnostics", command: "irl doctor chalk", desc: "Checks dependencies, network, and storage before installing." },
      { title: "Detective Glasses", command: "irl glasses requests", desc: "Shows package version, source, size, and install method before download." },
      { title: "Wellness Commands", command: "irl grass · posture · hydrate", desc: "Tracks grass touching, fixes shrimp posture, and reminds developers to drink water." },
      { title: "Window & Mirror", command: "irl window · mirror", desc: "Weather without opening blinds, plus a random developer compliment." },
      { title: "Bedtime Enforcer", desc: "Commands after 1 AM gently remind the developer to sleep." },
    ],
    tech: ["Python", "Rich", "PyPI", "NPM", "GitHub", "AGPL-3.0"],
    terminalDemo: [
      "$ irl install chalk",
      "touching grass...",
      "checking registry...",
      "source detected: NPM",
      "running doctor checks...",
      "dependencies installed",
      "network available",
      "storage available",
      "install ready",
    ],
    microcopy: "The package installer that also cares if you drank water.",
  },
  {
    id: "wisdom",
    name: "IRL Wisdom",
    tagline: "Ancient lessons. Modern life. Better choices.",
    biome: "Moai Command Shrine",
    description:
      "IRL Wisdom turns the terminal into a daily ritual for mental models, cognitive biases, discipline, powerful facts, 48 Laws of Power takeaways, favorites, streaks, and local-only perspective without accounts or telemetry.",
    repoUrl: "https://github.com/Dev2Creator/IRL-WISDOM",
    installCommand: "pip install --upgrade irl-wisdom",
    colorTheme: { glow: "var(--lantern)", accent: "var(--grass)", bg: "oklch(0.3 0.08 70 / 0.35)" },
    features: [
      { title: "Daily Wisdom", command: "irl-wisdom daily", desc: "A deterministic thought for the day, built for one useful idea instead of another endless feed." },
      { title: "Mental Models", command: "irl-wisdom models", desc: "Decision-making tools rendered as warm terminal cards." },
      { title: "Cognitive Biases", command: "irl-wisdom biases", desc: "Names and explains the places judgment goes sideways." },
      { title: "Power Laws", command: "irl-wisdom power", desc: "One law, a plain-English explanation, and a Moai takeaway." },
      { title: "Local Favorites", desc: "Favorites and daily streak state stay in a local config file." },
      { title: "Upgrade Ritual", command: "irl-wisdom upgrade --yes", desc: "Checks PyPI and updates through a Windows-safe delayed helper." },
    ],
    tech: ["Python", "Typer", "Questionary", "Rich", "Local JSON", "PyPI"],
    terminalDemo: [
      "$ irl-wisdom",
      "IRL WISDOM",
      "One thoughtful idea, right when you need it.",
      "daily · moai · models · biases · discipline",
      "favorites saved locally",
      "no account · no database · no telemetry",
    ],
    microcopy: "One good idea can change the shape of a day.",
  },
  {
    id: "besty",
    name: "irl-besty",
    tagline: "Cryptographic text-to-emoji cipher engine.",
    biome: "Emoji Crypt Dungeon",
    description:
      "irl-besty is an aesthetic terminal tool that turns text files into password-seeded emoji walls. It uses interactive prompts, a UiPro-style slate and neon green interface, and different passwords create different emoji output.",
    repoUrl: "https://github.com/Dev2Creator/irl-besty",
    installCommand: "pip install irl-besty",
    colorTheme: { glow: "var(--terminal)", accent: "var(--lavender)", bg: "oklch(0.18 0.04 270 / 0.6)" },
    features: [
      { title: "Encode Files", command: "besty", desc: "Launches an interactive encode/decode flow from anywhere in the terminal." },
      { title: "Password Seeded", desc: "The same text creates different emoji output depending on the password." },
      { title: "Emoji Walls", desc: "Scrambles text into an aesthetic wall of Unicode emoji symbols." },
      { title: "Interactive Prompts", desc: "No clunky arguments: choose encode or decode, target a file, then enter a password." },
      { title: "UiPro Terminal", desc: "Slate borders, neon green accents, and Professor Bones energy." },
    ],
    tech: ["Python", "Terminal UI", "Seeded RNG", "Unicode Emoji", "PyPI"],
    terminalDemo: [
      "$ besty",
      "Professor Bones Terminal",
      "Choose mode: encode / decode",
      "Target file: secrets.txt",
      "Password: ********",
      "Cooking emoji soup...",
      "Output:",
      "moon sparkle skull dog flower fire",
    ],
    microcopy: "Why use plain secrets when they can become stylish emoji chaos?",
  },
  {
    id: "transpower",
    name: "TransPower v1.7",
    tagline: "Offline AI companion. Private by design.",
    biome: "Cherry Blossom AI Sanctuary",
    description:
      "TransPower Assistant is a private offline AI companion concept in the Dev2Creator world: local-first, zero telemetry, warm companion-style interaction, and built around user comfort.",
    repoUrl: "https://github.com/Dev2Creator",
    installCommand: "open Dev2Creator projects",
    colorTheme: { glow: "var(--blossom)", accent: "var(--lavender)", bg: "oklch(0.28 0.06 350 / 0.4)" },
    features: [
      { title: "Offline First", desc: "Designed around local use and private interaction." },
      { title: "Zero Telemetry", desc: "No tracking-first product assumptions." },
      { title: "Sweetheart Layer", desc: "Warm, caring, companion-style interaction." },
      { title: "Human Comfort", desc: "Part of the same softer-tools philosophy as IRL and Wisdom." },
    ],
    tech: ["Offline AI", "Local-first", "Privacy", "Companion UX"],
    terminalDemo: [
      "$ transpower",
      "Sweetheart booting locally...",
      "Network: not required",
      "Personality: warm companion",
      "Offline sanctuary ready",
    ],
    microcopy: "AI that stays close, quiet, and yours.",
  },
];
