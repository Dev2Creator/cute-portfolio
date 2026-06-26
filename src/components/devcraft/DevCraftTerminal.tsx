import { useEffect, useRef, useState } from "react";

import { unlockAchievement } from "./Achievements";

type Line = { kind: "in" | "out" | "ok" | "warn"; text: string };

const quickCommands = [
  "irl install chalk",
  "irl doctor requests",
  "irl glasses react",
  "irl grass",
  "irl-wisdom daily --copy",
  "irl-wisdom models",
  "irl-wisdom power",
  "besty encode secrets.txt",
  "besty decode emoji-soup.txt",
];

const help = [
  "real demo commands:",
  "  irl install <package|url|owner/repo>",
  "  irl doctor <package> · irl glasses <package>",
  "  irl grass · posture · hydrate · window · mirror",
  "  irl-wisdom daily · moai · models · biases · discipline · fact · power · upgrade",
  "  besty encode <file> · besty decode <file>",
  "  install irl · install wisdom · install besty",
  "  repo irl · repo wisdom · repo besty · clear",
];

const wisdomCards: Record<string, string[]> = {
  daily: [
    "IRL Wisdom daily ritual",
    "One thoughtful idea: the tool you use every day should make the next good choice easier.",
    "Moai takeaway: simplify the decision before optimizing the action.",
  ],
  moai: [
    "Moai mode engaged",
    "Stand still for one breath. Pick the next honest step. Ship the tiny useful thing.",
  ],
  models: [
    "Mental model: inversion",
    "Instead of asking how to win, ask what would guarantee failure, then avoid that path.",
  ],
  biases: [
    "Cognitive bias: planning fallacy",
    "Humans underestimate how long work takes. Add margin before the deadline adds stress.",
  ],
  discipline: [
    "Discipline prompt",
    "Make the first step laughably small. Momentum is easier to grow than summon.",
  ],
  fact: [
    "Powerful fact",
    "Local-first tools can feel faster and safer because the round trip is human to machine, not human to cloud to machine.",
  ],
  power: [
    "48 Laws style takeaway",
    "Control the frame: make your work easy to understand before asking people to care.",
  ],
  upgrade: [
    "Moai upgrade ritual",
    "Checking PyPI... latest package path: pip install --upgrade irl-wisdom",
    "Use irl-wisdom upgrade --yes locally to run the real updater.",
  ],
};

