import { useEffect, useRef, useState, type CSSProperties } from "react";
import BlurHeading from "../components/ui/blur-heading";
import DNADemoFrame from "../components/demos/DNADemoFrame";
import VoiceDemoFrame from "../components/demos/VoiceDemoFrame";
import PulseDemoFrame from "../components/demos/PulseDemoFrame";
import NicheDemoFrame from "../components/demos/NicheDemoFrame";

/* ========================================================================== *
 * Step data
 * ========================================================================== */

const STEPS = [
  {
    number: "01",
    title: "Creative DNA",
    desc: "Your topics, style, and what makes you, you.",
  },
  {
    number: "02",
    title: "Voice Profile",
    desc: "8 dimensions of your voice. So every script sounds like you.",
  },
  {
    number: "03",
    title: "Performance",
    desc: "Tracks what works across your content.",
  },
  {
    number: "04",
    title: "Niche Position",
    desc: "Maps your strengths against the competition.",
  },
] as const;

const TIMELINE = [
  {
    day: "DAY 1",
    title: "Discovers",
    desc: "Analyzes your content and finds patterns",
  },
  {
    day: "DAY 30",
    title: "Knows you",
    desc: "Predicts what will land before you film it",
  },
  {
    day: "DAY 90",
    title: "Creative director",
    desc: "Every suggestion tuned to your voice and niche",
  },
] as const;

/* ========================================================================== *
 * Component
 * ========================================================================== */

