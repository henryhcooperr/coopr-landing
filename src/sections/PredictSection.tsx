import { type CSSProperties } from "react";
import { motion } from "motion/react";
import { BlurFade } from "../components/ui/blur-fade";
import { MagicCard } from "../components/ui/magic-card";
import { AnimatedList } from "../components/ui/animated-list";
import { NumberTicker } from "../components/ui/number-ticker";

/* ==========================================================================
   PredictSection — "Before You Hit Record"
   Bento grid: Idea Scoring, Hook Lab, Niche Trends, Competitors
   ========================================================================== */

/* ---------- Static Data ---------- */

const SIGNALS = [
  { label: "Trend signal",    pct: 80, color: "var(--accent)" },
  { label: "Audience demand", pct: 70, color: "var(--violet)" },
  { label: "Content gap",     pct: 90, color: "var(--emerald)" },
  { label: "Your strength",   pct: 60, color: "var(--amber)" },
  { label: "Seasonal fit",    pct: 50, color: "var(--blue)" },
  { label: "Competition",     pct: 30, color: "var(--rose)" },
] as const;

const HOOKS = [
  { text: "The one thing I changed that doubled my watch time",         strategy: "Curiosity gap + result",   rate: 83.7 },
  { text: "I tested the most popular format in my niche for 30 days",  strategy: "Story hook + experiment",  rate: 78.9 },
  { text: "Nobody talks about this editing trick",                       strategy: "Exclusivity + insider",    rate: 74.2 },
  { text: "What my worst post taught me about my audience",             strategy: "Vulnerability + insight",  rate: 71.3 },
  { text: "POV: you find the shot you've been planning for months",     strategy: "POV + payoff",             rate: 67.8 },
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

const CARD_EASE = [0.16, 1, 0.3, 1] as const;

/* ==========================================================================
   Card 1: Idea Scoring
   ========================================================================== */

const GAUGE_RADIUS = 52;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;
const GAUGE_SCORE = 8.2;
const GAUGE_MAX_SCORE = 10;
const GAUGE_FILL_OFFSET =
  GAUGE_CIRCUMFERENCE - (GAUGE_SCORE / GAUGE_MAX_SCORE) * GAUGE_CIRCUMFERENCE;

function IdeaScoringCard() {
  return (
    <div style={s.cardInner}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <span className="badge badge-teal" style={{ marginBottom: 8, display: "inline-block" }}>
          Idea Scoring
        </span>
        <div style={s.cardTitle}>6 signals. One score.</div>
      </div>

      {/* Gauge */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <div style={{ position: "relative", width: 130, height: 130 }}>
          <svg width={130} height={130} viewBox="0 0 130 130" style={{ display: "block" }}>
            <circle cx={65} cy={65} r={GAUGE_RADIUS} fill="none" stroke="var(--border)" strokeWidth={8} />
            <motion.circle
              cx={65}
              cy={65}
              r={GAUGE_RADIUS}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={GAUGE_CIRCUMFERENCE}
              initial={{ strokeDashoffset: GAUGE_CIRCUMFERENCE }}
              whileInView={{ strokeDashoffset: GAUGE_FILL_OFFSET }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: CARD_EASE, delay: 0.3 }}
              style={{ transform: "rotate(-90deg)", transformOrigin: "65px 65px" }}
            />
          </svg>
          <div style={s.gaugeCenter}>
            <NumberTicker
              value={GAUGE_SCORE}
              startValue={0}
              decimalPlaces={1}
              delay={0.3}
              className="inline-block"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 36,
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: "-0.02em",
              }}
            />
          </div>
        </div>
      </div>

      {/* Concept label */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={s.conceptLabel}>"Behind-the-process reveal format"</div>
        <div style={s.metaSmall}>
          Strong trend signal, low competition. Your content style is a natural fit.
        </div>
      </div>

      {/* Signal bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {SIGNALS.map((sig, i) => (
          <div key={sig.label} style={s.signalRow}>
            <span style={s.signalLabel}>{sig.label}</span>
            <div style={s.signalTrack}>
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: `${sig.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: CARD_EASE, delay: 0.3 + i * 0.07 }}
                style={{ height: "100%", background: sig.color, borderRadius: 3 }}
              />
            </div>
          </div>
        ))}
      </div>

      <p style={s.metaFooter}>Analyzing 1,247 posts across 38 creators</p>
    </div>
  );
}

/* ==========================================================================
   Card 2: Hook Lab — AnimatedList
   ========================================================================== */

function HookItem({ hook }: { hook: typeof HOOKS[number] }) {
  const isTop = hook.rate >= 75;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "9px 11px",
        borderRadius: 8,
        border: `1px solid ${isTop ? "var(--accent)" : "var(--border)"}`,
        background: isTop ? "var(--accent-dim)" : "transparent",
        width: "100%",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={s.hookText}>"{hook.text}"</div>
        <span style={s.hookStrategy}>{hook.strategy}</span>
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          padding: "3px 8px",
          borderRadius: 9999,
          flexShrink: 0,
          color: isTop ? "var(--emerald)" : "var(--amber)",
          background: isTop ? "var(--emerald-dim)" : "var(--amber-dim)",
        }}
      >
        {hook.rate}%
      </span>
    </div>
  );
}

function HookLabCard() {
  return (
    <div style={s.cardInner}>
      <div style={{ marginBottom: 12 }}>
        <span className="badge badge-violet" style={{ marginBottom: 8, display: "inline-block" }}>
          Hook Lab
        </span>
        <div style={s.cardTitle}>5 hooks. Ranked by hold rate.</div>
      </div>
      <AnimatedList delay={1500} className="!gap-2">
        {HOOKS.map((hook) => (
          <HookItem key={hook.text} hook={hook} />
        ))}
      </AnimatedList>
    </div>
  );
}

