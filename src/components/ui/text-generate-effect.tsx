import { useEffect, useRef, useState } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "./cn";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsArray = words.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasTriggered) {
            setHasTriggered(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;

    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.2),
      }
    );
  }, [hasTriggered, animate, duration, filter]);

  return (
    <div className={cn("font-bold", className)} ref={containerRef}>
      <div className="mt-4">
        <div
          className="leading-snug tracking-wide"
          ref={scope}
        >
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              className="opacity-0 inline-block"
              style={{
                filter: filter ? "blur(10px)" : "none",
                marginRight: idx < wordsArray.length - 1 ? "0.25em" : undefined,
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TextGenerateEffect;
