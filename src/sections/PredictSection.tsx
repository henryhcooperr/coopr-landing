import { useState, useEffect, useRef, type CSSProperties } from "react";
import BlurHeading from "../components/ui/blur-heading";

/* ==========================================================================
   PredictSection — "Before You Hit Record"
   Bento grid: Idea Scoring, Hook Lab, Niche Trends, Competitors
   ========================================================================== */

/* ---------- Static Data ---------- */

const SIGNALS = [
  { label: "Trend signal", value: 0.17, pct: 80, color: "var(--accent)" },
  { label: "Audience demand", value: 0.14, pct: 70, color: "var(--violet)" },
  { label: "Content gap", value: 0.2, pct: 90, color: "var(--emerald)" },
  { label: "Your strength", value: 0.13, pct: 60, color: "var(--amber)" },
  { label: "Seasonal fit", value: 0.09, pct: 50, color: "var(--blue)" },
  { label: "Competition", value: 0.15, pct: 70, color: "var(--rose)" },
] as const;

const HOOKS = [
  {
    text: "The one thing I changed that doubled my watch time",
    strategy: "Curiosity gap + result",
    rate: 83.7,
  },
  {
    text: "I tested the most popular format in my niche for 30 days",
    strategy: "Story hook + experiment",
    rate: 78.9,
  },
  {
    text: "Nobody talks about this editing trick",
    strategy: "Exclusivity + insider",
    rate: 74.2,
  },
  {
    text: "What my worst-performing post taught me about my audience",
    strategy: "Vulnerability + insight",
    rate: 71.3,
  },
  {
    text: "POV: you find the shot you've been planning for months",
    strategy: "POV + payoff",
    rate: 67.8,
  },
] as const;

const COMPETITORS = [
  {
    name: "CreativeStudio",
    handle: "@creativestudio",
    er: "4.8%",
    growth: "+12%/mo",
    gradient: "linear-gradient(135deg, var(--accent), #06b6d4)",
    initials: "CS",
  },
  {
    name: "MakerPulse",
    handle: "@makerpulse",
    er: "3.2%",
    growth: "+8%/mo",
    gradient: "linear-gradient(135deg, var(--violet), #a78bfa)",
    initials: "MP",
  },
  {
    name: "ContentFlow",
    handle: "@contentflow",
    er: "7.1%",
    growth: "+31%/mo",
    gradient: "linear-gradient(135deg, var(--amber), #fbbf24)",
    initials: "CF",
  },
] as const;

const TREND_BARS = [22, 28, 32, 38, 45, 52, 64, 78];

/* ---------- Gauge SVG Helpers ---------- */

const GAUGE_RADIUS = 52;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;
const GAUGE_MAX_SCORE = 10;
const GAUGE_SCORE = 8.8;

/* ---------- useInView Hook ---------- */

function useInView(threshold = 0.2): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ---------- Animated Counter Hook ---------- */

function useCountUp(target: number, active: boolean, duration = 1200, decimals = 1): string {
  const [display, setDisplay] = useState(
    decimals === 0 ? "0" : `0.${"0".repeat(decimals)}`
  );
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    // Cancel any in-flight animation before starting fresh (StrictMode safe)
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target.toFixed(decimals));
        rafRef.current = null;
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [active, target, duration, decimals]);

  return display;
}

/* ---------- AppFrame ---------- */

function AppFrame({
  title,
  children,
  style: outerStyle,
}: {
  title: string;
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...s.appFrame, ...outerStyle }}>
      <div style={s.appFrameBar}>
        <span style={{ ...s.appFrameDot, background: "var(--border-landing, #E7E5E4)" }} />
        <span style={{ ...s.appFrameDot, background: "var(--border-landing, #E7E5E4)" }} />
        <span style={{ ...s.appFrameDot, background: "var(--border-landing, #E7E5E4)" }} />
        <span style={s.appFrameTitle}>{title}</span>
      </div>
      <div style={s.appFrameContent}>{children}</div>
    </div>
  );
}

/* ==========================================================================
   Card Components
   ========================================================================== */

