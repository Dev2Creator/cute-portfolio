import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function VoxelAudio() {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = async () => {
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(`${import.meta.env.BASE_URL}audio/01-calm-1.mp3`);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.4;
      audioRef.current = audio;
    }

    if (audio.paused) {
      await audio.play();
      setEnabled(true);
    } else {
      audio.pause();
      setEnabled(false);
    }
  };

  useEffect(
    () => () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    },
    [],
  );

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      className={`fixed bottom-5 left-5 z-40 grid size-11 place-items-center border-2 border-grass/50 bg-card/90 text-grass shadow-[0_0_24px_-8px_var(--grass)] backdrop-blur-md transition-colors hover:border-grass hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grass ${!enabled ? "animate-pulse-glow" : ""}`}
      aria-label={enabled ? "Pause background music" : "Play background music"}
      aria-pressed={enabled}
      title={enabled ? "Pause background music" : "Play background music"}
    >
      {enabled ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
    </button>
  );
}
