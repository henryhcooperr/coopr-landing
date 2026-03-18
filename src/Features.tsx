import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { FLAGSHIP_STEPS } from '@/components/features/flagship-data'
import { FlagshipScene, type PlannerPreviewKey } from '@/components/features/flagship-scenes'
import { IconBadge } from '@/components/shared/ProductPrimitives'
import { BrandLockup, HeaderActionCluster } from '@/components/shared/Brand'

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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function useStoryTimeline(stepCount: number) {
  const [timeline, setTimeline] = useState(() => ({
    activeIndex: 0,
    sceneWeights: Array.from({ length: stepCount }, (_, index) => (index === 0 ? 1 : 0)),
    sceneProgresses: Array.from({ length: stepCount }, () => 0),
  }))
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const targets = stepRefs.current.slice(0, stepCount)
      if (targets.some(target => !target)) return

      const viewportAnchor = window.scrollY + Math.min(window.innerHeight * 0.2, 180)
      const positions = targets.map(target => window.scrollY + (target?.getBoundingClientRect().top ?? 0))
      const heights = targets.map(target => target?.offsetHeight ?? window.innerHeight * 0.6)

      let segmentIndex = 0
      for (let index = 0; index < positions.length - 1; index += 1) {
        if (viewportAnchor >= positions[index + 1]) segmentIndex = index + 1
      }

      const segmentStart = positions[segmentIndex] ?? positions[0] ?? viewportAnchor
      const rawSegmentEnd = segmentIndex < positions.length - 1
        ? positions[segmentIndex + 1]
        : segmentStart + Math.max(heights[segmentIndex] * 0.72, window.innerHeight * 0.5)
      const segmentEnd = rawSegmentEnd <= segmentStart ? segmentStart + 1 : rawSegmentEnd
      const transitionProgress = clamp((viewportAnchor - segmentStart) / (segmentEnd - segmentStart), 0, 1)
      const nextIndex = Math.min(segmentIndex + 1, stepCount - 1)
      const activeIndex = nextIndex !== segmentIndex && transitionProgress > 0.74 ? nextIndex : segmentIndex

      const sceneWeights = Array.from({ length: stepCount }, () => 0)
      const sceneProgresses = Array.from({ length: stepCount }, () => 0)

      for (let index = 0; index < segmentIndex; index += 1) {
        sceneProgresses[index] = 1
      }
      sceneProgresses[segmentIndex] = transitionProgress
      if (nextIndex !== segmentIndex) {
        sceneProgresses[nextIndex] = transitionProgress
      }

      if (segmentIndex === nextIndex) {
        sceneWeights[segmentIndex] = 1
      } else {
        sceneWeights[segmentIndex] = 1 - transitionProgress
        sceneWeights[nextIndex] = transitionProgress
      }

      setTimeline(prev => {
        const sameActive = prev.activeIndex === activeIndex
        const sameWeights = prev.sceneWeights.every((value, index) => Math.abs(value - sceneWeights[index]) < 0.001)
        const sameProgress = prev.sceneProgresses.every((value, index) => Math.abs(value - sceneProgresses[index]) < 0.001)
        if (sameActive && sameWeights && sameProgress) return prev
        return { activeIndex, sceneWeights, sceneProgresses }
      })
    }

    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [stepCount])

  return {
    ...timeline,
    registerStep: (index: number) => (el: HTMLElement | null) => {
      stepRefs.current[index] = el
    },
  }
}

