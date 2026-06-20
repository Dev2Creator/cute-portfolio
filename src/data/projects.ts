export type Project = {
  id: "irl" | "besty" | "transpower";
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
    name: "IRL™",
    tagline: "Software for Humans.",
    biome: "Grass Terminal Plains",
    description:
      "IRL is a universal package installer built in Python. It detects whether a package belongs to PyPI, NPM, GitHub, or a direct download, then gives a clean Rich-powered terminal experience with diagnostics and wellness commands.",
    repoUrl: "https://github.com/Dev2Creator/irl",
    installCommand: "pip install irl-pkg",
    colorTheme: { glow: "var(--grass)", accent: "var(--terminal)", bg: "oklch(0.26 0.1 142 / 0.35)" },
    features: [
      { title: "Universal Install", command: "irl install requests", desc: "Detects source and installs from PyPI, NPM, GitHub, or direct downloads." },
      { title: "Doctor Diagnostics", command: "irl doctor chalk", desc: "Checks dependencies, network, and storage before install." },
      { title: "Detective Glasses", command: "irl glasses requests", desc: "Peeks into registries and shows version, source, and install method." },
      { title: "Developer Wellness", command: "irl grass · posture · hydrate", desc: "Tiny reminders for the human behind the keyboard." },
      { title: "Bedtime Enforcer", desc: "If commands run after 1 AM, IRL gently tells the developer to sleep." },
    ],
    tech: ["Python", "Rich", "PyPI", "NPM", "GitHub API"],
    terminalDemo: [
      "$ irl install requests",
      "🌱 touching grass...",
      "🔍 checking registry...",
      "📦 source detected: PyPI",
      "🧪 running doctor checks...",
      "✅ dependencies ready",
      "✅ network available",
      "✅ storage available",
      "🚀 install ready",
    ],
    microcopy: "The package installer that cares if you drank water.",
  },
  {
    id: "besty",
    name: "irl-besty",
    tagline: "Cursed emoji cipher engine.",
    biome: "Emoji Crypt Dungeon",
    description:
      "irl-besty is a chaotic terminal tool that transforms text files into emoji walls using password-seeded pseudo-random byte shifting. It is interactive, aesthetic, and built for the IRL ecosystem. Experimental — not production cryptography.",
    repoUrl: "https://github.com/Dev2Creator/irl-besty",
    installCommand: "pip install irl-besty",
    colorTheme: { glow: "var(--terminal)", accent: "var(--lavender)", bg: "oklch(0.18 0.04 270 / 0.6)" },
    features: [
      { title: "Encode Files", desc: "Turns normal text into chaotic emoji output." },
      { title: "Decode With Password", desc: "Uses the exact password to reverse the transformation." },
      { title: "Password-Seeded Output", desc: "Same input looks different with different passwords." },
      { title: "Interactive Terminal", desc: "No messy flags. Run besty and follow the prompts." },
      { title: "Professor Bones UI", desc: "Slate borders, neon green accents, skull energy." },
    ],
    tech: ["Python", "Rich", "Click", "Seeded RNG"],
    terminalDemo: [
      "$ besty",
      "☠️  Professor Bones Terminal",
      "Choose mode: encode / decode",
      "Target file: secrets.txt",
      "Password: ********",
      "Cooking emoji soup...",
      "Output:",
      "🌙🧃💀🦋🔥🍄🧊✨🦴🌸",
    ],
    microcopy: "Why write secrets when you can summon cursed emoji soup?",
  },
  {
    id: "transpower",
    name: "TransPower v1.7",
    tagline: "Offline AI companion. Private by design.",
    biome: "Cherry Blossom AI Sanctuary",
    description:
      "TransPower Assistant is a 100% offline cross-platform AI companion. It runs locally on-device with a quantized ONNX SmolLM-135M model and a warm Sweetheart personality. Built for privacy, zero telemetry, and human comfort.",
    repoUrl: "https://github.com/Dev2Creator/transpower",
    installCommand: "git clone transpower && ./run",
    colorTheme: { glow: "var(--blossom)", accent: "var(--lavender)", bg: "oklch(0.28 0.06 350 / 0.4)" },
    features: [
      { title: "100% Offline", desc: "No internet required after setup." },
      { title: "Local AI Model", desc: "Quantized ONNX Hugging Face SmolLM-135M." },
      { title: "Zero Telemetry", desc: "No tracking. No cloud. Data stays local." },
      { title: "Sweetheart Personality", desc: "Warm, caring, companion-style interaction." },
      { title: "Cross Platform", desc: "Desktop, mobile, and CLI workflows." },
      { title: "Open Source", desc: "AGPL-3.0 project identity." },
    ],
    tech: ["ONNX Runtime", "SmolLM-135M", "Electron", "Capacitor", "WASM"],
    terminalDemo: [
      "$ transpower",
      "💜 Sweetheart booting locally...",
      "🔒 Network: not required",
      "🧠 Model: SmolLM-135M ONNX",
      "🌸 Personality: Sweetheart",
      "✅ Offline sanctuary ready",
    ],
    microcopy: "AI that stays close, quiet, and yours.",
  },
];
