import { type CSSProperties } from "react";

interface StudioDemoFrameProps {
  active?: boolean;
  className?: string;
}

const COLUMNS = [
  {
    stage: "Spark",
    color: "var(--violet)",
    colorDim: "var(--violet-dim)",
    cards: [
      { title: "Behind the scenes at sunrise", highlight: false },
    ],
  },
  {
    stage: "Developing",
    color: "var(--blue)",
    colorDim: "var(--blue-dim)",
    cards: [
      { title: "Editing workflow breakdown", highlight: false },
    ],
  },
  {
    stage: "Filming",
    color: "var(--amber)",
    colorDim: "var(--amber-dim)",
    cards: [
      { title: "Underwater cave exploration", highlight: true, badge: "8.4" },
      { title: "Golden hour timelapse", highlight: false },
    ],
  },
  {
    stage: "Editing",
    color: "var(--rose)",
    colorDim: "var(--rose-dim)",
    cards: [
      { title: "Best of March compilation", highlight: false },
    ],
  },
  {
    stage: "Published",
    color: "var(--emerald)",
    colorDim: "var(--emerald-dim)",
    cards: [
      { title: "How I plan my content", highlight: false, metric: "12.4K" },
    ],
  },
] as const;

export default function StudioDemoFrame({
  active = false,
  className,
}: StudioDemoFrameProps) {
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
        <span style={styles.titleText}>COOPR / Studio / Board</span>
      </div>

      {/* Kanban board */}
      <div style={styles.content}>
        <div style={styles.board}>
          {COLUMNS.map((col, colIdx) => (
            <div
              key={col.stage}
              style={{
                ...styles.column,
                opacity: active ? 1 : 0,
                transform: active ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${colIdx * 0.07}s`,
              }}
            >
              {/* Column header */}
              <div style={styles.columnHeader}>
                <span
                  style={{
                    ...styles.stageDot,
                    background: col.color,
                  }}
                />
                <span style={styles.stageName}>{col.stage}</span>
                <span style={styles.cardCount}>{col.cards.length}</span>
              </div>

              {/* Cards */}
              {col.cards.map((card, cardIdx) => (
                <div
                  key={cardIdx}
                  style={{
                    ...styles.card,
                    ...(card.highlight
                      ? {
                          boxShadow: `0 0 0 1.5px ${col.color}, var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.06))`,
                          background: "#FFFFFF",
                        }
                      : {}),
                  }}
                >
                  <span style={styles.cardTitle}>{card.title}</span>
                  <div style={styles.cardFooter}>
                    {/* Score badge */}
                    {"badge" in card && card.badge && (
                      <span
                        style={{
                          ...styles.badge,
                          background: col.colorDim,
                          color: col.color,
                        }}
                      >
                        {card.badge}
                      </span>
                    )}
                    {/* Metric */}
                    {"metric" in card && card.metric && (
                      <span style={styles.metric}>
                        {card.metric} views
                      </span>
                    )}
                    {/* Moving indicator for highlighted card */}
                    {card.highlight && (
                      <span style={styles.activeIndicator}>
                        <span style={styles.activePulse} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p style={styles.meta}>
          6 active projects &middot; 2 due this week
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
    padding: "16px 16px 20px",
  },
  board: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
  },
  column: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  },
  columnHeader: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 8px",
    marginBottom: 2,
  },
  stageDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    flexShrink: 0,
  },
  stageName: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 9,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    color: "var(--text-2)",
  },
  cardCount: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 9,
    color: "var(--text-3)",
    marginLeft: "auto",
  },
  card: {
    background: "var(--bg-card, #FFFFFF)",
    border: "1px solid var(--border-landing, #E7E5E4)",
    borderRadius: 8,
    padding: "8px 10px",
    boxShadow: "var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.06))",
  },
  cardTitle: {
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: 10,
    lineHeight: 1.4,
    color: "var(--text, #1C1917)",
    display: "block",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  badge: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 9,
    fontWeight: 700,
    padding: "2px 6px",
    borderRadius: 6,
    lineHeight: 1.3,
  },
  metric: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 9,
    color: "var(--text-3)",
  },
  activeIndicator: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 8,
    height: 8,
  },
  activePulse: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--amber, #F59E0B)",
    display: "block",
    animation: "pulse 2s ease-in-out infinite",
  },
  meta: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 10,
    color: "var(--text-3)",
    textAlign: "center" as const,
    marginTop: 14,
    marginBottom: 0,
  },
};
