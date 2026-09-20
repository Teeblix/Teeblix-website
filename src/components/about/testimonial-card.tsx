import Image from "next/image";
import type { Testimonial } from "@/lib/about-content";

export function TestimonialCard({ quote, name, role, avatar }: Testimonial) {
  return (
    <figure className="flex flex-col gap-3">
      <blockquote className="max-w-[354px] text-xs uppercase" style={{ color: "var(--fg-1)" }}>
        {quote}
      </blockquote>
      <figcaption className="flex items-center gap-2">
        <Image
          src={avatar}
          alt=""
          width={30}
          height={30}
          className="h-[30px] w-[30px] shrink-0 rounded-[8px] object-cover"
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-medium uppercase leading-[1.3]" style={{ color: "var(--fg-1)" }}>
            {name}
          </span>
          <span className="text-[10px] font-light uppercase leading-[1.3]" style={{ color: "var(--fg-2)" }}>
            {role}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
