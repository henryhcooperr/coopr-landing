import { useEffect, useRef, useState, useCallback } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  /** When provided, triggers animation externally instead of using IntersectionObserver */
  triggerOnView?: boolean;
}

/** easeOutQuart: fast start, slow finish */
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function formatNumber(n: number, decimals: number): string {
  return n.toFixed(decimals);
}

/**
 * An animated counter that counts up from 0 to `value`.
 * Uses requestAnimationFrame with easeOutQuart easing.
 * Triggers animation when scrolled into view via IntersectionObserver.
 */
export function AnimatedNumber({
  value,
  duration = 1000,
  decimals = 0,
  className = "",
  prefix = "",
  suffix = "",
  triggerOnView,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(formatNumber(0, decimals));
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = value * eased;

      setDisplay(formatNumber(current, decimals));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(formatNumber(value, decimals));
      }
    }

    requestAnimationFrame(tick);
  }, [value, duration, decimals]);

  // External trigger mode: animate when triggerOnView becomes true
  useEffect(() => {
    if (triggerOnView === undefined) return;
    if (!triggerOnView || hasAnimated.current) return;

    const noMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (noMotion) {
      setDisplay(formatNumber(value, decimals));
      hasAnimated.current = true;
      return;
    }

    animate();
  }, [triggerOnView, value, decimals, animate]);

  // IntersectionObserver mode: only used when triggerOnView is not provided
  useEffect(() => {
    if (triggerOnView !== undefined) return;

    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const noMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (noMotion) {
      setDisplay(formatNumber(value, decimals));
      hasAnimated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView, value, decimals, animate]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default AnimatedNumber;
