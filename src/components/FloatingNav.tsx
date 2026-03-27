import { useState, useEffect, type CSSProperties } from "react";
import { motion } from "motion/react";

/**
 * Scroll-aware pill navigation fixed at top center of viewport.
 *
 * - Transparent at top of page (scrollY < 100)
 * - Frosted glass with border + shadow after scroll
 * - Mobile: hides nav links, shows logo + CTA only
 */
export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    // Set initial state
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      style={{
        ...styles.container,
        background: scrolled ? "rgba(250, 249, 249, 0.82)" : "transparent",
        borderColor: scrolled ? "var(--border)" : "transparent",
        boxShadow: scrolled
          ? "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)"
          : "none",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      }}
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <a href="#/" style={styles.logo} aria-label="COOPR home">
        <img src="/coopr-mark.png" alt="" style={{ height: 22, width: "auto" }} aria-hidden="true" />
        <span>COOPR</span>
      </a>

      {/* Nav Links — hidden on mobile via className */}
      <div className="nav-links" style={styles.navLinks}>
        <a href="#/devlog" style={styles.navLink}>
          Dev Log
        </a>
        <a href="#/features" style={styles.navLink}>
          Features
        </a>
        <a href="https://app.getcoopr.com" style={styles.navLink}>
          Log in
        </a>
      </div>

      {/* CTA — always visible */}
      <a href="#/get-started" style={styles.ctaLink}>
        Request Early Access
      </a>
    </motion.nav>
  );
}

/* ---------- Static styles ---------- */

const styles: Record<string, CSSProperties> = {
  container: {
    position: "fixed",
    top: 16,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderRadius: 9999,
    border: "1px solid transparent",
    width: "calc(100% - 32px)",
    maxWidth: 720,
    transition:
      "background 0.35s cubic-bezier(0.65, 0.05, 0, 1), border-color 0.35s cubic-bezier(0.65, 0.05, 0, 1), box-shadow 0.35s cubic-bezier(0.65, 0.05, 0, 1), backdrop-filter 0.35s cubic-bezier(0.65, 0.05, 0, 1)",
  },
  logo: {
    fontFamily: "var(--font-hero, 'Advercase', sans-serif)",
    fontSize: 15,
    fontWeight: 700,
    color: "var(--text)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
    letterSpacing: "0.04em",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    flex: 1,
    justifyContent: "center",
  },
  navLink: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontWeight: 500,
    color: "var(--text-2)",
    textDecoration: "none",
    transition: "color 0.2s cubic-bezier(0.65, 0.05, 0, 1)",
    whiteSpace: "nowrap",
  },
  ctaLink: {
    fontFamily: "var(--font-display)",
    fontSize: 13,
    fontWeight: 600,
    color: "#FFFFFF",
    backgroundColor: "var(--accent)",
    padding: "8px 16px",
    borderRadius: 9999,
    textDecoration: "none",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transition:
      "background-color 0.2s cubic-bezier(0.65, 0.05, 0, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  },
};
