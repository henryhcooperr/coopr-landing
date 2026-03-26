import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { NumberTicker } from "@/components/ui/number-ticker";
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
    Frame: DNADemoFrame,
  },
  {
    number: "02",
    title: "Voice Profile",
    desc: "8 dimensions of your voice. So every script sounds like you.",
    Frame: VoiceDemoFrame,
  },
  {
    number: "03",
    title: "Performance",
    desc: "Tracks what works across your content.",
    Frame: PulseDemoFrame,
  },
  {
    number: "04",
    title: "Niche Position",
    desc: "Maps your strengths against the competition.",
    Frame: NicheDemoFrame,
  },
] as const;

const TIMELINE = [
  {
    day: 1,
    label: "Discovers",
    desc: "Analyzes your content and finds patterns",
  },
  {
    day: 30,
    label: "Knows you",
    desc: "Predicts what will land before you film it",
  },
  {
    day: 90,
    label: "Creative director",
    desc: "Every suggestion tuned to your voice and niche",
  },
] as const;

const EASE_SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ========================================================================== *
 * Component
 * ========================================================================== */

export default function LearnSection() {
  return (
    <section
      id="learn"
      className="relative mx-auto px-6"
      style={{
        maxWidth: 1100,
        paddingTop: "var(--section-padding, 120px)",
        paddingBottom: "clamp(40px, 6vh, 80px)",
      }}
    >
      {/* ---------- Header ---------- */}
      <div className="flex flex-col items-center text-center mb-16">
        <BlurFade delay={0} inView>
          <span className="section-label">Your Creative Fingerprint</span>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--text, #1C1917)",
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            It learns{" "}
            <span
              className="font-accent italic"
              style={{ color: "var(--brand, oklch(0.62 0.16 65))" }}
            >
              you.
            </span>
          </h2>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p
            className="section-body"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            Every video you post teaches COOPR something new. It builds a
            creative fingerprint unique to you — and it only gets sharper.
          </p>
        </BlurFade>
      </div>

      {/* ---------- Steps: 2-column grid ---------- */}
      <div className="flex flex-col gap-12 md:gap-20">
        {STEPS.map((step, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE_SPRING }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                !isEven ? "md:[direction:rtl]" : ""
              }`}
            >
              {/* Card side */}
              <div className={!isEven ? "md:[direction:ltr]" : ""}>
                <MagicCard
                  className="rounded-2xl"
                  gradientColor="oklch(0.62 0.16 65 / 0.15)"
                >
                  <div className="p-8 md:p-10">
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        color: "var(--brand, oklch(0.62 0.16 65))",
                        textTransform: "uppercase",
                      }}
                    >
                      Step {step.number}
                    </span>

                    <h3
                      className="font-display"
                      style={{
                        fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.75rem)",
                        fontWeight: 700,
                        color: "var(--text, #1C1917)",
                        lineHeight: 1.2,
                        marginTop: 8,
                        marginBottom: 8,
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="font-body"
                      style={{
                        fontSize: "clamp(0.875rem, 1vw + 0.25rem, 1rem)",
                        color: "var(--text-2, #57534E)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </MagicCard>
              </div>

              {/* Demo frame side */}
              <div className={!isEven ? "md:[direction:ltr]" : ""}>
                <BlurFade delay={0.15 + i * 0.05} inView>
                  <div style={{ maxWidth: 520 }}>
                    <step.Frame active />
                  </div>
                </BlurFade>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ---------- Day Timeline ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE_SPRING }}
        className="relative mt-24 md:mt-32"
      >
        {/* Connecting line */}
        <div
          className="absolute top-[24px] overflow-hidden rounded-sm"
          style={{
            left: "10%",
            right: "10%",
            height: 2,
            background: "oklch(0.62 0.16 65 / 0.2)",
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_SPRING, delay: 0.2 }}
            style={{
              height: "100%",
              background: "var(--brand, oklch(0.62 0.16 65))",
              borderRadius: 2,
              transformOrigin: "left center",
            }}
          />
        </div>

        {/* Timeline items */}
        <div className="flex justify-between relative">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: EASE_SPRING,
                delay: 0.3 + i * 0.2,
              }}
              className="flex flex-col items-center text-center flex-1"
              style={{ maxWidth: 220 }}
            >
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SPRING,
                  delay: 0.4 + i * 0.2,
                }}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "var(--brand, oklch(0.62 0.16 65))",
                  marginBottom: 14,
                  position: "relative",
                  zIndex: 1,
                }}
              />

              {/* Day number */}
              <span
                className="font-mono"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--brand, oklch(0.62 0.16 65))",
                  marginBottom: 6,
                }}
              >
                DAY <NumberTicker value={item.day} delay={0.5 + i * 0.3} />
              </span>

              {/* Title */}
              <span
                className="font-display"
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--text, #1C1917)",
                  marginBottom: 6,
                  lineHeight: 1.3,
                }}
              >
                {item.label}
              </span>

              {/* Description */}
              <span
                className="font-body"
                style={{
                  fontSize: 13,
                  color: "var(--text-2, #57534E)",
                  lineHeight: 1.5,
                  maxWidth: 180,
                }}
              >
                {item.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
