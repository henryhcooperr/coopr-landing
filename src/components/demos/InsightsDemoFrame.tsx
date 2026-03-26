import { type CSSProperties } from "react";

interface InsightsDemoFrameProps {
  active?: boolean;
  className?: string;
}

const HERO_STATS = [
  {
    value: "14.2%",
    label: "ENGAGEMENT RATE",
    delta: "+2.1%",
    deltaPositive: true,
  },
  {
    value: "847K",
    label: "REACH",
    delta: null,
    deltaPositive: false,
  },
  {
    value: "3.1x",
    label: "SHARE RATE",
    delta: "+0.4x",
    deltaPositive: true,
  },
] as const;

const FORMAT_BARS = [
  { label: "Reels", pct: 65, color: "var(--violet)" },
  { label: "Carousel", pct: 22, color: "var(--amber)" },
  { label: "Photo", pct: 13, color: "var(--emerald)" },
] as const;

/* Simple SVG retention curve points — typical drop-off shape */
const RETENTION_POINTS = [
  [0, 5],
  [12, 8],
  [24, 14],
  [40, 22],
  [56, 30],
  [72, 38],
  [88, 46],
  [100, 52],
  [116, 56],
  [132, 59],
  [148, 61],
  [168, 63],
  [188, 64],
  [210, 65],
  [235, 66],
  [260, 67],
] as const;

function buildRetentionPath(): string {
  const points = RETENTION_POINTS.map(([x, y]) => `${x},${y}`);
  return `M ${points.join(" L ")}`;
}

function buildRetentionAreaPath(): string {
  const first = RETENTION_POINTS[0];
  const last = RETENTION_POINTS[RETENTION_POINTS.length - 1];
  const linePath = buildRetentionPath();
  return `${linePath} L ${last[0]},70 L ${first[0]},70 Z`;
}

export default function InsightsDemoFrame({
  active = false,
  className,
}: InsightsDemoFrameProps) {
  return (
    <div
      className={className}
      style={{
        border: "1px solid var(--border-raw, var(--border-landing, #E7E5E4))",
        borderRadius: 16,
        overflow: "hidden",
        background: "var(--bg-page, #F4F3F0)",
      }}
    >
      {/* Title bar */}
      <div style={styles.titleBar}>
        <div style={styles.dots}>
          <span style={{ ...styles.dot, background: "var(--border-landing, #E7E5E4)" }} />
          <span style={{ ...styles.dot, background: "var(--border-landing, #E7E5E4)" }} />
          <span style={{ ...styles.dot, background: "var(--border-landing, #E7E5E4)" }} />
        </div>
        <span style={styles.titleText}>COOPR / Insights / Overview</span>
      </div>

      {/* Dark hero zone */}
      <div
        style={{
          ...styles.heroZone,
          opacity: active ? 1 : 0,
          transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={styles.heroStats}>
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                ...styles.heroStat,
                opacity: active ? 1 : 0,
                transform: active ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.5s, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${0.15 + i * 0.1}s`,
              }}
            >
              <div style={styles.heroValueRow}>
                <span style={styles.heroValue}>{stat.value}</span>
                {stat.delta && (
                  <span
                    style={{
                      ...styles.heroDelta,
                      color: stat.deltaPositive ? "#34D399" : "#FB7185",
                    }}
                  >
                    {stat.delta}
                  </span>
                )}
              </div>
              <span style={styles.heroLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Light content zone */}
      <div style={styles.content}>
        {/* Retention curve */}
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>Retention curve</span>
          <span style={styles.sectionNote}>avg across last 30 posts</span>
        </div>
        <div
          style={{
            ...styles.chartWrap,
            opacity: active ? 1 : 0,
            transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s",
          }}
        >
          <svg
            viewBox="0 0 270 74"
            style={{ width: "100%", height: 64, display: "block" }}
            preserveAspectRatio="none"
          >
            {/* Gradient fill */}
            <defs>
              <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path
              d={buildRetentionAreaPath()}
              fill="url(#retGrad)"
            />
            <path
              d={buildRetentionPath()}
              fill="none"
              stroke="#7C3AED"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 50% marker line */}
            <line
              x1="0" y1="35" x2="270" y2="35"
              stroke="var(--border-landing, #E7E5E4)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
          </svg>
          <div style={styles.chartAxis}>
            <span style={styles.axisLabel}>0s</span>
            <span style={styles.axisLabel}>50% at 4.2s</span>
            <span style={styles.axisLabel}>30s</span>
          </div>
        </div>

        {/* Format breakdown */}
        <div style={{ ...styles.sectionHeader, marginTop: 16 }}>
          <span style={styles.sectionTitle}>Format breakdown</span>
        </div>
        <div style={styles.formatBars}>
          {FORMAT_BARS.map((bar, i) => (
            <div
              key={bar.label}
              style={{
                ...styles.formatRow,
                opacity: active ? 1 : 0,
                transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${0.45 + i * 0.08}s`,
              }}
            >
              <span style={styles.formatLabel}>{bar.label}</span>
              <div style={styles.formatTrack}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: 9999,
                    background: bar.color,
                    width: active ? `${bar.pct}%` : "0%",
                    transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: `${0.45 + i * 0.08}s`,
                  }}
                />
              </div>
              <span style={styles.formatPct}>{bar.pct}%</span>
            </div>
          ))}
        </div>

        <p style={styles.meta}>
          Last 30 days &middot; 42 posts analyzed
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

  /* --- Dark hero zone --- */
  heroZone: {
    background: "oklch(0.14 0.035 50)",
    padding: "20px 20px 18px",
  },
  heroStats: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  },
  heroStat: {
    flex: 1,
    minWidth: 0,
    textAlign: "center" as const,
  },
  heroValueRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 5,
  },
  heroValue: {
    fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
    fontSize: 24,
    fontWeight: 700,
    color: "#FAFAF9",
    lineHeight: 1.1,
  },
  heroDelta: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 10,
    fontWeight: 600,
  },
  heroLabel: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 8,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "rgba(250, 250, 249, 0.45)",
    display: "block",
    marginTop: 4,
  },

  /* --- Light content zone --- */
  content: {
    padding: "16px 20px 20px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: 11,
    fontWeight: 600,
    color: "var(--text, #1C1917)",
  },
  sectionNote: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 9,
    color: "var(--text-3)",
  },
  chartWrap: {
    marginBottom: 4,
  },
  chartAxis: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 2,
  },
  axisLabel: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 8,
    color: "var(--text-3)",
  },

  /* --- Format bars --- */
  formatBars: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  },
  formatRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  formatLabel: {
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: 10,
    color: "var(--text-2)",
    width: 60,
    flexShrink: 0,
  },
  formatTrack: {
    flex: 1,
    height: 6,
    background: "var(--border-light, #F5F4F0)",
    borderRadius: 9999,
    overflow: "hidden",
  },
  formatPct: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 10,
    color: "var(--text-3)",
    width: 28,
    textAlign: "right" as const,
    flexShrink: 0,
  },

  meta: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 10,
    color: "var(--text-3)",
    textAlign: "center" as const,
    marginTop: 16,
    marginBottom: 0,
  },
};
