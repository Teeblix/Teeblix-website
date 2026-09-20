"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard API unavailable — ignore silently
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="text-left text-xs uppercase leading-none underline-offset-4 hover:underline"
      style={{ color: "var(--fg-1)" }}
    >
      {copied ? "Copied to clipboard" : email}
    </button>
  );
}
