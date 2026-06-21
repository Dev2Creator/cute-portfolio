import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type AudioEngine = {
  context: AudioContext;
  timer: number;
};

const notes = [261.63, 293.66, 349.23, 392, 440, 523.25];

export function VoxelAudio() {
  const [enabled, setEnabled] = useState(false);
  const engineRef = useRef<AudioEngine | null>(null);

  const stop = () => {
    const engine = engineRef.current;
    if (!engine) return;
    window.clearTimeout(engine.timer);
    void engine.context.close();
    engineRef.current = null;
    setEnabled(false);
  };

  const start = async () => {
    const context = new AudioContext();
    const master = context.createGain();
    const filter = context.createBiquadFilter();

    master.gain.value = 0.09;
    filter.type = "lowpass";
    filter.frequency.value = 1500;
    filter.Q.value = 0.7;
    filter.connect(master);
    master.connect(context.destination);

    [130.81, 196, 261.63].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = index === 1 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index * 3 - 3;
      gain.gain.value = index === 1 ? 0.055 : 0.035;
      oscillator.connect(gain);
      gain.connect(filter);
      oscillator.start();
    });

    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 110;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const engine: AudioEngine = { context, timer: 0 };
    engineRef.current = engine;

    const playPluck = () => {
      if (engineRef.current !== engine || context.state === "closed") return;
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const frequency = notes[Math.floor(Math.random() * notes.length)];

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.995, now + 1.8);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
      oscillator.connect(gain);
      gain.connect(filter);
      oscillator.start(now);
      oscillator.stop(now + 2.25);

      engine.timer = window.setTimeout(playPluck, 3500 + Math.random() * 4500);
    };

    await context.resume();
    engine.timer = window.setTimeout(playPluck, 500);
    setEnabled(true);
  };

  useEffect(() => stop, []);

  return (
    <button
      type="button"
      onClick={() => (enabled ? stop() : void start())}
      className="fixed bottom-5 left-5 z-40 grid size-11 place-items-center border-2 border-grass/50 bg-card/90 text-grass shadow-[0_0_24px_-8px_var(--grass)] backdrop-blur-md transition-colors hover:border-grass hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grass"
      aria-label={enabled ? "Mute voxel ambience" : "Play voxel ambience"}
      aria-pressed={enabled}
      title={enabled ? "Mute voxel ambience" : "Play voxel ambience"}
    >
      {enabled ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
    </button>
  );
}
