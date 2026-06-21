import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type AudioPlayer = {
  audio: HTMLAudioElement;
  context: AudioContext;
};

export function VoxelAudio() {
  const [enabled, setEnabled] = useState(false);
  const playerRef = useRef<AudioPlayer | null>(null);

  const toggle = async () => {
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
      gain.gain.value = 2.2;
      compressor.threshold.value = -12;
      compressor.knee.value = 12;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.25;
      source.connect(gain);
      gain.connect(compressor);
      compressor.connect(context.destination);
      player = { audio, context };
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
