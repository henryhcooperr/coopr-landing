import { type CSSProperties } from "react";

interface VoiceDemoFrameProps {
  active?: boolean;
  className?: string;
}

const DIMENSIONS = [
  { label: "Warmth", value: 0.88, color: "var(--teal)" },
  { label: "Humor", value: 0.72, color: "var(--violet)" },
  { label: "Authority", value: 0.65, color: "var(--amber)" },
  { label: "Storytelling", value: 0.81, color: "var(--emerald)" },
  { label: "Energy", value: 0.56, color: "var(--blue)" },
  { label: "Vulnerability", value: 0.74, color: "var(--rose)" },
  { label: "Directness", value: 0.83, color: "var(--teal)" },
  { label: "Curiosity", value: 0.91, color: "var(--violet)" },
] as const;

export default function VoiceDemoFrame({
  active = false,
  className,
}: VoiceDemoFrameProps) {
  return (
    <div
      className={className}
      style={{
        border: "1px solid var(--border-raw)",
        borderRadius: 16,
        overflow: "hidden",
        background: "var(--bg-white, #fff)",
      }}
    >
      {/* Title bar */}
      <div style={styles.titleBar}>
        <div style={styles.dots}>
          <span style={{ ...styles.dot, background: "#FF5F57" }} />
          <span style={{ ...styles.dot, background: "#FFBD2E" }} />
          <span style={{ ...styles.dot, background: "#27C93F" }} />
        </div>
        <span style={styles.titleText}>COOPR / DNA / Voice Profile</span>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {DIMENSIONS.map((dim, index) => (
          <div key={dim.label} style={styles.row}>
            <span style={styles.label}>{dim.label}</span>
            <div style={styles.track}>
              <div
                style={{
                  height: "100%",
                  borderRadius: 9999,
                  background: dim.color,
                  width: active ? `${dim.value * 100}%` : "0%",
                  transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
                  transitionDelay: `${index * 0.08}s`,
                }}
              />
            </div>
            <span style={styles.value}>{dim.value.toFixed(2)}</span>
          </div>
        ))}

        <p style={styles.meta}>
          Calibrated from 48 scripts and captions &middot; Confidence: 94%
        </p>
      </div>
    </div>
  );
}

/* ---------- static styles ---------- */

const styles: Record<string, CSSProperties> = {
  titleBar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    background: "#F5F4F0",
    borderBottom: "1px solid var(--border-light)",
  },
  dots: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "block",
  },
  titleText: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 11,
    color: "var(--text-3)",
    letterSpacing: "0.02em",
  },
  content: {
    padding: "24px 28px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  label: {
    fontFamily: "var(--font-body, 'Space Grotesk', sans-serif)",
    fontSize: 12,
    color: "var(--text-2)",
    width: 90,
    flexShrink: 0,
  },
  track: {
    flex: 1,
    height: 6,
    background: "var(--border-light)",
    borderRadius: 9999,
    overflow: "hidden",
  },
  value: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 11,
    color: "var(--text-3)",
    width: 32,
    textAlign: "right" as const,
    flexShrink: 0,
  },
  meta: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 10,
    color: "var(--text-3)",
    textAlign: "center" as const,
    marginTop: 18,
    marginBottom: 0,
  },
};
