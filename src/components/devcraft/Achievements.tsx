import { useEffect, useState, useSyncExternalStore } from "react";

type Achievement = { id: string; title: string; icon: string };

const DEFAULT_ACHIEVEMENT_VOLUME = 1.2;
const MAX_PENDING_SOUNDS = 3;

const unlocked = new Set<string>();
let toasts: Achievement[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
let achievementContext: AudioContext | null = null;
let achievementBuffer: AudioBuffer | null = null;
let achievementLoad: Promise<AudioBuffer> | null = null;
let pendingAchievementSounds = 0;
let achievementVolume = DEFAULT_ACHIEVEMENT_VOLUME;

function getAudioContext() {
  if (!achievementContext) achievementContext = new AudioContext();
  return achievementContext;
}

function loadAchievementSound(context: AudioContext) {
  if (achievementBuffer) return Promise.resolve(achievementBuffer);
  if (!achievementLoad) {
    achievementLoad = fetch(`${import.meta.env.BASE_URL}audio/minecraft-rare-achievement.mp3`)
      .then((response) => {
        if (!response.ok) throw new Error("Achievement sound failed to load");
        return response.arrayBuffer();
      })
      .then((data) => context.decodeAudioData(data))
      .then((buffer) => {
        achievementBuffer = buffer;
        return buffer;
      });
  }
  return achievementLoad;
}

function flushAchievementSounds() {
  const context = achievementContext;
  if (!context || context.state !== "running" || !achievementBuffer) return;

  while (pendingAchievementSounds > 0) {
    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = achievementBuffer;
    gain.gain.value = achievementVolume;
    source.connect(gain);
    gain.connect(context.destination);
    source.start(context.currentTime + (MAX_PENDING_SOUNDS - pendingAchievementSounds) * 0.08);
    pendingAchievementSounds -= 1;
  }
}

export function setAchievementSoundVolume(nextVolume: number) {
  achievementVolume = Math.max(0, Math.min(1.8, nextVolume));
}

export function primeAchievementSound() {
  const context = getAudioContext();
  return context
    .resume()
    .then(() => loadAchievementSound(context))
    .then(() => {
      flushAchievementSounds();
    })
    .catch(() => undefined);
}

function queueAchievementSound() {
  pendingAchievementSounds = Math.min(MAX_PENDING_SOUNDS, pendingAchievementSounds + 1);
  const context = achievementContext;
  if (context?.state === "running" && achievementBuffer) {
    flushAchievementSounds();
    return;
  }
  if (context) void primeAchievementSound();
}

export function unlockAchievement(a: Achievement) {
  if (unlocked.has(a.id)) return;
  unlocked.add(a.id);
  toasts = [...toasts, a];
  emit();
  queueAchievementSound();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== a.id);
    emit();
  }, 4200);
}

function useToasts() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => toasts,
    () => toasts,
  );
}

export function AchievementHost() {
  const list = useToasts();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const prepare = () => {
      void primeAchievementSound();
    };
    window.addEventListener("pointerdown", prepare);
    window.addEventListener("keydown", prepare);
    window.addEventListener("devcraft:prime-audio", prepare);
    return () => {
      window.removeEventListener("pointerdown", prepare);
      window.removeEventListener("keydown", prepare);
      window.removeEventListener("devcraft:prime-audio", prepare);
    };
  }, []);
  return (
    <div
      className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"
      role="region"
      aria-live="polite"
      aria-label="Achievements"
    >
      {mounted &&
        list.map((a) => (
          <div key={a.id} className="animate-spawn font-pixel pointer-events-auto">
            <div
              className="flex items-center gap-3 px-4 py-3 bg-card border-2 border-lantern/60"
              style={{
                boxShadow:
                  "0 0 28px -6px var(--lantern), inset 0 -3px 0 0 oklch(0 0 0 / 0.4)",
              }}
            >
              <div className="text-2xl" aria-hidden>
                {a.icon}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-lantern">
                  Achievement Unlocked
                </div>
                <div className="text-sm text-foreground">{a.title}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export function useAchievementOnView(
  ref: React.RefObject<HTMLElement | null>,
  ach: Achievement,
) {
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          unlockAchievement(ach);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, ach]);
}
