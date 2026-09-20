export function HeroVideo() {
  return (
    <div className="absolute inset-0">
      <video
        src="/videos/workspace-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.25) 100%)" }}
      />
      <div className="absolute left-5 top-5 text-[11px] uppercase tracking-wide text-white">
        Based in Nigeria
      </div>
      <div className="absolute right-5 top-5 text-[11px] uppercase tracking-wide text-white">
        Open to the world
      </div>
    </div>
  );
}
