import { useState, useEffect, useCallback, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { submitWaitlistEmail } from '@/lib/supabase'
import ChatDemo from '@/components/ChatDemo'
import { HomeHeroSignalField, HomeWorkflowRail } from '@/components/home/home-sections'
import { BrandLockup, HeaderActionCluster, HeroBrandStack } from '@/components/shared/Brand'
import BlurText from '@/components/home/BlurText'
import GlowPulseButton from '@/components/home/GlowPulseButton'

// ============================================
// SHARED: Waitlist Form (preserves Supabase integration)
// ============================================

function WaitlistForm({ submitted, onSubmit, email, setEmail, isSubmitting, variant = 'default' }: {
  submitted: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  email: string
  setEmail: (v: string) => void
  isSubmitting: boolean
  variant?: 'default' | 'cta'
}) {
  if (submitted) {
    return (
      <div className="animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-coopr-success-soft text-coopr-success-text px-4 py-2.5 rounded-xl text-[15px] font-medium">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          You're on the list. We'll be in touch.
        </div>
      </div>
    )
  }

  if (variant === 'cta') {
    return (
      <form onSubmit={onSubmit} className="flex items-center justify-center gap-[10px] max-w-[380px] mx-auto flex-wrap sm:flex-nowrap">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="flex-1 py-3.5 px-[18px] font-body text-sm border border-[var(--border-raw)] rounded-full bg-white text-[var(--text)] outline-none focus:border-[var(--teal)] w-full sm:w-auto"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 font-body text-[15px] font-semibold text-[var(--text-inv)] bg-[var(--bg-dark)] border-none py-3.5 px-7 rounded-full cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow)] disabled:opacity-50 w-full sm:w-auto justify-center"
        >
          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="h-11 rounded-xl border-input bg-white text-[15px] placeholder:text-coopr-soft focus-visible:ring-ring focus-visible:ring-1"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 px-6 rounded-xl bg-primary hover:bg-coopr-hover text-[15px] font-medium whitespace-nowrap w-full sm:w-auto"
      >
        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
      </Button>
    </form>
  )
}

// ============================================
// NAV SCROLL BEHAVIOR HOOK
// ============================================

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)
      setCompact(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrolled, compact }
}

// ============================================
// SCROLL REVEAL HOOK
// ============================================

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (noMotion) { setInView(true); return }

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setInView(true)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return { ref, inView }
}

// ============================================
// STAT COUNTER HOOK
// ============================================

function useCountUp(target: number, suffix: string, trigger: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    if (!trigger || counted.current || !ref.current) return
    counted.current = true
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (noMotion) {
      if (ref.current) ref.current.textContent = target + suffix
      return
    }

    const el = ref.current
    const start = performance.now()
    const dur = 1200
    function tick(now: number) {
      const p = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      el.textContent = Math.round(target * e) + suffix
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [trigger, target, suffix])

  return ref
}