function StoryCopy({
  activeIndex,
  currentIndex,
  plannerPreview,
  onPlannerPreviewChange,
}: {
  activeIndex: number
  currentIndex: number
  plannerPreview: PlannerPreviewKey
  onPlannerPreviewChange: (next: PlannerPreviewKey) => void
}) {
  const step = FLAGSHIP_STEPS[currentIndex]
  const isActive = activeIndex === currentIndex
  const plannerChipMap: Record<string, PlannerPreviewKey> = {
    'Scene editor': 'editor',
    'Shot storyboard': 'storyboard',
    'Production plan': 'plan',
  }

  return (
      <div className={cn('relative pl-12 transition-all duration-500', isActive ? 'opacity-100' : 'opacity-24 lg:translate-x-1')}>
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

      <div className={cn(
        'flex items-center py-7 lg:py-8',
        currentIndex < 2 ? 'min-h-[31vh] lg:min-h-[35vh]' : 'min-h-[16vh] lg:min-h-[18vh]'
      )}>
        <div className="max-w-[228px] xl:max-w-[244px]">
          <div className="mb-4 flex items-center gap-3">
            <IconBadge Icon={step.Icon} accent={step.accent} accentSoft={step.accentSoft} />
            <div className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: step.accent }}>
              {step.label}
            </div>
          </div>
          <h2 className={cn(
            'text-pretty font-display font-extrabold leading-[1] tracking-[-0.05em] text-[var(--text)]',
            currentIndex < 2 ? 'text-[clamp(1.95rem,3vw,2.9rem)]' : 'text-[clamp(1.6rem,2.4vw,2.2rem)]'
          )}>
            {step.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-2)]">
            {step.proof}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {step.chips.map(chip => (
              step.key === 'planner' ? (
                <button
                  key={chip}
                  type="button"
                  onClick={() => onPlannerPreviewChange(plannerChipMap[chip])}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                    plannerPreview === plannerChipMap[chip]
                      ? 'border-[rgba(71,85,105,0.18)] bg-[rgba(71,85,105,0.10)] text-[var(--slate)]'
                      : 'border-[var(--border-raw)] bg-white text-[var(--text-2)]'
                  )}
                >
                  {chip}
                </button>
              ) : (
                <span key={chip} className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--text-2)]">
                  {chip}
                </span>
              )
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
  const { activeIndex, sceneProgresses, registerStep } = useStoryTimeline(FLAGSHIP_STEPS.length)
  const [plannerPreview, setPlannerPreview] = useState<PlannerPreviewKey>('editor')

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
        <div className="mx-auto flex h-[72px] max-w-[1380px] items-center justify-between px-6">
          <a href="#" onClick={() => { window.location.hash = ''; window.scrollTo(0, 0) }} className="flex items-center gap-2 no-underline">
            <BrandLockup />
          </a>
          <HeaderActionCluster
            primaryHref="#"
            primaryLabel="Home"
            secondaryHref="#cta"
            secondaryLabel="Join Waitlist"
            onPrimaryClick={() => { window.location.hash = '' }}
          />
        </div>
      </nav>

      <header className="relative mx-auto max-w-[980px] px-6 pb-14 pt-20 text-center lg:pb-16 lg:pt-24">
        <div className="feat-reveal opacity-0 translate-y-5 transition-all duration-700 ease-out [&.vis]:translate-y-0 [&.vis]:opacity-100">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(13,148,136,0.12)] bg-white/86 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--teal)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
            Workflow preview
          </div>
          <h1 className="mx-auto max-w-[760px] text-balance font-display text-[clamp(2.8rem,6vw,4.8rem)] font-extrabold leading-[0.96] tracking-[-0.06em]">
            Watch one reel move from angle to post.
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-[16px] leading-relaxed text-[var(--text-2)] sm:text-[17px]">
            The same angle becomes a draft, a shot plan, and a publish decision inside one workspace.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-[1380px] px-6 pb-16 lg:pb-[12vh]">
        <div className="feat-reveal opacity-0 translate-y-5 transition-all duration-700 ease-out [&.vis]:translate-y-0 [&.vis]:opacity-100">
          <div className="mb-6 max-w-[460px]">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-3)]">The core story</div>
            <div className="mt-2 text-[15px] leading-relaxed text-[var(--text-2)]">
              One creator workflow. Four real product moves. No extra taxonomy layered underneath.
            </div>
          </div>

          <div className="hidden gap-10 lg:grid lg:grid-cols-[minmax(0,244px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
            <div>
              {FLAGSHIP_STEPS.map((_, idx) => (
                <section key={FLAGSHIP_STEPS[idx].key} ref={registerStep(idx)} data-step-index={idx}>
                  <StoryCopy
                    activeIndex={activeIndex}
                    currentIndex={idx}
                    plannerPreview={plannerPreview}
                    onPlannerPreviewChange={setPlannerPreview}
                  />
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
                <div className="feat-reveal vis relative h-[590px] xl:h-[610px]">
                  <div>
                    <FlagshipScene
                      stepKey={activeStep.key}
                      animate={!prefersReducedMotion}
                      progress={sceneProgresses[activeIndex]}
                      plannerPreview={plannerPreview}
                      onPlannerPreviewChange={setPlannerPreview}
                    />
                  </div>
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
                    step.key === 'planner' ? (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setPlannerPreview(chip === 'Scene editor' ? 'editor' : chip === 'Shot storyboard' ? 'storyboard' : 'plan')}
                        className={cn(
                          'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                          plannerPreview === (chip === 'Scene editor' ? 'editor' : chip === 'Shot storyboard' ? 'storyboard' : 'plan')
                            ? 'border-[rgba(71,85,105,0.18)] bg-[rgba(71,85,105,0.10)] text-[var(--slate)]'
                            : 'border-[var(--border-raw)] bg-[var(--bg)] text-[var(--text-2)]'
                        )}
                      >
                        {chip}
                      </button>
                    ) : (
                      <span key={chip} className="rounded-full border border-[var(--border-raw)] bg-[var(--bg)] px-3 py-1.5 text-xs font-medium text-[var(--text-2)]">
                        {chip}
                      </span>
                    )
                  ))}
                </div>
                <div className="mt-5">
                  <FlagshipScene
                    stepKey={step.key}
                    animate={!prefersReducedMotion}
                    plannerPreview={plannerPreview}
                    onPlannerPreviewChange={setPlannerPreview}
                  />
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
            <a href="#/devlog" className="text-[var(--text-3)] no-underline hover:text-[var(--text)]">Dev Log</a>
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
