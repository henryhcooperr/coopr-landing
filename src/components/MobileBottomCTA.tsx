import { useState, useEffect, type CSSProperties } from "react";

/**
 * Mobile-only sticky bottom CTA bar.
 *
 * - Hidden by default and on desktop (display none above 768px via CSS class)
 * - Slides up from bottom when user scrolls past 80% of viewport height
 * - Includes safe-area padding for iPhone notch
 */
export default function MobileBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () =>
      setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="mobile-bottom-cta"
      style={{
        ...styles.container,
        transform: visible ? "translateY(0)" : "translateY(100%)",
      }}
      aria-hidden={!visible}
    >
      <a href="#/get-started" style={styles.button}>
        Request Early Access
        <span style={styles.arrow} aria-hidden="true">
          &rarr;
        </span>
      </a>
    </div>
  );
}

/* ---------- Static styles ---------- */

const styles: Record<string, CSSProperties> = {
  container: {
    /* Position and layout are handled by .mobile-bottom-cta in landing.css.
       These inline styles supplement with the slide transition. */
    transition: "transform 0.3s cubic-bezier(0.65, 0.05, 0, 1)",
    willChange: "transform",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    width: "100%",
    padding: "14px 0",
    backgroundColor: "var(--accent)",
    color: "#FFFFFF",
    fontFamily: "var(--font-display)",
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 9999,
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition:
      "background-color 0.2s cubic-bezier(0.65, 0.05, 0, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  arrow: {
    fontSize: 15,
    lineHeight: 1,
  },
};
