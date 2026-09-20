"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { startPageTransition } from "@/lib/page-transition";

type Props = ComponentProps<typeof Link>;

/** next/link (keeps prefetching) whose in-site clicks run the push-up transition. */
export function TransitionLink({ href, onClick, target, ...rest }: Props) {
  const router = useRouter();
  const url = typeof href === "string" ? href : (href.pathname ?? "");

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const external = /^[a-z]+:/i.test(url) || target === "_blank";
    const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    if (external || modified) return;

    e.preventDefault();
    if (url === window.location.pathname) return;
    startPageTransition(() => router.push(url));
  };

  return <Link href={href} target={target} onClick={handleClick} {...rest} />;
}
