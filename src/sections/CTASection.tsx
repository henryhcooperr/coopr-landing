import { useState, useCallback, type CSSProperties } from "react";
import { motion } from "motion/react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BlurFade } from "@/components/ui/blur-fade";

interface CTASectionProps {
  onSubmit?: (email: string) => void;
}

export default function CTASection({ onSubmit }: CTASectionProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email || isSubmitting) return;
      setIsSubmitting(true);

      await new Promise((r) => setTimeout(r, 800));

      setSubmitted(true);
      setIsSubmitting(false);
      onSubmit?.(email);
    },
    [email, isSubmitting, onSubmit]
  );

  return (
    <motion.section
      id="cta-section"
      style={styles.section}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Radial glow */}
      <div style={styles.glow} aria-hidden="true" />

      <BlurFade delay={0.1} inView>
        <h2 style={styles.heading}>Ready to stop guessing?</h2>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <p style={styles.subheading}>
          Join the beta and let COOPR learn what makes your content work.
        </p>
      </BlurFade>

      <BlurFade delay={0.35} inView>
        <div style={styles.formOuter}>
          {submitted ? (
            <div style={styles.successState}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="10" cy="10" r="10" fill="var(--emerald, #059669)" />
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
            <form onSubmit={handleSubmit} style={styles.form} className="cta-form">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                aria-label="Email address"
                className="cta-input"
              />
              <ShimmerButton
                type="submit"
                disabled={isSubmitting}
                shimmerColor="rgba(255,255,255,0.3)"
                background="var(--brand, #0D9488)"
                className="cta-button"
                style={styles.shimmerOverride}
              >
                <span style={styles.buttonLabel}>
                  {isSubmitting ? "Joining..." : "Request Early Access"}
                </span>
              </ShimmerButton>
            </form>
          )}
        </div>
      </BlurFade>

      <BlurFade delay={0.45} inView>
        <p style={styles.microCopy}>No credit card required. Invite-only beta.</p>
      </BlurFade>

      <BlurFade delay={0.55} inView>
        <a href="#/devlog" style={styles.secondaryCta}>
          Or explore the dev log &rarr;
        </a>
      </BlurFade>

      <style>{responsiveCSS}</style>
    </motion.section>
  );
}

/* ---------- Responsive overrides ---------- */

const responsiveCSS = `
  .cta-form {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .cta-input {
    flex: 1;
    min-width: 0;
  }

  .cta-button {
    flex-shrink: 0;
    white-space: nowrap;
  }

  @media (max-width: 520px) {
    .cta-form {
      flex-direction: column;
      gap: 10px;
    }
    .cta-input {
      width: 100% !important;
      border-radius: 9999px !important;
    }
    .cta-button {
      width: 100% !important;
    }
  }
`;

/* ---------- Static styles ---------- */

const styles: Record<string, CSSProperties> = {
  section: {
    position: "relative",
    textAlign: "center",
    padding: "var(--section-padding, 120px) 24px",
    maxWidth: 1100,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "radial-gradient(ellipse 70% 50% at 50% 100%, color-mix(in srgb, var(--brand, #0D9488) 8%, transparent), transparent), linear-gradient(to bottom, var(--bg-page, #FAFAF9), color-mix(in srgb, var(--bg-page, #FAFAF9) 92%, #f0ede8))",
    borderRadius: 24,
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 60% 40% at 50% 80%, color-mix(in srgb, var(--brand, #0D9488) 10%, transparent), transparent)",
    pointerEvents: "none",
  },
  heading: {
    fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 700,
    lineHeight: 1.1,
    color: "var(--text, #1a1a18)",
    marginBottom: 16,
    letterSpacing: "-0.02em",
  },
  subheading: {
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: "clamp(1rem, 2vw, 1.125rem)",
    color: "var(--text-2, #6b6b5f)",
    maxWidth: 480,
    marginBottom: 40,
    lineHeight: 1.6,
  },
  formOuter: {
    width: "100%",
    maxWidth: 520,
    marginBottom: 16,
    boxShadow: "var(--shadow-lg, 0 8px 32px rgba(0,0,0,0.08))",
    borderRadius: 9999,
    background: "var(--bg-card, #ffffff)",
    border: "1px solid var(--border, rgba(0,0,0,0.08))",
    overflow: "hidden",
    padding: 4,
  },
  form: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: "14px 18px",
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: 14,
    color: "var(--text, #1a1a18)",
    border: "none",
    outline: "none",
    background: "transparent",
    lineHeight: 1.4,
  },
  shimmerOverride: {
    borderRadius: 9999,
    padding: "12px 22px",
    fontSize: 14,
    fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
    fontWeight: 600,
  },
  buttonLabel: {
    fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
    fontWeight: 600,
    fontSize: 14,
    color: "#ffffff",
    letterSpacing: "0.01em",
  },
  successState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "18px 24px",
  },
  successText: {
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: 15,
    fontWeight: 500,
    color: "var(--emerald, #059669)",
  },
  microCopy: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 12,
    color: "var(--text-3, #9b9b8e)",
    marginTop: 8,
    letterSpacing: "0.01em",
  },
  secondaryCta: {
    display: "inline-block",
    marginTop: 20,
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: 14,
    fontWeight: 500,
    color: "var(--brand, #0D9488)",
    textDecoration: "none",
    letterSpacing: "0.01em",
    transition: "opacity 0.2s ease",
  },
};
