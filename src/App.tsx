import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { submitWaitlistEmail } from '@/lib/supabase'

const ROTATING_WORDS = ['Winning', 'Creating', 'Growing', 'Planning', 'Predicting']

function RotatingWord() {
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setDisplayIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
        setIsAnimating(false)
      }, 400)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-block relative overflow-hidden h-[1.15em] align-bottom">
      <span key={displayIndex} className={`inline-block serif italic text-coopr-serif ${isAnimating ? 'animate-word-out' : 'animate-word-in'}`}>
        {ROTATING_WORDS[displayIndex]}
      </span>
    </span>
  )
}

function WaitlistForm({ submitted, onSubmit, email, setEmail, isSubmitting }: {
  submitted: boolean; onSubmit: (e: React.FormEvent) => void; email: string; setEmail: (v: string) => void; isSubmitting: boolean
}) {
  if (submitted) {
    return (
      <div className="animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-coopr-success-soft text-coopr-success-text px-4 py-2.5 rounded-xl text-[15px] font-medium">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          You're on the list. We'll be in touch.
        </div>
      </div>
    )
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
      <Input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required
        className="h-11 rounded-xl border-input bg-white text-[15px] placeholder:text-coopr-soft focus-visible:ring-ring focus-visible:ring-1" />
      <Button type="submit" disabled={isSubmitting}
        className="h-11 px-6 rounded-xl bg-primary hover:bg-coopr-hover text-[15px] font-medium whitespace-nowrap w-full sm:w-auto">
        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
      </Button>
    </form>
  )
}

const FEATURES = [
  {
    title: 'Predict before you post',
    desc: 'Know how a video will perform before it goes live. Tested against your real audience.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: 'Learn your creative identity',
    desc: 'Coopr builds a profile of what makes your content yours — and protects it in every recommendation.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z"/><path d="M15 21H9"/><path d="M12 17v4"/>
      </svg>
    ),
  },
  {
    title: 'Decode what competitors do',
    desc: 'See which techniques actually drive results in your niche, with real numbers behind them.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    ),
  },
  {
    title: 'Generate hooks that hold',
    desc: 'Get hook options ranked by how likely your audience is to keep watching past the first 3 seconds.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
      </svg>
    ),
  },
  {
    title: 'Understand your voice',
    desc: 'Not your captions — your actual voice. What your audience responds to when you speak.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
      </svg>
    ),
  },
  {
    title: 'Watch every frame',
    desc: 'Other tools read your caption. Coopr analyzes every second of your video — visual, audio, everything.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
]

