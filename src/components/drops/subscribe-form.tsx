"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type Status = "idle" | "sending" | "sent" | "error";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2 text-xs uppercase" style={{ color: "var(--fg-1)" }}>
      <span>{label}</span>
      {children}
    </label>
  );
}

// Same field and submit treatment as the Work With Me contact form, cut down
// to name + email.
export function SubscribeForm() {
  const [valid, setValid] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-1">
        <h2 className="text-[13px] font-medium uppercase leading-[1.3]" style={{ color: "var(--fg-1)" }}>
          You&apos;re on the list
        </h2>
        <p className="max-w-[300px] text-[10px] font-light uppercase leading-[1.3]" style={{ color: "var(--fg-1)" }}>
          Thanks for subscribing. The first drop lands in your inbox as soon as it&apos;s ready.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      noValidate
      onSubmit={onSubmit}
      onChange={(e) => setValid(e.currentTarget.checkValidity())}
    >
      <Field label="Name*">
        <div className="field-box">
          <input name="name" type="text" required placeholder="Jane Smith" className="field-input" />
        </div>
      </Field>
      <Field label="Email*">
        <div className="field-box">
          <input name="email" type="email" required placeholder="hello@email.com" className="field-input" />
        </div>
      </Field>

      <button
        type="submit"
        disabled={!valid || status === "sending"}
        className="submit-btn h-10 w-full text-[13px] font-medium uppercase"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>

      {status === "error" && (
        <p className="text-[10px] uppercase" style={{ color: "var(--fg-2)" }}>
          Something went wrong. Email me directly at hello@teeblix.com and I&apos;ll add you.
        </p>
      )}
    </form>
  );
}
