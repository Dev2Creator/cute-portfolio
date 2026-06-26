import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Music2, Trophy, Volume2, VolumeX } from "lucide-react";

import { primeAchievementSound, setAchievementSoundVolume } from "./Achievements";

type AudioPlayer = {
  audio: HTMLAudioElement;
  context: AudioContext;
  gain: GainNode;
};

const MAX_MUSIC_GAIN = 3.2;
const MUSIC_VOLUME_KEY = "devcraft-music-volume";
const ACHIEVEMENT_VOLUME_KEY = "devcraft-achievement-volume";

function readStoredVolume(key: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const stored = window.localStorage.getItem(key);
  if (!stored) return fallback;
  const parsed = Number(stored);
  return Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : fallback;
}

export function VoxelAudio() {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(() => readStoredVolume(MUSIC_VOLUME_KEY, 88));
  const [achievementVolume, setAchievementVolume] = useState(() =>
    readStoredVolume(ACHIEVEMENT_VOLUME_KEY, 100),
  );
  const playerRef = useRef<AudioPlayer | null>(null);

  const toggle = async () => {
    window.dispatchEvent(new Event("devcraft:prime-audio"));
    void primeAchievementSound();

    let player = playerRef.current;
    if (!player) {
      const audio = new Audio(`${import.meta.env.BASE_URL}audio/01-calm-1.mp3`);
      const context = new AudioContext();
      const source = context.createMediaElementSource(audio);
      const gain = context.createGain();
      const compressor = context.createDynamicsCompressor();

      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 1;
      gain.gain.value = (volume / 100) * MAX_MUSIC_GAIN;
      compressor.threshold.value = -14;
      compressor.knee.value = 16;
      compressor.ratio.value = 3;
      compressor.attack.value = 0.004;
      compressor.release.value = 0.22;
      source.connect(gain);
      gain.connect(compressor);
      compressor.connect(context.destination);
      player = { audio, context, gain };
      playerRef.current = player;
    }

    if (player.audio.paused) {
      await player.context.resume();
      await player.audio.play();
      setEnabled(true);
    } else {
      player.audio.pause();
      setEnabled(false);
    }
  };

  const changeVolume = (nextVolume: number) => {
    setVolume(nextVolume);
    window.localStorage.setItem(MUSIC_VOLUME_KEY, String(nextVolume));
    const player = playerRef.current;
    if (!player) return;
    player.gain.gain.setTargetAtTime(
      (nextVolume / 100) * MAX_MUSIC_GAIN,
      player.context.currentTime,
      0.02,
    );
  };

  const changeAchievementVolume = (nextVolume: number) => {
    setAchievementVolume(nextVolume);
    window.localStorage.setItem(ACHIEVEMENT_VOLUME_KEY, String(nextVolume));
    setAchievementSoundVolume((nextVolume / 100) * 1.35);
    window.dispatchEvent(new Event("devcraft:prime-audio"));
  };

  useEffect(() => {
    setAchievementSoundVolume((achievementVolume / 100) * 1.35);
  }, [achievementVolume]);

  useEffect(
    () => () => {
      const player = playerRef.current;
      if (!player) return;
      player.audio.pause();
      player.audio.src = "";
      void player.context.close();
      playerRef.current = null;
    },
    [],
  );

  return (
    <div className="fixed bottom-5 left-5 z-40 w-[min(20rem,calc(100vw-2.5rem))] border-2 border-grass/50 bg-card/90 p-3 shadow-[0_0_24px_-8px_var(--grass)] backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => void toggle()}
          className={`grid size-10 shrink-0 place-items-center border-2 border-grass/40 text-grass transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-grass ${!enabled ? "animate-pulse-glow" : ""}`}
          aria-label={enabled ? "Pause Minecraft theme music" : "Play Minecraft theme music"}
          aria-pressed={enabled}
          title={enabled ? "Pause Minecraft theme music" : "Play Minecraft theme music"}
        >
          {enabled ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
        </button>
        <div className="min-w-0 flex-1 space-y-2">
          <label className="grid grid-cols-[1.35rem_1fr_2.5rem] items-center gap-2 font-pixel text-[10px] uppercase tracking-wider text-muted-foreground">
            <Music2 className="size-4 text-grass" aria-hidden />
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={volume}
              onChange={(event) => changeVolume(Number(event.target.value))}
              className="voxel-volume block w-full"
              aria-label="Minecraft theme music volume"
              title={`Music volume ${volume}%`}
              style={{ "--volume-fill": `${volume}%` } as CSSProperties}
            />
            <span className="text-right text-grass">{volume}</span>
          </label>
          <label className="grid grid-cols-[1.35rem_1fr_2.5rem] items-center gap-2 font-pixel text-[10px] uppercase tracking-wider text-muted-foreground">
            <Trophy className="size-4 text-lantern" aria-hidden />
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={achievementVolume}
              onChange={(event) => changeAchievementVolume(Number(event.target.value))}
              className="voxel-volume voxel-volume-lantern block w-full"
              aria-label="Achievement sound volume"
              title={`Achievement volume ${achievementVolume}%`}
              style={{ "--volume-fill": `${achievementVolume}%` } as CSSProperties}
            />
            <span className="text-right text-lantern">{achievementVolume}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
