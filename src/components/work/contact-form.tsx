"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { BUDGETS, PROJECT_TYPES, START_PROJECT, TIMELINES } from "@/lib/work-content";

type Status = "idle" | "sending" | "sent" | "error";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2 text-xs uppercase" style={{ color: "var(--fg-1)" }}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function Select({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="field-box">
      <select name={name} required className="field-input h-full">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

export function ContactForm() {
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
      const res = await fetch("/api/contact", {
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
          Message received
        </h2>
        <p className="max-w-[300px] text-[10px] font-light uppercase leading-[1.3]" style={{ color: "var(--fg-1)" }}>
          Thanks for reaching out. I&apos;ll read it properly and get back to you within a day or two.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex max-w-[300px] flex-col gap-1">
        <h2 className="text-[13px] font-medium uppercase leading-[1.3]" style={{ color: "var(--fg-1)" }}>
          {START_PROJECT.title}
        </h2>
        <p className="text-[10px] font-light uppercase leading-[1.3]" style={{ color: "var(--fg-1)" }}>
          {START_PROJECT.description}
        </p>
      </div>

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
        <Field label="Company / brand">
          <div className="field-box">
            <input name="company" type="text" placeholder="Horizon" className="field-input" />
          </div>
        </Field>
        <Field label="Email*">
          <div className="field-box">
            <input name="email" type="email" required placeholder="hello@email.com" className="field-input" />
          </div>
        </Field>
        <Field label="What's the project?*">
          <Select name="project" options={PROJECT_TYPES} />
        </Field>
        <Field label="Budget*">
          <Select name="budget" options={BUDGETS} />
        </Field>
        <Field label="Timeline*">
          <Select name="timeline" options={TIMELINES} />
        </Field>
        <Field label="What are we building?*">
          <div className="field-box h-[150px]">
            <textarea
              name="message"
              required
              placeholder="Tell me about your project, the goal(s), the audience, basically anything worth sharing."
              className="field-input h-full resize-y"
            />
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
            Something went wrong sending that. Email me directly at hello@teeblix.com.
          </p>
        )}
      </form>
    </div>
  );
}
