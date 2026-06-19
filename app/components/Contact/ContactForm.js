"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PaperPlaneRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { Turnstile } from "@marsidev/react-turnstile";

const STATUS = {
  IDLE: "idle",
  SUCCESS: "success",
  ERROR: "error",
};

export default function ContactForm() {
  const turnstileRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [token, setToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(STATUS.IDLE);
    setErrorMessage("");

    turnstileRef.current?.execute();
  };

  useEffect(() => {
    if (!token || !isSubmitting) return;

    const sendMessage = async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            turnstileToken: token,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus(STATUS.SUCCESS);
          setFormData({ name: "", email: "", message: "" });
        } else {
          setStatus(STATUS.ERROR);
          setErrorMessage(data.error || "Something went wrong.");
        }
      } catch {
        setStatus(STATUS.ERROR);
        setErrorMessage("Network error. Please try again.");
      } finally {
        setIsSubmitting(false);
        setToken(null);
        turnstileRef.current?.reset();
      }
    };

    sendMessage();
  }, [token, isSubmitting, formData]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative w-full rounded-2xl border border-white/10 bg-[#0f0f0f] p-5 md:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Contact form"
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

      {siteKey && (
        <Turnstile
          ref={turnstileRef}
          siteKey={siteKey}
          options={{ size: "invisible", execution: "execute" }}
          onSuccess={(tk) => setToken(tk)}
          onError={() => {
            setIsSubmitting(false);
            setStatus(STATUS.ERROR);
            setErrorMessage("Security check failed. Please try again.");
            turnstileRef.current?.reset();
          }}
        />
      )}
    </motion.form>
  );
}