// ============================================
// APP
// ============================================

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || isSubmitting) return
    setIsSubmitting(true)
    const { success, error } = await submitWaitlistEmail(email)
    if (success) {
      setSubmitted(true)
    } else {
      console.error('Waitlist submission failed:', error)
      setSubmitted(true)
    }
    setIsSubmitting(false)
  }, [email, isSubmitting])

  const formProps = { submitted, onSubmit: handleSubmit, email, setEmail, isSubmitting }
  const { scrolled, compact } = useNavScroll()

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* NAV — border reveals on scroll, compresses height past hero */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-200"
        style={{
          background: 'rgba(250,250,249,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${scrolled ? 'var(--border-light)' : 'transparent'}`,
        }}
      >
        <div
          className="flex items-center justify-between max-w-[1100px] mx-auto px-6 transition-all duration-200"
          style={{ height: compact ? '56px' : '72px' }}
        >
          <a href="#" className="hero-entrance flex items-center gap-[10px] no-underline text-[var(--text)]" style={{ animationDelay: '0ms' }}>
            <BrandLockup />
          </a>
          <div className="flex items-center gap-3">
            <a href="#/get-started" className="text-[13px] font-medium text-[var(--teal)] hover:text-[var(--teal-dark)] transition-colors no-underline hidden sm:inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
              Beta Tester? Log in
            </a>
            <HeaderActionCluster primaryHref="#/features" primaryLabel="Features" secondaryHref="#cta" secondaryLabel="Join Waitlist" />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <Hero />

      {/* SEPARATOR */}
      <div className="max-w-[680px] mx-auto px-6 flex items-center gap-4 text-[var(--text-3)]">
        <span className="flex-1 h-px bg-[var(--border-raw)]" />
        <span className="text-xl leading-none">&middot;</span>
        <span className="flex-1 h-px bg-[var(--border-raw)]" />
      </div>

      {/* CHAT DEMO */}
      <ChatDemo />

      {/* COMPACT WORKFLOW */}
      <HomeWorkflowRail />

      {/* FOUNDER */}
      <Founder />

      {/* CTA */}
      <section className="max-w-[700px] mx-auto px-6 pt-[60px] pb-[120px] text-center" id="cta">
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em] mb-3.5">
          Know before you <em className="font-accent italic font-normal text-[var(--teal)]">post.</em>
        </h2>
        <p className="text-base text-[var(--text-2)] mb-8">
          Join the beta. Agency-grade creative intelligence for individual creators. Spots are limited.
        </p>
        <WaitlistForm {...formProps} variant="cta" />
        <p className="text-xs text-[var(--text-3)] mt-3.5">Your data stays yours. No spam. No selling.</p>
      </section>

      {/* FOOTER */}
      <footer className="py-6 border-t border-[var(--border-light)]">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-[1100px] mx-auto px-6 text-xs text-[var(--text-3)] gap-2.5">
          <span>&copy; 2026 COOPR. Built in California.</span>
          <div className="flex gap-5">
            <a href="#/privacy" className="text-[var(--text-3)] no-underline text-xs hover:text-[var(--text-2)]">Privacy</a>
            <a href="#/terms" className="text-[var(--text-3)] no-underline text-xs hover:text-[var(--text-2)]">Terms</a>
            <a href="#/data-deletion" className="text-[var(--text-3)] no-underline text-xs hover:text-[var(--text-2)]">Data Deletion</a>
            <a href="mailto:henry@getcoopr.com" className="text-[var(--text-3)] no-underline text-xs hover:text-[var(--text-2)]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ============================================
// HERO SECTION
// ============================================