const STEPS = [
  {
    step: '01',
    title: 'Connect your account',
    desc: 'Link your Instagram. That\'s your entire onboarding.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/>
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Coopr analyzes everything',
    desc: 'Your content. Your competitors. Every signal in your niche.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" x2="12" y1="22" y2="12"/>
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Your first plan, immediately',
    desc: 'Hooks, timing, gaps, opportunities — ready day one.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/>
      </svg>
    ),
  },
]

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-semibold tracking-tight">C</span>
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">Coopr</span>
          </div>
          <Button variant="outline" size="sm"
            className="text-[13px] h-8 px-3 rounded-lg border-border hover:bg-secondary"
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
            Join Waitlist
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[13px] font-medium text-muted-foreground tracking-wide uppercase mb-6 animate-fade-up stagger-1">
            Your Content Strategist
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground animate-fade-up stagger-2">
            Stop Guessing.<br />Start <RotatingWord />
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-coopr-subtle max-w-lg mx-auto animate-fade-up stagger-3">
            Coopr watches your videos, learns what makes your content yours, and tells you exactly what to make next.
          </p>
          <div className="mt-10 animate-fade-up stagger-4" id="waitlist">
            <WaitlistForm {...{ submitted, onSubmit: handleSubmit, email, setEmail, isSubmitting }} />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-[13px] text-muted-foreground animate-fade-up stagger-5">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {['bg-violet-400', 'bg-sky-400', 'bg-amber-400', 'bg-emerald-400'].map((bg, i) => (
                  <div key={i} className={`w-5 h-5 rounded-full ${bg} border-2 border-background`} />
                ))}
              </div>
              <span>Creators on the waitlist</span>
            </div>
            <span className="hidden sm:block text-border">|</span>
            <span>Built for Instagram, Reels, TikTok, YouTube Shorts</span>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="animate-fade-up stagger-5 rounded-2xl border border-input bg-white shadow-[0_2px_40px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="bg-muted px-4 py-3 border-b border-border flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,68%)]" />
                <div className="w-3 h-3 rounded-full bg-[hsl(45,70%,62%)]" />
                <div className="w-3 h-3 rounded-full bg-[hsl(130,50%,58%)]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-accent rounded-md px-16 py-1 text-[11px] text-coopr-subtle">getcoopr.com</div>
              </div>
            </div>
            <div className="p-6 md:p-10 bg-gradient-to-b from-white to-muted">
              <div className="grid md:grid-cols-3 gap-5">
                {/* Chat panel */}
                <div className="md:col-span-2 rounded-xl border border-border bg-white p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-[10px] font-bold">C</span>
                    </div>
                    <span className="text-[13px] font-medium text-coopr-body">Coopr</span>
                    <span className="text-[11px] text-coopr-soft ml-auto">Analyzing 847 frames across 23 videos...</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-muted rounded-lg p-3 text-[13px] text-coopr-body leading-relaxed max-w-[92%]">
                      Your last 3 Reels all open with a direct question in the first 0.8s — your hold rate jumped to 72%, that's 2.4x your baseline. Your audience responds to <span className="font-medium text-foreground">curiosity hooks in your natural voice</span>, not the polished ones.
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-[13px] text-coopr-body leading-relaxed max-w-[92%]">
                      @competitor_a just shifted to this format — they're 2 weeks behind you. I've drafted 5 hooks that lean into your advantage. Want them ranked by predicted performance?
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex-1 h-9 rounded-lg border border-input bg-muted/50 flex items-center px-3">
                        <span className="text-[12px] text-coopr-soft">Ask Coopr anything...</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Intelligence sidebar */}
                <div className="space-y-3">
                  <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-coopr-soft mb-1">Next Post Prediction</p>
                    <p className="text-[26px] font-semibold tracking-tight text-foreground">8,240</p>
                    <p className="text-[11px] text-coopr-success font-medium">Top 15% of your videos</p>
                  </div>
                  <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-coopr-soft mb-2">Your Creative DNA</p>
                    <div className="space-y-2">
                      {[
                        { label: 'Values', value: 'Authentic, educational', pct: 92 },
                        { label: 'Voice', value: 'Casual, high-energy', pct: 87 },
                        { label: 'Aesthetics', value: 'Natural light, handheld', pct: 74 },
                      ].map((d) => (
                        <div key={d.label}>
                          <div className="flex justify-between items-baseline">
                            <span className="text-[11px] font-medium text-foreground">{d.label}</span>
                            <span className="text-[10px] text-coopr-subtle">{d.pct}%</span>
                          </div>
                          <div className="mt-0.5 h-1 bg-accent rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${d.pct}%` }} />
                          </div>
                          <p className="text-[10px] text-coopr-subtle mt-0.5">{d.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-coopr-soft mb-1">Best Post Time</p>
                    <p className="text-[26px] font-semibold tracking-tight text-foreground">2:15 PM</p>
                    <p className="text-[11px] text-coopr-subtle">Tue &middot; Thu &middot; Based on your audience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Coopr does */}
      <section className="px-6 pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.03em] text-foreground">
              Not another <span className="serif italic text-coopr-soft line-through decoration-border">dashboard</span>.
            </h2>
            <p className="mt-2 text-[16px] text-muted-foreground">
              A strategist that knows your content better than you do.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((item) => (
              <div key={item.title} className="group rounded-xl border border-border bg-white p-5 hover:border-coopr-soft/40 hover:shadow-[0_2px_20px_-8px_rgba(0,0,0,0.06)] transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-[14px] leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it starts */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-input bg-muted p-8 md:p-12">
            <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-foreground mb-10 text-center">
              From zero to <span className="serif italic text-coopr-serif">strategy</span> in minutes
            </h2>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting line — desktop only */}
              <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-border" />
              {STEPS.map((item, i) => (
                <div key={item.step} className="text-center relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-border shadow-sm mb-4 text-muted-foreground relative z-10">
                    {item.icon}
                  </div>
                  <div className="text-[11px] font-medium text-coopr-soft uppercase tracking-widest mb-1">Step {item.step}</div>
                  <h3 className="text-[15px] font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-[13px] text-muted-foreground">{item.desc}</p>
                  {i < STEPS.length - 1 && (
                    <div className="md:hidden flex justify-center py-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-border">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-32">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-foreground">
            Ready to stop guessing?
          </h2>
          <p className="mt-3 text-[16px] text-muted-foreground mb-8">
            Early access for a small group of creators. Your data stays private.
          </p>
          <WaitlistForm {...{ submitted, onSubmit: handleSubmit, email, setEmail, isSubmitting }} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-[9px] font-bold">C</span>
            </div>
            <span className="text-[13px] text-muted-foreground">Coopr by Lensofcoop LLC</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#/privacy" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#/terms" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#/data-deletion" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Data Deletion</a>
            <a href="mailto:henry@getcoopr.com" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
