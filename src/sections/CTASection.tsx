import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react";
import BlurHeading from "../components/ui/blur-heading";
import { BorderBeam } from "../components/ui/border-beam";

interface CTASectionProps {
  onSubmit?: (email: string) => void;
}

export default function CTASection({ onSubmit }: CTASectionProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* ---- Intersection Observer for scroll reveal ---- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ---- Form submission ---- */
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
    },
    [email, isSubmitting, onSubmit]
  );

  return (
    <section ref={sectionRef} id="cta-section" style={styles.section}>
      {/* Section label */}
      <span
        className="section-label"
        style={{
          ...styles.reveal,
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(8px)",
        }}
      >
        Ready?
      </span>

      {/* Heading */}
      <BlurHeading
        words={[
          { text: "Your" },
          { text: "content" },
          { text: "deserves" },
          { text: "a" },
          { text: "creative", em: true },
          { text: "engine." },
        ]}
        inView={inView}
        className="section-h2"
      />

      {/* Body */}
      <p
        className="section-body"
        style={{
          ...styles.reveal,
          ...styles.body,
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(8px)",
          transitionDelay: "0.3s",
        }}
      >
        COOPR is in private beta. The creators who join now shape what it
        becomes.
      </p>

      {/* Email form / success state */}
      <div
        style={{
          ...styles.reveal,
          ...styles.formOuter,
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(12px)",
          transitionDelay: "0.45s",
        }}
      >
        {submitted ? (
          <div style={styles.successState}>
            {/* Checkmark */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="10" fill="var(--emerald)" />
              <path
                d="M6 10.5l2.5 2.5L14 7.5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={styles.successText}>
              You're on the list. We'll be in touch.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.formContainer}>
            <BorderBeam size={350} duration={8} delay={0.5} colorFrom="#0D9488" colorTo="#7C3AED" />
            <input
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
              {isSubmitting ? "Joining..." : "Request Early Access"}
              {!isSubmitting && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{ marginLeft: 4, flexShrink: 0 }}
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
        )}
      </div>

      {/* Trust line */}
      <p
        className="font-mono"
        style={{
          ...styles.reveal,
          ...styles.trustLine,
          opacity: inView ? 1 : 0,
          transitionDelay: "0.6s",
        }}
      >
        Your data stays yours &middot; No credit card required
      </p>

      {/* Waitlist counter removed — not accurate yet */}

      {/* Inject responsive styles */}
      <style>{responsiveCSS}</style>
    </section>
  );
}

/* ---------- Responsive overrides ---------- */

const responsiveCSS = `
  .cta-form-container {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .cta-form-input {
    flex: 1;
    min-width: 0;
  }

  .cta-form-button {
    flex-shrink: 0;
    white-space: nowrap;
  }

  @media (max-width: 520px) {
    .cta-form-container {
      flex-direction: column;
      gap: 8px;
    }
    .cta-form-input {
      width: 100%;
      border-radius: 9999px !important;
    }
    .cta-form-button {
      width: 100%;
      border-radius: 9999px !important;
      justify-content: center;
    }
  }
`;

/* ---------- Static styles ---------- */

const styles: Record<string, CSSProperties> = {
  section: {
    textAlign: "center",
    padding: "var(--section-padding) 24px",
    maxWidth: 1100,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  reveal: {
    transition:
      "opacity 0.7s var(--ease-premium), transform 0.7s var(--ease-premium)",
    willChange: "opacity, transform",
  },
  body: {
    textAlign: "center",
    marginTop: 16,
    marginBottom: 32,
    maxWidth: 540,
  },
  formOuter: {
    width: "100%",
    maxWidth: 480,
  },
  formContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: 4,
    borderRadius: 9999,
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: "14px 18px",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    color: "var(--text)",
    border: "none",
    outline: "none",
    background: "transparent",
    lineHeight: 1.4,
  },
  submitButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: "14px 24px",
    fontFamily: "var(--font-display)",
    fontSize: 14,
    fontWeight: 600,
    color: "#FFFFFF",
    background: "var(--accent)",
    border: "none",
    borderRadius: 9999,
    cursor: "pointer",
    flexShrink: 0,
    whiteSpace: "nowrap",
    transition:
      "background-color 0.2s var(--ease-premium), transform 0.2s var(--ease-spring), opacity 0.2s ease",
  },
  successState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "16px 24px",
    animation: "cta-fade-in 0.5s ease forwards",
  },
  successText: {
    fontFamily: "var(--font-body)",
    fontSize: 15,
    fontWeight: 500,
    color: "var(--emerald)",
  },
  trustLine: {
    fontSize: 12,
    color: "var(--text-3)",
    marginTop: 20,
    textAlign: "center",
    letterSpacing: "0.01em",
  },
  waitlistCounter: {
    fontSize: 13,
    color: "var(--text-3)",
    marginTop: 12,
    textAlign: "center",
    letterSpacing: "0.01em",
  },
};

/* Inject success animation keyframes once */
if (typeof document !== "undefined") {
  const id = "cta-success-keyframes";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes cta-fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
}
