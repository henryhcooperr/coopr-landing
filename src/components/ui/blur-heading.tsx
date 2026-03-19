interface BlurHeadingProps {
  words: Array<{ text: string; em?: boolean }>;
  inView: boolean;
  className?: string;
}

/**
 * Blur heading animation ported from the COOPR landing page.
 *
 * Each word starts blurred (`filter: blur(8px)`, `opacity: 0`, `translateY(6px)`)
 * and transitions to clear with staggered delays (0.06s per word).
 * Words marked with `em: true` render in Fraunces italic via the `font-accent` class.
 */
export function BlurHeading({
  words,
  inView,
  className = "",
}: BlurHeadingProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0 0.3em",
        justifyContent: "center",
        fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
        fontWeight: 800,
        fontSize: "clamp(2rem, 4.5vw, 3rem)",
        lineHeight: 1.08,
        letterSpacing: "-0.04em",
      }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            opacity: inView ? 1 : 0,
            filter: inView ? "blur(0)" : "blur(8px)",
            transform: inView ? "none" : "translateY(6px)",
            transition:
              "opacity 0.5s ease, filter 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: `${i * 0.06}s`,
          }}
        >
          {w.em ? (
            <em
              className="font-accent"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--teal, #0D9488)",
              }}
            >
              {w.text}
            </em>
          ) : (
            w.text
          )}
        </span>
      ))}
    </div>
  );
}

export default BlurHeading;