/* ---------- Card 1: Idea Scoring ---------- */

function IdeaScoringCard({ active }: { active: boolean }) {
  const scoreDisplay = useCountUp(GAUGE_SCORE, active);
  const fillOffset = active
    ? GAUGE_CIRCUMFERENCE - (GAUGE_SCORE / GAUGE_MAX_SCORE) * GAUGE_CIRCUMFERENCE
    : GAUGE_CIRCUMFERENCE;

  return (
    <AppFrame title="COOPR / Idea Scoring">
      <div style={s.cardInner}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <span className="badge badge-teal" style={{ marginBottom: 8, display: "inline-block" }}>
            Idea Scoring
          </span>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 700,
              color: "var(--text)",
              lineHeight: 1.3,
            }}
          >
            6 signals. One score.
          </div>
        </div>

        {/* Gauge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div style={{ position: "relative", width: 130, height: 130 }}>
            <svg width={130} height={130} viewBox="0 0 130 130" style={{ display: "block" }}>
              {/* Background circle */}
              <circle
                cx={65}
                cy={65}
                r={GAUGE_RADIUS}
                fill="none"
                stroke="var(--border)"
                strokeWidth={8}
              />
              {/* Fill circle */}
              <circle
                cx={65}
                cy={65}
                r={GAUGE_RADIUS}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray={GAUGE_CIRCUMFERENCE}
                strokeDashoffset={fillOffset}
                style={{
                  transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: "rotate(-90deg)",
                  transformOrigin: "65px 65px",
                }}
              />
            </svg>
            {/* Center number */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: 36,
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              {scoreDisplay}
            </div>
          </div>
        </div>

        {/* Concept */}
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text)",
              fontStyle: "italic",
              marginBottom: 4,
            }}
          >
            "Behind-the-process reveal format"
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--text-2)",
              lineHeight: 1.5,
            }}
          >
            Strong trend signal, low competition. Your content style is a natural fit.
          </div>
        </div>

        {/* Signal Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SIGNALS.map((sig, i) => (
            <div key={sig.label} style={s.signalRow}>
              <span style={s.signalLabel}>{sig.label}</span>
              <div style={s.signalBarTrack}>
                <div
                  style={{
                    height: "100%",
                    width: active ? `${sig.pct}%` : "0%",
                    background: sig.color,
                    borderRadius: 3,
                    transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.08}s`,
                  }}
                />
              </div>
              <span style={s.signalValue}>+{sig.value.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Meta */}
        <p style={s.metaText}>Analyzing 1,247 posts across 38 competitors</p>
      </div>
    </AppFrame>
  );
}

/* ---------- Card 2: Hook Lab ---------- */

function HookLabCard({ active }: { active: boolean }) {
  return (
    <AppFrame title="COOPR / Hook Lab">
      <div style={s.cardInner}>
        {/* Header */}
        <div style={{ marginBottom: 14 }}>
          <span className="badge badge-violet" style={{ marginBottom: 8, display: "inline-block" }}>
            Hook Lab
          </span>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 700,
              color: "var(--text)",
              lineHeight: 1.3,
            }}
          >
            5 hooks. Ranked by hold rate.
          </div>
        </div>

        {/* Hook List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {HOOKS.map((hook, i) => {
            const isHighlighted = i === 0;
            const isEmerald = hook.rate >= 75;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: `1px solid ${isHighlighted ? "var(--accent)" : "var(--border-light)"}`,
                  background: isHighlighted ? "var(--accent-dim)" : "transparent",
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.08}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.08}s`,
                }}
              >
                {/* Rank */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--text-3)",
                    minWidth: 18,
                    lineHeight: "20px",
                  }}
                >
                  {i + 1}.
                </span>

                {/* Hook content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text)",
                      lineHeight: 1.4,
                      marginBottom: 3,
                    }}
                  >
                    "{hook.text}"
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--text-3)",
                    }}
                  >
                    {hook.strategy}
                  </span>
                </div>

                {/* Hold rate badge */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: 9999,
                    flexShrink: 0,
                    lineHeight: "16px",
                    color: isEmerald ? "var(--emerald)" : "var(--amber)",
                    background: isEmerald ? "var(--emerald-dim)" : "var(--amber-dim)",
                  }}
                >
                  {hook.rate}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AppFrame>
  );
}

