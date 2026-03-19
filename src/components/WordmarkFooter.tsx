import { useState, useEffect, useRef, type CSSProperties } from "react";

/**
 * Dark background footer with giant COOPR wordmark reveal.
 *
 * - Links row: Dev Log, Privacy, Terms, Data Deletion, Contact
 * - Giant "COOPR" text with gradient mask fade and scroll-triggered scale animation
 * - Copyright line at bottom
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

  const links = [
    { label: "Dev Log", href: "#/devlog" },
    { label: "Privacy", href: "#/privacy" },
    { label: "Terms", href: "#/terms" },
    { label: "Data Deletion", href: "#/data-deletion" },
    { label: "Contact", href: "mailto:hello@getcoopr.com" },
  ];

  return (
    <footer ref={footerRef} style={styles.footer}>
      {/* Full banner logo */}
      <img
        src="/coopr-labs-banner.png"
        alt="Coopr Labs"
        style={{
          height: 'clamp(50px, 8vw, 80px)',
          width: 'auto',
          margin: '0 auto 32px',
          display: 'block',
          opacity: inView ? 0.15 : 0,
          filter: 'invert(1)',
          transform: inView ? "scale(1)" : "scale(0.9)",
          transition: 'opacity 1s cubic-bezier(0.65, 0.05, 0, 1), transform 1s cubic-bezier(0.65, 0.05, 0, 1)',
        }}
      />

      {/* Links */}
      <nav style={styles.linksRow} aria-label="Footer navigation">
        {links.map((link, i) => (
          <span key={link.label} style={styles.linkWrapper}>
            {i > 0 && (
              <span style={styles.separator} aria-hidden="true">
                &middot;
              </span>
            )}
            <a href={link.href} style={styles.link}>
              {link.label}
            </a>
          </span>
        ))}
      </nav>

      {/* Copyright */}
      <p style={styles.copyright}>
        2026 Coopr Labs. Built in California.
      </p>
    </footer>
  );
}

/* ---------- Static styles ---------- */

const styles: Record<string, CSSProperties> = {
  footer: {
    backgroundColor: "var(--bg-dark)",
    padding: "48px 24px 32px",
    textAlign: "center",
    overflow: "hidden",
    position: "relative",
  },
  linksRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "8px 0",
  },
  linkWrapper: {
    display: "inline-flex",
    alignItems: "center",
  },
  separator: {
    color: "rgba(255, 255, 255, 0.3)",
    margin: "0 12px",
    fontSize: 14,
    userSelect: "none",
  },
  link: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.5)",
    textDecoration: "none",
    transition: "color 0.2s cubic-bezier(0.65, 0.05, 0, 1)",
    whiteSpace: "nowrap",
  },
  wordmark: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(6rem, 18vw, 14rem)",
    fontWeight: 900,
    letterSpacing: "-0.06em",
    lineHeight: 1,
    color: "transparent",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    maskImage:
      "linear-gradient(to bottom, black 60%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to bottom, black 60%, transparent 100%)",
    userSelect: "none",
    pointerEvents: "none",
    marginTop: 32,
    transition:
      "opacity 1s cubic-bezier(0.65, 0.05, 0, 1), transform 1s cubic-bezier(0.65, 0.05, 0, 1)",
    willChange: "opacity, transform",
  },
  copyright: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.3)",
    marginTop: 24,
    letterSpacing: "0.01em",
  },
};
