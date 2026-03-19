import { useState, useEffect, useCallback, useRef } from 'react'
import { submitWaitlistEmail } from '@/lib/supabase'
// ChatDemo replaced by inline V5HeroDemo
import { BrandLockup, HeroBrandStack } from '@/components/shared/Brand'

// ============================================
// SHARED: Waitlist Form (preserves Supabase integration)
// ============================================

function WaitlistForm({ submitted, onSubmit, email, setEmail, isSubmitting }: {
  submitted: boolean
  onSubmit: (e: { preventDefault: () => void }) => void
  email: string
  setEmail: (v: string) => void
  isSubmitting: boolean
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
        className="v5-btn-glow w-full sm:w-auto justify-center"
      >
        {isSubmitting ? 'Joining...' : 'Request Early Access'}
      </button>
    </form>
  )
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

// (useCountUp removed — not used in v5 layout)

// ============================================
// BLUR HEADING COMPONENT
// ============================================

function BlurHeading({ words, inView }: { words: Array<{ text: string; em?: boolean }>; inView: boolean }) {
  return (
    <div className="v5-blur-heading v5-blur-heading--h2" style={{ justifyContent: 'center' }}>
      {words.map((w, i) => (
        <span
          key={i}
          className={`v5-blur-word ${inView ? 'visible' : ''}`}
          style={{ transitionDelay: `${i * 0.06}s` }}
        >
          {w.em ? <em>{w.text}</em> : w.text}
        </span>
      ))}
    </div>
  )
}

// ============================================
// APP FRAME COMPONENT
// ============================================

function AppFrame({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`v5-app-frame ${className}`}>
      <div className="v5-app-frame-bar">
        <span className="v5-app-frame-dot" />
        <span className="v5-app-frame-dot" />
        <span className="v5-app-frame-dot" />
        <span className="v5-app-frame-title">{title}</span>
      </div>
      <div className="v5-app-frame-body">
        {children}
      </div>
    </div>
  )
}

// ============================================
// CURVED LOOP TEXT
// ============================================