function detectSource(target: string) {
  if (/^https?:\/\//.test(target)) return { source: "direct download", method: "download + auto-extract" };
  if (/^[\w.-]+\/[\w.-]+$/.test(target)) return { source: "GitHub", method: `git clone https://github.com/${target}` };
  if (["react", "chalk", "vite", "typescript", "tailwindcss", "lucide-react"].includes(target)) {
    return { source: "NPM", method: `npm install ${target}` };
  }
  return { source: "PyPI", method: `pip install ${target}` };
}

function copyText(text: string) {
  if (!navigator.clipboard) return;
  void navigator.clipboard.writeText(text).catch(() => undefined);
}

function repoFor(name: string) {
  const repos: Record<string, string> = {
    irl: "https://github.com/Dev2Creator/IRL-",
    wisdom: "https://github.com/Dev2Creator/IRL-WISDOM",
    besty: "https://github.com/Dev2Creator/irl-besty",
    github: "https://github.com/Dev2Creator",
  };
  return repos[name];
}

function commandOutput(raw: string): Line[] {
  const cmd = raw.trim();
  const lower = cmd.toLowerCase();
  const parts = lower.split(/\s+/).filter(Boolean);

  if (!lower) return [];
  if (lower === "help") return help.map((text) => ({ kind: "out", text }));
  if (lower === "projects") {
    return [
      { kind: "out", text: "Dev2Creator projects available in this web terminal:" },
      { kind: "ok", text: "IRL: universal installer + wellness commands" },
      { kind: "ok", text: "IRL Wisdom: daily wisdom, models, biases, facts, streaks" },
      { kind: "ok", text: "irl-besty: password-seeded text-to-emoji cipher" },
    ];
  }

  if (lower.startsWith("install ")) {
    const name = parts[1];
    const installs: Record<string, string> = {
      irl: "pip install irl-pkg",
      wisdom: "pip install --upgrade irl-wisdom",
      besty: "pip install irl-besty",
    };
    const install = installs[name];
    if (!install) return [{ kind: "warn", text: "Try: install irl, install wisdom, or install besty" }];
    copyText(install);
    unlockAchievement({ id: `copy-install-${name}`, title: "Copied real install command", icon: "📦" });
    return [
      { kind: "ok", text: install },
      { kind: "out", text: "Copied to clipboard. Run this in your real terminal." },
    ];
  }

  if (lower.startsWith("repo ")) {
    const repo = repoFor(parts[1]);
    if (!repo) return [{ kind: "warn", text: "Try: repo irl, repo wisdom, repo besty, repo github" }];
    window.open(repo, "_blank", "noopener,noreferrer");
    return [{ kind: "ok", text: `Opening ${repo}` }];
  }

  if (lower === "about") {
    return [
      { kind: "out", text: "Anika Mukherjee / Dev2Creator" },
      { kind: "out", text: "Open-source builder of human-first CLIs, wisdom tools, emoji ciphers, and private AI experiments." },
    ];
  }

  if (lower === "skills") {
    return [
      { kind: "out", text: "Python · TypeScript · React · Tailwind · Rich · Typer · Questionary" },
      { kind: "out", text: "CLI design · local-first UX · open-source tooling · playful interfaces" },
    ];
  }

  if (lower === "github") return [{ kind: "ok", text: "https://github.com/Dev2Creator" }];
  if (lower === "contact") return [{ kind: "ok", text: "cuteypieanika@gmail.com" }];

  if (parts[0] === "irl") {
    const action = parts[1];
    const target = parts.slice(2).join(" ") || "requests";
    if (!action || action === "--help") return help.slice(1, 4).map((text) => ({ kind: "out", text }));
    if (action === "install") {
      const detected = detectSource(target);
      unlockAchievement({ id: "irl-install-demo", title: "Ran IRL installer demo", icon: "🌱" });
      return [
        { kind: "out", text: `touching grass before installing ${target}...` },
        { kind: "ok", text: `source detected: ${detected.source}` },
        { kind: "ok", text: "dependencies installed" },
        { kind: "ok", text: "network available" },
        { kind: "ok", text: "storage available" },
        { kind: "out", text: `local command IRL would run: ${detected.method}` },
        { kind: "warn", text: "Web demo only: your browser cannot install packages on this device." },
      ];
    }
    if (action === "doctor") {
      return [
        { kind: "out", text: `checking package: ${target}` },
        { kind: "ok", text: "Python available: simulated ok" },
        { kind: "ok", text: "Network: reachable from hosting edge" },
        { kind: "ok", text: "Storage: browser-safe demo mode" },
        { kind: "out", text: "Diagnosis: ready for installation in your real terminal." },
      ];
    }
    if (action === "glasses") {
      const detected = detectSource(target);
      return [
        { kind: "out", text: "looking closely..." },
        { kind: "ok", text: `Package: ${target}` },
        { kind: "ok", text: `Source: ${detected.source}` },
        { kind: "ok", text: `Install method: ${detected.method}` },
        { kind: "out", text: "Vision enhanced." },
      ];
    }
    if (action === "grass" || lower === "touch grass") {
      unlockAchievement({ id: "touch-grass-terminal", title: "Touched Grass", icon: "🌱" });
      return [{ kind: "ok", text: "Grass streak +1. Shrimp posture reduced by 2%." }];
    }
    if (action === "posture") return [{ kind: "ok", text: "Shoulders down. Neck back. Tiny stretch complete." }];
    if (action === "hydrate") return [{ kind: "ok", text: "Water reminder logged. Eight-glass quest still accepts side quests." }];
    if (action === "window") return [{ kind: "out", text: "Weather report: open blinds for full-resolution reality." }];
    if (action === "mirror") return [{ kind: "ok", text: "Compliment: your code has main-character energy today." }];
    return [{ kind: "warn", text: `Unknown IRL command: ${action}. Try irl --help.` }];
  }

  if (parts[0] === "irl-wisdom" || parts[0] === "wisdom") {
    const action = parts[1] || "daily";
    const card = wisdomCards[action];
    if (!card) return [{ kind: "warn", text: "Try irl-wisdom daily, models, biases, discipline, fact, power, moai, or upgrade." }];
    if (parts.includes("--copy") || parts.includes("-c")) {
      copyText(card.join("\n"));
      unlockAchievement({ id: "wisdom-copy", title: "Copied Moai wisdom", icon: "🗿" });
      return [...card.map((text) => ({ kind: "out" as const, text })), { kind: "ok", text: "Copied wisdom card to clipboard." }];
    }
    unlockAchievement({ id: `wisdom-${action}`, title: "Consulted IRL Wisdom", icon: "🗿" });
    return card.map((text) => ({ kind: "out", text }));
  }

  if (parts[0] === "besty") {
    const action = parts[1];
    const file = parts.slice(2).join(" ") || "secrets.txt";
    if (!action) {
      return [
        { kind: "out", text: "irl-besty interactive mode" },
        { kind: "out", text: "Choose: besty encode <file> or besty decode <file>" },
      ];
    }
    if (action === "encode") {
      unlockAchievement({ id: "besty-encode-demo", title: "Secret file converted to emoji soup", icon: "☠️" });
      return [
        { kind: "out", text: "Professor Bones Terminal" },
        { kind: "ok", text: `Target file: ${file}` },
        { kind: "ok", text: "Password seed: demo-password" },
        { kind: "out", text: "Emoji output:" },
        { kind: "ok", text: "🌙🧃💀🦋🔥🍄🧊✨🦴🌸🐶💅☠️" },
      ];
    }
    if (action === "decode") {
      return [
        { kind: "out", text: "Professor Bones Terminal" },
        { kind: "ok", text: `Input file: ${file}` },
        { kind: "ok", text: "Password seed matched" },
        { kind: "out", text: "Decoded message: hello from DevCraft Realm" },
      ];
    }
    return [{ kind: "warn", text: "Try: besty encode secrets.txt or besty decode emoji-soup.txt" }];
  }

  if (lower === "transpower") {
    return [
      { kind: "out", text: "TransPower private AI concept" },
      { kind: "ok", text: "Offline-first companion UX" },
      { kind: "ok", text: "Zero telemetry principle" },
      { kind: "warn", text: "Demo only: no model is downloaded or run in the browser." },
    ];
  }

  return [{ kind: "warn", text: `Unknown command: ${cmd}. Try help.` }];
}

function lineClass(kind: Line["kind"]) {
  if (kind === "in") return "text-foreground";
  if (kind === "ok") return "text-grass text-glow-terminal";
  if (kind === "warn") return "text-lantern";
  return "text-terminal text-glow-terminal";
}

export function DevCraftTerminal() {
  const [history, setHistory] = useState<Line[]>([
    { kind: "out", text: "DevCraft Terminal v1.7 — real project command demo. Type `help`." },
    { kind: "ok", text: "Try: irl install chalk · irl-wisdom daily --copy · besty encode secrets.txt" },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [history]);

  const submit = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    if (cmd.toLowerCase() === "clear") {
      setHistory([{ kind: "out", text: "DevCraft Terminal cleared. Type `help`." }]);
      return;
    }
    setHistory((current) => [...current, { kind: "in", text: cmd }, ...commandOutput(cmd)]);
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
          ~ devcraft / live project terminal
        </span>
      </div>
      <div className="border-b border-grass/20 px-3 py-2">
        <div className="flex flex-wrap gap-2">
          {quickCommands.map((command) => (
            <button
              key={command}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                submit(command);
              }}
              className="border border-grass/30 bg-background/40 px-2 py-1 font-pixel text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-grass hover:text-grass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grass"
            >
              {command}
            </button>
          ))}
        </div>
      </div>
      <div ref={scrollRef} className="px-4 py-3 h-80 overflow-y-auto scanlines">
        {history.map((line, index) => (
          <div key={`${line.kind}-${index}-${line.text}`} className={lineClass(line.kind)}>
            {line.kind === "in" ? <span className="text-grass mr-2">$</span> : null}
            {line.text}
          </div>
        ))}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(value);
            setValue("");
          }}
          className="flex items-center"
        >
          <span className="text-grass mr-2">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
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
