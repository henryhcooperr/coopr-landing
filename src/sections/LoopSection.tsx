import { useRef, useEffect, useState, type CSSProperties } from "react";
import { motion, useInView } from "motion/react";
import { BlurFade } from "../components/ui/blur-fade";
import { AnimatedBeam } from "../components/ui/animated-beam";
import { Marquee } from "../components/ui/marquee";
import {
  Eye,
  Lightbulb,
  PenLine,
  MapPin,
  Video,
  Send,
  BarChart2,
  RefreshCcw,
} from "lucide-react";

/* ==========================================================================
 * Step data
 * ========================================================================== */

const STEPS = [
  {
    id: 1,
    icon: Eye,
    label: "Pulse Briefing",
    desc: "Trend detection, competitor analysis, and niche gaps surfaced daily.",
    color: "var(--accent)",
    colorDim: "var(--accent-dim)",
  },
  {
    id: 2,
    icon: Lightbulb,
    label: "Spark + Score Ideas",
    desc: "Capture concepts, score them against 6 signals. Know what's worth making.",
    color: "var(--amber)",
    colorDim: "var(--amber-dim)",
  },
  {
    id: 3,
    icon: PenLine,
    label: "Hooks, Scripts + Captions",
    desc: "Voice-matched writing with predicted retention. A/B caption variants included.",
    color: "var(--violet)",
    colorDim: "var(--violet-dim)",
  },
  {
    id: 4,
    icon: MapPin,
    label: "Shot Lists + Calendar",
    desc: "Shoot planner, content calendar, and optimal posting times in one view.",
    color: "var(--emerald)",
    colorDim: "var(--emerald-dim)",
  },
  {
    id: 5,
    icon: Video,
    label: "Film + Capture",
    desc: "Guided by everything COOPR prepared. Every clip lands in your smart library.",
    color: "var(--blue)",
    colorDim: "var(--blue-dim)",
  },
  {
    id: 6,
    icon: Send,
    label: "Publish + Distribute",
    desc: "Optimal timing, link in bio, and auto-populated media kit. One tap.",
    color: "var(--rose)",
    colorDim: "var(--rose-dim)",
  },
  {
    id: 7,
    icon: BarChart2,
    label: "Deep Analysis",
    desc: "Clip Lab breakdown, retention curves, hashtag velocity, and format insights.",
    color: "var(--emerald)",
    colorDim: "var(--emerald-dim)",
  },
  {
    id: 8,
    icon: RefreshCcw,
    label: "Learn + Evolve",
    desc: "Every post sharpens your Creative DNA. The loop gets smarter each cycle.",
    color: "var(--accent)",
    colorDim: "var(--accent-dim)",
  },
] as const;

const CAPABILITIES = [
  "Hook scoring",
  "Script writing",
  "Shoot planning",
  "Clip analysis",
  "Caption generation",
  "Niche mapping",
  "Voice matching",
  "Performance tracking",
  "Trend detection",
  "Competitor intel",
  "Content calendar",
  "Audience insights",
  "Media kit",
  "Link in bio",
  "Semantic search",
  "Knowledge base",
  "Idea scoring",
  "Format breakdown",
  "Optimal timing",
  "Creative DNA",
] as const;

/* ==========================================================================
 * LoopSection
 * ========================================================================== */

