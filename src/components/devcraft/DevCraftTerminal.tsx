import { useEffect, useRef, useState } from "react";

type Line = { kind: "in" | "out"; text: string };

const help = [
  "available commands:",
  "  about · projects · irl · besty · transpower",
  "  skills · github · contact · clear",
  "  touch grass · spawn besty",
];

const responses: Record<string, string[]> = {
  about: [
    "Anika Mukherjee / Dev2Creator",
    "Open-source builder crafting CLI tools, offline AI",
    "companions, and cute developer experiences.",
  ],
  projects: ["IRL · irl-besty · TransPower Assistant"],
  irl: [
    "IRL™ — Software for Humans.",
    "Universal package installer + developer wellness CLI.",
    "→ pip install irl-pkg",
  ],
  besty: [
    "irl-besty ☠️✨",
    "Experimental emoji cipher engine for chaotic secret files.",
    "→ pip install irl-besty",
  ],
  transpower: [
    "TransPower Assistant v1.7",
    "Offline AI companion. Local ONNX SmolLM-135M.",
    "Sweetheart personality. Zero telemetry.",
  ],
  skills: [
    "Python · TypeScript · React · Tailwind · ONNX",
    "Electron · Capacitor · Rich · GitHub · WASM",
  ],
  github: ["→ github.com/Dev2Creator"],
  contact: ["mailbox: hello@dev2creator.example", "github: Dev2Creator"],
  "touch grass": ["🌱 Achievement unlocked: Shrimp posture reduced by 2%."],
  "spawn besty": ["🦊 Besty has joined your party."],
};

export function DevCraftTerminal() {
  const [history, setHistory] = useState<Line[]>([
    { kind: "out", text: "DevCraft Terminal v1.7  —  type `help`" },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [history]);

  const submit = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [...history, { kind: "in", text: raw }];
    if (!cmd) {
      setHistory(next);
      return;
    }
    if (cmd === "clear") {
      setHistory([{ kind: "out", text: "(world cleared)" }]);
      return;
    }
    if (cmd === "help") {
      setHistory([...next, ...help.map((t) => ({ kind: "out" as const, text: t }))]);
      return;
    }
    const r = responses[cmd];
    if (r) {
      setHistory([...next, ...r.map((t) => ({ kind: "out" as const, text: t }))]);
    } else {
      setHistory([
        ...next,
        { kind: "out", text: `🐛 a creeper ate "${cmd}". try \`help\`.` },
      ]);
    }
  };

  return (
    <div
      className="font-mono text-sm bg-[oklch(0.12_0.04_280/0.85)] border-2 border-grass/40 backdrop-blur-md"
      style={{
        boxShadow:
          "0 0 60px -10px var(--terminal), inset 0 0 0 1px oklch(1 0 0 / 0.04), inset 0 -3px 0 oklch(0 0 0 / 0.5)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-grass/30 bg-[oklch(0.16_0.05_280)]">
        <span className="size-3 bg-redstone rounded-full" />
        <span className="size-3 bg-lantern rounded-full" />
        <span className="size-3 bg-grass rounded-full" />
        <span className="ml-3 text-xs font-pixel text-muted-foreground uppercase tracking-widest">
          ~ devcraft / terminal
        </span>
      </div>
      <div
        ref={scrollRef}
        className="px-4 py-3 h-72 overflow-y-auto scanlines"
      >
        {history.map((l, i) => (
          <div key={i} className={l.kind === "in" ? "text-foreground" : "text-terminal text-glow-terminal"}>
            {l.kind === "in" ? <span className="text-grass mr-2">$</span> : null}
            {l.text}
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(value);
            setValue("");
          }}
          className="flex items-center"
        >
          <span className="text-grass mr-2">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
            className="flex-1 bg-transparent outline-none text-foreground caret-grass"
          />
          <span aria-hidden className="w-2 h-4 bg-grass animate-blink ml-1" />
        </form>
      </div>
    </div>
  );
}