export default function LearnSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ---- Detect mobile ---- */
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    handler(mql);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  /* ---- Section-level in-view (for BlurHeading) ---- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionVisible(true);
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---- Timeline in-view ---- */
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimelineVisible(true);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---- Scroll-driven active step (IntersectionObserver on each frame) ---- */
  useEffect(() => {
    if (isMobile) return; // mobile uses tabs, not scroll

    const observers: IntersectionObserver[] = [];

    frameRefs.current.forEach((el, index) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(index);
        },
        {
          // Trigger when the frame enters the middle 40% of the viewport
          rootMargin: "-30% 0px -30% 0px",
          threshold: 0.1,
        },
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, [isMobile]);

  /* ---- Render helpers ---- */
  const DEMO_FRAMES = [DNADemoFrame, VoiceDemoFrame, PulseDemoFrame, NicheDemoFrame];

  return (
    <section id="learn" ref={sectionRef} style={styles.section}>
      {/* ---------- Header ---------- */}
      <div style={styles.header}>
        <span className="section-label">Your Creative Fingerprint</span>

        <BlurHeading
          words={[
            { text: "It" },
            { text: "learns" },
            { text: "how" },
            { text: "you", em: true },
            { text: "create." },
          ]}
          inView={sectionVisible}
        />

        <p className="section-body" style={{ textAlign: "center", margin: "20px auto 0" }}>
          Every video you post teaches COOPR something new. It builds a creative
          fingerprint unique to you — and it only gets sharper.
        </p>
      </div>

      {/* ---------- Sticky Scroll Area ---------- */}
      {isMobile ? (
        /* ---- Mobile: tabs + stacked frames ---- */
        <div style={styles.mobileWrapper}>
          {/* Horizontal tab strip */}
          <div style={styles.mobileTabs}>
            {STEPS.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(i)}
                style={{
                  ...styles.mobileTab,
                  borderBottom:
                    activeStep === i
                      ? "2px solid var(--accent, #0D9488)"
                      : "2px solid transparent",
                  color:
                    activeStep === i
                      ? "var(--accent, #0D9488)"
                      : "var(--text-3, #A8A29E)",
                }}
              >
                <span style={styles.mobileTabNumber}>{step.number}</span>
                <span style={styles.mobileTabTitle}>{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active step description */}
          <p
            style={{
              fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
              fontSize: 14,
              color: "var(--text-2, #57534E)",
              textAlign: "center",
              margin: "16px 0 20px",
              lineHeight: 1.6,
            }}
          >
            {STEPS[activeStep].desc}
          </p>

          {/* Active demo frame */}
          <div style={{ maxWidth: 400, margin: "0 auto" }}>
            {DEMO_FRAMES.map((Frame, i) => (
              <div
                key={i}
                style={{
                  display: activeStep === i ? "block" : "none",
                }}
              >
                <Frame active={activeStep === i} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ---- Desktop: sticky left + scrolling right ---- */
        <div className="sticky-scroll-container">
          {/* Left: sticky step list */}
          <div className="sticky-scroll-left">
            <div style={styles.stepList}>
              {STEPS.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <div
                    key={step.number}
                    style={{
                      ...styles.step,
                      borderLeftColor: isActive
                        ? "var(--accent, #0D9488)"
                        : "transparent",
                      opacity: isActive ? 1 : 0.4,
                    }}
                  >
                    <div
                      style={{
                        ...styles.stepNumber,
                        color: isActive
                          ? "var(--accent, #0D9488)"
                          : "var(--text-3, #A8A29E)",
                      }}
                    >
                      {step.number}
                    </div>
                    <div style={styles.stepTitle}>{step.title}</div>
                    <div style={styles.stepDesc}>{step.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: scrolling demo frames */}
          <div className="sticky-scroll-right">
            {DEMO_FRAMES.map((Frame, i) => (
              <div
                key={i}
                ref={(el) => { frameRefs.current[i] = el; }}
                style={styles.frameContainer}
              >
                <div style={{ width: "100%", maxWidth: 520 }}>
                  <Frame active={activeStep === i} />
                </div>
              </div>
            ))}
            {/* Bottom spacer so last frame can reach center */}
            <div style={{ height: "6vh" }} />
          </div>
        </div>
      )}

      {/* ---------- Day Timeline ---------- */}
      <div ref={timelineRef} style={styles.timelineWrapper}>
        {/* Connecting line */}
        <div style={styles.timelineLine}>
          <div
            style={{
              height: "100%",
              background: "var(--accent, #0D9488)",
              borderRadius: 2,
              width: timelineVisible ? "100%" : "0%",
              transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>

        {/* Timeline items */}
        <div style={styles.timelineItems}>
          {TIMELINE.map((item, i) => (
            <div
              key={item.day}
              style={{
                ...styles.timelineItem,
                opacity: timelineVisible ? 1 : 0,
                transform: timelineVisible ? "none" : "translateY(12px)",
                transition:
                  "opacity 0.6s var(--ease-premium, ease), transform 0.6s var(--ease-premium, ease)",
                transitionDelay: `${0.3 + i * 0.2}s`,
              }}
            >
              {/* Dot */}
              <div style={styles.timelineDot}>
                <div
                  style={{
                    ...styles.timelineDotInner,
                    transform: timelineVisible ? "scale(1)" : "scale(0)",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${0.4 + i * 0.2}s`,
                  }}
                />
              </div>

              {/* Text */}
              <span style={styles.timelineDay}>{item.day}</span>
              <span style={styles.timelineTitle}>{item.title}</span>
              <span style={styles.timelineDesc}>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== *
 * Styles
 * ========================================================================== */

const styles: Record<string, CSSProperties> = {
  /* Section */
  section: {
    maxWidth: 1100,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "var(--section-padding, 120px)",
    paddingBottom: "clamp(40px, 6vh, 80px)",
    paddingLeft: 24,
    paddingRight: 24,
    position: "relative",
  },

  /* Header */
  header: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 48,
  },

  /* ---------- Sticky scroll (desktop) ---------- */
  stickyContainer: {
    display: "flex",
    gap: 40,
    position: "relative",
  },
  stickyLeft: {
    width: "35%",
    position: "sticky",
    top: 100,
    height: "fit-content",
    flexShrink: 0,
    alignSelf: "flex-start",
  },
  scrollingRight: {
    width: "65%",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    paddingTop: "5vh",
  },
  frameContainer: {
    minHeight: "45vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: "2vh",
    paddingBottom: "2vh",
  },

  /* ---------- Step list ---------- */
  stepList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  step: {
    borderLeft: "3px solid transparent",
    paddingLeft: 16,
    paddingTop: 12,
    paddingBottom: 12,
    transition:
      "border-color 0.3s ease, opacity 0.3s ease",
  },
  stepNumber: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.04em",
    marginBottom: 4,
    transition: "color 0.3s ease",
  },
  stepTitle: {
    fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
    fontSize: 18,
    fontWeight: 700,
    color: "var(--text, #1C1917)",
    lineHeight: 1.3,
    marginBottom: 4,
  },
  stepDesc: {
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: 14,
    color: "var(--text-2, #57534E)",
    lineHeight: 1.5,
  },

  /* ---------- Mobile ---------- */
  mobileWrapper: {
    marginBottom: 48,
  },
  mobileTabs: {
    display: "flex",
    gap: 0,
    overflowX: "auto",
    borderBottom: "1px solid var(--border, #E7E5E4)",
    marginBottom: 0,
    WebkitOverflowScrolling: "touch",
  },
  mobileTab: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    padding: "10px 8px",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "border-color 0.2s ease, color 0.2s ease",
    whiteSpace: "nowrap",
    minWidth: 0,
  },
  mobileTabNumber: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.04em",
  },
  mobileTabTitle: {
    fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
    fontSize: 13,
    fontWeight: 600,
  },

  /* ---------- Timeline ---------- */
  timelineWrapper: {
    marginTop: 16,
    position: "relative",
    paddingTop: 24,
  },
  timelineLine: {
    position: "absolute",
    top: 24,
    left: "10%",
    right: "10%",
    height: 2,
    background: "rgba(13, 148, 136, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  timelineItems: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    paddingTop: 0,
  },
  timelineItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    flex: 1,
    maxWidth: 220,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#0D9488",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    position: "relative",
    zIndex: 1,
  },
  timelineDotInner: {
    width: 0,
    height: 0,
  },
  timelineDay: {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: "var(--accent, #0D9488)",
    marginBottom: 6,
  },
  timelineTitle: {
    fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
    fontSize: 16,
    fontWeight: 700,
    color: "var(--text, #1C1917)",
    marginBottom: 6,
    lineHeight: 1.3,
  },
  timelineDesc: {
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontSize: 13,
    color: "var(--text-2, #57534E)",
    lineHeight: 1.5,
    maxWidth: 180,
  },
};
