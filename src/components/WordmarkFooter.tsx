import { useState, useEffect, useRef, type CSSProperties } from "react";

/**
 * Footer with COOPR wordmark, navigation links, tagline, and copyright.
 *
 * - Logo on left, links on right (first row)
 * - Tagline + copyright line below
 * - Dark background
 */
export default function WordmarkFooter() {
  const [inView, setInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: "Features", href: "#/features" },
    { label: "Dev Log", href: "#/devlog" },
    { label: "Get Started", href: "#/get-started" },
    { label: "Terms", href: "#/terms" },
    { label: "Privacy", href: "#/privacy" },
  ];

  return (
    <footer ref={footerRef} style={styles.footer}>
      {/* Top row: Logo left, links right */}
      <div style={styles.topRow}>
        <a href="#/" style={styles.logoLink} aria-label="COOPR home">
          <img
            src="/coopr-mark.png"
            alt=""
            aria-hidden="true"
            style={{
              height: 20,
              width: "auto",
              opacity: 0.7,
              filter: "invert(1)",
            }}
          />
          <span style={styles.logoText}>COOPR</span>
        </a>

        <nav style={styles.linksRow} aria-label="Footer navigation">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} style={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Bottom row: tagline left, copyright right */}
      <div style={styles.bottomRow}>
        <p style={styles.tagline}>Built by a creator, for creators.</p>
        <p style={styles.copyright}>2026 COOPR Labs</p>
      </div>

      {/* Wordmark watermark */}
      <div
        style={{
          ...styles.wordmark,
          opacity: inView ? 0.06 : 0,
          transform: inView ? "scale(1) translateY(0)" : "scale(0.94) translateY(8px)",
        }}
        aria-hidden="true"
      >
        COOPR
      </div>
    </footer>
  );
}

/* ---------- Static styles ---------- */

const styles: Record<string, CSSProperties> = {
  footer: {
    backgroundColor: "var(--bg-dark)",
    padding: "40px 32px 32px",
    overflow: "hidden",
    position: "relative",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px 24px",
    position: "relative",
    zIndex: 1,
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "var(--font-display)",
    fontSize: 15,
    fontWeight: 700,
    color: "rgba(255, 255, 255, 0.7)",
    letterSpacing: "-0.01em",
  },
  linksRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px 20px",
  },
  link: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.45)",
    textDecoration: "none",
    transition: "color 0.2s cubic-bezier(0.65, 0.05, 0, 1)",
    whiteSpace: "nowrap",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    margin: "24px 0 20px",
    position: "relative",
    zIndex: 1,
  },
  bottomRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "8px 16px",
    position: "relative",
    zIndex: 1,
  },
  tagline: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.35)",
    fontStyle: "italic",
    margin: 0,
  },
  copyright: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.25)",
    margin: 0,
    letterSpacing: "0.01em",
  },
  wordmark: {
    position: "absolute",
    bottom: -16,
    left: "50%",
    transform: "translateX(-50%)",
    fontFamily: "var(--font-display)",
    fontSize: "clamp(5rem, 16vw, 12rem)",
    fontWeight: 900,
    letterSpacing: "-0.06em",
    lineHeight: 1,
    color: "white",
    userSelect: "none",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    transition:
      "opacity 1.2s cubic-bezier(0.65, 0.05, 0, 1), transform 1.2s cubic-bezier(0.65, 0.05, 0, 1)",
    willChange: "opacity, transform",
  },
};
