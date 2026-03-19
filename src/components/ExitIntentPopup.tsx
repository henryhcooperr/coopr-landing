import { useState, useEffect, useCallback, useRef, type CSSProperties } from "react";

interface ExitIntentPopupProps {
  onSubmit?: (email: string) => void;
}

export default function ExitIntentPopup({ onSubmit }: ExitIntentPopupProps) {
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ---- Exit intent detection (desktop only) ---- */
  useEffect(() => {
    if (dismissed || shown) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setShown(true);
      }
    };

    // Only activate after 5 seconds on page (don't annoy immediate visitors)
    const timer = setTimeout(() => {
      document.addEventListener("mousemove", handler);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", handler);
    };
  }, [dismissed, shown]);

  /* ---- Animate in after shown ---- */
  useEffect(() => {
    if (!shown) return;
    // Small delay to let the DOM render the overlay first, then trigger transition
    const raf = requestAnimationFrame(() => {
      setAnimateIn(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [shown]);

  /* ---- Focus input when modal opens ---- */
  useEffect(() => {
    if (shown && animateIn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shown, animateIn]);

  const handleDismiss = useCallback(() => {
    setAnimateIn(false);
    // Wait for exit animation before unmounting
    setTimeout(() => {
      setDismissed(true);
      setShown(false);
    }, 300);
  }, []);

  /* ---- Escape key dismisses ---- */
  useEffect(() => {
    if (!shown || dismissed) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [shown, dismissed, handleDismiss]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || isSubmitting) return;
      setIsSubmitting(true);

      // In production, this calls submitWaitlistEmail from supabase lib.
      // For prototype, simulate network latency:
      await new Promise((r) => setTimeout(r, 800));

      setSubmitted(true);
      setIsSubmitting(false);
      onSubmit?.(email);

      // Auto-dismiss after success
      setTimeout(() => handleDismiss(), 2000);
    },
    [email, isSubmitting, onSubmit, handleDismiss]
  );

  /* ---- Don't render if dismissed or never triggered ---- */
  if (!shown || dismissed) return null;

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: animateIn ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      onClick={(e) => {
        // Close on overlay background click
        if (e.target === e.currentTarget) handleDismiss();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Exit intent email capture"
    >
      <div
        style={{
          ...styles.modal,
          opacity: animateIn ? 1 : 0,
          transform: animateIn
            ? "scale(1) translateY(0)"
            : "scale(0.95) translateY(20px)",
          transition:
            "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleDismiss}
          style={styles.closeButton}
          aria-label="Close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4.5 4.5l9 9M13.5 4.5l-9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {submitted ? (
          /* ---- Success state ---- */
          <div style={styles.successContainer}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="16" fill="var(--emerald)" />
              <path
                d="M10 16.5l4 4L22 12"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p style={styles.successHeading}>You're in.</p>
            <p style={styles.successBody}>
              Check your inbox for your free niche analysis.
            </p>
          </div>
        ) : (
          /* ---- Form state ---- */
          <>
            <h2 style={styles.heading}>Before you go &mdash;</h2>

            <p style={styles.body}>
              Drop your email. We'll send you a free mini-analysis of your
              niche.
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                ref={inputRef}
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...styles.submitButton,
                  opacity: isSubmitting ? 0.75 : 1,
                }}
              >
                {isSubmitting ? "Sending..." : "Send it"}
                {!isSubmitting && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    style={{ marginLeft: 4 }}
                  >
                    <path
                      d="M3.333 8h9.334M8.667 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </form>

            <p className="font-mono" style={styles.trust}>
              No spam. Just one insight.
            </p>
          </>
        )}
      </div>

      {/* Inject success animation keyframes */}
      <style>{`
        @keyframes exit-popup-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ---------- Static styles ---------- */

const styles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.50)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    padding: 24,
  },
  modal: {
    position: "relative",
    width: "100%",
    maxWidth: 440,
    background: "var(--bg-card)",
    borderRadius: 16,
    padding: 32,
    boxShadow:
      "0 24px 48px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08)",
    border: "1px solid var(--border-light)",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    color: "var(--text-3)",
    transition: "color 0.2s ease, background 0.2s ease",
  },
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: 24,
    fontWeight: 700,
    color: "var(--text)",
    margin: 0,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  body: {
    fontFamily: "var(--font-body)",
    fontSize: 15,
    lineHeight: 1.6,
    color: "var(--text-2)",
    margin: "12px 0 24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    width: "100%",
    padding: "14px 18px",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    color: "var(--text)",
    background: "var(--bg-page)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    outline: "none",
    lineHeight: 1.4,
    transition: "border-color 0.2s ease",
  },
  submitButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: "100%",
    padding: "14px 24px",
    fontFamily: "var(--font-display)",
    fontSize: 15,
    fontWeight: 600,
    color: "#FFFFFF",
    background: "var(--accent)",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    transition:
      "background-color 0.2s var(--ease-premium), transform 0.2s var(--ease-spring), opacity 0.2s ease",
  },
  trust: {
    fontSize: 11,
    color: "var(--text-3)",
    marginTop: 12,
    textAlign: "center",
    letterSpacing: "0.01em",
  },
  successContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: "16px 0",
    animation: "exit-popup-fade-in 0.5s ease forwards",
  },
  successHeading: {
    fontFamily: "var(--font-display)",
    fontSize: 20,
    fontWeight: 700,
    color: "var(--text)",
    margin: 0,
  },
  successBody: {
    fontFamily: "var(--font-body)",
    fontSize: 14,
    color: "var(--text-2)",
    margin: 0,
    textAlign: "center",
  },
};
