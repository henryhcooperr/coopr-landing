import { useRef, useState, useEffect, type CSSProperties } from "react";

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="founder" style={styles.section}>
      <div style={styles.inner}>
        {/* --- Heading --- */}
        <h2
          style={{
            ...styles.heading,
            ...fadeReveal(visible, 0),
          }}
        >
          Built by a creator who got tired of{" "}
          <em className="font-accent" style={styles.fraunces}>
            guessing.
          </em>
        </h2>

        {/* --- Story paragraphs --- */}
        <div style={{ ...styles.storyBlock, ...fadeReveal(visible, 0.15) }}>
          <p style={styles.body}>
            I'm a content creator. I've spent years filming, editing, scripting
            &mdash;{" "}
            <strong style={styles.bold}>the full grind.</strong> But I was
            guessing. Which hooks hold people? What do my competitors do that I
            don't? When does my audience actually watch?{" "}
            <strong style={styles.bold}>No tool could tell me.</strong>
          </p>

          <p style={{ ...styles.body, marginTop: 24 }}>
            So I built one. Not to replace the creative work &mdash;{" "}
            <strong style={styles.bold}>
              to make every decision data-informed
            </strong>{" "}
            instead of gut-feel.
          </p>
        </div>

        {/* --- Divider --- */}
        <div
          style={{
            ...styles.divider,
            ...fadeReveal(visible, 0.35),
          }}
        />

        {/* --- Closing statement --- */}
        <p
          style={{
            ...styles.closing,
            ...fadeReveal(visible, 0.45),
          }}
        >
          COOPR is the tool I wish existed when I started.
          <br />
          Now it{" "}
          <em className="font-accent" style={styles.frauncesDoes}>
            does.
          </em>
        </p>

        {/* --- Subtle attribution divider --- */}
        <div
          style={{
            ...styles.attrDivider,
            ...fadeReveal(visible, 0.55),
          }}
        />

        {/* --- Author attribution --- */}
        <div
          style={{
            ...styles.attribution,
            ...fadeReveal(visible, 0.6),
          }}
        >
          <div style={styles.avatar} aria-hidden="true">
            <span style={styles.initials}>HC</span>
          </div>
          <div>
            <div className="font-display" style={styles.authorName}>
              Henry Cooper
            </div>
            <div style={styles.authorTitle}>@lensofcoop · Founder, Coopr Labs</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Opacity + translateY reveal helper ---------- */

function fadeReveal(
  isVisible: boolean,
  delaySeconds: number
): CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.8s cubic-bezier(0.65, 0.05, 0, 1) ${delaySeconds}s, transform 0.8s cubic-bezier(0.65, 0.05, 0, 1) ${delaySeconds}s`,
    willChange: "opacity, transform",
  };
}

/* ---------- Static styles ---------- */

const styles: Record<string, CSSProperties> = {
  section: {
    paddingTop: "clamp(48px, 6vh, 80px)",
    paddingBottom: "var(--section-padding)",
    paddingLeft: 24,
    paddingRight: 24,
    position: "relative",
  },
  inner: {
    maxWidth: 680,
    marginLeft: "auto",
    marginRight: "auto",
  },

  /* Heading */
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-0.04em",
    color: "var(--text)",
    margin: 0,
    textWrap: "balance" as CSSProperties["textWrap"],
  },

  /* Fraunces italic (used on "guessing.") */
  fraunces: {
    fontFamily: "var(--font-accent)",
    fontStyle: "italic",
    fontWeight: 400,
  },

  /* Story block container */
  storyBlock: {
    marginTop: 36,
  },

  /* Body paragraph */
  body: {
    fontFamily: "var(--font-body)",
    fontSize: 17,
    lineHeight: 1.75,
    color: "var(--text-2)",
    letterSpacing: "-0.01em",
    margin: 0,
  },

  /* Bold inline — promotes to primary text color */
  bold: {
    fontWeight: 600,
    color: "var(--text)",
  },

  /* Divider between story and closing */
  divider: {
    height: 1.5,
    background: "var(--text)",
    marginTop: 36,
    borderRadius: 1,
  },

  /* Closing statement */
  closing: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
    color: "var(--text)",
    margin: 0,
    paddingTop: 28,
  },

  /* Fraunces "does." — accent colored */
  frauncesDoes: {
    fontFamily: "var(--font-accent)",
    fontStyle: "italic",
    fontWeight: 400,
    color: "var(--accent)",
  },

  /* Subtle divider above attribution */
  attrDivider: {
    height: 1,
    background: "var(--border)",
    marginTop: 32,
  },

  /* Attribution row */
  attribution: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    paddingTop: 24,
  },

  /* Avatar circle */
  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #0a2540, #14758a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  /* Initials inside avatar */
  initials: {
    fontFamily: "var(--font-display)",
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
    letterSpacing: "0.02em",
  },

  /* Author name */
  authorName: {
    fontSize: 15,
    fontWeight: 700,
    color: "var(--text)",
    lineHeight: 1.3,
  },

  /* Author title */
  authorTitle: {
    fontSize: 13,
    color: "var(--text-3)",
    lineHeight: 1.3,
    marginTop: 1,
  },
};
