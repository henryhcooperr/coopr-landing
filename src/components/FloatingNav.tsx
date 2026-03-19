import { useState, useEffect, type CSSProperties } from "react";

/**
 * Glassmorphic pill navigation fixed at top center of viewport.
 *
 * - Transparent at top of page (scrollY < 40)
 * - Frosted glass with border + shadow after scroll
 * - Mobile: hides nav links, shows logo only
 */
export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        ...styles.container,
        background: scrolled ? "rgba(250, 249, 249, 0.8)" : "transparent",
        borderColor: scrolled ? "var(--border)" : "transparent",
        boxShadow: scrolled
          ? "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)"
          : "none",
      }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <a href="#/" style={styles.logo} aria-label="COOPR home">
        <img src="/coopr-mark.png" alt="" style={{ height: 24, width: 'auto' }} aria-hidden="true" />
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
        <a href="#/get-started" style={styles.ctaLink}>
          Request Early Access
        </a>
      </div>
    </nav>
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
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    width: "100%",
    maxWidth: 720,
    transition:
      "background 0.3s cubic-bezier(0.65, 0.05, 0, 1), border-color 0.3s cubic-bezier(0.65, 0.05, 0, 1), box-shadow 0.3s cubic-bezier(0.65, 0.05, 0, 1)",
  },
  logo: {
    fontFamily: "var(--font-display)",
    fontSize: 16,
    fontWeight: 700,
    color: "var(--text)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
  logoDot: {
    display: "inline-block",
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "var(--accent)",
    flexShrink: 0,
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 24,
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
    transition:
      "background-color 0.2s cubic-bezier(0.65, 0.05, 0, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  },
};