/* ==========================================================================
   Card 3: Niche Trends
   ========================================================================== */

function NicheTrendsCard() {
  return (
    <div style={s.cardInner}>
      {/* Mini bar chart */}
      <div style={s.trendChartWrap}>
        {TREND_BARS.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: "0%" }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: CARD_EASE, delay: 0.1 + i * 0.05 }}
            style={{
              width: 10,
              borderRadius: "3px 3px 0 0",
              background: "var(--accent)",
              opacity: 0.4 + (i / TREND_BARS.length) * 0.6,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
        Behind-the-process format surging
      </div>
      <span className="badge badge-emerald" style={{ marginBottom: 10, display: "inline-block" }}>
        +2.8x lift
      </span>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
        {["POV format", "Process reveal", "Authenticity"].map((tag) => (
          <span key={tag} className="mock-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   Card 4: Competitors
   ========================================================================== */

function CompetitorsCard() {
  return (
    <div style={s.cardInner}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>
        Tracked Competitors
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {COMPETITORS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: CARD_EASE, delay: 0.15 + i * 0.08 }}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: c.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
              {c.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>
                {c.name}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)" }}>
                {c.handle}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--text)" }}>
                {c.er} eng
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--emerald)", fontWeight: 600 }}>
                {c.growth}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)" }}>
          5 auto-discovered
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   PredictSection — Main Component
   ========================================================================== */

const CARDS = [
  { label: "Idea Scoring", Component: IdeaScoringCard, col: "1", row: "1 / 3" },
  { label: "Hook Lab",     Component: HookLabCard,     col: "2", row: "1" },
  { label: "Niche Trends", Component: NicheTrendsCard, col: "2", row: "2" },
  { label: "Competitors",  Component: CompetitorsCard, col: "1 / 3", row: "3" },
];

export default function PredictSection() {
  return (
    <section
      style={{
        background: "linear-gradient(to bottom, #FAFAF9 0%, #F5F4F0 8%, #F5F4F0 92%, #FAFAF9 100%)",
        position: "relative",
      }}
    >
      <div className="section section-center">
        {/* Section Label */}
        <BlurFade inView delay={0} duration={0.5}>
          <span className="section-label">Before You Hit Record</span>
        </BlurFade>

        {/* Heading */}
        <BlurFade inView delay={0.1} duration={0.6}>
          <h2 style={s.heading}>
            Before you hit record.
          </h2>
        </BlurFade>

        {/* Body */}
        <BlurFade inView delay={0.2} duration={0.6}>
          <p className="section-body" style={{ textAlign: "center", margin: "16px auto 0" }}>
            Stop guessing which ideas are worth your time. COOPR scores concepts and
            ranks hooks using real signals from your niche.
          </p>
        </BlurFade>

        {/* Bento Grid */}
        <div style={s.bentoGrid} className="predict-bento-grid">
          {CARDS.map(({ label, Component, col, row }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: CARD_EASE }}
              style={{
                gridColumn: col,
                gridRow: row,
                minWidth: 0,
              }}
              className={`bento-card-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <MagicCard
                className="p-6 rounded-2xl h-full"
                gradientColor="oklch(0.62 0.16 65 / 0.12)"
              >
                <Component />
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{responsiveCSS}</style>
    </section>
  );
}

/* ==========================================================================
   Responsive CSS
   ========================================================================== */

const responsiveCSS = `
  @media (max-width: 1023px) and (min-width: 768px) {
    .predict-bento-grid {
      grid-template-columns: 1fr 1fr !important;
      grid-template-rows: auto !important;
    }
    .predict-bento-grid > * {
      grid-row: auto !important;
      grid-column: auto !important;
    }
  }
  @media (max-width: 767px) {
    .predict-bento-grid {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto !important;
    }
    .predict-bento-grid > * {
      grid-row: auto !important;
      grid-column: auto !important;
    }
  }
`;

/* ==========================================================================
   Static Styles
   ========================================================================== */

const s: Record<string, CSSProperties> = {
  heading: {
    fontFamily: "var(--font-display)",
    fontWeight: 800,
    fontSize: "clamp(2rem, 4.5vw, 3rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.04em",
    color: "var(--text)",
    textAlign: "center",
    margin: "12px 0 0",
  },
  bentoGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gridTemplateRows: "auto auto",
    gap: 20,
    maxWidth: 1000,
    margin: "48px auto 0",
    width: "100%",
  },
  cardInner: {
    padding: "20px 22px 22px",
  },
  cardTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 17,
    fontWeight: 700,
    color: "var(--text)",
    lineHeight: 1.3,
  },
  gaugeCenter: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  conceptLabel: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--text)",
    fontStyle: "italic",
    marginBottom: 4,
  },
  metaSmall: {
    fontFamily: "var(--font-body)",
    fontSize: 12,
    color: "var(--text-2)",
    lineHeight: 1.5,
  },
  metaFooter: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "var(--text-3)",
    textAlign: "center" as const,
    marginTop: 16,
    marginBottom: 0,
  },
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
  signalTrack: {
    flex: 1,
    height: 6,
    background: "var(--border-light)",
    borderRadius: 3,
    overflow: "hidden",
  },
  hookText: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--text)",
    lineHeight: 1.4,
    marginBottom: 3,
  },
  hookStrategy: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "var(--text-3)",
  },
  trendChartWrap: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 4,
    height: 60,
    marginBottom: 14,
  },
};
