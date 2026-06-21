import { useEffect, useState, useSyncExternalStore } from "react";

type Achievement = { id: string; title: string; icon: string };

const unlocked = new Set<string>();
let toasts: Achievement[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
let achievementContext: AudioContext | null = null;
let achievementBuffer: AudioBuffer | null = null;
let achievementLoad: Promise<AudioBuffer> | null = null;
let pendingAchievementSound = false;

function loadAchievementSound(context: AudioContext) {
  if (achievementBuffer) return Promise.resolve(achievementBuffer);
  if (!achievementLoad) {
    achievementLoad = fetch(
      `${import.meta.env.BASE_URL}audio/minecraft-rare-achievement.mp3`,
    )
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

function playAchievementSound() {
  pendingAchievementSound = true;
  const context = achievementContext;
  if (!context || context.state !== "running" || !achievementBuffer) return;

  const source = context.createBufferSource();
  const gain = context.createGain();
  source.buffer = achievementBuffer;
  gain.gain.value = 1.15;
  source.connect(gain);
  gain.connect(context.destination);
  source.start();
  pendingAchievementSound = false;
}

function prepareAchievementSound() {
  if (!achievementContext) achievementContext = new AudioContext();
  const context = achievementContext;
  void context
    .resume()
    .then(() => loadAchievementSound(context))
    .then(() => {
      if (pendingAchievementSound) playAchievementSound();
    })
    .catch(() => undefined);
}
export function unlockAchievement(a: Achievement) {
  if (unlocked.has(a.id)) return;
  unlocked.add(a.id);
  toasts = [...toasts, a];
  emit();
  playAchievementSound();
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
  // avoid SSR mismatch for toast list (always empty initially)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const prepare = () => prepareAchievementSound();
    window.addEventListener("pointerdown", prepare);
    window.addEventListener("keydown", prepare);
    return () => {
      window.removeEventListener("pointerdown", prepare);
      window.removeEventListener("keydown", prepare);
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
