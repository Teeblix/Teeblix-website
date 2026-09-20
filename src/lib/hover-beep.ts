// Hover sound for the nav / CTA text links — the "glitch" preset from the
// Framer NavItem component, at the volume set on the site (0.5): three short
// quantized-noise zaps at different frequencies, synthesized with Web Audio.

const VOLUME = 0.5;

let ctx: AudioContext | null = null;
let unlockInstalled = false;
let lastPlayed = 0;

function getContext(): AudioContext | null {
  if (typeof window === "undefined" || !("AudioContext" in window)) return null;
  if (!ctx || ctx.state === "closed") ctx = new AudioContext();
  return ctx;
}

/** Browsers keep audio suspended until the first click/keypress; resume on that gesture. */
export function preloadHoverBeep() {
  if (typeof window === "undefined" || unlockInstalled) return;
  unlockInstalled = true;
  const unlock = () => {
    getContext()?.resume().catch(() => {});
  };
  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("keydown", unlock, { passive: true });
}

function quantizedNoise(audio: AudioContext, duration: number) {
  const length = Math.floor(audio.sampleRate * duration);
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.round((Math.random() * 2 - 1) * 4) / 4;
  }
  const source = audio.createBufferSource();
  source.buffer = buffer;
  return source;
}

const ZAPS = [
  { delay: 0, freq: 4200, q: 3, dur: 0.04, amp: 1.0 },
  { delay: 0.025, freq: 2600, q: 4, dur: 0.03, amp: 0.65 },
  { delay: 0.055, freq: 5800, q: 2, dur: 0.02, amp: 0.4 },
];

export function playHoverBeep() {
  if (typeof window === "undefined") return;
  if (!window.matchMedia("(hover: hover)").matches) return;

  preloadHoverBeep();
  const audio = getContext();
  if (!audio) return;
  if (audio.state !== "running") {
    audio.resume().catch(() => {});
    return;
  }

  const now = performance.now();
  if (now - lastPlayed < 40) return;
  lastPlayed = now;

  const t = audio.currentTime;
  for (const { delay, freq, q, dur, amp } of ZAPS) {
    const source = quantizedNoise(audio, dur);
    const bandpass = audio.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = freq;
    bandpass.Q.value = q;
    const gain = audio.createGain();
    gain.gain.setValueAtTime(VOLUME * amp * 0.35, t + delay);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + dur);
    source.connect(bandpass).connect(gain).connect(audio.destination);
    source.start(t + delay);
    source.stop(t + delay + dur + 0.01);
  }
}
