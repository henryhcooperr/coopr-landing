import { type CSSProperties } from "react";
import { motion } from "motion/react";
import { BlurFade } from "../components/ui/blur-fade";
import { MagicCard } from "../components/ui/magic-card";
import { NumberTicker } from "../components/ui/number-ticker";
import {
  FolderSearch,
  Target,
  AudioWaveform,
  Sparkles,
} from "lucide-react";

/* ==========================================================================
   ProductionEngineSection — "The Production Engine"
   Dark cinematic zone showcasing Media Vault as part of COOPR ecosystem.
   ========================================================================== */

/* ---------- Static Data ---------- */

const CARD_EASE = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  {
    icon: FolderSearch,
    title: "Smart Library",
    description:
      "Scan your drives. Every clip indexed, analyzed, and searchable by what's in it — not just the filename.",
    accentColor: "oklch(0.62 0.16 65)",
  },
  {
    icon: Target,
    title: "Calibrated Scoring",
    description:
      "Every clip scored on a 25-point rubric tuned to your style. Know what's worth using.",
    accentColor: "#7C3AED",
  },
  {
    icon: AudioWaveform,
    title: "Voice Match",
    description:
      "Your voice profile ensures every script, caption, and overlay sounds like you.",
    accentColor: "#2563EB",
  },
  {
    icon: Sparkles,
    title: "Coming Soon",
    description:
      "Animated captions, beat sync, auto-cut, brand kit rendering, and AI color correction.",
    accentColor: "#F59E0B",
  },
] as const;

const STATS = [
  { value: 31, label: "AI tools", suffix: "" },
  { value: 586, label: "clips analyzed", suffix: "" },
  { value: 25, label: "point scoring rubric", suffix: "-point" },
] as const;

/* ==========================================================================
   Feature Card
   ========================================================================== */

