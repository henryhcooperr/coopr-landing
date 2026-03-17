import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'

// ---- Animated Counter ----

function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)
  const spring = useSpring(0, { stiffness: 60, damping: 30 })
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (!ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      spring.jump(value)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [spring, value])

  useEffect(() => {
    if (inView) spring.set(value)
  }, [inView, spring, value])

  return <motion.span ref={ref} className={className}>{display}</motion.span>
}

// ---- Social Proof Section ----

const STATS = [
  { value: 169, label: 'tools in the creative engine' },
  { value: 50, label: 'frames analyzed per video' },
  { value: 7, label: 'ML models trained on your data' },
]

export default function SocialProof() {
  return (
    <section className="social-proof-band">
      <div className="mx-auto max-w-[1100px] px-6 py-20">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center mb-16">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="social-proof-stat"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <AnimatedNumber
                value={stat.value}
                className="block font-display text-[clamp(3rem,6vw,4.5rem)] font-extrabold tracking-[-0.04em] leading-none text-white"
              />
              <div className="mt-2 text-sm text-[rgba(255,255,255,0.5)] tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Creator DNA teaser */}
        <div className="max-w-[420px] mx-auto text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.35)] mb-4">
            Coming soon
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2 tracking-[-0.02em]">
            Creator DNA
          </h3>
          <p className="text-sm text-[rgba(255,255,255,0.45)] mb-5">
            Enter your handle. See your content fingerprint.
          </p>
          <div className="flex items-center gap-2 max-w-[320px] mx-auto opacity-30 pointer-events-none">
            <input
              type="text"
              placeholder="@yourhandle"
              disabled
              className="flex-1 py-2.5 px-4 text-sm rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.4)] placeholder:text-[rgba(255,255,255,0.25)]"
            />
            <button
              disabled
              className="py-2.5 px-5 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.4)]"
            >
              Analyze
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