function Hero() {
  return (
    <section className="relative overflow-hidden pt-[140px] pb-[100px] text-center">
      <HomeHeroSignalField />
      <div className="relative max-w-[980px] mx-auto px-6">
        {/* T+200ms — Brand mark fades up */}
        <div className="hero-entrance" style={{ animationDelay: '200ms' }}>
          <HeroBrandStack />
        </div>

        {/* T+400ms — Eyebrow fades in */}
        <div className="hero-entrance inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--text-3)] mb-7" style={{ animationDelay: '400ms' }}>
          <span className="w-2 h-2 rounded-full bg-[var(--teal)]" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
          Creative Engine for Creators
        </div>

        {/* T+600ms — BlurText headline reveal, word by word */}
        <h1 className="font-display text-[clamp(3rem,6vw+0.5rem,5rem)] font-extrabold leading-none tracking-[-0.04em] text-[var(--text)] mb-7 max-w-[900px] mx-auto">
          <BlurText
            text="Your content has patterns."
            delay={80}
            stepDuration={0.4}
            animateBy="words"
            direction="bottom"
            className="justify-center font-display text-[clamp(3rem,6vw+0.5rem,5rem)] font-extrabold leading-none tracking-[-0.04em] text-[var(--text)]"
          />
          <span className="flex justify-center items-baseline gap-[0.25em] flex-wrap">
            <BlurText
              text="COOPR"
              delay={80}
              stepDuration={0.4}
              animateBy="words"
              direction="bottom"
              className="font-display text-[clamp(3rem,6vw+0.5rem,5rem)] font-extrabold leading-none tracking-[-0.04em] text-[var(--teal)]"
            />
            <BlurText
              text="finds them."
              delay={80}
              stepDuration={0.4}
              animateBy="words"
              direction="bottom"
              className="font-accent text-[clamp(3rem,6vw+0.5rem,5rem)] italic font-normal leading-none text-[var(--teal)]"
            />
          </span>
        </h1>

        {/* T+1500ms — Subtext fades up */}
        <p className="hero-entrance text-lg leading-[1.65] text-[var(--text-2)] max-w-[520px] mx-auto mb-11 tracking-[-0.01em]" style={{ animationDelay: '1500ms' }}>
          COOPR analyzes your videos, learns your voice, tracks your competitors, and tells you exactly what to create next.{' '}
          <span className="hi" data-tip="Henry Cooper, underwater filmmaker">Built by a creator who needed it.</span>
        </p>

        {/* T+1800ms — CTA springs in with glow */}
        <div className="hero-entrance-spring flex items-center justify-center gap-3.5 flex-wrap" style={{ animationDelay: '1800ms' }}>
          <GlowPulseButton
            href="#cta"
            glowColor="#0D9488"
            intensity={12}
            speed={3}
            className="inline-flex items-center gap-2 font-body text-[15px] font-semibold text-[var(--text-inv)] bg-[var(--bg-dark)] border-none py-3.5 px-7 rounded-full no-underline"
          >
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </GlowPulseButton>
          <a
            href="#product"
            className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-[var(--text-2)] no-underline transition-all duration-200 hover:text-[var(--text)] hover:gap-2.5"
          >
            See it in action
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        {/* T+2100ms — Beta link fades in */}
        <p className="hero-entrance mt-8 text-[13px] text-[var(--text-3)]" style={{ animationDelay: '2100ms' }}>
          Already have an invite?{' '}
          <a href="#/get-started" className="text-[var(--teal)] font-medium no-underline hover:underline underline-offset-2">
            Log in as a beta tester
          </a>
        </p>
      </div>
    </section>
  )
}

// ============================================
// BELIEFS SECTION
// ============================================

const BELIEFS = [
  {
    num: '01',
    title: 'Your creative instinct is the product. We protect it.',
    body: (
      <>
        The edit that makes it land, the hook that only <em>you</em> would write — that's irreplaceable. Coopr eliminates the{' '}
        <span className="hi" data-tip="Manual analysis, gut-feel timing, copying competitors blindly">busywork around it</span>{' '}
        so you stay in the creative zone.
      </>
    ),
  },
  {
    num: '02',
    title: (
      <>Every video you post makes Coopr smarter — for <em>you</em>.</>
    ),
    body: (
      <>
        Your data trains models on{' '}
        <span className="hi" data-tip="Ranked by predicted hold rate, trained on YOUR data">your audience</span>
        , not everyone else's. Hooks matched to your voice. Timing tuned to your viewers. It compounds over time.
      </>
    ),
  },
  {
    num: '03',
    title: 'No black boxes. You see every step.',
    body: (
      <>Every suggestion shows which tools ran, what data it used, and why it scored the way it did. You learn the <em>why</em> — not just the what.</>
    ),
  },
  {
    num: '04',
    title: 'Built on your content. Not templates.',
    body: (
      <>
        Most tools give every creator the{' '}
        <span className="hi" data-tip="Same prompts, same suggestions, same advice">same advice</span>.
        {' '}Coopr learns from your specific videos, your audience's behavior, your niche's patterns. The more you create, the sharper it gets.
      </>
    ),
  },
]