function FeatureCard({
  icon: Icon,
  title,
  description,
  accentColor,
}: (typeof FEATURES)[number]) {
  return (
    <div style={s.featureCardInner}>
      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `${accentColor}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          flexShrink: 0,
        }}
      >
        <Icon size={20} color={accentColor} strokeWidth={1.8} />
      </div>

      {/* Title */}
      <div style={s.featureTitle}>{title}</div>

      {/* Description */}
      <div style={s.featureDescription}>{description}</div>
    </div>
  );
}

/* ==========================================================================
   ProductionEngineSection — Main Component
   ========================================================================== */

export default function ProductionEngineSection() {
  return (
    <section style={s.section}>
      {/* Subtle top/bottom gradient bleed for smooth transition */}
      <div style={s.edgeFadeTop} aria-hidden="true" />
      <div style={s.edgeFadeBottom} aria-hidden="true" />

      {/* Ambient glow */}
      <div style={s.ambientGlow} aria-hidden="true" />

      <div className="section section-center" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Label */}
        <BlurFade inView delay={0} duration={0.5}>
          <span style={s.sectionLabel}>The Production Engine</span>
        </BlurFade>

        {/* Headline */}
        <BlurFade inView delay={0.1} duration={0.6}>
          <h2 style={s.heading}>From raw footage to finished reel.</h2>
        </BlurFade>

        {/* Hook copy */}
        <BlurFade inView delay={0.2} duration={0.6}>
          <p style={s.hookCopy}>
            The average creator shoots 10x more footage than they publish.
            That raw footage sits on hard drives — unorganized, unanalyzed,
            unused. The best clip for your next reel{" "}
            <span style={s.hookEmphasis}>might already exist.</span>
          </p>
        </BlurFade>

        {/* Stats row */}
        <BlurFade inView delay={0.3} duration={0.6}>
          <div style={s.statsRow} className="production-stats-row">
            {STATS.map((stat, i) => (
              <div key={stat.label} style={s.statItem}>
                <span style={s.statValue}>
                  <NumberTicker
                    value={stat.value}
                    startValue={0}
                    delay={0.4 + i * 0.15}
                    className="inline-block"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      color: "inherit",
                      letterSpacing: "inherit",
                    }}
                  />
                  {stat.suffix}
                </span>
                <span style={s.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </BlurFade>

        {/* Feature Grid — 2x2 */}
        <div style={s.featureGrid} className="production-feature-grid">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1,
                ease: CARD_EASE,
              }}
            >
              <MagicCard
                className="p-0 rounded-2xl h-full"
                gradientColor="oklch(0.62 0.16 65 / 0.08)"
                gradientFrom="oklch(0.62 0.16 65 / 0.6)"
                gradientTo="oklch(0.35 0.05 50 / 0.4)"
              >
                <FeatureCard {...feature} />
              </MagicCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: CARD_EASE }}
          style={{ marginTop: 40 }}
        >
          <a href="#cta-section" style={s.ghostButton}>
            Included in Pro — Join the waitlist
          </a>
        </motion.div>
      </div>

      <style>{responsiveCSS}</style>
    </section>
  );
}

/* ==========================================================================
   Responsive CSS
   ========================================================================== */

const responsiveCSS = `
  @media (max-width: 767px) {
    .production-feature-grid {
      grid-template-columns: 1fr !important;
    }
    .production-stats-row {
      flex-direction: column !important;
      gap: 20px !important;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .production-feature-grid {
      grid-template-columns: 1fr 1fr !important;
    }
  }
`;

/* ==========================================================================
   Static Styles
   ========================================================================== */

const s: Record<string, CSSProperties> = {
  section: {
    background: "oklch(0.14 0.035 50)",
    position: "relative",
    overflow: "hidden",
  },
  edgeFadeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    background:
      "linear-gradient(to bottom, #F4F3F0 0%, oklch(0.14 0.035 50) 100%)",
    zIndex: 1,
    pointerEvents: "none",
  },
  edgeFadeBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    background:
      "linear-gradient(to top, #F4F3F0 0%, oklch(0.14 0.035 50) 100%)",
    zIndex: 1,
    pointerEvents: "none",
  },
  ambientGlow: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "60%",
    height: "50%",
    background:
      "radial-gradient(ellipse at center, oklch(0.62 0.16 65 / 0.06) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  /* Section Label */
  sectionLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "oklch(0.62 0.16 65)",
    marginBottom: 12,
    display: "block",
  },

  /* Headline */
  heading: {
    fontFamily: "var(--font-display)",
    fontWeight: 800,
    fontSize: "clamp(2rem, 4.5vw, 3rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.04em",
    color: "#FAFAF9",
    textAlign: "center",
    margin: "12px 0 0",
  },

  /* Hook copy */
  hookCopy: {
    fontFamily: "var(--font-body)",
    fontSize: "clamp(1rem, 1vw + 0.5rem, 1.125rem)",
    lineHeight: 1.7,
    color: "oklch(0.72 0.02 50)",
    maxWidth: 580,
    textAlign: "center",
    margin: "20px auto 0",
  },
  hookEmphasis: {
    fontFamily: "var(--font-accent)",
    fontStyle: "italic",
    fontWeight: 400,
    color: "#FAFAF9",
  },

  /* Stats */
  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: 48,
    marginTop: 36,
    marginBottom: 8,
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: "#FAFAF9",
  },
  statLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    color: "oklch(0.55 0.02 50)",
  },

  /* Feature Grid */
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    maxWidth: 840,
    margin: "32px auto 0",
    width: "100%",
  },

  /* Feature Card Inner */
  featureCardInner: {
    padding: "24px 24px 28px",
    background: "oklch(0.18 0.02 50)",
    borderRadius: 16,
    height: "100%",
  },
  featureTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 16,
    fontWeight: 700,
    color: "#FAFAF9",
    lineHeight: 1.3,
    marginBottom: 8,
  },
  featureDescription: {
    fontFamily: "var(--font-body)",
    fontSize: 14,
    lineHeight: 1.6,
    color: "oklch(0.65 0.02 50)",
  },

  /* Ghost CTA Button */
  ghostButton: {
    display: "inline-block",
    fontFamily: "var(--font-display)",
    fontSize: 14,
    fontWeight: 700,
    color: "#FAFAF9",
    padding: "12px 28px",
    borderRadius: 9999,
    border: "1px solid oklch(0.62 0.16 65 / 0.4)",
    background: "transparent",
    textDecoration: "none",
    letterSpacing: "-0.01em",
    transition: "all 0.25s ease",
    cursor: "pointer",
  },
};
