"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_ORDER = ["name", "email", "message"] as const;

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = (typeof FIELD_ORDER)[number];
type FieldErrors = Partial<Record<FieldName, string>>;

const inputClasses =
  "w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-accent";

export function ContactForm() {
  const prefersReduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  function validate(data: Record<FieldName, string>): FieldErrors {
    const next: FieldErrors = {};
    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!data.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_PATTERN.test(data.email)) next.email = "That email doesn't look right.";
    if (data.message.trim().length < 10)
      next.message = "Tell us a little more — at least 10 characters.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot — real users never fill this.
    if ((formData.get("company_website") as string)?.trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    const data: Record<FieldName, string> = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const fieldErrors = validate(data);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((field) => fieldErrors[field]);
      if (firstInvalid) {
        (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      }
      return;
    }

    if (!FORMSPREE_ID) {
      setStatus("error");
      setErrorMessage(
        "The form isn't connected yet. Set NEXT_PUBLIC_FORMSPREE_ID or email us directly.",
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { errors?: { message: string }[] }
          | null;
        throw new Error(payload?.errors?.[0]?.message ?? "Submission failed — please try again.");
      }

      setStatus("success");
      form.reset();
      setErrors({});
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong — please try again or email us directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={prefersReduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-8"
      >
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground"
          aria-hidden
        >
          &#10003;
        </span>
        <h3 className="text-lg font-semibold text-foreground">Message sent</h3>
        <p className="text-sm text-muted-foreground">
          Thanks for reaching out. We&apos;ll get back to you within 2 business days.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          spellCheck={false}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClasses}
        />
        {errors.name ? (
          <p id="name-error" className="text-xs text-accent">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClasses}
        />
        {errors.email ? (
          <p id="email-error" className="text-xs text-accent">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClasses}
        />
        {errors.message ? (
          <p id="message-error" className="text-xs text-accent">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot field — visually hidden, ignored by humans. */}
      <div aria-hidden className="hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div aria-live="polite">
        <AnimatePresence>
          {status === "error" ? (
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
              className="rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-xs text-accent"
            >
              {errorMessage}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
