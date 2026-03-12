import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { FLAGSHIP_STEPS } from '@/components/features/flagship-data'
import { FlagshipScene } from '@/components/features/flagship-scenes'
import { IconBadge } from '@/components/shared/ProductPrimitives'

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

function useScrollReveal(reducedMotion: boolean) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const els = Array.from(ref.current.querySelectorAll<HTMLElement>('.feat-reveal'))
    if (reducedMotion) {
      els.forEach(el => el.classList.add('vis'))
      return
    }

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' },
    )

    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [reducedMotion])

  return ref
}

function useActiveStoryStep(stepCount: number) {
  const [activeIndex, setActiveIndex] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const targets = stepRefs.current.slice(0, stepCount).filter(Boolean) as HTMLElement[]
    if (!targets.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visible.length) return
        const nextIndex = Number((visible[0].target as HTMLElement).dataset.stepIndex)
        if (!Number.isNaN(nextIndex)) setActiveIndex(nextIndex)
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: '-10% 0px -34% 0px',
      },
    )

    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [stepCount])

  return {
    activeIndex,
    registerStep: (index: number) => (el: HTMLElement | null) => {
      stepRefs.current[index] = el
    },
  }
}

function StoryCopy({ activeIndex, currentIndex }: { activeIndex: number; currentIndex: number }) {
  const step = FLAGSHIP_STEPS[currentIndex]
  const isActive = activeIndex === currentIndex

  return (
    <div className={cn('relative pl-12 transition-all duration-500', isActive ? 'opacity-100' : 'opacity-38 lg:translate-x-1')}>
      <div className="absolute left-0 top-1.5 flex flex-col items-center">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-mono font-semibold transition-all duration-500"
          style={{
            borderColor: isActive ? step.accent : 'var(--border-raw)',
            background: isActive ? step.accentSoft : 'white',
            color: isActive ? step.accent : 'var(--text-3)',
          }}
        >
          0{currentIndex + 1}
        </div>
        {currentIndex < FLAGSHIP_STEPS.length - 1 ? (
          <div className="mt-3 h-[calc(100%-1.75rem)] w-px bg-[linear-gradient(180deg,var(--border-raw),transparent)]" />
        ) : null}
      </div>

      <div className="flex min-h-[54vh] items-center py-8 lg:min-h-[58vh]">
        <div className="max-w-[340px]">
          <div className="mb-4 flex items-center gap-3">
            <IconBadge Icon={step.Icon} accent={step.accent} accentSoft={step.accentSoft} />
            <div className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: step.accent }}>
              {step.label}
            </div>
          </div>
          <h2 className="text-pretty font-display text-[clamp(1.95rem,3vw,2.9rem)] font-extrabold leading-[1] tracking-[-0.05em] text-[var(--text)]">
            {step.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-2)]">
            {step.proof}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {step.chips.map(chip => (
              <span key={chip} className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--text-2)]">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Features() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const wrapRef = useScrollReveal(prefersReducedMotion)
  const { activeIndex, registerStep } = useActiveStoryStep(FLAGSHIP_STEPS.length)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const activeStep = FLAGSHIP_STEPS[activeIndex]

  return (
    <div ref={wrapRef} className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div className="absolute left-[-4rem] top-20 h-[240px] w-[240px] rounded-full bg-[rgba(13,148,136,0.08)] blur-[120px]" />
        <div className="absolute right-[-4rem] top-24 h-[220px] w-[220px] rounded-full bg-[rgba(37,99,235,0.06)] blur-[120px]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-[var(--border-light)] bg-[var(--bg)]/82 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <a href="#" onClick={() => { window.location.hash = ''; window.scrollTo(0, 0) }} className="flex items-center gap-2 no-underline">
            <img src="/coopr-logo.png" alt="Coopr Labs" className="h-8" />
          </a>
          <div className="flex items-center gap-6">
            <a href="#" onClick={() => { window.location.hash = '' }} className="text-sm font-medium text-[var(--text-2)] no-underline transition-colors hover:text-[var(--text)]">
              Home
            </a>
            <a href="#cta" className="rounded-full bg-[var(--bg-dark)] px-5 py-2.5 font-body text-sm font-semibold text-[var(--text-inv)] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow)]">
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      <header className="relative mx-auto max-w-[860px] px-6 pb-14 pt-20 text-center lg:pb-16 lg:pt-24">
        <div className="feat-reveal opacity-0 translate-y-5 transition-all duration-700 ease-out [&.vis]:translate-y-0 [&.vis]:opacity-100">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(13,148,136,0.12)] bg-white/86 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--teal)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
            Flagship product tour
          </div>
          <h1 className="mx-auto max-w-[760px] text-balance font-display text-[clamp(2.8rem,6vw,4.8rem)] font-extrabold leading-[0.96] tracking-[-0.06em]">
            Four product moves from signal to post.
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-[16px] leading-relaxed text-[var(--text-2)] sm:text-[17px]">
            A shorter, quieter walkthrough of how Coopr discovers the angle, checks it against your profile, ranks what to say, and ships it into the right slot.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-[1180px] px-6 pb-20 lg:pb-24">
        <div className="feat-reveal opacity-0 translate-y-5 transition-all duration-700 ease-out [&.vis]:translate-y-0 [&.vis]:opacity-100">
          <div className="mb-6 max-w-[460px]">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-3)]">The core story</div>
            <div className="mt-2 text-[15px] leading-relaxed text-[var(--text-2)]">
              Four chapters only. No second act. No extra product taxonomy layered underneath.
            </div>
          </div>

          <div className="hidden gap-10 lg:grid lg:grid-cols-[minmax(0,410px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,430px)_minmax(0,1fr)]">
            <div>
              {FLAGSHIP_STEPS.map((_, idx) => (
                <section key={FLAGSHIP_STEPS[idx].key} ref={registerStep(idx)} data-step-index={idx}>
                  <StoryCopy activeIndex={activeIndex} currentIndex={idx} />
                </section>
              ))}
            </div>

            <div className="relative">
              <div className="sticky top-24 space-y-3">
                <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-raw)] bg-white px-4 py-2 shadow-[0_10px_24px_rgba(17,17,17,0.04)]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: activeStep.accent }}>
                    {activeStep.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-3)]">0{activeIndex + 1} / 04</span>
                </div>
                <div key={activeStep.key} className="feat-reveal vis ft-panel-enter">
                  <FlagshipScene stepKey={activeStep.key} animate={!prefersReducedMotion} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:hidden">
            {FLAGSHIP_STEPS.map(step => (
              <article key={step.key} className="rounded-[28px] border border-[var(--border-light)] bg-white/92 p-5 shadow-[0_16px_40px_rgba(17,17,17,0.05)]">
                <div className="mb-5 flex items-center gap-3">
                  <IconBadge Icon={step.Icon} accent={step.accent} accentSoft={step.accentSoft} />
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: step.accent }}>
                    {step.label}
                  </div>
                </div>
                <h2 className="text-balance font-display text-[2rem] font-extrabold leading-[1] tracking-[-0.05em] text-[var(--text)]">
                  {step.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-2)]">
                  {step.proof}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {step.chips.map(chip => (
                    <span key={chip} className="rounded-full border border-[var(--border-raw)] bg-[var(--bg)] px-3 py-1.5 text-xs font-medium text-[var(--text-2)]">
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <FlagshipScene stepKey={step.key} animate={!prefersReducedMotion} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[620px] px-6 py-20 text-center" id="cta">
        <div className="feat-reveal opacity-0 translate-y-5 transition-all duration-700 ease-out [&.vis]:translate-y-0 [&.vis]:opacity-100">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--teal)]">See your first workflow in motion</div>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,4vw,2.8rem)] font-extrabold leading-[1.02] tracking-[-0.05em]">
            Ready to see what your data <em className="font-accent not-italic font-normal text-[var(--teal)]">actually says?</em>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-2)]">
            Join the waitlist. We will show you what Coopr sees in your first 10 videos, not just hand you a blank dashboard.
          </p>
          <a href="#" onClick={() => { window.location.hash = ''; setTimeout(() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }), 100) }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--bg-dark)] px-8 py-3.5 font-body text-[15px] font-semibold text-[var(--text-inv)] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow)]">
            Join the Waitlist
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="#FAFAF9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>

      <footer className="border-t border-[var(--border-raw)] py-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 text-center text-xs text-[var(--text-3)] sm:flex-row sm:text-left">
          <span>&copy; 2026 Coopr Labs. Built in California.</span>
          <div className="flex items-center gap-5">
            <a href="#/privacy" className="text-[var(--text-3)] no-underline hover:text-[var(--text)]">Privacy</a>
            <a href="#/terms" className="text-[var(--text-3)] no-underline hover:text-[var(--text)]">Terms</a>
            <a href="#/data-deletion" className="text-[var(--text-3)] no-underline hover:text-[var(--text)]">Data Deletion</a>
            <a href="mailto:henry@getcoopr.com" className="text-[var(--text-3)] no-underline hover:text-[var(--text)]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
