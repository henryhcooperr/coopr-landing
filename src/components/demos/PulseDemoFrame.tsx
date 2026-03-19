import { type CSSProperties } from "react";

interface PulseDemoFrameProps {
  active?: boolean;
  className?: string;
}

const BAR_HEIGHTS = [30, 45, 38, 55, 50, 68, 60, 78, 72, 85, 80, 92];

const STATS = [
  { value: "4.8%", label: "AVG ER", color: "var(--accent)" },
  { value: "61.7%", label: "AVG HOLD", color: "var(--violet)" },
  { value: "3.1x", label: "SHARE RATE", color: "var(--amber)" },
] as const;

export default function PulseDemoFrame({
  active = false,
  className,
}: PulseDemoFrameProps) {
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
        <span style={styles.titleText}>COOPR / Pulse / Performance</span>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Sparkline chart */}
        <div style={styles.chartContainer}>
          <div style={styles.chartInner}>
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  borderRadius: "4px 4px 0 0",
                  background: "var(--accent)",
                  height: active ? `${h}%` : "0%",
                  transition: "height 0.6s cubic-bezier(0.16,1,0.3,1)",
                  transitionDelay: `${i * 0.05}s`,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Chart labels */}
        <div style={styles.chartLabels}>
          <span style={styles.chartLabelLeft}>Last 12 posts</span>
          <span style={styles.chartLabelRight}>+23.4% avg engagement</span>
        </div>

        {/* Stat cards */}
        <div style={styles.statsRow}>
          {STATS.map((stat) => (
            <div key={stat.label} style={styles.statCard}>
              <span
                style={{
                  fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: stat.color,
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Metadata */}
        <p style={styles.meta}>
          Updated 2h ago &middot; Next sync in 47m
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
  chartContainer: {
    width: "100%",
    maxWidth: 400,
    height: 120,
    margin: "0 auto",
  },
  chartInner: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 4,
    height: "100%",
    width: "100%",
  },
  chartLabels: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 400,
    margin: "8px auto 0",
  },
  chartLabelLeft: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 10,
    color: "var(--text-3)",
  },
  chartLabelRight: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 10,
    color: "#059669",
    fontWeight: 600,
  },
  statsRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    background: "var(--bg-section-alt)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: 10,
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 4,
  },
  statLabel: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 9,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    color: "var(--text-3)",
    letterSpacing: "0.04em",
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
