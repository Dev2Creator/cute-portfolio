import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Copy, ChevronDown, Heart, Sparkles, Star, Users } from "lucide-react";
import { toast } from "sonner";

import { PixelButton } from "@/components/devcraft/PixelButton";
import { PixelPanel } from "@/components/devcraft/PixelPanel";
import { PixelLink } from "@/components/devcraft/PixelLink";
import { RedstoneDiagram } from "@/components/devcraft/RedstoneDiagram";
import { FloatingIsland } from "@/components/devcraft/FloatingIsland";
import { BestyCompanion } from "@/components/devcraft/BestyCompanion";
import {
  AchievementHost,
  unlockAchievement,
  useAchievementOnView,
} from "@/components/devcraft/Achievements";
import { LoadingScreen } from "@/components/devcraft/LoadingScreen";
import { VoxelAudio } from "@/components/devcraft/VoxelAudio";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

const DevCraftTerminal = lazy(() =>
  import("@/components/devcraft/DevCraftTerminal").then((m) => ({ default: m.DevCraftTerminal })),
);
const VoxelBackground = lazy(() =>
  import("@/components/devcraft/VoxelBackground").then((m) => ({
    default: m.VoxelBackground,
  })),
);

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <Suspense fallback={null}>
        <VoxelBackground />
      </Suspense>
      <AchievementHost />
      <BestyCompanion />
      <VoxelAudio />

      <main id="main-content" tabIndex={-1} className="relative">
        <Hero />
        <WorldMap />
        <BiomeSection project={projects[0]} biome="irl" />
        <BiomeSection project={projects[1]} biome="wisdom" />
        <BiomeSection project={projects[2]} biome="besty" />
        <BiomeSection project={projects[3]} biome="transpower" />
        <ArchitectureLab />
        <SkillsInventory />
        <TerminalSection />
        <AboutCabin />
        <CommunityGrove />
        <ContactPortal />
        {/* Visually Hidden SEO Content for search engine crawlers & screen readers */}
        <section className="sr-only" aria-label="SEO Text Content">
          <h2>Anika Mukherjee - Dev2Creator Portfolio Details</h2>
          <p>
            Welcome to the DevCraft Realm, the official developer portfolio of Anika Mukherjee (Dev2Creator). Anika is an open-source software developer building developer tools, offline AI systems, and interactive terminal experiences that prioritize human wellness and data privacy.
          </p>
          <h3>IRL Package Manager Showcase</h3>
          <p>
            IRL is a universal Python package installer compatible with NPM, PyPI, GitHub repositories, and direct downloads. It includes Doctor Diagnostics, Detective Glasses, Rich terminal UI, direct archive handling, and wellness commands including grass, posture, hydrate, window, mirror, and bedtime reminders.
          </p>
          <h3>IRL Wisdom Terminal CLI</h3>
          <p>
            IRL Wisdom is a warm keyboard-driven CLI for daily wisdom, mental models, cognitive biases, 48 Laws of Power takeaways, discipline prompts, powerful facts, Moai perspective, local favorites, daily streaks, clipboard support, and a no-telemetry local JSON config.
          </p>
          <h3>irl-besty Emoji Cipher Tool</h3>
          <p>
            irl-besty is a password-seeded text-to-emoji cipher CLI tool. It launches with the besty command, asks whether to encode or decode, targets a file, requests a password, and turns text into different emoji output depending on the key.
          </p>
          <h3>TransPower Offline AI Assistant</h3>
          <p>
            TransPower is a private on-device artificial intelligence companion running SmollM-135M quantized models via ONNX runtime. It runs completely offline with zero telemetry, ensuring developer privacy.
          </p>
          <h3>Core Technical Skills</h3>
          <ul>
            <li>Languages: TypeScript, JavaScript, Python, C, Rust</li>
            <li>Frameworks & Tools: React, Vite, Tailwind CSS, Framer Motion, Radix UI primitives, Recharts</li>
            <li>Methodologies: Privacy-First Development, Offline-First AI, CLI Design, Open Source Tooling</li>
          </ul>
        </section>
        <Footer />
      </main>
    </>
  );
}

/* ──────────────────────────────────────  HERO  ────────────────────────────────────── */

const heroLines = [
  "irl install chalk --doctor",
  "irl-wisdom daily --copy",
  "besty encode secrets.txt",
  "transpower --offline --private",
  'git commit -m "make software warmer"',
];