function CurvedLoopText() {
  const textRef = useRef<SVGTextPathElement>(null)
  const { ref, inView } = useScrollReveal()

  useEffect(() => {
    if (!textRef.current) return
    let offset = 0
    let raf: number
    function animate() {
      offset -= 0.4
      if (offset <= -1200) offset += 1200
      textRef.current?.setAttribute('startOffset', String(offset))
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={ref} className={`v5-curved-loop ${inView ? 'visible' : ''}`} style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease' }}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <defs>
          <path id="curvePath" d="M-600,80 Q0,10 600,80 Q1200,150 1800,80 Q2400,10 3000,80" fill="none" />
        </defs>
        <text>
          <textPath ref={textRef} href="#curvePath" startOffset="0">
            YOUR CREATIVE ENGINE  &bull;  LEARN YOUR VOICE  &bull;  TRACK YOUR NICHE  &bull;  PREDICT WHAT WORKS  &bull;  YOUR CREATIVE ENGINE  &bull;  LEARN YOUR VOICE  &bull;  TRACK YOUR NICHE  &bull;  PREDICT WHAT WORKS  &bull;  YOUR CREATIVE ENGINE  &bull;  LEARN YOUR VOICE  &bull;
          </textPath>
        </text>
      </svg>
    </div>
  )
}

// ============================================
// SHOWCASE TABS (It Learns You)
// ============================================

const SHOWCASE_TABS = [
  { id: 'dna', num: '01', title: 'Creative DNA', desc: 'Your topics, style, and what makes you, you.' },
  { id: 'voice', num: '02', title: 'Voice Profile', desc: '8 dimensions of your voice. So every script sounds like you.' },
  { id: 'performance', num: '03', title: 'Performance', desc: 'Tracks what works across your content.' },
  { id: 'niche', num: '04', title: 'Niche Position', desc: 'Maps your strengths against the competition.' },
] as const

type TabId = typeof SHOWCASE_TABS[number]['id']

const WORDCLOUD_WORDS = [
  { text: 'Plating', size: 34, color: 'var(--amber)' },
  { text: 'Natural light', size: 18, color: 'var(--teal)' },
  { text: 'Warm tones', size: 28, color: 'var(--violet)' },
  { text: 'Recipe dev', size: 40, color: 'var(--teal)' },
  { text: 'Overhead shots', size: 15, color: 'var(--fg-2, #555)' },
  { text: 'Storytelling', size: 22, color: 'var(--rose, #E11D48)' },
  { text: 'Seasonal', size: 16, color: 'var(--blue)' },
  { text: 'Comfort food', size: 26, color: 'var(--amber)' },
  { text: 'Conversational', size: 19, color: 'var(--violet)' },
  { text: 'Process shots', size: 14, color: 'var(--fg-3, #999)' },
  { text: 'Farm-to-table', size: 21, color: 'var(--teal)' },
  { text: 'Tutorial', size: 16, color: 'var(--blue)' },
  { text: 'Slow food', size: 24, color: 'var(--emerald, #16A34A)' },
  { text: 'Minimalist', size: 13, color: 'var(--fg-3, #999)' },
]

const VOICE_BARS = [
  { label: 'Warmth', val: '0.88', w: 88, color: 'var(--teal)' },
  { label: 'Humor', val: '0.72', w: 72, color: 'var(--violet)' },
  { label: 'Authority', val: '0.65', w: 65, color: 'var(--amber)' },
  { label: 'Storytelling', val: '0.81', w: 81, color: 'var(--emerald, #16A34A)' },
  { label: 'Energy', val: '0.56', w: 56, color: 'var(--blue)' },
  { label: 'Vulnerability', val: '0.74', w: 74, color: 'var(--rose, #E11D48)' },
  { label: 'Directness', val: '0.83', w: 83, color: 'var(--teal)' },
  { label: 'Curiosity', val: '0.91', w: 91, color: 'var(--violet)' },
]

const SPARK_HEIGHTS = [30, 45, 38, 55, 50, 68, 60, 78, 72, 85, 80, 92]

function ShowcasePanelDNA({ active }: { active: boolean }) {
  return (
    <AppFrame title="COOPR / DNA / Wordcloud">
      <div style={{ textAlign: 'center', padding: '28px 20px' }}>
        <div className="v5-sc-wordcloud">
          {WORDCLOUD_WORDS.map((w, i) => (
            <span
              key={i}
              className={`v5-sc-wc-word ${active ? 'active' : ''}`}
              style={{ fontSize: w.size, color: w.color, transitionDelay: `${i * 0.06}s` }}
            >
              {w.text}
            </span>
          ))}
        </div>
        <div className="font-mono text-[10px] text-[var(--text-3)] mt-5">
          157 signals analyzed from 48 videos <span className="text-[var(--teal)]">&bull;</span> Updated 2h ago
        </div>
      </div>
    </AppFrame>
  )
}

function ShowcasePanelVoice({ active }: { active: boolean }) {
  return (
    <AppFrame title="COOPR / DNA / Voice Profile">
      <div style={{ padding: '24px 28px' }}>
        <div className="v5-sc-voice-bars">
          {VOICE_BARS.map((b, i) => (
            <div key={i} className="v5-sc-voice-row">
              <span className="v5-sc-voice-label">{b.label}</span>
              <div className="v5-sc-voice-track">
                <div
                  className="v5-sc-voice-fill"
                  style={{ width: active ? `${b.w}%` : '0%', background: b.color }}
                />
              </div>
              <span className="v5-sc-voice-val">{b.val}</span>
            </div>
          ))}
        </div>
        <div className="font-mono text-[10px] text-[var(--text-3)] mt-4 text-center">
          Calibrated from 48 scripts and captions <span className="text-[var(--teal)]">&bull;</span> Confidence: 94%
        </div>
      </div>
    </AppFrame>
  )
}

function ShowcasePanelPerformance({ active }: { active: boolean }) {
  return (
    <AppFrame title="COOPR / Pulse / Performance">
      <div style={{ padding: '24px 28px' }}>
        <div className="v5-sc-sparkline">
          {SPARK_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="v5-sc-spark-bar"
              style={{ height: active ? `${h}%` : '0%', transitionDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
        <div className="flex justify-between w-full max-w-[400px] mx-auto mt-2">
          <span className="font-mono text-[10px] text-[var(--text-3)]">Last 12 posts</span>
          <span className="font-mono text-[11px] text-[var(--emerald,#16A34A)] font-semibold">+23.4% avg engagement</span>
        </div>
        <div className="flex gap-3 mt-5 justify-center">
          {[
            { value: '4.8%', label: 'AVG ER', color: 'var(--teal)' },
            { value: '61.7%', label: 'AVG HOLD', color: 'var(--violet)' },
            { value: '3.1x', label: 'SHARE RATE', color: 'var(--amber)' },
          ].map((stat, i) => (
            <div key={i} className="text-center flex-1 p-2.5 bg-[var(--bg)] rounded-lg border border-[var(--border-raw)]">
              <div className="font-display text-[22px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="font-mono text-[9px] text-[var(--text-3)] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  )
}

function ShowcasePanelNiche({ active: _active }: { active: boolean }) {
  return (
    <AppFrame title="COOPR / DNA / Niche Position">
      <div style={{ textAlign: 'center', padding: 20 }}>
        <svg className="v5-sc-radar" viewBox="0 0 200 200">
          <polygon fill="none" stroke="rgba(28,25,23,0.06)" strokeWidth="0.5" points="100,20 168,50 168,150 100,180 32,150 32,50" />
          <polygon fill="none" stroke="rgba(28,25,23,0.06)" strokeWidth="0.5" points="100,45 148,65 148,135 100,155 52,135 52,65" />
          <polygon fill="none" stroke="rgba(28,25,23,0.06)" strokeWidth="0.5" points="100,70 128,80 128,120 100,130 72,120 72,80" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(28,25,23,0.04)" strokeWidth="0.5" />
          <line x1="32" y1="50" x2="168" y2="150" stroke="rgba(28,25,23,0.04)" strokeWidth="0.5" />
          <line x1="168" y1="50" x2="32" y2="150" stroke="rgba(28,25,23,0.04)" strokeWidth="0.5" />
          <polygon fill="rgba(245,158,11,0.06)" stroke="var(--amber)" strokeWidth="1" strokeDasharray="3 2" points="100,52 143,72 140,135 100,155 60,132 57,75" />
          <polygon fill="rgba(13,148,136,0.12)" stroke="var(--teal)" strokeWidth="1.5" strokeLinejoin="round" points="100,28 162,55 155,148 100,172 48,142 38,60" />
          <text x="100" y="12" textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--fg-3, #A8A29E)' }}>Storytelling</text>
          <text x="178" y="52" textAnchor="start" style={{ fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--fg-3, #A8A29E)' }}>Visual</text>
          <text x="178" y="152" textAnchor="start" style={{ fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--fg-3, #A8A29E)' }}>Trends</text>
          <text x="100" y="196" textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--fg-3, #A8A29E)' }}>Education</text>
          <text x="22" y="152" textAnchor="end" style={{ fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--fg-3, #A8A29E)' }}>Community</text>
          <text x="22" y="52" textAnchor="end" style={{ fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--fg-3, #A8A29E)' }}>Authority</text>
        </svg>
        <div className="flex gap-5 justify-center mt-1">
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--text-3)]">
            <span className="w-2 h-2 rounded-full bg-[var(--teal)] inline-block" />You
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--text-3)]">
            <span className="w-2 h-2 rounded-full bg-[var(--amber)] opacity-50 inline-block" />Niche avg
          </span>
        </div>
      </div>
    </AppFrame>
  )
}

function TabbedShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>('dna')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { ref, inView } = useScrollReveal()
  const startedRef = useRef(false)

  const startAutoAdvance = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    const tabOrder: TabId[] = ['dna', 'voice', 'performance', 'niche']
    timerRef.current = setInterval(() => {
      setActiveTab(prev => {
        const idx = tabOrder.indexOf(prev)
        return tabOrder[(idx + 1) % tabOrder.length]
      })
    }, 5000)
  }, [])

  useEffect(() => {
    if (inView && !startedRef.current) {
      startedRef.current = true
      startAutoAdvance()
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [inView, startAutoAdvance])

  const handleTabClick = useCallback((id: TabId) => {
    setActiveTab(id)
    startAutoAdvance()
  }, [startAutoAdvance])

  const panels: Record<TabId, React.ReactNode> = {
    dna: <ShowcasePanelDNA active={activeTab === 'dna'} />,
    voice: <ShowcasePanelVoice active={activeTab === 'voice'} />,
    performance: <ShowcasePanelPerformance active={activeTab === 'performance'} />,
    niche: <ShowcasePanelNiche active={activeTab === 'niche'} />,
  }

  return (
    <div ref={ref} className={`v5-showcase ${inView ? 'visible' : ''}`} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
      <div className="v5-showcase-tabs">
        {SHOWCASE_TABS.map(tab => (
          <div
            key={tab.id}
            className={`v5-showcase-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <div className="v5-showcase-tab-accent" />
            <div className="v5-showcase-tab-label">{tab.num}</div>
            <div className="v5-showcase-tab-title">{tab.title}</div>
            <div className="v5-showcase-tab-desc">{tab.desc}</div>
            <div className="v5-showcase-tab-timer" key={activeTab === tab.id ? `timer-${tab.id}-${Date.now()}` : undefined} />
          </div>
        ))}
      </div>
      <div className="v5-showcase-preview">
        {SHOWCASE_TABS.map(tab => (
          <div key={tab.id} className={`v5-showcase-panel ${activeTab === tab.id ? 'active' : ''}`}>
            {panels[tab.id]}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// PREDICTIONS SECTION
// ============================================

const SIGNALS = [
  { name: 'Trend signal', w: 85, val: '+0.17', color: 'var(--teal)' },
  { name: 'Audience demand', w: 72, val: '+0.14', color: 'var(--violet)' },
  { name: 'Content gap', w: 90, val: '+0.20', color: 'var(--emerald, #16A34A)' },
  { name: 'Your strength', w: 68, val: '+0.13', color: 'var(--amber)' },
  { name: 'Seasonal fit', w: 55, val: '+0.09', color: 'var(--blue)' },
  { name: 'Competition', w: 78, val: '+0.15', color: 'var(--rose, #E11D48)' },
]

const HOOKS = [
  { rank: 1, text: '"I found something in Tokyo that travel blogs won\'t tell you about"', meta: 'Curiosity gap + POV hook', score: '83.7%', best: true },
  { rank: 2, text: '"The locals tried to stop me from filming this street"', meta: 'Story hook + tension', score: '78.9%', best: false },
  { rank: 3, text: '"3 streets you\'ll never find on Google Maps"', meta: 'List hook + exclusivity', score: '74.2%', best: false },
  { rank: 4, text: '"What happens when you turn left instead of right in Shibuya"', meta: 'Curiosity + specific location', score: '71.3%', best: false },
  { rank: 5, text: '"POV: you stumble into the best ramen of your life"', meta: 'POV + food moment', score: '67.8%', best: false },
]

function PredictionsSection() {
  const { ref, inView } = useScrollReveal()
  const gaugeAnimated = useRef(false)
  const gaugeRef = useRef<SVGCircleElement>(null)
  const gaugeNumRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!inView || gaugeAnimated.current) return
    gaugeAnimated.current = true

    // Animate gauge
    if (gaugeRef.current) {
      const target = 8.8
      const circumference = 283
      setTimeout(() => {
        if (gaugeRef.current) {
          gaugeRef.current.style.strokeDashoffset = String(circumference - (target / 10 * circumference))
        }
        // Count up
        if (gaugeNumRef.current) {
          const el = gaugeNumRef.current
          const start = performance.now()
          const dur = 1000
          function tick(now: number) {
            const p = Math.min((now - start) / dur, 1)
            const ease = 1 - Math.pow(1 - p, 4)
            el.textContent = (target * ease).toFixed(1)
            if (p < 1) requestAnimationFrame(tick)
            else el.textContent = target.toFixed(1)
          }
          requestAnimationFrame(tick)
        }
      }, 400)
    }
  }, [inView])

  return (
    <section className="v5-section" style={{ background: 'linear-gradient(to bottom, transparent, #F5F4F0 8%, #F5F4F0 92%, transparent)', maxWidth: 'none', paddingLeft: 0, paddingRight: 0 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div ref={ref} className="text-center mb-2" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="v5-section-label">Before You Hit Record</div>
        </div>
        <div className="text-center mb-3">
          <BlurHeading words={[{ text: 'Know' }, { text: 'what' }, { text: 'works' }, { text: 'before', em: true }, { text: 'you' }, { text: 'film.' }]} inView={inView} />
        </div>
        <div className="text-center mb-0" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          <p className="v5-section-body" style={{ margin: '0 auto' }}>Stop guessing which ideas are worth your time. COOPR scores concepts and ranks hooks using real signals from your niche.</p>
        </div>

        <div className="v5-predict-grid" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          {/* Left: Idea Scoring */}
          <AppFrame title="COOPR / Idea Scoring" className="v5-predict-panel">
            <div style={{ padding: 24 }}>
              <div className="v5-predict-panel-label">Idea Scoring</div>
              <div className="v5-predict-panel-title">6 signals. One score.</div>
              <div className="v5-gauge-container">
                <div className="v5-gauge-ring">
                  <svg viewBox="0 0 100 100"><circle className="v5-gauge-bg" cx="50" cy="50" r="45" /><circle ref={gaugeRef} className="v5-gauge-fill" cx="50" cy="50" r="45" /></svg>
                  <div ref={gaugeNumRef} className="v5-gauge-score">0</div>
                </div>
                <div className="v5-gauge-meta">
                  <div className="v5-gauge-title">"Hidden gems in Tokyo side streets"</div>
                  <div className="v5-gauge-sub">Strong concept — trending topic, audience demand high, low competition in your niche</div>
                </div>
              </div>
              <div className="v5-signal-list">
                {SIGNALS.map((s, i) => (
                  <div key={i} className="v5-signal-row">
                    <span className="v5-signal-name">{s.name}</span>
                    <div className="v5-signal-track">
                      <div className="v5-signal-fill" style={{ width: inView ? `${s.w}%` : '0%', background: s.color }} />
                    </div>
                    <span className="v5-signal-val">{s.val}</span>
                  </div>
                ))}
              </div>
              <div className="font-mono text-[9px] text-[var(--text-3)] mt-3.5 text-center">Analyzing 1,247 posts across 38 competitors</div>
            </div>
          </AppFrame>

          {/* Right: Hook Lab */}
          <AppFrame title="COOPR / Hook Lab" className="v5-predict-panel">
            <div style={{ padding: 24 }}>
              <div className="v5-predict-panel-label">Hook Lab</div>
              <div className="v5-predict-panel-title">5 hooks. Ranked by hold rate.</div>
              <div className="v5-predict-hook-list">
                {HOOKS.map(h => (
                  <div key={h.rank} className={`v5-predict-hook ${h.best ? 'best' : ''}`}>
                    <div className="v5-predict-hook-rank">{h.rank}</div>
                    <div className="v5-predict-hook-body">
                      <div className="v5-predict-hook-text">{h.text}</div>
                      <div className="v5-predict-hook-meta">{h.meta}</div>
                    </div>
                    <div
                      className="v5-predict-hook-score"
                      style={{
                        background: parseFloat(h.score) >= 75 ? 'var(--emerald-soft, rgba(22,163,74,0.1))' : 'var(--amber-soft, rgba(245,158,11,0.08))',
                        color: parseFloat(h.score) >= 75 ? 'var(--emerald, #16A34A)' : 'var(--amber)',
                      }}
                    >
                      {h.score}
                    </div>
                  </div>
                ))}
              </div>
              <div className="font-mono text-[9px] text-[var(--text-3)] mt-3.5 text-center">Benchmarked against 847 hooks in travel niche</div>
            </div>
          </AppFrame>
        </div>
      </div>
    </section>
  )
}

// ============================================
// NICHE SECTION
// ============================================

const NICHE_CREATORS = [
  { initials: 'SN', name: 'SoloNomad', handle: '@solonomad_', er: '4.8%', erColor: 'var(--teal)', growth: '+12% /mo', growthColor: 'var(--emerald, #16A34A)', grad: 'linear-gradient(135deg,#0D9488,#047857)', highlight: true },
  { initials: 'WL', name: 'WanderLena', handle: '@wanderlena', er: '3.2%', erColor: 'var(--violet)', growth: '+8% /mo', growthColor: 'var(--emerald, #16A34A)', grad: 'linear-gradient(135deg,#7C3AED,#4338CA)', highlight: false },
  { initials: 'TJ', name: 'TokyoJay', handle: '@tokyojay', er: '7.1%', erColor: 'var(--amber)', growth: '+31% /mo', growthColor: 'var(--emerald, #16A34A)', grad: 'linear-gradient(135deg,#F59E0B,#D97706)', highlight: false },
  { initials: 'AR', name: 'AdventureRach', handle: '@adventure.rach', er: '5.4%', erColor: 'var(--rose, #E11D48)', growth: '+2% /mo', growthColor: 'var(--text-3)', grad: 'linear-gradient(135deg,#E11D48,#BE123C)', highlight: false },
  { initials: 'GS', name: 'GlobeSteph', handle: '@globesteph', er: '2.9%', erColor: 'var(--blue)', growth: '-4% /mo', growthColor: 'var(--rose, #E11D48)', grad: 'linear-gradient(135deg,#2563EB,#1D4ED8)', highlight: false },
]

const NICHE_BAR_HEIGHTS = [18, 22, 25, 30, 28, 38, 45, 52, 48, 65, 62, 78, 72, 88, 85, 95]

function NicheSection() {
  const { ref, inView } = useScrollReveal()
  const headingRef = useRef<HTMLDivElement>(null)
  const [headingVisible, setHeadingVisible] = useState(false)

  useEffect(() => {
    if (!headingRef.current) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { setHeadingVisible(true); obs.unobserve(e.target) }
        })
      },
      { threshold: 0.12 }
    )
    obs.observe(headingRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="v5-section">
      <div className="text-center mb-2" ref={headingRef} style={{ opacity: headingVisible ? 1 : 0, transform: headingVisible ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
        <div className="v5-section-label">Your Niche, Decoded</div>
      </div>
      <div className="text-center mb-3">
        <BlurHeading words={[{ text: 'Never' }, { text: 'fly' }, { text: 'blind', em: true }, { text: 'again.' }]} inView={headingVisible} />
      </div>
      <div className="text-center mb-0" style={{ opacity: headingVisible ? 1 : 0, transform: headingVisible ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
        <p className="v5-section-body" style={{ margin: '0 auto' }}>COOPR tracks your competitors, discovers growth vectors, and maps what's working in your space — so you're never guessing.</p>
      </div>

      <div ref={ref} className="v5-niche-split" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
        {/* Competitor Radar */}
        <AppFrame title="COOPR / Niche / Competitor Radar">
          <div style={{ padding: 16 }}>
            <div className="flex justify-between items-center mb-3.5">
              <div className="font-display text-sm font-bold">Tracked Creators</div>
              <div className="font-mono text-[9px] text-[var(--text-3)] py-0.5 px-2.5 bg-[var(--bg)] rounded-full border border-[var(--border-raw)]">5 auto-discovered</div>
            </div>
            <div className="v5-niche-creator-list">
              {NICHE_CREATORS.map((c, i) => (
                <div key={i} className={`v5-niche-creator ${c.highlight ? 'highlight' : ''}`}>
                  <div className="v5-niche-avatar" style={{ background: c.grad }}>{c.initials}</div>
                  <div className="v5-niche-creator-info">
                    <div className="v5-niche-creator-name">{c.name}</div>
                    <div className="v5-niche-creator-handle">{c.handle}</div>
                  </div>
                  <div className="v5-niche-creator-stats">
                    <div className="v5-niche-creator-er" style={{ color: c.erColor }}>{c.er}</div>
                    <div className="v5-niche-creator-growth" style={{ color: c.growthColor }}>{c.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AppFrame>

        {/* Growth Vectors */}
        <AppFrame title="COOPR / Niche / Growth Vectors">
          <div className="v5-niche-vector" style={{ padding: 20 }}>
            <div className="flex justify-between items-center mb-3.5">
              <div className="font-display text-sm font-bold">Trending Opportunity</div>
              <div className="font-mono text-[9px] text-[var(--emerald,#16A34A)] font-semibold">HIGH SIGNAL</div>
            </div>
            <div className="v5-niche-vector-chart">
              {NICHE_BAR_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="v5-niche-vector-bar"
                  style={{ height: inView ? `${h}%` : '0%', transitionDelay: `${i * 0.03}s` }}
                />
              ))}
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-mono text-[9px] text-[var(--text-3)]">8 weeks ago</span>
              <span className="font-mono text-[9px] text-[var(--text-3)]">Now</span>
            </div>
            <div className="v5-niche-vector-title">"Hidden gem" POV format surging</div>
            <div className="v5-niche-vector-body">First-person discovery hooks outperforming guide-style by 2.8x among solo travel creators under 100K. Low competition, high audience demand.</div>
            <div className="v5-niche-vector-tags">
              {['POV format', 'Solo travel', 'Discovery', '2.8x lift'].map(tag => (
                <span key={tag} className="v5-niche-vector-tag">{tag}</span>
              ))}
            </div>
          </div>
        </AppFrame>
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
    <section ref={ref} className="v5-founder" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] mb-6">
        Built by a creator who got tired of <em className="font-accent italic font-normal">guessing</em>
      </h2>

      <p className="text-[17px] leading-[1.75] text-[var(--text-2)] mb-5 tracking-[-0.01em]">
        I'm a content creator. I've spent hundreds of hours filming, editing, scripting —{' '}
        <strong className="text-[var(--text)] font-semibold">the full grind.</strong> I love every second of it.
        But I was guessing. Which hooks hold people? What do my competitors do that I don't? When does my audience actually watch?{' '}
        <strong className="text-[var(--text)] font-semibold">No tool could tell me.</strong>
      </p>

      <p className="text-[17px] leading-[1.75] text-[var(--text-2)] mb-5 tracking-[-0.01em]">
        So I built one. Not to replace the creative work —{' '}
        <strong className="text-[var(--text)] font-semibold">to make every decision data-informed</strong> instead of gut-feel.
      </p>

      <div className="mt-9 pt-7 border-t-[1.5px] border-[var(--text)]">
        <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">
          COOPR is the tool I wish existed when I started.<br />
          Now it <em className="font-accent italic font-normal text-[var(--teal)]">does.</em>
        </h3>
      </div>

      <div className="mt-8 pt-5 border-t border-[var(--border-raw)] flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-sm font-extrabold text-white" style={{ background: 'linear-gradient(135deg, #0a2540, #14758a)' }}>
          HC
        </div>
        <div>
          <div className="font-display text-[15px] font-bold tracking-[-0.02em]">Henry Cooper</div>
          <div className="text-[13px] text-[var(--text-3)]">Founder, Coopr Labs</div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// WORDMARK FOOTER
// ============================================

function WordmarkFooter() {
  const { ref, inView } = useScrollReveal()

  return (
    <footer className="v5-wm-footer">
      <div className="v5-wm-footer-links">
        <a href="#/devlog">Dev Log</a>
        <a href="#/privacy">Privacy</a>
        <a href="#/terms">Terms</a>
        <a href="#/data-deletion">Data Deletion</a>
        <a href="mailto:henry@getcoopr.com">Contact</a>
      </div>
      <div ref={ref} className={`v5-wm-footer-word ${inView ? 'visible' : ''}`}>COOPR</div>
      <div className="v5-wm-footer-copy">2026 Coopr Labs. Built in California.</div>
    </footer>
  )
}

// ============================================
// FLOATING NAV
// ============================================

function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`v5-nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="v5-nav-brand">
        <BrandLockup bannerClassName="h-[20px] sm:h-[24px]" />
      </a>
      <div className="v5-nav-right">
        <a href="#/devlog" className="v5-nav-link">Dev Log</a>
        <a href="#/features" className="v5-nav-link">Features</a>
        <a href="#cta-section" className="v5-nav-cta">Request Early Access</a>
      </div>
    </nav>
  )
}

// ============================================
// V5 HERO DEMO (inline — replaces old ChatDemo)
// ============================================

type DemoMsg = { role: 'user' | 'assistant' | 'block'; text: string; blockLabel?: string; blockAccent?: string; children?: React.ReactNode }

function V5HeroDemo() {
  const chatRef = useRef<HTMLDivElement>(null)
  const [msgs, setMsgs] = useState<DemoMsg[]>([])
  const [activeConv, setActiveConv] = useState<'create' | 'research'>('create')
  const [headerTitle, setHeaderTitle] = useState('Form mistakes video')
  const [headerTools, setHeaderTools] = useState('3 tools used')
  const abortRef = useRef(false)

  const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

  const scrollBottom = useCallback(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [])

  const pushMsg = useCallback((m: DemoMsg) => {
    setMsgs(prev => [...prev, m])
    setTimeout(scrollBottom, 50)
  }, [scrollBottom])

  const playCreate = useCallback(async () => {
    setActiveConv('create'); setHeaderTitle('Form mistakes video'); setHeaderTools('3 tools used')
    await wait(400)
    pushMsg({ role: 'user', text: "I have an idea \u2014 common gym form mistakes that most people don't realize" })
    await wait(1000)
    pushMsg({ role: 'block', text: '', blockLabel: 'Idea Evaluation', children: (
      <div className="v5-demo-idea-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span className="font-accent italic text-[14px]" style={{ color: 'var(--teal)' }}>Idea Evaluation</span>
          <span className="font-mono text-[10px] font-medium px-2.5 py-0.5 rounded-full" style={{ background: 'var(--teal-dim)', color: 'var(--teal)' }}>Strong 8.2/10</span>
        </div>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-2)' }}>High search volume topic. Your form-focused content gets +31% above average hold rate. Educational hooks dominate in fitness right now.</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {['Niche fit: 92%', 'Gap: Medium', 'Strength: Form'].map(t => <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full border" style={{ borderColor: 'var(--border-raw)', color: 'var(--text-2)' }}>{t}</span>)}
        </div>
      </div>
    )})
    await wait(1200)
    pushMsg({ role: 'user', text: 'Love it. Work on hooks.' })
    await wait(1000)
    pushMsg({ role: 'block', text: '', blockLabel: 'Top hooks', blockAccent: 'var(--violet)', children: (
      <div className="flex flex-col gap-2">
        <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--teal)', boxShadow: '0 0 0 1px var(--teal), 0 4px 16px rgba(13,148,136,0.1)' }}>
          <div className="flex justify-between items-center mb-1.5"><span className="font-accent italic text-[13px]" style={{ color: 'var(--violet)' }}>Hook 1</span><span className="font-mono text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(22,163,74,0.1)', color: '#16A34A' }}>84% hold</span></div>
          <p className="text-[13px] font-medium">"The exercise everyone does wrong — and why your trainer won't tell you"</p>
        </div>
        <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--border-raw)' }}>
          <div className="flex justify-between items-center mb-1.5"><span className="font-accent italic text-[13px]" style={{ color: 'var(--violet)' }}>Hook 2</span><span className="font-mono text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(245,158,11,0.08)', color: '#D97706' }}>76% hold</span></div>
          <p className="text-[13px] font-medium">"3 mistakes killing your progress — I filmed proof"</p>
        </div>
      </div>
    )})
    await wait(800)
    pushMsg({ role: 'block', text: '', children: (
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--teal-dim)', border: '1px solid rgba(13,148,136,0.15)' }}>
        <span className="font-display text-xl font-bold" style={{ color: 'var(--teal)' }}>94%</span>
        <span className="text-[11px]" style={{ color: 'var(--text-2)' }}>Voice match — sounds like you</span>
      </div>
    )})
  }, [pushMsg])

  const playResearch = useCallback(async () => {
    setActiveConv('research'); setHeaderTitle('Solo travel trends'); setHeaderTools('8 sources')
    await wait(400)
    pushMsg({ role: 'user', text: "What's trending in solo travel right now? Who should I watch?" })
    await wait(1200)
    pushMsg({ role: 'block', text: '', blockLabel: 'Solo Travel Report', blockAccent: 'var(--blue)', children: (
      <div className="p-3.5 rounded-lg border bg-white" style={{ borderColor: 'var(--border-raw)' }}>
        <div className="flex justify-between items-center mb-1"><span className="font-display text-[14px] font-bold">Solo Travel Niche Report</span><span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(37,99,235,0.08)', color: '#2563EB' }}>High confidence</span></div>
        <div className="font-mono text-[10px] mb-3" style={{ color: 'var(--text-3)' }}>8 sources &middot; 63 posts scanned &middot; 4 min read</div>
        <div className="flex gap-2 mb-3"><div className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0" style={{ background: 'rgba(37,99,235,0.08)', color: '#2563EB' }}>1</div><div><div className="text-[13px] font-semibold">Hidden-gem POV format surging</div><div className="text-[12px] leading-snug" style={{ color: 'var(--text-2)' }}>First-person hooks outperforming guide-style by 2.8x among solo travel creators under 100K.</div></div></div>
        <div className="flex gap-2"><div className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0" style={{ background: 'rgba(37,99,235,0.08)', color: '#2563EB' }}>2</div><div><div className="text-[13px] font-semibold">Food + location mashups trending</div><div className="text-[12px] leading-snug" style={{ color: 'var(--text-2)' }}>Street food + neighborhood discovery averaging 5.1% ER vs 2.3% baseline.</div></div></div>
      </div>
    )})
    await wait(800)
    pushMsg({ role: 'block', text: '', blockLabel: 'Creators discovered', children: (
      <div className="flex flex-col gap-1.5">
        {[
          { i: 'SN', name: 'SoloNomad', badge: 'Competitor', bc: 'var(--teal)', stats: '82K \u00B7 4.8% eng', grad: '#0D9488,#047857' },
          { i: 'WL', name: 'WanderLena', badge: 'Inspiration', bc: 'var(--violet)', stats: '210K \u00B7 3.2% eng', grad: '#7C3AED,#4338CA' },
          { i: 'TJ', name: 'TokyoJay', badge: 'Rising', bc: 'var(--amber)', stats: '31K \u00B7 7.1% eng', grad: '#F59E0B,#D97706' },
        ].map(c => (
          <div key={c.i} className="flex items-center gap-2.5 p-2 rounded-lg border" style={{ borderColor: 'var(--border-raw)', background: 'var(--bg)' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ background: `linear-gradient(135deg,${c.grad})` }}>{c.i}</div>
            <div className="flex-1 min-w-0"><div className="text-[12px] font-semibold flex items-center gap-1.5">{c.name} <span className="font-mono text-[8px] px-1.5 py-px rounded-full" style={{ background: `color-mix(in srgb, ${c.bc} 10%, transparent)`, color: c.bc }}>{c.badge}</span></div><div className="font-mono text-[9px]" style={{ color: 'var(--text-3)' }}>{c.stats}</div></div>
          </div>
        ))}
      </div>
    )})
    await wait(600)
    pushMsg({ role: 'assistant', text: "Saved. TokyoJay is worth watching closely — 7.1% engagement at 31K is exceptional. His hidden-gem format matches your style." })
  }, [pushMsg])

  // Auto-cycle
  useEffect(() => {
    abortRef.current = false
    let cancelled = false
    const convs = [playCreate, playResearch]
    let idx = 0
    async function cycle() {
      while (!cancelled) {
        setMsgs([])
        await wait(300)
        await convs[idx]()
        await wait(4000)
        idx = (idx + 1) % convs.length
      }
    }
    cycle()
    return () => { cancelled = true; abortRef.current = true }
  }, [playCreate, playResearch])

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[210px] shrink-0 border-r p-3 max-[640px]:hidden" style={{ borderColor: 'var(--border-raw)', background: 'var(--bg)' }}>
        <div className="font-display font-bold text-[14px] px-2 mb-5 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--teal)' }} /> COOPR</div>
        <div className="font-mono text-[9px] uppercase tracking-[.08em] px-2.5 mb-1.5" style={{ color: 'var(--text-3)' }}>Conversations</div>
        {[
          { key: 'create' as const, title: 'Form mistakes video', preview: 'Working on hooks...', dot: 'var(--teal)' },
          { key: 'research' as const, title: 'Solo travel trends', preview: '8 creators found', dot: 'var(--blue)' },
        ].map(c => (
          <div key={c.key} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] cursor-pointer mb-0.5 transition-colors ${activeConv === c.key ? 'bg-[rgba(13,148,136,0.06)]' : 'hover:bg-[rgba(0,0,0,0.03)]'}`} style={{ color: activeConv === c.key ? 'var(--text)' : 'var(--text-2)' }}>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.dot }} />
            <div className="flex-1 min-w-0"><div className="text-[12px] font-semibold truncate">{c.title}</div><div className="text-[10px] truncate" style={{ color: activeConv === c.key ? 'var(--teal)' : 'var(--text-3)' }}>{c.preview}</div></div>
          </div>
        ))}
        <div className="border-t mt-3 pt-3" style={{ borderColor: 'var(--border-raw)' }}>
          <div className="font-mono text-[9px] uppercase tracking-[.08em] px-2.5 mb-1.5" style={{ color: 'var(--text-3)' }}>Pages</div>
          {['DNA', 'Pulse', 'Studio', 'Library'].map((p, i) => (
            <div key={p} className="flex items-center gap-2.5 px-2.5 py-1.5 text-[12px] font-semibold" style={{ color: 'var(--text-2)' }}>
              <span className="w-2 h-2 rounded-full opacity-40" style={{ background: ['var(--violet)', 'var(--amber)', '#16A34A', '#E11D48'][i] }} /> {p}
            </div>
          ))}
        </div>
      </div>
      {/* Main chat */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-2.5 border-b" style={{ borderColor: 'var(--border-raw)' }}>
          <div className="font-display text-[13px] font-bold">{headerTitle}</div>
          <div className="font-mono text-[10px] px-2.5 py-1 rounded-full" style={{ background: 'var(--bg)', color: 'var(--text-3)' }}>{headerTools}</div>
        </div>
        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5">
          {msgs.map((m, i) => {
            if (m.role === 'user') return <div key={i} className="self-end max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm text-[14px] leading-snug text-white" style={{ background: 'var(--bg-dark)' }}>{m.text}</div>
            if (m.role === 'assistant') return (
              <div key={i}><div className="font-mono text-[10px] font-medium uppercase tracking-[.06em] mb-1.5" style={{ color: 'var(--teal)' }}>COOPR</div><div className="text-[14px] leading-relaxed" style={{ color: 'var(--text)' }}>{m.text}</div></div>
            )
            return (
              <div key={i}>
                {m.blockLabel && <div className="font-mono text-[10px] font-medium uppercase tracking-[.06em] mb-1.5" style={{ color: 'var(--teal)' }}>{m.blockLabel}</div>}
                <div className="pl-3 border-l-[3px]" style={{ borderColor: m.blockAccent || 'var(--teal)' }}>{m.children}</div>
              </div>
            )
          })}
        </div>
        <div className="px-5 py-3 border-t flex gap-2 items-center" style={{ borderColor: 'var(--border-raw)' }}>
          <div className="w-[30px] h-[30px] rounded-lg border flex items-center justify-center text-[16px] shrink-0" style={{ borderColor: 'var(--border-raw)', background: 'var(--bg)', color: 'var(--text-3)' }}>+</div>
          <input readOnly placeholder="Message COOPR..." className="flex-1 py-2.5 px-3.5 rounded-[10px] border text-[14px] outline-none" style={{ borderColor: 'var(--border-raw)', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body, inherit)' }} />
          <div className="font-mono text-[9px] px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1" style={{ background: 'var(--bg)', color: 'var(--text-3)' }}><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Creative</div>
        </div>
        <div className="px-5 pb-1.5 flex justify-end"><span className="font-mono text-[9px]" style={{ color: 'var(--text-3)' }}>169 tools available</span></div>
      </div>
    </div>
  )
}

// ============================================
// APP
// ============================================

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(async (e: { preventDefault: () => void }) => {
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

  // Showcase section reveal
  const showcaseHeadingRef = useRef<HTMLDivElement>(null)
  const [showcaseHeadingVisible, setShowcaseHeadingVisible] = useState(false)
  useEffect(() => {
    if (!showcaseHeadingRef.current) return
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) { setShowcaseHeadingVisible(true); obs.unobserve(e.target) } }) },
      { threshold: 0.12 }
    )
    obs.observe(showcaseHeadingRef.current)
    return () => obs.disconnect()
  }, [])

  // CTA section reveal
  const ctaRef = useRef<HTMLDivElement>(null)
  const [ctaVisible, setCtaVisible] = useState(false)
  useEffect(() => {
    if (!ctaRef.current) return
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) { setCtaVisible(true); obs.unobserve(e.target) } }) },
      { threshold: 0.12 }
    )
    obs.observe(ctaRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <FloatingNav />

      {/* HERO WITH GRAINIENT */}
      <div className="v5-hero-wrapper">
        <div className="v5-hero-grain" />
        <section className="v5-hero">
          <div className="v5-hero-brand-stack">
            <HeroBrandStack />
          </div>
          <div className="v5-hero-badge">
            <span className="v5-hero-badge-dot" />
            Private Beta
          </div>
          <h1 className="v5-hero-h1">
            We don't make your content.<br />
            We make you a <em>better creator.</em>
          </h1>
          <p className="v5-hero-sub">Your voice. Your niche. Your data. One creative engine.</p>
          <div className="v5-hero-ctas">
            <a href="#cta-section" className="v5-btn-glow">
              Request Early Access
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#learn" className="v5-btn-ghost">
              See how it works
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>

          {/* Browser Demo Frame */}
          <div className="v5-demo-container">
            <div className="v5-browser-frame">
              <div className="v5-browser-bar">
                <div className="v5-browser-dots">
                  <span className="v5-browser-dot" />
                  <span className="v5-browser-dot" />
                  <span className="v5-browser-dot" />
                </div>
                <div className="v5-browser-url">app.getcoopr.com</div>
              </div>
              <div className="v5-browser-body">
                <V5HeroDemo />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* TRUST BAR */}
      <TrustBar />

      {/* CURVED LOOP TEXT */}
      <CurvedLoopText />

      {/* IT LEARNS YOU — Tabbed Showcase */}
      <section className="v5-section" id="learn">
        <div ref={showcaseHeadingRef} className="text-center mb-2" style={{ opacity: showcaseHeadingVisible ? 1 : 0, transform: showcaseHeadingVisible ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="v5-section-label">Your Creative Fingerprint</div>
        </div>
        <div className="text-center mb-3">
          <BlurHeading words={[{ text: 'It' }, { text: 'learns' }, { text: 'how' }, { text: 'you', em: true }, { text: 'create.' }]} inView={showcaseHeadingVisible} />
        </div>
        <div className="text-center mb-12" style={{ opacity: showcaseHeadingVisible ? 1 : 0, transform: showcaseHeadingVisible ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          <p className="v5-section-body" style={{ margin: '0 auto' }}>Every video you post teaches COOPR something new. It builds a creative fingerprint unique to you — and it only gets sharper.</p>
        </div>

        <TabbedShowcase />

        <ShowcaseDays />
      </section>

      {/* PREDICTIONS */}
      <PredictionsSection />

      {/* NICHE */}
      <NicheSection />

      {/* FOUNDER */}
      <Founder />

      {/* CTA */}
      <section ref={ctaRef} className="v5-cta-section" id="cta-section" style={{ opacity: ctaVisible ? 1 : 0, transform: ctaVisible ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
        <div className="v5-section-label" style={{ textAlign: 'center' }}>Ready?</div>
        <div className="text-center mb-3">
          <BlurHeading words={[{ text: 'Your' }, { text: 'content' }, { text: 'deserves' }, { text: 'a' }, { text: 'creative', em: true }, { text: 'engine.' }]} inView={ctaVisible} />
        </div>
        <p className="v5-section-body" style={{ textAlign: 'center', margin: '0 auto 36px' }}>COOPR is in private beta. The creators who join now shape what it becomes.</p>
        <div className="text-center">
          <WaitlistForm {...formProps} />
        </div>
        <p className="v5-cta-trust">Free during beta. No credit card. Your data stays yours.</p>
      </section>

      {/* WORDMARK FOOTER */}
      <WordmarkFooter />
    </div>
  )
}

// ============================================
// TRUST BAR
// ============================================

function TrustBar() {
  const { ref, inView } = useScrollReveal()
  return (
    <div ref={ref} className="v5-trust-bar" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
      <span>Private Beta</span>
      <span className="v5-trust-sep" />
      <span>Built by a creator, for creators</span>
      <span className="v5-trust-sep" />
      <span>Your data stays yours</span>
    </div>
  )
}

// ============================================
// SHOWCASE DAYS
// ============================================

function ShowcaseDays() {
  const { ref, inView } = useScrollReveal()
  return (
    <div ref={ref} className="v5-showcase-days" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
      {[
        { num: 'DAY 1', label: 'Discovers', desc: 'Analyzes your content, finds patterns, discovers competitors' },
        { num: 'DAY 30', label: 'Knows you', desc: 'Tracks trends, predicts what will land, calibrates to your voice' },
        { num: 'DAY 90', label: 'Creative director', desc: 'Every suggestion tuned to you. Your personal creative engine.' },
      ].map(d => (
        <div key={d.num} className="v5-showcase-day">
          <div className="v5-showcase-day-num">{d.num}</div>
          <div className="v5-showcase-day-label">{d.label}</div>
          <div className="v5-showcase-day-desc">{d.desc}</div>
        </div>
      ))}
    </div>
  )
}

export default App
