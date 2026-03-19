import { useState, useEffect, type CSSProperties } from "react";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { BrowserWindow } from "../components/ui/browser-window";
import ChatDemoFrame from "../components/demos/ChatDemoFrame";

interface HeroSectionProps {
  onCTAClick?: () => void;
}

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  const [showSubheadline, setShowSubheadline] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [showTrust, setShowTrust] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowSubheadline(true), 1200),
      setTimeout(() => setShowCTA(true), 1500),
      setTimeout(() => setShowTrust(true), 1700),
      setTimeout(() => setShowBrowser(true), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section style={styles.wrapper}>
      {/* Animated mesh gradient background */}
      <div style={styles.meshBg} aria-hidden="true" />

      {/* Top spacer for nav clearance */}
      <div style={{ height: 64, flexShrink: 0 }} />

      {/* Headline */}
      <TextGenerateEffect
        words="Know what to create."
        className="hero-h1"
        duration={0.5}
      />

      {/* Subheadline */}
      <p
        className="hero-subtitle"
        style={{
          ...styles.fadeElement,
          opacity: showSubheadline ? 1 : 0,
          transform: showSubheadline ? "translateY(0)" : "translateY(12px)",
          marginTop: 24,
          maxWidth: 640,
        }}
      >
        COOPR learns your creative voice, maps your niche, and tells you what
        will work&nbsp;&mdash; before you film.
      </p>

      {/* CTA Button */}
      <div
        style={{
          ...styles.fadeElement,
          opacity: showCTA ? 1 : 0,
          transform: showCTA ? "scale(1)" : "scale(0.95)",
          marginTop: 32,
        }}
      >
        <button
          className="btn-primary"
          style={styles.ctaButton}
          onClick={onCTAClick}
          type="button"
        >
          Request Early Access
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ marginLeft: 2 }}
          >
            <path
              d="M3.333 8h9.334M8.667 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Trust Line */}
      <p
        className="font-mono"
        style={{
          ...styles.fadeElement,
          ...styles.trustLine,
          opacity: showTrust ? 1 : 0,
        }}
      >
        Your data stays yours &middot; Built by a creator, for creators
      </p>

      {/* Spacer */}
      <div style={{ height: 48, flexShrink: 0 }} />

      {/* Browser Frame with Chat Demo */}
      <div
        style={{
          ...styles.browserContainer,
          opacity: showBrowser ? 1 : 0,
          transform: showBrowser ? "translateY(0)" : "translateY(40px)",
          transition:
            "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <BrowserWindow url="app.getcoopr.com/chat" className="hero-browser">
          <div style={styles.browserContent}>
            <ChatDemoFrame />
          </div>
        </BrowserWindow>
      </div>

      {/* Bottom breathing room */}
      <div style={{ height: 80, flexShrink: 0 }} />
    </section>
  );
}

/* ---------- Keyframes injected once ---------- */

const meshKeyframes = `
@keyframes hero-mesh-drift {
  0%, 100% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 30% 20%;
  }
  50% {
    background-position: 70% 80%;
  }
  75% {
    background-position: 40% 60%;
  }
}
`;

if (typeof document !== "undefined") {
  const id = "hero-mesh-keyframes";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = meshKeyframes;
    document.head.appendChild(style);
  }
}

/* ---------- Static styles ---------- */

const styles: Record<string, CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  meshBg: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    background: `
      radial-gradient(ellipse at 30% 20%, rgba(13, 148, 136, 0.06) 0%, transparent 60%),
      radial-gradient(ellipse at 70% 80%, rgba(245, 158, 11, 0.04) 0%, transparent 60%),
      radial-gradient(ellipse at 50% 50%, rgba(124, 62, 237, 0.02) 0%, transparent 70%)
    `,
    backgroundSize: "200% 200%",
    animation: "hero-mesh-drift 20s ease-in-out infinite",
  },
  fadeElement: {
    transition:
      "opacity 0.6s cubic-bezier(0.65, 0.05, 0, 1), transform 0.6s cubic-bezier(0.65, 0.05, 0, 1)",
    willChange: "opacity, transform",
    position: "relative" as const,
    zIndex: 1,
  },
  ctaButton: {
    padding: "14px 28px",
    fontSize: 15,
  },
  trustLine: {
    fontSize: 12,
    color: "var(--text-3)",
    marginTop: 16,
    letterSpacing: "0.01em",
  },
  browserContainer: {
    width: "100%",
    maxWidth: 1000,
    padding: "0 24px",
    position: "relative",
    zIndex: 1,
  },
  browserContent: {
    height: 560,
    overflow: "hidden",
  },
};
