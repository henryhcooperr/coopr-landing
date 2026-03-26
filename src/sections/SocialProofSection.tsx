import { type CSSProperties } from "react";
import { motion } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 285, suffix: "+", label: "AI tools powering your workflow" },
  { value: 40, suffix: "+", label: "Rich block types in chat" },
  { value: 9, suffix: "", label: "Integrated dashboard panels" },
] as const;

const NICHES = [
  "Photography", "Fitness", "Food", "Travel", "Music",
  "Fashion", "Tech", "Gaming", "Art", "Education",
  "Comedy", "Lifestyle", "Beauty", "Sports", "DIY",
  "Pets", "Parenting", "Finance", "Health", "Dance",
];

// Split into two rows for the marquee
const NICHES_ROW_A = NICHES.slice(0, 10);
const NICHES_ROW_B = NICHES.slice(10);

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles: Record<string, CSSProperties> = {
  section: {
    background: "#ECEAE6",
    borderTop: "1px solid var(--border-raw)",
    borderBottom: "1px solid var(--border-raw)",
    overflow: "hidden",
    position: "relative",
  },
  inner: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "64px 24px 0",
  },
  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: 0,
    flexWrap: "wrap",
  },
  statCell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 40px",
    borderRight: "1px solid var(--border-raw)",
  },
  statNumber: {
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
    fontWeight: 700,
    lineHeight: 1,
    color: "var(--fg)",
    letterSpacing: "-0.02em",
    display: "flex",
    alignItems: "baseline",
    gap: 1,
  },
  statSuffix: {
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
    fontSize: "clamp(2rem, 4vw, 2.8rem)",
    fontWeight: 700,
    color: "var(--teal)",
    lineHeight: 1,
  },
  statLabel: {
    marginTop: 8,
    fontSize: 13,
    color: "var(--fg-2)",
    textAlign: "center",
    maxWidth: 140,
    lineHeight: 1.4,
    letterSpacing: "0.01em",
  },
  divider: {
    width: 40,
    height: 1,
    background: "var(--border-raw)",
    margin: "48px auto",
  },
  quoteBlock: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "0 24px",
    textAlign: "center",
  },
  quoteText: {
    fontFamily: "'Fraunces', Georgia, serif",
    fontStyle: "italic",
    fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
    fontWeight: 400,
    color: "var(--fg)",
    lineHeight: 1.6,
    margin: 0,
  },
  quoteAttrib: {
    marginTop: 16,
    fontSize: 13,
    color: "var(--fg-2)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  changelogBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(13,148,136,0.08)",
    border: "1px solid rgba(13,148,136,0.18)",
    borderRadius: 999,
    padding: "5px 14px",
    marginTop: 32,
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.15s ease",
  },
  changelogDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "var(--teal)",
    flexShrink: 0,
  },
  changelogText: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--teal)",
    letterSpacing: "0.03em",
    fontFamily: "'JetBrains Mono', monospace",
  },
  marqueeSection: {
    marginTop: 48,
    position: "relative",
  },
  marqueeFadeLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 80,
    height: "100%",
    background: "linear-gradient(to right, #ECEAE6, transparent)",
    zIndex: 1,
    pointerEvents: "none",
  },
  marqueeFadeRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 80,
    height: "100%",
    background: "linear-gradient(to left, #ECEAE6, transparent)",
    zIndex: 1,
    pointerEvents: "none",
  },
  nicheTag: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 14px",
    borderRadius: 999,
    border: "1px solid var(--border-raw)",
    background: "var(--bg-elevated)",
    fontSize: 13,
    fontWeight: 500,
    color: "var(--fg-2)",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function NicheTag({ label }: { label: string }) {
  return <span style={styles.nicheTag}>{label}</span>;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SocialProofSection() {
  return (
    <section style={styles.section} id="social-proof" aria-label="Platform stats and creator community">

      {/* ── Stats row ──────────────────────────────────────────── */}
      <div style={styles.inner}>
        <div style={styles.statsRow}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              style={{
                ...styles.statCell,
                borderRight: i < STATS.length - 1 ? "1px solid var(--border-raw)" : "none",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={styles.statNumber}>
                <NumberTicker
                  value={stat.value}
                  delay={0.3 + i * 0.1}
                  className="font-display"
                  style={{
                    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                    fontSize: "inherit",
                    fontWeight: 700,
                    color: "var(--fg)",
                    letterSpacing: "-0.02em",
                  }}
                />
                {stat.suffix && (
                  <span style={styles.statSuffix}>{stat.suffix}</span>
                )}
              </div>
              <p style={styles.statLabel}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Divider ──────────────────────────────────────────── */}
        <div style={styles.divider} />

        {/* ── Founder quote ────────────────────────────────────── */}
        <motion.div
          style={styles.quoteBlock}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <blockquote style={{ margin: 0, padding: 0 }}>
            <p style={styles.quoteText}>
              &ldquo;I built COOPR because I was tired of guessing what to post.
              Now it knows my content better than I do.&rdquo;
            </p>
            <footer>
              <cite style={styles.quoteAttrib}>
                &mdash; Henry Cooper, Founder
              </cite>
            </footer>
          </blockquote>

          {/* Shipping fast signal */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
            <a
              href="#/devlog"
              style={styles.changelogBadge}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(13,148,136,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(13,148,136,0.08)";
              }}
              aria-label="View devlog — 8 updates in the last week"
            >
              <span style={styles.changelogDot} aria-hidden="true" />
              <span style={styles.changelogText}>8 updates in the last week</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Niche marquee ──────────────────────────────────────── */}
      <div
        style={styles.marqueeSection}
        aria-label="Creator niches supported by COOPR"
        // Hidden on small screens via inline media — handled by CSS class below
        className="social-proof-marquee"
      >
        <div style={styles.marqueeFadeLeft} aria-hidden="true" />
        <div style={styles.marqueeFadeRight} aria-hidden="true" />

        <Marquee
          pauseOnHover
          className="[--duration:35s] [--gap:0.75rem] py-3"
        >
          {NICHES_ROW_A.map((niche) => (
            <NicheTag key={niche} label={niche} />
          ))}
        </Marquee>

        <Marquee
          pauseOnHover
          reverse
          className="[--duration:40s] [--gap:0.75rem] py-3"
        >
          {NICHES_ROW_B.map((niche) => (
            <NicheTag key={niche} label={niche} />
          ))}
        </Marquee>
      </div>

      {/* Responsive: hide marquee on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .social-proof-marquee { display: none; }
          #social-proof [style*="border-right"] {
            border-right: none !important;
            border-bottom: 1px solid var(--border-raw);
            padding-bottom: 24px;
            margin-bottom: 24px;
          }
          #social-proof .stats-row {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
