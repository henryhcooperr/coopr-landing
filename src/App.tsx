import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
      <span key={displayIndex} className={`inline-block serif italic text-[hsl(220,40%,35%)] ${isAnimating ? 'animate-word-out' : 'animate-word-in'}`}>
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
        <div className="inline-flex items-center gap-2 bg-[hsl(145,60%,96%)] text-[hsl(145,60%,28%)] px-4 py-2.5 rounded-xl text-[15px] font-medium">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          You're on the list. We'll be in touch.
        </div>
      </div>
    )
  }
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 max-w-md mx-auto">
      <Input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required
        className="h-11 rounded-xl border-[hsl(220,10%,88%)] bg-white text-[15px] placeholder:text-[hsl(220,10%,60%)] focus-visible:ring-[hsl(220,20%,10%)] focus-visible:ring-1" />
      <Button type="submit" disabled={isSubmitting}
        className="h-11 px-6 rounded-xl bg-[hsl(220,20%,10%)] hover:bg-[hsl(220,20%,18%)] text-[15px] font-medium whitespace-nowrap">
        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
      </Button>
    </form>
  )
}

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setIsSubmitting(false)
  }, [email, isSubmitting])

  return (
    <div className="min-h-screen bg-[hsl(220,20%,99%)]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[hsl(220,20%,99%)]/80 backdrop-blur-md border-b border-[hsl(220,10%,91%)]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[hsl(220,20%,10%)] flex items-center justify-center">
              <span className="text-white text-xs font-semibold tracking-tight">C</span>
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[hsl(220,20%,10%)]">Coopr</span>
          </div>
          <Button variant="outline" size="sm"
            className="text-[13px] h-8 px-3 rounded-lg border-[hsl(220,10%,85%)] hover:bg-[hsl(220,10%,96%)]"
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
            Join Waitlist
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[13px] font-medium text-[hsl(220,10%,46%)] tracking-wide uppercase mb-6 animate-fade-up stagger-1">
            AI Content Strategist
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[hsl(220,20%,10%)] animate-fade-up stagger-2">
            Stop Guessing.<br />Start <RotatingWord />
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-[hsl(220,10%,40%)] max-w-lg mx-auto animate-fade-up stagger-3">
            An AI that watches your videos, learns what makes your content yours, and tells you exactly what to make next.
          </p>
          <div className="mt-10 animate-fade-up stagger-4" id="waitlist">
            <WaitlistForm {...{ submitted, onSubmit: handleSubmit, email, setEmail, isSubmitting }} />
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="animate-fade-up stagger-5 rounded-2xl border border-[hsl(220,10%,88%)] bg-white shadow-[0_2px_40px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="bg-[hsl(220,15%,97%)] px-4 py-3 border-b border-[hsl(220,10%,91%)] flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,68%)]" />
                <div className="w-3 h-3 rounded-full bg-[hsl(45,70%,62%)]" />
                <div className="w-3 h-3 rounded-full bg-[hsl(130,50%,58%)]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-[hsl(220,10%,93%)] rounded-md px-16 py-1 text-[11px] text-[hsl(220,10%,50%)]">getcoopr.com</div>
              </div>
            </div>
            <div className="p-6 md:p-10 bg-gradient-to-b from-white to-[hsl(220,15%,97%)]">
              <div className="grid md:grid-cols-3 gap-5">
                {/* Chat panel */}
                <div className="md:col-span-2 rounded-xl border border-[hsl(220,10%,91%)] bg-white p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md bg-[hsl(220,20%,10%)] flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">C</span>
                    </div>
                    <span className="text-[13px] font-medium text-[hsl(220,10%,30%)]">Coopr</span>
                    <span className="text-[11px] text-[hsl(220,10%,60%)] ml-auto">Analyzing 847 frames across 23 videos...</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-[hsl(220,15%,97%)] rounded-lg p-3 text-[13px] text-[hsl(220,10%,30%)] leading-relaxed max-w-[92%]">
                      Your last 3 Reels all open with a direct question in the first 0.8s — your hold rate jumped to 72%, that's 2.4x your baseline. Your audience responds to <span className="font-medium text-[hsl(220,20%,10%)]">curiosity hooks in your natural voice</span>, not the polished ones.
                    </div>
                    <div className="bg-[hsl(220,15%,97%)] rounded-lg p-3 text-[13px] text-[hsl(220,10%,30%)] leading-relaxed max-w-[92%]">
                      @competitor_a just shifted to this format — they're 2 weeks behind you. I've drafted 5 hooks that lean into your advantage. Want them ranked by predicted performance?
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex-1 h-9 rounded-lg border border-[hsl(220,10%,88%)] bg-[hsl(220,15%,98%)] flex items-center px-3">
                        <span className="text-[12px] text-[hsl(220,10%,55%)]">Ask Coopr anything...</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Intelligence sidebar */}
                <div className="space-y-3">
                  <div className="rounded-xl border border-[hsl(220,10%,91%)] bg-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[hsl(220,10%,55%)] mb-1">Next Post Prediction</p>
                    <p className="text-[26px] font-semibold tracking-tight text-[hsl(220,20%,10%)]">8,240</p>
                    <p className="text-[11px] text-[hsl(145,50%,40%)] font-medium">Top 15% of your videos</p>
                  </div>
                  <div className="rounded-xl border border-[hsl(220,10%,91%)] bg-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[hsl(220,10%,55%)] mb-2">Your Creative DNA</p>
                    <div className="space-y-2">
                      {[
                        { label: 'Values', value: 'Authentic, educational', pct: 92 },
                        { label: 'Voice', value: 'Casual, high-energy', pct: 87 },
                        { label: 'Aesthetics', value: 'Natural light, handheld', pct: 74 },
                      ].map((d) => (
                        <div key={d.label}>
                          <div className="flex justify-between items-baseline">
                            <span className="text-[11px] font-medium text-[hsl(220,20%,10%)]">{d.label}</span>
                            <span className="text-[10px] text-[hsl(220,10%,50%)]">{d.pct}%</span>
                          </div>
                          <div className="mt-0.5 h-1 bg-[hsl(220,10%,93%)] rounded-full overflow-hidden">
                            <div className="h-full bg-[hsl(220,20%,10%)] rounded-full transition-all" style={{ width: `${d.pct}%` }} />
                          </div>
                          <p className="text-[10px] text-[hsl(220,10%,50%)] mt-0.5">{d.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-[hsl(220,10%,91%)] bg-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[hsl(220,10%,55%)] mb-1">Best Post Time</p>
                    <p className="text-[26px] font-semibold tracking-tight text-[hsl(220,20%,10%)]">2:15 PM</p>
                    <p className="text-[11px] text-[hsl(220,10%,50%)]">Tue &middot; Thu &middot; Based on your audience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Coopr does — outcome-focused, no implementation details */}
      <section className="px-6 pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.03em] text-[hsl(220,20%,10%)]">
              Not another <span className="serif italic text-[hsl(220,10%,60%)] line-through decoration-[hsl(220,10%,80%)]">dashboard</span>.
            </h2>
            <p className="mt-2 text-[16px] text-[hsl(220,10%,46%)]">
              A strategist that knows your content better than you do.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Predict before you post',
                desc: 'Know how a video will perform before it goes live. Tested against your real audience.',
              },
              {
                title: 'Learn your creative identity',
                desc: 'Coopr builds a profile of what makes your content yours — and protects it in every recommendation.',
              },
              {
                title: 'Decode what competitors do',
                desc: 'See which techniques actually drive results in your niche, with real numbers behind them.',
              },
              {
                title: 'Generate hooks that hold',
                desc: 'Get hook options ranked by how likely your audience is to keep watching past the first 3 seconds.',
              },
              {
                title: 'Understand your voice',
                desc: 'Not your captions — your actual voice. What your audience responds to when you speak.',
              },
              {
                title: 'Watch every frame',
                desc: 'Other tools read your caption. Coopr analyzes every second of your video — visual, audio, everything.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[hsl(220,10%,91%)] bg-white p-5 hover:border-[hsl(220,10%,80%)] hover:shadow-[0_2px_20px_-8px_rgba(0,0,0,0.06)] transition-all duration-300">
                <h3 className="text-[15px] font-semibold text-[hsl(220,20%,10%)] mb-1.5">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-[hsl(220,10%,46%)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it starts */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-[hsl(220,10%,88%)] bg-[hsl(220,15%,97%)] p-8 md:p-12">
            <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-[hsl(220,20%,10%)] mb-8 text-center">
              From zero to <span className="serif italic text-[hsl(220,40%,35%)]">strategy</span> in minutes
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { step: '01', title: 'Pick 5 accounts you admire', desc: 'That\'s your entire onboarding.' },
                { step: '02', title: 'Coopr analyzes everything', desc: 'Your content. Their content. Every signal.' },
                { step: '03', title: 'Your first plan, immediately', desc: 'Hooks, timing, gaps, opportunities — ready day one.' },
              ].map((item) => (
                <div key={item.step}>
                  <span className="text-[48px] font-semibold tracking-[-0.04em] text-[hsl(220,10%,88%)] leading-none">{item.step}</span>
                  <h3 className="text-[15px] font-semibold text-[hsl(220,20%,10%)] mt-2 mb-1">{item.title}</h3>
                  <p className="text-[13px] text-[hsl(220,10%,46%)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-32">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-[hsl(220,20%,10%)]">
            Ready to stop guessing?
          </h2>
          <p className="mt-3 text-[16px] text-[hsl(220,10%,46%)] mb-8">
            Early access for a small group of creators. Your data stays private.
          </p>
          <WaitlistForm {...{ submitted, onSubmit: handleSubmit, email, setEmail, isSubmitting }} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(220,10%,91%)] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[hsl(220,20%,10%)] flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">C</span>
            </div>
            <span className="text-[13px] text-[hsl(220,10%,46%)]">Coopr by Lensofcoop LLC</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#/privacy" className="text-[13px] text-[hsl(220,10%,46%)] hover:text-[hsl(220,20%,10%)] transition-colors">Privacy</a>
            <a href="mailto:henry@getcoopr.com" className="text-[13px] text-[hsl(220,10%,46%)] hover:text-[hsl(220,20%,10%)] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