export default function LoopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pulseIndex, setPulseIndex] = useState(0);

  // Refs for animated beams — one per step node
  const nodeRefs = useRef<(HTMLDivElement | null)[]>(
    Array.from({ length: STEPS.length }, () => null),
  );

  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  /* ---- Detect mobile ---- */
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    handle(mql);
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, []);

  /* ---- Pulse animation: cycle through steps ---- */
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % STEPS.length);
    }, 900);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="loop" ref={sectionRef} style={styles.section}>
      {/* ---------- Header ---------- */}
      <div style={styles.header}>
        <BlurFade delay={0} inView duration={0.5}>
          <span className="section-label">The Full Creator Loop</span>
        </BlurFade>

        <BlurFade delay={0.08} inView duration={0.55}>
          <h2 style={styles.heading}>
            The only tool that closes the loop.
          </h2>
        </BlurFade>

        <BlurFade delay={0.15} inView duration={0.55}>
          <p style={styles.subheading}>
            From insight to publish to analysis&nbsp;&mdash; and back again.
            Every step feeds the next.
          </p>
        </BlurFade>
      </div>

      {/* ---------- Pipeline visualization ---------- */}
      {isMobile ? (
        <MobileLoop pulseIndex={pulseIndex} isInView={isInView} />
      ) : (
        <DesktopLoop
          containerRef={containerRef}
          nodeRefs={nodeRefs}
          pulseIndex={pulseIndex}
          isInView={isInView}
        />
      )}

      {/* ---------- Capabilities ticker ---------- */}
      <BlurFade delay={0.3} inView duration={0.5}>
        <div style={styles.tickerSection}>
          <div style={styles.tickerLabel}>Everything in one place</div>
          <div style={styles.tickerWrap}>
            <div style={styles.tickerFadeLeft} />
            <div style={styles.tickerFadeRight} />
            <Marquee
              pauseOnHover
              className="[--duration:30s] [--gap:0px]"
            >
              {CAPABILITIES.map((cap) => (
                <span key={cap} style={styles.tickerItem}>
                  {cap}
                  <span style={styles.tickerDot} aria-hidden="true" />
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}

/* ==========================================================================
 * DesktopLoop — oval/grid layout with AnimatedBeam connections
 * ========================================================================== */

interface DesktopLoopProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  nodeRefs: React.RefObject<(HTMLDivElement | null)[]>;
  pulseIndex: number;
  isInView: boolean;
}

function DesktopLoop({
  containerRef,
  nodeRefs,
  pulseIndex,
  isInView,
}: DesktopLoopProps) {
  // 8 nodes arranged in 2 rows of 4 (top row: steps 0-3, bottom row: steps 4-7 reversed)
  const topRow = [0, 1, 2, 3];
  const bottomRow = [7, 6, 5, 4]; // reversed so the loop flows correctly

  return (
    <div style={styles.desktopWrapper}>
      {/* Arrow indicators: left and right sides connecting the rows */}
      <div style={styles.sideArrow} aria-hidden="true">
        <svg width="24" height="60" viewBox="0 0 24 60" fill="none">
          <path
            d="M12 0 L12 48 M6 42 L12 54 L18 42"
            stroke="var(--border-landing, #E7E5E4)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div style={{ ...styles.sideArrow, ...styles.sideArrowRight }} aria-hidden="true">
        <svg width="24" height="60" viewBox="0 0 24 60" fill="none">
          <path
            d="M12 54 L12 6 M6 12 L12 0 L18 12"
            stroke="var(--border-landing, #E7E5E4)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        ref={containerRef}
        style={styles.gridContainer}
      >
        {/* Top row: steps 1-4 (indices 0-3), left to right */}
        <div style={styles.stepRow}>
          {topRow.map((stepIdx, colIdx) => (
            <StepNode
              key={STEPS[stepIdx].id}
              step={STEPS[stepIdx]}
              stepIndex={stepIdx}
              colIndex={colIdx}
              isActive={pulseIndex === stepIdx}
              isInView={isInView}
              nodeRef={(el) => {
                nodeRefs.current[stepIdx] = el;
              }}
              direction="right"
            />
          ))}
        </div>

        {/* AnimatedBeam connections for top row */}
        {topRow.slice(0, -1).map((fromIdx, i) => {
          const toIdx = topRow[i + 1];
          return (
            <AnimatedBeam
              key={`top-beam-${fromIdx}`}
              containerRef={containerRef}
              fromRef={{ current: nodeRefs.current[fromIdx] }}
              toRef={{ current: nodeRefs.current[toIdx] }}
              pathColor="var(--border-landing, #E7E5E4)"
              pathWidth={1.5}
              pathOpacity={0.6}
              gradientStartColor="oklch(0.62 0.16 65)"
              gradientStopColor="oklch(0.62 0.16 65 / 0.3)"
              duration={3}
              delay={i * 0.4}
              curvature={-20}
            />
          );
        })}

        {/* Bottom row: steps 8-5 (indices 7-4), displayed left to right but data reversed */}
        <div style={styles.stepRow}>
          {bottomRow.map((stepIdx, colIdx) => (
            <StepNode
              key={STEPS[stepIdx].id}
              step={STEPS[stepIdx]}
              stepIndex={stepIdx}
              colIndex={colIdx}
              isActive={pulseIndex === stepIdx}
              isInView={isInView}
              nodeRef={(el) => {
                nodeRefs.current[stepIdx] = el;
              }}
              direction="left"
            />
          ))}
        </div>

        {/* AnimatedBeam connections for bottom row — flow right to left (7→6→5→4) */}
        {bottomRow.slice(0, -1).map((fromIdx, i) => {
          const toIdx = bottomRow[i + 1];
          return (
            <AnimatedBeam
              key={`bot-beam-${fromIdx}`}
              containerRef={containerRef}
              fromRef={{ current: nodeRefs.current[fromIdx] }}
              toRef={{ current: nodeRefs.current[toIdx] }}
              pathColor="var(--border-landing, #E7E5E4)"
              pathWidth={1.5}
              pathOpacity={0.6}
              gradientStartColor="oklch(0.62 0.16 65)"
              gradientStopColor="oklch(0.62 0.16 65 / 0.3)"
              duration={3}
              delay={1.2 + i * 0.4}
              curvature={20}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================================================
 * StepNode — individual step card
 * ========================================================================== */

interface StepNodeProps {
  step: (typeof STEPS)[number];
  stepIndex: number;
  colIndex: number;
  isActive: boolean;
  isInView: boolean;
  nodeRef: (el: HTMLDivElement | null) => void;
  direction: "right" | "left";
}

function StepNode({
  step,
  stepIndex: _stepIndex,
  colIndex,
  isActive,
  isInView,
  nodeRef,
  direction,
}: StepNodeProps) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: direction === "right" ? 20 : -20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: direction === "right" ? 20 : -20 }}
      transition={{
        delay: colIndex * 0.08 + (direction === "left" ? 0.32 : 0),
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      ref={nodeRef}
      style={{
        ...styles.stepCard,
        boxShadow: isActive
          ? `0 0 0 2px ${step.color}, var(--shadow-md)`
          : "var(--shadow-sm)",
        background: isActive ? step.colorDim : "var(--bg-card)",
        transition: "box-shadow 0.3s ease, background 0.3s ease",
      }}
      aria-label={step.label}
    >
      {/* Step number */}
      <div
        style={{
          ...styles.stepNum,
          fontFamily: "var(--font-mono)",
          color: "var(--text-3)",
        }}
      >
        {String(step.id).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div
        style={{
          ...styles.iconWrap,
          background: step.colorDim,
          color: step.color,
        }}
      >
        <Icon size={16} strokeWidth={2} />
      </div>

      {/* Label */}
      <div style={styles.stepLabel}>{step.label}</div>

      {/* Description */}
      <div style={styles.stepDesc}>{step.desc}</div>

      {/* Pulse dot */}
      {isActive && (
        <motion.div
          style={styles.pulseDot}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <span
            style={{
              ...styles.pulseDotInner,
              background: step.color,
              boxShadow: `0 0 0 4px ${step.colorDim}`,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

/* ==========================================================================
 * MobileLoop — vertical list with connecting lines
 * ========================================================================== */

interface MobileLoopProps {
  pulseIndex: number;
  isInView: boolean;
}

function MobileLoop({ pulseIndex, isInView }: MobileLoopProps) {
  return (
    <div style={styles.mobileList}>
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const isActive = pulseIndex === i;
        const isLast = i === STEPS.length - 1;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{
              delay: i * 0.06,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={styles.mobileItem}
          >
            {/* Left column: step number + connector line */}
            <div style={styles.mobileLeft}>
              <div
                style={{
                  ...styles.mobileNumCircle,
                  background: isActive ? step.colorDim : "var(--bg-elevated, #ECEAE6)",
                  color: isActive ? step.color : "var(--text-3)",
                  border: `1.5px solid ${isActive ? step.color : "transparent"}`,
                  transition: "all 0.3s ease",
                }}
              >
                <Icon size={14} strokeWidth={2} />
              </div>
              {!isLast && (
                <div style={styles.mobileConnector}>
                  <motion.div
                    style={{
                      ...styles.mobileConnectorFill,
                      background: `linear-gradient(to bottom, ${step.color}, transparent)`,
                    }}
                    initial={{ height: "0%" }}
                    animate={isInView ? { height: "100%" } : { height: "0%" }}
                    transition={{ delay: i * 0.06 + 0.3, duration: 0.5 }}
                  />
                </div>
              )}
              {/* Loop arrow on last item */}
              {isLast && (
                <div style={styles.mobileLoopArrow} aria-label="loops back to start">
                  <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                    <path
                      d="M8 0 Q8 20 2 22 M2 22 L0 18 M2 22 L4 18"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Right column: text */}
            <div style={styles.mobileRight}>
              <div style={styles.mobileStepNum}>
                {String(step.id).padStart(2, "0")}
              </div>
              <div
                style={{
                  ...styles.mobileStepLabel,
                  color: isActive ? step.color : "var(--text)",
                  transition: "color 0.3s ease",
                }}
              >
                {step.label}
              </div>
              <div style={styles.mobileStepDesc}>{step.desc}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ==========================================================================
 * Inject keyframes once
 * ========================================================================== */

const KEYFRAMES = `
@keyframes loop-pulse-ring {
  0% { transform: scale(1); opacity: 0.7; }
  70% { transform: scale(2); opacity: 0; }
  100% { transform: scale(2); opacity: 0; }
}
`;

if (typeof document !== "undefined") {
  const id = "loop-section-keyframes";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = KEYFRAMES;
    document.head.appendChild(s);
  }
}

/* ==========================================================================
 * Styles
 * ========================================================================== */

const styles: Record<string, CSSProperties> = {
  /* ---- Section ---- */
  section: {
    maxWidth: 1100,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "var(--section-padding, 120px)",
    paddingBottom: "var(--section-padding, 120px)",
    paddingLeft: 24,
    paddingRight: 24,
    position: "relative",
  },

  /* ---- Header ---- */
  header: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 72,
  },
  heading: {
    fontFamily: "var(--font-hero, 'Advercase', sans-serif)",
    fontSize: "clamp(28px, 4vw, 52px)",
    fontWeight: 700,
    color: "var(--text, #1C1917)",
    lineHeight: 1.1,
    margin: "16px 0 0",
    letterSpacing: "0.02em",
    textTransform: "uppercase" as const,
  },
  subheading: {
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: "clamp(15px, 1.8vw, 18px)",
    color: "var(--text-2, #57534E)",
    lineHeight: 1.6,
    maxWidth: 560,
    marginTop: 16,
    marginBottom: 0,
  },

  /* ---- Desktop wrapper ---- */
  desktopWrapper: {
    position: "relative",
    marginBottom: 64,
  },
  sideArrow: {
    position: "absolute",
    left: -4,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    opacity: 0.5,
  },
  sideArrowRight: {
    left: "auto",
    right: -4,
  },
  gridContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  stepRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    position: "relative",
  },

  /* ---- Step card ---- */
  stepCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: "22px 20px",
    borderRadius: 14,
    background: "var(--bg-card, #FFFFFF)",
    cursor: "default",
    userSelect: "none",
    overflow: "visible",
  },
  stepNum: {
    fontFamily: "var(--font-hero, 'Advercase', sans-serif)",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "0.04em",
    marginBottom: 4,
    opacity: 0.2,
    lineHeight: 1,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepLabel: {
    fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
    fontSize: 14,
    fontWeight: 700,
    color: "var(--text, #1C1917)",
    lineHeight: 1.3,
    marginTop: 2,
  },
  stepDesc: {
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: 12,
    color: "var(--text-3, #A8A29E)",
    lineHeight: 1.5,
  },
  pulseDot: {
    position: "absolute",
    top: 10,
    right: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pulseDotInner: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    display: "block",
  },

  /* ---- Mobile list ---- */
  mobileList: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    marginBottom: 48,
  },
  mobileItem: {
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
  },
  mobileLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    width: 36,
  },
  mobileNumCircle: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  mobileConnector: {
    width: 2,
    flex: 1,
    minHeight: 24,
    background: "var(--border-landing, #E7E5E4)",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 4,
    marginBottom: 4,
  },
  mobileConnectorFill: {
    width: "100%",
    borderRadius: 2,
  },
  mobileLoopArrow: {
    marginTop: 4,
    opacity: 0.5,
  },
  mobileRight: {
    paddingTop: 6,
    paddingBottom: 20,
    flex: 1,
  },
  mobileStepNum: {
    fontFamily: "var(--font-hero, 'Advercase', sans-serif)",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: "var(--text-3, #A8A29E)",
    opacity: 0.3,
    marginBottom: 2,
    lineHeight: 1,
  },
  mobileStepLabel: {
    fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 1.3,
    marginBottom: 4,
  },
  mobileStepDesc: {
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: 13,
    color: "var(--text-2, #57534E)",
    lineHeight: 1.5,
  },

  /* ---- Capabilities ticker ---- */
  tickerSection: {
    paddingTop: 48,
    borderTop: "1px solid var(--border-landing, #E7E5E4)",
  },
  tickerLabel: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "var(--text-3, #A8A29E)",
    textAlign: "center" as const,
    marginBottom: 20,
  },
  tickerWrap: {
    position: "relative" as const,
    overflow: "hidden",
  },
  tickerFadeLeft: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: 60,
    height: "100%",
    background: "linear-gradient(to right, var(--bg-page, #F4F3F0), transparent)",
    zIndex: 1,
    pointerEvents: "none" as const,
  },
  tickerFadeRight: {
    position: "absolute" as const,
    top: 0,
    right: 0,
    width: 60,
    height: "100%",
    background: "linear-gradient(to left, var(--bg-page, #F4F3F0), transparent)",
    zIndex: 1,
    pointerEvents: "none" as const,
  },
  tickerItem: {
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: 14,
    fontWeight: 500,
    color: "var(--text-2, #57534E)",
    whiteSpace: "nowrap" as const,
    display: "inline-flex",
    alignItems: "center",
    gap: 16,
    paddingRight: 16,
  },
  tickerDot: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "var(--accent)",
    opacity: 0.4,
    flexShrink: 0,
    display: "inline-block",
  },
};