/* ---------- Card 3: Niche Trends ---------- */

function NicheTrendsCard({ active }: { active: boolean }) {
  return (
    <div style={s.trendCard}>
      {/* Mini bar chart */}
      <div style={s.trendChartWrap}>
        {TREND_BARS.map((h, i) => (
          <div
            key={i}
            style={{
              width: 10,
              borderRadius: "3px 3px 0 0",
              background: `var(--accent)`,
              opacity: 0.4 + (i / TREND_BARS.length) * 0.6,
              height: active ? `${h}%` : "0%",
              transition: `height 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.05}s`,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Title + badge */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 14,
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: 8,
        }}
      >
        Behind-the-process format surging
      </div>
      <span className="badge badge-emerald" style={{ marginBottom: 12 }}>
        +2.8x lift
      </span>

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
        {["POV format", "Process reveal", "Authenticity"].map((tag) => (
          <span key={tag} className="mock-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Card 4: Competitors ---------- */

function CompetitorsCard({ active }: { active: boolean }) {
  return (
    <div style={s.competitorCard}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 14,
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: 14,
        }}
      >
        Tracked Competitors
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {COMPETITORS.map((c, i) => (
          <div
            key={c.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: active ? 1 : 0,
              transform: active ? "translateX(0)" : "translateX(-8px)",
              transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.08}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.08}s`,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: c.gradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 700,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {c.initials}
            </div>

            {/* Name + handle */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text)",
                  lineHeight: 1.3,
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--text-3)",
                }}
              >
                {c.handle}
              </div>
            </div>

            {/* Stats */}
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--text)",
                }}
              >
                {c.er} eng
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--emerald)",
                  fontWeight: 600,
                }}
              >
                {c.growth}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-discovered badge */}
      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: "1px solid var(--border-light)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-3)",
          }}
        >
          5 auto-discovered
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   PredictSection — Main Component
   ========================================================================== */

export default function PredictSection() {
  const [sectionRef, sectionInView] = useInView(0.15);
  const [gridRef, gridInView] = useInView(0.1);

  return (
    <section
      style={{
        background: "linear-gradient(to bottom, #FAFAF9 0%, #F5F4F0 8%, #F5F4F0 92%, #FAFAF9 100%)",
        position: "relative",
      }}
    >
      <div ref={sectionRef} className="section section-center">
        {/* Section Label */}
        <span className="section-label">Before You Hit Record</span>

        {/* Heading */}
        <BlurHeading
          inView={sectionInView}
          words={[
            { text: "Know" },
            { text: "what" },
            { text: "works" },
            { text: "before", em: true },
            { text: "you" },
            { text: "film." },
          ]}
        />

        {/* Body */}
        <p
          className="section-body"
          style={{
            textAlign: "center",
            margin: "16px auto 0",
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? "translateY(0)" : "translateY(12px)",
            transition:
              "opacity 0.6s cubic-bezier(0.65, 0.05, 0, 1) 0.3s, transform 0.6s cubic-bezier(0.65, 0.05, 0, 1) 0.3s",
          }}
        >
          Stop guessing which ideas are worth your time. COOPR scores concepts and
          ranks hooks using real signals from your niche.
        </p>

        {/* Bento Grid */}
        <div ref={gridRef} style={s.bentoGrid} className="predict-bento-grid">
          {/* Card 1: Idea Scoring — spans 2 rows on left */}
          <div
            style={{
              ...s.bentoCard,
              gridColumn: "1",
              gridRow: "1 / 3",
              alignSelf: "stretch",
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.7s var(--ease-premium), transform 0.7s var(--ease-premium)",
            }}
            className="bento-idea-scoring"
          >
            <IdeaScoringCard active={gridInView} />
          </div>

          {/* Card 2: Hook Lab — top right */}
          <div
            style={{
              ...s.bentoCard,
              gridColumn: "2",
              gridRow: "1",
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.7s var(--ease-premium) 0.1s, transform 0.7s var(--ease-premium) 0.1s",
            }}
            className="bento-hook-lab"
          >
            <HookLabCard active={gridInView} />
          </div>

          {/* Card 3: Niche Trends — bottom right */}
          <div
            style={{
              ...s.bentoCard,
              gridColumn: "2",
              gridRow: "2",
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.7s var(--ease-premium) 0.2s, transform 0.7s var(--ease-premium) 0.2s",
            }}
            className="bento-niche-trends"
          >
            <NicheTrendsCard active={gridInView} />
          </div>

          {/* Card 4: Competitors — bottom left */}
          <div
            style={{
              ...s.bentoCard,
              gridColumn: "1 / 3",
              gridRow: "3",
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.7s var(--ease-premium) 0.15s, transform 0.7s var(--ease-premium) 0.15s",
            }}
            className="bento-competitors"
          >
            <CompetitorsCard active={gridInView} />
          </div>
        </div>
      </div>

      {/* Inject responsive styles */}
      <style>{responsiveCSS}</style>
    </section>
  );
}

/* ==========================================================================
   Responsive CSS (injected as <style>)
   ========================================================================== */

const responsiveCSS = `
  /* Tablet: 2 columns, no row spanning */
  @media (max-width: 1023px) and (min-width: 768px) {
    .predict-bento-grid {
      grid-template-columns: 1fr 1fr !important;
      grid-template-rows: auto !important;
    }
    .bento-idea-scoring,
    .bento-hook-lab,
    .bento-niche-trends,
    .bento-competitors {
      grid-row: auto !important;
      grid-column: auto !important;
    }
  }

  /* Mobile: single column, all cards full width */
  @media (max-width: 767px) {
    .predict-bento-grid {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto !important;
    }
    .bento-idea-scoring,
    .bento-hook-lab,
    .bento-niche-trends,
    .bento-competitors {
      grid-row: auto !important;
      grid-column: auto !important;
    }
  }
`;

/* ==========================================================================
   Static Styles
   ========================================================================== */

const s: Record<string, CSSProperties> = {
  /* App Frame */
  appFrame: {
    border: "1px solid var(--border)",
    borderRadius: 12,
    overflow: "hidden",
    background: "var(--bg-card)",
    boxShadow:
      "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)",
    height: "100%",
  },
  appFrameBar: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 14px",
    background: "var(--bg-section-alt)",
    borderBottom: "1px solid var(--border)",
  },
  appFrameDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "block",
    flexShrink: 0,
  },
  appFrameTitle: {
    marginLeft: 8,
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--text-3)",
    letterSpacing: "0.02em",
    userSelect: "none",
  },
  appFrameContent: {
    padding: 0,
    position: "relative",
    overflow: "hidden",
  },
  cardInner: {
    padding: "20px 22px 22px",
  },

  /* Bento Grid */
  bentoGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gridTemplateRows: "auto auto",
    gap: 16,
    maxWidth: 1000,
    margin: "32px auto 0",
    width: "100%",
  },
  bentoCard: {
    minWidth: 0,
  },

  /* Signal bars (Idea Scoring) */
  signalRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  signalLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "var(--text-3)",
    minWidth: 100,
    flexShrink: 0,
  },
  signalBarTrack: {
    flex: 1,
    height: 6,
    background: "var(--border-light)",
    borderRadius: 3,
    overflow: "hidden",
  },
  signalValue: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    fontWeight: 600,
    color: "var(--text-2)",
    minWidth: 36,
    textAlign: "right" as const,
  },
  metaText: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "var(--text-3)",
    textAlign: "center" as const,
    marginTop: 18,
    marginBottom: 0,
  },

  /* Niche Trends Card */
  trendCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 20,
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    boxShadow:
      "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)",
  },
  trendChartWrap: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 4,
    height: 60,
    marginBottom: 14,
  },

  /* Competitors Card */
  competitorCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 20,
    height: "100%",
    boxShadow:
      "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)",
  },
};
