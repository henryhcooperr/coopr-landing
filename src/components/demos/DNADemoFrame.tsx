import { motion } from "motion/react";

interface DNADemoFrameProps {
  active?: boolean;
  className?: string;
}

const WORDS = [
  { text: "Plating", size: 34, color: "var(--amber, #D97706)" },
  { text: "Natural light", size: 18, color: "var(--accent, #0D9488)" },
  { text: "Warm tones", size: 28, color: "var(--violet, #7C3AED)" },
  { text: "Recipe dev", size: 40, color: "var(--accent, #0D9488)" },
  { text: "Overhead shots", size: 15, color: "var(--text-3, #999999)" },
  { text: "Storytelling", size: 22, color: "var(--rose, #E11D48)" },
  { text: "Seasonal", size: 16, color: "var(--blue, #2563EB)" },
  { text: "Comfort food", size: 26, color: "var(--amber, #D97706)" },
  { text: "Conversational", size: 19, color: "var(--violet, #7C3AED)" },
  { text: "Process shots", size: 14, color: "var(--text-3, #999999)" },
  { text: "Farm-to-table", size: 21, color: "var(--accent, #0D9488)" },
  { text: "Tutorial", size: 16, color: "var(--blue, #2563EB)" },
  { text: "Slow food", size: 24, color: "var(--emerald, #16A34A)" },
  { text: "Minimalist", size: 13, color: "var(--text-3, #999999)" },
];

export default function DNADemoFrame({
  active = false,
  className,
}: DNADemoFrameProps) {
  return (
    <div
      className={className}
      style={{
        background: "#FFFFFF",
        border: "1px solid var(--border, #E4E2DD)",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          background: "var(--bg-section-alt, #F8F8F6)",
          borderBottom: "1px solid var(--border, #E4E2DD)",
        }}
      >
        {/* Browser dots */}
        <div style={{ display: "flex", gap: 5 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#E5E5E5",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#E5E5E5",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#E5E5E5",
            }}
          />
        </div>
        <span
          style={{
            fontFamily:
              "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
            fontSize: 11,
            fontWeight: 500,
            color: "var(--text-3, #999999)",
            letterSpacing: "0.02em",
          }}
        >
          COOPR / DNA / Wordcloud
        </span>
      </div>

      {/* Content area */}
      <div style={{ padding: "28px 20px" }}>
        {/* Wordcloud */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 0,
          }}
        >
          {WORDS.map((word, index) => (
            <motion.span
              key={word.text}
              initial={{ opacity: 0, filter: "blur(4px)", scale: 0.8 }}
              animate={
                active
                  ? { opacity: 1, filter: "blur(0px)", scale: 1 }
                  : { opacity: 0, filter: "blur(4px)", scale: 0.8 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                display: "inline-block",
                padding: "4px 2px",
                fontSize: word.size,
                color: word.color,
                fontFamily:
                  "'Bricolage Grotesque', 'Space Grotesk', sans-serif",
                fontWeight: 600,
                cursor: "default",
                lineHeight: 1.2,
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </div>

        {/* Metadata line */}
        <div
          style={{
            marginTop: 20,
            textAlign: "center",
            fontFamily:
              "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
            fontSize: 10,
            color: "var(--text-3, #999999)",
            letterSpacing: "0.01em",
          }}
        >
          157 signals analyzed from 48 videos{" "}
          <span style={{ color: "var(--teal, #0D9488)" }}>&middot;</span>{" "}
          Updated 2h ago
        </div>
      </div>
    </div>
  );
}