const heroTerminalOutputs = [
  ["source detected: NPM", "doctor checks passed", "wellness layer: hydrate + posture ready"],
  ["daily wisdom loaded", "mental models + bias cards unlocked", "favorites saved locally, no telemetry"],
  ["password seed accepted", "emoji cipher wall generated", "decode requires the exact key"],
  ["local companion booting", "network not required", "zero telemetry sanctuary ready"],
  ["open-source realm updated", "IRL + Wisdom + besty are live", "Dev2Creator build complete"],
];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  useAchievementOnView(ref, {
    id: "spawn",
    title: "Entered DevCraft Realm",
    icon: "🌌",
  });

  const [typed, setTyped] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const terminalOutput = heroTerminalOutputs[lineIdx] ?? [];

  useEffect(() => {
    const target = heroLines[lineIdx];
    if (typed.length < target.length) {
      const t = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 55);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped("");
      setLineIdx((i) => (i + 1) % heroLines.length);
    }, 1800);
    return () => clearTimeout(t);
  }, [typed, lineIdx]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center px-6 md:px-12 pt-20 pb-24 overflow-hidden"
    >
      <div className="absolute inset-x-0 bottom-0 h-32 grid-floor opacity-50 [mask-image:linear-gradient(180deg,transparent,black)]" />
      <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center w-full max-w-7xl mx-auto">
        <div className="space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 font-pixel text-xs uppercase tracking-[0.25em] text-grass text-glow-grass"
          >
            <span className="size-2 bg-grass shadow-[0_0_10px_var(--grass)]" />
            anika's devcraft realm · v1.7
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] text-foreground"
          >
            ANIKA <br />
            <span className="font-serif-italic text-blossom">Mukherjee</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-pixel text-lg md:text-xl text-lantern text-glow-grass"
          >
            Dev2Creator
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            I build human-first developer tools: IRL for smarter installs, IRL Wisdom for daily terminal perspective, irl-besty for emoji cipher experiments, and offline AI companions that stay private.
          </motion.p>

          {/* Terminal typing */}
          <PixelPanel className="max-w-xl overflow-hidden bg-[oklch(0.12_0.04_280/0.88)]">
            <div className="border-b border-grass/20 px-4 py-2 font-pixel text-[10px] uppercase tracking-widest text-muted-foreground">
              live devcraft console
            </div>
            <div className="space-y-1 px-4 py-3 font-mono text-sm">
              <div>
                <span className="text-grass">$ </span>
                <span className={typed ? "text-terminal text-glow-terminal" : "text-muted-foreground"}>
                  {typed || "loading next build..."}
                </span>
                <span className="inline-block w-2 h-4 bg-grass align-middle ml-0.5 animate-blink" />
              </div>
              <div className="min-h-[4.5rem] space-y-1 pt-1 text-xs text-muted-foreground">
                {terminalOutput.map((line) => (
                  <div key={line} className="flex gap-2">
                    <span className="text-lantern">&gt;</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </PixelPanel>

          <div className="flex flex-wrap gap-3">
            <PixelButton
              onClick={() => {
                document.getElementById("world-map")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Sparkles className="size-4" /> Enter DevCraft Realm
            </PixelButton>
            <PixelLink
              variant="ghost"
              href="https://github.com/Dev2Creator"
              target="_blank"
              rel="me noopener noreferrer"
            >
              <Github className="size-4" /> View GitHub
            </PixelLink>
            <PixelButton
              variant="ghost"
              onClick={() =>
                document.getElementById("biome-irl")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Projects
            </PixelButton>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "IRL Installer",
              "IRL Wisdom",
              "Emoji Cipher",
              "Offline AI",
              "Developer Wellness",
              "Open Source",
            ].map((b) => (
              <span
                key={b}
                className="font-pixel text-[10px] uppercase tracking-wider px-2.5 py-1.5 border-2 border-border bg-card/60 text-muted-foreground"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <FloatingIsland />
        </div>
      </div>

      <a
        href="#world-map"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-pixel text-[10px] uppercase tracking-widest text-muted-foreground hover:text-grass flex flex-col items-center gap-1"
        aria-label="Scroll to world map"
      >
        scroll <ChevronDown className="size-4 animate-float" />
      </a>
    </section>
  );
}

/* ──────────────────────────────────────  WORLD MAP  ────────────────────────────────────── */

function WorldMap() {
  return (
    <section id="world-map" className="relative px-6 md:px-12 py-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="World Map"
          title="Choose a Build"
          subtitle="Every project is a biome in Anika's open-source world."
        />
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {/* dotted path connecting biomes */}
          <div
            aria-hidden
            className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-1 -translate-y-1/2"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--grass) 0 6px, transparent 6px 14px)",
              opacity: 0.5,
            }}
          />
          {projects.map((p, i) => (
            <BiomeNode key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BiomeNode({ project, index }: { project: typeof projects[number]; index: number }) {
  const tones: Record<string, string> = {
    irl: "var(--grass)",
    wisdom: "var(--lantern)",
    besty: "var(--terminal)",
    transpower: "var(--blossom)",
  };
  const color = tones[project.id];
  return (
    <motion.a
      href={`#biome-${project.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative block focus-visible:outline-none"
    >
      <PixelPanel className="p-6 hover:-translate-y-1 transition-transform duration-300 group-hover:border-grass/60">
        <div
          className="w-full aspect-[4/3] mb-4 relative overflow-hidden border-2"
          style={{
            borderColor: `color-mix(in oklab, ${color} 50%, var(--border))`,
            background: `radial-gradient(ellipse at 50% 80%, color-mix(in oklab, ${color} 30%, transparent), transparent 70%), oklch(0.16 0.05 280)`,
          }}
        >
          <BiomePreview id={project.id} />
        </div>
        <div className="font-pixel text-[10px] uppercase tracking-widest mb-2" style={{ color }}>
          biome 0{index + 1}
        </div>
        <h3 className="font-display text-2xl text-foreground mb-1">{project.name}</h3>
        <div className="text-sm text-muted-foreground mb-3">{project.biome}</div>
        <div className="font-mono text-xs text-muted-foreground border-t border-border pt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          → click to explore biome
        </div>
      </PixelPanel>
    </motion.a>
  );
}

function BiomePreview({ id }: { id: string }) {
  if (id === "irl") {
    return (
      <div className="absolute inset-0 grid-floor">
        <div className="absolute bottom-0 inset-x-0 h-1/2" style={{ background: "linear-gradient(180deg, var(--grass), var(--grass-deep))" }} />
        <span className="absolute bottom-1/2 left-1/4 size-3" style={{ background: "var(--blossom)" }} />
        <span className="absolute bottom-1/2 left-2/3 size-3" style={{ background: "var(--lantern)" }} />
        <div className="absolute top-3 left-3 font-mono text-[10px] text-terminal">$ irl install</div>
      </div>
    );
  }
  if (id === "wisdom") {
    return (
      <div className="absolute inset-0 grid-floor">
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[oklch(0.24_0.07_80)]" />
        <div className="absolute left-1/2 top-1/2 h-20 w-16 -translate-x-1/2 -translate-y-1/2 border-2 border-lantern bg-card/80 shadow-[0_0_24px_-6px_var(--lantern)]" />
        <div className="absolute left-1/2 top-[42%] size-8 -translate-x-1/2 border-2 border-lantern bg-[oklch(0.5_0.08_80)]" />
        <div className="absolute top-3 left-3 font-mono text-[10px] text-lantern">$ irl-wisdom daily</div>
      </div>
    );
  }
  if (id === "besty") {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-2xl gap-1 font-mono">
        <span>🌙</span><span>💀</span><span>🦋</span><span>🔥</span><span>🍄</span><span>✨</span>
      </div>
    );
  }
  return (
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full" style={{ background: "radial-gradient(circle, var(--blossom), transparent 70%)" }} />
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="absolute size-1.5"
          style={{
            background: "var(--blossom)",
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 80}%`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────  BIOME SECTIONS  ────────────────────────────────────── */

function BiomeSection({
  project,
  biome,
}: {
  project: typeof projects[number];
  biome: "irl" | "wisdom" | "besty" | "transpower";
}) {
  const ref = useRef<HTMLElement>(null);
  const meta = {
    irl: { id: "touched-grass", title: "Touched Grass", icon: "🌱", glow: "grass" as const },
    wisdom: { id: "moai", title: "Consulted the Moai Shrine", icon: "🗿", glow: "redstone" as const },
    besty: { id: "vault", title: "Opened the Emoji Vault", icon: "☠️", glow: "terminal" as const },
    transpower: {
      id: "sanctuary",
      title: "Found the Offline Sanctuary",
      icon: "💜",
      glow: "blossom" as const,
    },
  }[biome];
  useAchievementOnView(ref, { id: meta.id, title: meta.title, icon: meta.icon });

  return (
    <section
      id={`biome-${project.id}`}
      ref={ref}
      className="relative px-6 md:px-12 py-28 scroll-mt-12"
      style={{
        background: `linear-gradient(180deg, transparent, ${project.colorTheme.bg}, transparent)`,
      }}
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <div
            className="font-pixel text-xs uppercase tracking-[0.25em] mb-3"
            style={{ color: project.colorTheme.glow }}
          >
            {project.biome}
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-3">
            {project.name}
          </h2>
          <p className="font-serif-italic text-2xl mb-6" style={{ color: project.colorTheme.glow }}>
            {project.tagline}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-pixel text-[10px] uppercase tracking-wider px-2.5 py-1 border-2 border-border bg-card/60 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <PixelLink href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" /> GitHub Repo
            </PixelLink>
            <PixelButton
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(project.installCommand);
                toast.success("Install command copied", {
                  description: project.installCommand,
                });
                unlockAchievement({ id: `copy-${project.id}`, title: "Pocketed an install command", icon: "📦" });
              }}
            >
              <Copy className="size-4" /> Copy Install
            </PixelButton>
          </div>

          <div className="font-serif-italic text-sm text-muted-foreground">
            {project.microcopy}
          </div>
        </div>

        <div className="space-y-6">
          {/* Terminal demo */}
          <PixelPanel
            className="bg-[oklch(0.12_0.04_280/0.9)] p-4 font-mono text-sm"
            glow={meta.glow}
          >
            <div className="text-[10px] font-pixel uppercase tracking-widest text-muted-foreground mb-2">
              terminal preview
            </div>
            {project.terminalDemo.map((l, i) => (
              <div
                key={i}
                className={
                  l.startsWith("$")
                    ? "text-grass"
                    : l.startsWith("✅")
                      ? "text-grass"
                      : "text-terminal"
                }
              >
                {l}
              </div>
            ))}
          </PixelPanel>

          {/* Features */}
          <ul className="grid sm:grid-cols-2 gap-3">
            {project.features.map((f) => (
              <li
                key={f.title}
                className="border-2 border-border bg-card/50 p-3 hover:border-grass/40 transition-colors"
              >
                <div className="font-pixel text-xs uppercase tracking-wider text-foreground mb-1">
                  {f.title}
                </div>
                {f.command && (
                  <div className="font-mono text-[11px] text-terminal mb-1">
                    {f.command}
                  </div>
                )}
                <div className="text-xs text-muted-foreground leading-snug">{f.desc}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────  ARCHITECTURE LAB  ────────────────────────────────────── */

function ArchitectureLab() {
  const ref = useRef<HTMLElement>(null);
  useAchievementOnView(ref, {
    id: "redstone",
    title: "Activated Redstone Lab",
    icon: "🔴",
  });
  return (
    <section ref={ref} className="relative px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Redstone Architecture Lab"
          title="How Anika's tools connect"
          subtitle="Signals flow through wires. Each block is a system, each pulse is a real call."
        />
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          <PixelPanel className="p-5">
            <RedstoneDiagram
              title="IRL Pipeline"
              steps={[
                { label: "Command Input", tone: "grass" },
                { label: "Source Detector", tone: "grass" },
                { label: "Registry Resolver", tone: "lantern" as never },
                { label: "Doctor Checks" },
                { label: "Installer", tone: "redstone" },
                { label: "Rich Terminal UI", tone: "terminal" },
                { label: "Wellness Layer", tone: "blossom" },
              ]}
            />
          </PixelPanel>
          <PixelPanel className="p-5">
            <RedstoneDiagram
              title="IRL Wisdom Pipeline"
              steps={[
                { label: "Typer Command", tone: "lantern" as never },
                { label: "Questionary Palette", tone: "grass" },
                { label: "Knowledge Collections", tone: "lavender" },
                { label: "Rich Renderer", tone: "terminal" },
                { label: "Favorites + Streak", tone: "redstone" },
                { label: "Local JSON", tone: "grass" },
              ]}
            />
          </PixelPanel>          <PixelPanel className="p-5">
            <RedstoneDiagram
              title="irl-besty Pipeline"
              steps={[
                { label: "Text File", tone: "grass" },
                { label: "Password Seed", tone: "redstone" },
                { label: "Pseudo-Random Shift", tone: "lavender" },
                { label: "Emoji Output", tone: "terminal" },
                { label: "Decode w/ Same Pwd", tone: "grass" },
              ]}
            />
          </PixelPanel>
          <PixelPanel className="p-5">
            <RedstoneDiagram
              title="TransPower Pipeline"
              steps={[
                { label: "Local App Shell", tone: "blossom" },
                { label: "ONNX Runtime", tone: "lavender" },
                { label: "SmolLM-135M", tone: "lavender" },
                { label: "Sweetheart Layer", tone: "blossom" },
                { label: "Local Response", tone: "grass" },
                { label: "Zero Telemetry", tone: "redstone" },
              ]}
            />
          </PixelPanel>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────  SKILLS INVENTORY  ────────────────────────────────────── */

function SkillsInventory() {
  return (
    <section className="relative px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Inventory"
          title="Anika's Inventory"
          subtitle="Hover a slot. Click to spark."
        />
        <div className="space-y-6 mt-10">
          {skillCategories.map((cat) => (
            <div key={cat.name}>
              <div className="font-pixel text-xs uppercase tracking-widest text-muted-foreground mb-3">
                {cat.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((s) => (
                  <ItemSlot key={s.name} skill={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ItemSlot({
  skill,
}: {
  skill: { name: string; icon: string; tip: string; color?: string };
}) {
  const [sparks, setSparks] = useState<number[]>([]);
  return (
    <button
      className="group relative w-20 h-20 border-2 border-border bg-card/70 hover:border-grass/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grass"
      style={{
        boxShadow: "inset 0 -3px 0 oklch(0 0 0 / 0.4), inset 0 2px 0 oklch(1 0 0 / 0.05)",
      }}
      onClick={() => {
        const id = Date.now();
        setSparks((s) => [...s, id]);
        setTimeout(() => setSparks((s) => s.filter((x) => x !== id)), 600);
      }}
      aria-label={skill.name}
    >
      <div
        className="text-xl flex items-center justify-center w-full h-full font-pixel"
        style={{ color: skill.color ?? "var(--foreground)" }}
      >
        {skill.icon}
      </div>
      <div className="absolute bottom-1 inset-x-0 text-center font-pixel text-[8px] uppercase tracking-wider text-muted-foreground truncate px-1">
        {skill.name}
      </div>
      <div className="pointer-events-none absolute z-10 left-1/2 -translate-x-1/2 -top-2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        <div className="font-pixel text-[10px] bg-card border-2 border-grass/50 px-2 py-1 text-foreground">
          {skill.tip}
        </div>
      </div>
      {sparks.map((id) => (
        <span
          key={id}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--lantern) 0%, transparent 60%)",
            animation: "spawn 0.6s ease-out forwards",
          }}
        />
      ))}
    </button>
  );
}

/* ──────────────────────────────────────  TERMINAL  ────────────────────────────────────── */

function TerminalSection() {
  return (
    <section className="relative px-6 md:px-12 py-24">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="DevCraft Terminal"
          title="Type a command"
          subtitle="Try `help`, `irl`, `wisdom`, `spawn besty`, or `touch grass`."
        />
        <div className="mt-8">
          <Suspense fallback={<div className="h-80 border-2 border-border bg-card/40" aria-hidden />}>
            <DevCraftTerminal />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────  ABOUT CABIN  ────────────────────────────────────── */

function AboutCabin() {
  return (
    <section className="relative px-6 md:px-12 py-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
        <PixelPanel className="p-8 relative" glow="blossom">
          <CabinScene />
        </PixelPanel>
        <div>
          <div className="font-pixel text-xs uppercase tracking-widest text-lantern mb-3">
            cozy hacker cabin
          </div>
          <h2 className="font-display text-4xl md:text-5xl mb-5">Meet Anika</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Anika Mukherjee, also known as <span className="text-foreground">Dev2Creator</span>,
            builds open-source software with a strange but powerful mission:
            make tools feel less cold.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Her work mixes Python tooling, terminal UX, offline AI,
            privacy-first systems, cross-platform apps, and cute reactive
            interfaces. From IRL's package installer that reminds developers to
            touch grass, to irl-besty's chaotic emoji vault, to TransPower's
            offline AI companion, her projects are built around one idea:
          </p>
          <p className="font-serif-italic text-xl text-foreground mb-6">
            software should help humans, not drain them.
          </p>
          <blockquote className="border-l-2 border-grass pl-4 text-muted-foreground italic">
            "Build tools that work hard, but still remember the human using them."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function CabinScene() {
  return (
    <div className="relative aspect-[4/3] w-full bg-[oklch(0.14_0.04_280)] border-2 border-border overflow-hidden">
      {/* window with petals */}
      <div
        className="absolute top-4 left-4 w-24 h-24 border-4 border-[oklch(0.4_0.04_30)]"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.3 0.1 295), oklch(0.18 0.06 280))",
        }}
      >
        <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-[oklch(0.4_0.04_30)]" />
        <span className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[oklch(0.4_0.04_30)]" />
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="absolute size-1.5"
            style={{
              background: "var(--blossom)",
              top: `${20 + i * 15}%`,
              left: `${10 + i * 18}%`,
            }}
          />
        ))}
      </div>
      {/* lantern */}
      <div className="absolute top-3 right-6">
        <div className="w-1 h-3 bg-[oklch(0.4_0.04_30)] mx-auto" />
        <div className="w-4 h-4 bg-lantern shadow-[0_0_24px_var(--lantern)] animate-pulse-glow" />
      </div>
      {/* desk + laptop */}
      <div className="absolute bottom-0 inset-x-0">
        <div className="h-2 bg-[oklch(0.32_0.04_30)]" />
        <div className="absolute -top-10 left-10 w-24 h-10 bg-[oklch(0.18_0.04_280)] border-2 border-grass/50">
          <div className="m-1 font-mono text-[8px] text-terminal">
            $ irl<br />grass
          </div>
        </div>
        {/* sleeping besty */}
        <div className="absolute -top-6 right-12 flex items-center gap-1">
          <span className="w-3 h-3 bg-lantern" />
          <span className="w-4 h-3 bg-lantern" />
          <span className="font-pixel text-[9px] text-muted-foreground">z z</span>
        </div>
      </div>
      {/* bookshelf */}
      <div className="absolute right-3 top-1/3 flex gap-0.5">
        {["var(--grass)","var(--blossom)","var(--lavender)","var(--cyan-glow)","var(--redstone)"].map((c,i)=>(
          <span key={i} className="w-1.5 h-8" style={{background:c}} />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────  COMMUNITY GROVE  ────────────────────────────────────── */

const communityActions = [
  {
    title: "Star the Builds",
    icon: Star,
    text: "Boost IRL, IRL Wisdom, and irl-besty so more builders can discover Dev2Creator's open-source tools.",
    href: "https://github.com/Dev2Creator",
    tone: "grass" as const,
  },
  {
    title: "Join the Campfire",
    icon: Users,
    text: "Open issues, share ideas, test commands, and help shape the next cozy terminal experiments.",
    href: "https://github.com/Dev2Creator?tab=repositories",
    tone: "terminal" as const,
  },
  {
    title: "Send a Heart Signal",
    icon: Heart,
    text: "Support the human behind the builds with kind feedback, screenshots, bug reports, and signal boosts.",
    href: "mailto:cuteypieanika@gmail.com?subject=DevCraft%20Realm%20support",
    tone: "blossom" as const,
  },
];

const communityLedger = [
  { name: "Open-source explorers", role: "Stars, forks, and repo visits", count: "live on GitHub" },
  { name: "Issue scouts", role: "Bug reports and feature sparks", count: "always welcome" },
  { name: "Signal boosters", role: "Shares, screenshots, and kind words", count: "community powered" },
];

function CommunityGrove() {
  const ref = useRef<HTMLElement>(null);
  useAchievementOnView(ref, {
    id: "builders-grove",
    title: "Found the Builders' Grove",
    icon: "🌳",
  });

  return (
    <section ref={ref} className="relative px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Builders' Grove"
          title="Support the Realm"
          subtitle="A community board for people who star, test, share, and cheer on Dev2Creator projects. No bland tip jar required."
        />
        <div className="mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
          <div className="grid md:grid-cols-3 gap-4">
            {communityActions.map((action) => {
              const Icon = action.icon;
              return (
                <PixelPanel key={action.title} className="p-5 h-full" glow={action.tone}>
                  <div className="mb-4 grid size-11 place-items-center border-2 border-border bg-background/60 text-grass">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{action.text}</p>
                  <PixelLink
                    size="sm"
                    variant={action.tone === "blossom" ? "blossom" : "ghost"}
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() =>
                      unlockAchievement({
                        id: `support-${action.title.toLowerCase().replace(/\s+/g, "-")}`,
                        title: action.title,
                        icon: action.tone === "blossom" ? "💖" : "⭐",
                      })
                    }
                  >
                    Activate
                  </PixelLink>
                </PixelPanel>
              );
            })}
          </div>

          <PixelPanel className="p-5" glow="redstone">
            <div className="font-pixel text-xs uppercase tracking-widest text-lantern mb-4">
              Community ledger
            </div>
            <div className="space-y-3">
              {communityLedger.map((member) => (
                <div
                  key={member.name}
                  className="grid grid-cols-[1fr_auto] gap-3 border-2 border-border bg-background/45 p-3"
                >
                  <div>
                    <div className="font-pixel text-xs uppercase tracking-wider text-foreground">
                      {member.name}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{member.role}</div>
                  </div>
                  <div className="self-center font-mono text-[11px] text-grass text-right">
                    {member.count}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              When a real sponsor or supporter API is connected later, this board can hydrate from that source without changing the page layout.
            </p>
          </PixelPanel>
        </div>
      </div>
    </section>
  );
}
/* ──────────────────────────────────────  CONTACT  ────────────────────────────────────── */

function ContactPortal() {
  const ref = useRef<HTMLElement>(null);
  useAchievementOnView(ref, {
    id: "portal",
    title: "Open Source Portal Opened",
    icon: "🌟",
  });
  return (
    <section ref={ref} className="relative px-6 md:px-12 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeading eyebrow="Contact Portal" title="Send a Signal" subtitle="" />
        <div className="grid md:grid-cols-3 gap-4 mt-10 text-left">
          <PixelPanel className="p-5" glow="grass">
            <div className="font-pixel text-xs uppercase tracking-widest text-grass mb-2">GitHub</div>
            <div className="font-display text-xl mb-3">Dev2Creator</div>
            <PixelLink size="sm" href="https://github.com/Dev2Creator" target="_blank" rel="me noopener noreferrer">
              <Github className="size-4" /> Open
            </PixelLink>
          </PixelPanel>
          <PixelPanel className="p-5" glow="blossom">
            <div className="font-pixel text-xs uppercase tracking-widest text-blossom mb-2">Email</div>
            <div className="font-mono text-sm mb-3 break-all">cuteypieanika@gmail.com</div>
            <PixelButton
              size="sm"
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText("cuteypieanika@gmail.com");
                toast.success("Email copied to clipboard");
              }}
            >
              <Copy className="size-4" /> Copy Email
            </PixelButton>
          </PixelPanel>
          <PixelPanel className="p-5" glow="lavender">
            <div className="font-pixel text-xs uppercase tracking-widest text-lavender mb-2">Projects</div>
            <ul className="text-sm space-y-1 mb-3 text-muted-foreground">
              <li>· IRL™</li>
              <li>· irl-besty</li>
              <li>· TransPower v1.7</li>
            </ul>
            <PixelButton
              size="sm"
              variant="ghost"
              onClick={() =>
                document.getElementById("world-map")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Biomes
            </PixelButton>
          </PixelPanel>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-6 md:px-12 py-12 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 font-pixel text-xs uppercase tracking-widest text-muted-foreground">
        <div>Crafted with <span className="text-redstone">❤</span> by Anika Mukherjee</div>
        <div>Dev2Creator — Open Source Forever</div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────  HELPERS  ────────────────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="font-pixel text-xs uppercase tracking-[0.3em] text-grass text-glow-grass mb-3">
        ▸ {eyebrow}
      </div>
      <h2 className="font-display text-4xl md:text-5xl text-foreground mb-3">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </div>
  );
}
