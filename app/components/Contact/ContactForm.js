"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PaperPlaneRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { Turnstile } from "@marsidev/react-turnstile";

const STATUS = {
  IDLE: "idle",
  SUCCESS: "success",
  ERROR: "error",
};

export default function ContactForm({ animateEntrance = true }) {
  const turnstileRef = useRef(null);
  const pendingSubmission = useRef(null);
  const reduceMotion = useReducedMotion();
  const [verificationEnabled, setVerificationEnabled] = useState(false);
  const [verificationReady, setVerificationReady] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => () => {
    const pending = pendingSubmission.current;
    pendingSubmission.current = null;
    clearTimeout(pending?.timeout);
    pending?.controller?.abort();
  }, []);

  const failVerification = () => {
    const pending = pendingSubmission.current;
    if (!pending || pending.phase !== "verifying") return;
    clearTimeout(pending.timeout);
    pendingSubmission.current = null;
    setIsSubmitting(false);
    setStatus(STATUS.ERROR);
    setErrorMessage("Security check could not complete. Please try again.");
    turnstileRef.current?.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pendingSubmission.current) return;

    if (!siteKey) {
      setStatus(STATUS.ERROR);
      setErrorMessage("The contact form is temporarily unavailable. Please try again or use the email link below.");
      return;
    }

    setIsSubmitting(true);
    setStatus(STATUS.IDLE);
    setErrorMessage("");

    pendingSubmission.current = {
      formData: { ...formData },
      phase: "verifying",
      timeout: window.setTimeout(failVerification, 30000),
    };
    // A quick submit can arrive before the lazily loaded widget is ready.
    setVerificationEnabled(true);
    if (!verificationReady || !turnstileRef.current) return;
    try {
      turnstileRef.current.execute();
    } catch {
      failVerification();
    }
  };

  const handleWidgetLoad = () => {
    setVerificationReady(true);
    if (pendingSubmission.current?.phase !== "verifying") return;
    try {
      turnstileRef.current?.execute();
    } catch {
      failVerification();
    }
  };

  const sendMessage = async (token) => {
    const pending = pendingSubmission.current;
    if (!pending || pending.phase !== "verifying") return;
    pending.phase = "sending";
    clearTimeout(pending.timeout);
    pending.controller = new AbortController();
    pending.timeout = window.setTimeout(() => pending.controller.abort(), 20000);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pending.formData,
          turnstileToken: token,
        }),
        signal: pending.controller.signal,
      });

      const data = await res.json();

      if (pendingSubmission.current !== pending) return;
      if (res.ok && data.success) {
        setStatus(STATUS.SUCCESS);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(STATUS.ERROR);
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch {
      if (pendingSubmission.current !== pending) return;
      setStatus(STATUS.ERROR);
      setErrorMessage("Network error. Please try again.");
    } finally {
      clearTimeout(pending.timeout);
      if (pendingSubmission.current === pending) {
        pendingSubmission.current = null;
        setIsSubmitting(false);
        turnstileRef.current?.reset();
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      onFocusCapture={() => setVerificationEnabled(true)}
      className="relative w-full rounded-2xl border border-white/10 bg-[#0f0f0f] p-5 md:p-8 lg:p-5"
      initial={reduceMotion || !animateEntrance ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion || !animateEntrance ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Contact form"
      aria-busy={isSubmitting}
    >
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-xs font-semibold tracking-[0.16em] text-primary/70 uppercase"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={isSubmitting}
            maxLength={100}
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-primary placeholder:text-primary/35 outline-none transition-colors focus:border-accent/60 focus:bg-white/[0.05]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-xs font-semibold tracking-[0.16em] text-primary/70 uppercase"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={isSubmitting}
            maxLength={200}
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-primary placeholder:text-primary/35 outline-none transition-colors focus:border-accent/60 focus:bg-white/[0.05]"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label
            htmlFor="message"
            className="text-xs font-semibold tracking-[0.16em] text-primary/70 uppercase"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            disabled={isSubmitting}
            rows={5}
            maxLength={2000}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            className="resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-primary placeholder:text-primary/35 outline-none transition-colors focus:border-accent/60 focus:bg-white/[0.05]"
          />
          <p className="text-right text-[0.65rem] text-primary/40">
            {formData.message.length}/2000
          </p>
        </div>
      </div>

      {status === STATUS.SUCCESS && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400"
        >
          <CheckCircle size={18} weight="fill" />
          Message sent successfully. I&apos;ll get back to you soon.
        </motion.div>
      )}

      {status === STATUS.ERROR && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400"
        >
          <WarningCircle size={18} weight="fill" />
          {errorMessage || "Failed to send message. Please try again."}
        </motion.div>
      )}

      <div className="mt-6 flex items-center justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send message"}
          <PaperPlaneRight size={16} weight="bold" />
        </button>
      </div>

      {siteKey && verificationEnabled && (
        <Turnstile
          ref={turnstileRef}
          siteKey={siteKey}
          options={{ size: "invisible", execution: "execute" }}
          onWidgetLoad={handleWidgetLoad}
          onSuccess={sendMessage}
          onError={failVerification}
          onExpire={failVerification}
          onTimeout={failVerification}
        />
      )}
    </motion.form>
  );
}
