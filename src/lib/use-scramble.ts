"use client";

import { useEffect, useRef, useState } from "react";
import { playHoverBeep, preloadHoverBeep } from "@/lib/hover-beep";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * The Framer `NavItem` hover effect: the label scrambles through random
 * characters and resolves left-to-right back to the real text, with the
 * site's hover sound.
 */
export function useScramble(title: string, speed = 40) {
  const [display, setDisplay] = useState(title);
  const intervalRef = useRef<number | undefined>(undefined);
  const iterRef = useRef(0);

  useEffect(() => setDisplay(title), [title]);
  useEffect(() => {
    preloadHoverBeep();
    return () => window.clearInterval(intervalRef.current);
  }, []);

  const start = () => {
    playHoverBeep();
    window.clearInterval(intervalRef.current);
    iterRef.current = 0;
    intervalRef.current = window.setInterval(() => {
      const iter = iterRef.current;
      setDisplay(
        title
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < Math.floor(iter)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iterRef.current += 0.35;
      if (iterRef.current >= title.length) {
        window.clearInterval(intervalRef.current);
        setDisplay(title);
      }
    }, speed);
  };

  const stop = () => {
    window.clearInterval(intervalRef.current);
    setDisplay(title);
  };

  return { display, start, stop };
}