function Beliefs() {
  const { ref, inView } = useScrollReveal()

  return (
    <section className="max-w-[780px] mx-auto px-6 pb-20" ref={ref}>
      <div className="text-center font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--text-3)] mb-10">
        What we believe
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
        {BELIEFS.map((b, i) => (
          <div
            key={b.num}
            className={`pl-5 border-l-2 border-[var(--border-raw)] transition-[border-color] duration-300 hover:border-l-[var(--teal)] scroll-reveal ${inView ? 'in-view' : ''}`}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="font-mono text-[10px] font-semibold text-[var(--teal)] tracking-[0.05em] mb-2.5">{b.num}</div>
            <h3 className="font-display text-xl font-extrabold tracking-[-0.03em] leading-[1.15] mb-2.5">
              {b.title}
            </h3>
            <p className="text-sm leading-[1.7] text-[var(--text-2)]">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================
// FOUNDER SECTION
// ============================================

function Founder() {
  const { ref, inView } = useScrollReveal()

  return (
    <section ref={ref} className={`max-w-[700px] mx-auto px-6 pt-10 pb-[100px] scroll-reveal ${inView ? 'in-view' : ''}`}>
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] mb-6">
        Built by a creator who got tired of <em className="font-accent italic font-normal">guessing</em>
      </h2>

      <p className="text-[1.0625rem] leading-[1.75] text-[var(--text-2)] mb-5 tracking-[-0.01em]">
        I'm an underwater content creator. I've spent hundreds of hours diving, filming, color grading, scripting —{' '}
        <strong className="text-[var(--text)] font-semibold">the full grind.</strong> I love every second of it.
      </p>

      <p className="text-[1.0625rem] leading-[1.75] text-[var(--text-2)] mb-5 tracking-[-0.01em]">
        But I was guessing. Which hooks hold people? What do my competitors do that I don't? When does my audience actually watch?{' '}
        <strong className="text-[var(--text)] font-semibold">No tool could tell me.</strong>
      </p>

      <p className="text-[1.0625rem] leading-[1.75] text-[var(--text-2)] mb-5 tracking-[-0.01em]">
        So I built one. Not to replace the creative work — I'd never want that.{' '}
        <strong className="text-[var(--text)] font-semibold">To speed up my timeline</strong> and make every decision data-informed instead of gut-feel.
      </p>

      <div className="mt-8 pt-6 border-t-[3px] border-[var(--bg-dark)]">
        <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">
          Coopr is the tool I wish existed when I started.<br />
          Now it <em className="font-accent italic font-normal text-[var(--teal)]">does.</em>
        </h3>
      </div>

      <div className="mt-8 pt-5 border-t border-[var(--border-raw)] flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-sm font-extrabold text-white" style={{ background: 'linear-gradient(135deg, #0a2540, #14758a)' }}>
          HC
        </div>
        <div>
          <div className="font-display text-[0.9375rem] font-bold tracking-[-0.02em]">Henry Cooper</div>
          <div className="text-[0.8125rem] text-[var(--text-3)]">Founder, COOPR</div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// STATS SECTION
// ============================================

function Stats() {
  const { ref, inView } = useScrollReveal()

  const stat1 = useCountUp(4460, '', inView)
  const stat2 = useCountUp(131, '', inView)
  const stat3 = useCountUp(7, '', inView)

  return (
    <div ref={ref} className="max-w-[700px] mx-auto px-6 pb-20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
      <div className={`scroll-reveal ${inView ? 'in-view' : ''}`}>
        <div ref={stat1} className="font-display text-[2rem] font-extrabold tracking-[-0.04em] leading-none">4,460</div>
        <div className="text-[11px] text-[var(--text-3)] mt-1">Frames analyzed</div>
      </div>
      <div className={`scroll-reveal ${inView ? 'in-view' : ''}`} style={{ transitionDelay: '0.08s' }}>
        <div ref={stat2} className="font-display text-[2rem] font-extrabold tracking-[-0.04em] leading-none">131</div>
        <div className="text-[11px] text-[var(--text-3)] mt-1">Competitor techniques extracted</div>
      </div>
      <div className={`scroll-reveal ${inView ? 'in-view' : ''}`} style={{ transitionDelay: '0.16s' }}>
        <div ref={stat3} className="font-display text-[2rem] font-extrabold tracking-[-0.04em] leading-none">7</div>
        <div className="text-[11px] text-[var(--text-3)] mt-1">ML models trained on your data</div>
      </div>
      <div className={`scroll-reveal ${inView ? 'in-view' : ''}`} style={{ transitionDelay: '0.24s' }}>
        <div className="font-display text-[1.25rem] font-extrabold tracking-[-0.03em] leading-[1.2]">Intelligence that compounds</div>
      </div>
    </div>
  )
}

export default App
