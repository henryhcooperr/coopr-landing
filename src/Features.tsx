import { useEffect, useRef } from 'react'

// ============================================
// SCROLL REVEAL OBSERVER
// ============================================

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll('.feat-reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') }),
      { threshold: 0.15 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return ref
}

// ============================================
// FEATURE DATA
// ============================================

const FEATURES = [
  {
    tag: 'Hook Lab',
    title: 'Generate hooks trained on what actually works — for you.',
    desc: 'Not templates. Not ChatGPT prompts. Coopr analyzes your top-performing hooks, matches them to your voice, and generates variants with predicted hold rates. Every hook is scored against your audience — not a generic benchmark.',
    details: [
      { label: 'Voice matching', note: 'Hooks sound like you, not a robot' },
      { label: 'Hold rate prediction', note: 'ML model trained on your specific videos' },
      { label: 'Iterative refinement', note: 'Auto-improves until it exceeds your quality gate' },
      { label: 'Competitive awareness', note: 'Checks what\'s trending in your niche right now' },
    ],
    accent: 'var(--green)',
    accentBg: 'rgba(22,163,74,0.06)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    tag: 'Creative DNA',
    title: 'Your content fingerprint — auto-derived, always evolving.',
    desc: 'Coopr watches what you make and learns what makes it yours. Shot types, pacing, lighting, hooks, environments — all distilled into a Creative DNA profile that evolves as you evolve. No surveys. No manual input.',
    details: [
      { label: 'Auto-compiled', note: 'Derived from your actual content, not self-reported' },
      { label: '77+ signals', note: 'Shot diversity, pacing, mood, text overlay, lighting...' },
      { label: 'Evolving profile', note: 'Updates with every new video you post' },
      { label: 'Voice Engine', note: 'Learns your writing tone and vocabulary patterns' },
    ],
    accent: 'var(--violet)',
    accentBg: 'rgba(124,58,237,0.06)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  {
    tag: 'Competitor Intelligence',
    title: 'See what\'s working in your niche — without the guesswork.',
    desc: 'Coopr tracks your competitors\' content automatically. What hooks are they using? When do they post? What formats get engagement? You get the signal without the hours of manual scrolling.',
    details: [
      { label: 'Auto-tracking', note: 'Competitors monitored daily, no manual effort' },
      { label: 'Niche benchmarking', note: 'Your scores compared against your competitive set' },
      { label: 'Hook analysis', note: 'See which competitor hooks outperform' },
      { label: 'Timing intelligence', note: 'Know when competitors post and when to avoid overlap' },
    ],
    accent: 'var(--teal)',
    accentBg: 'rgba(13,148,136,0.06)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    tag: 'Trend Radar',
    title: 'Catch trends early — before they\'re obvious.',
    desc: 'Cross-referenced signals from Google Trends, competitor activity, and your own content performance. Z-score normalized, changepoint detected, and seasonally validated. Not vibes — statistics.',
    details: [
      { label: 'Multi-source signals', note: 'Google Trends + competitor + your own data' },
      { label: 'Z-score normalization', note: 'Apples-to-apples comparison across signal types' },
      { label: 'Changepoint detection', note: 'Alerts you when a trend is genuinely inflecting' },
      { label: 'Seasonal validation', note: 'Separates real trends from annual patterns' },
    ],
    accent: 'var(--amber)',
    accentBg: 'rgba(251,191,36,0.08)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    tag: 'Content Scoring',
    title: '19 ML models score every video you post.',
    desc: 'Hold rate prediction, engagement scoring, hook quality, voice match, trend alignment — each powered by a model trained on your data. Scores compound as you create more. The system literally gets smarter with every post.',
    details: [
      { label: '19 ML models', note: 'Each trained specifically on your content and audience' },
      { label: 'Learned weights', note: 'Ridge regression learns which signals matter most for you' },
      { label: 'Coopr Score', note: 'Single number: where you stand vs. your niche' },
      { label: 'Compounding', note: 'More data = better predictions = better content' },
    ],
    accent: 'var(--green)',
    accentBg: 'rgba(22,163,74,0.06)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </svg>
    ),
  },
  {
    tag: 'Cadence Engine',
    title: 'Post at the right time, at the right pace — backed by data.',
    desc: 'Coopr analyzes your audience\'s activity patterns, your posting history, and competitor schedules to recommend optimal timing. Not generic "best times to post" — your specific audience, your specific niche.',
    details: [
      { label: 'Audience-specific', note: 'Based on when your followers are actually active' },
      { label: 'Burnout detection', note: 'Alerts you if posting pace is unsustainable' },
      { label: 'Competitor-aware', note: 'Avoids posting when competitors flood the feed' },
      { label: 'Adherence tracking', note: 'See how sticking to the plan affects performance' },
    ],
    accent: 'var(--teal)',
    accentBg: 'rgba(13,148,136,0.06)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

// ============================================
// FEATURE CARD
// ============================================

function FeatureSection({ feature, idx }: { feature: typeof FEATURES[0]; idx: number }) {
  const isEven = idx % 2 === 0
  return (
    <div className="feat-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out [&.vis]:opacity-100 [&.vis]:translate-y-0">
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-start`}>
        {/* Text side */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: feature.accentBg, color: feature.accent }}
            >
              {feature.icon}
            </span>
            <span
              className="font-mono text-[11px] font-semibold tracking-[0.06em] uppercase py-[3px] px-2.5 rounded-full"
              style={{ background: feature.accentBg, color: feature.accent }}
            >
              {feature.tag}
            </span>
          </div>
          <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] mb-3">
            {feature.title}
          </h3>
          <p className="text-base text-[var(--text-2)] leading-relaxed mb-6 max-w-[520px]">
            {feature.desc}
          </p>
        </div>

        {/* Detail cards */}
        <div className="flex-1 min-w-0 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {feature.details.map((d, i) => (
              <div
                key={d.label}
                className="feat-reveal opacity-0 translate-y-4 transition-all duration-500 ease-out [&.vis]:opacity-100 [&.vis]:translate-y-0 p-4 bg-white border border-[var(--border-raw)] rounded-xl"
                style={{ transitionDelay: `${i * 80 + 100}ms` }}
              >
                <div className="text-sm font-semibold mb-1">{d.label}</div>
                <div className="text-xs text-[var(--text-3)] leading-relaxed">{d.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// PAGE
// ============================================

export default function Features() {
  const wrapRef = useScrollReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div ref={wrapRef} className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" onClick={() => { window.location.hash = ''; window.scrollTo(0, 0) }} className="flex items-center gap-2 no-underline">
            <img src="/coopr-logo.png" alt="Coopr Labs" className="h-8" />
          </a>
          <div className="flex items-center gap-6">
            <a href="#" onClick={() => { window.location.hash = '' }} className="text-sm font-medium text-[var(--text-2)] hover:text-[var(--text)] no-underline transition-colors">
              Home
            </a>
            <a href="#cta" className="font-body text-sm font-semibold text-[var(--text-inv)] bg-[var(--bg-dark)] px-5 py-2.5 rounded-full no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow)]">
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-[800px] mx-auto px-6 pt-20 pb-16 text-center">
        <div className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--teal)] mb-4 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
          166 tools. One conversation.
        </div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] mb-5">
          Every feature is trained on{' '}
          <em className="font-accent italic font-normal text-[var(--teal)]">your data</em>
        </h1>
        <p className="text-lg text-[var(--text-2)] max-w-[540px] mx-auto leading-relaxed">
          Not generic. Not one-size-fits-all. Coopr learns from your content, your audience, and your niche — then compounds that knowledge over time.
        </p>
      </header>

      {/* Features */}
      <div className="max-w-[1100px] mx-auto px-6 pb-24">
        <div className="flex flex-col gap-24">
          {FEATURES.map((feature, idx) => (
            <FeatureSection key={feature.tag} feature={feature} idx={idx} />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-b border-[var(--border-raw)] py-12">
        <div className="max-w-[900px] mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { num: '19', label: 'ML models' },
            { num: '77+', label: 'Signals per video' },
            { num: '166', label: 'Tools available' },
            { num: '45', label: 'Daily sync steps' },
          ].map(s => (
            <div key={s.label} className="feat-reveal opacity-0 translate-y-4 transition-all duration-500 [&.vis]:opacity-100 [&.vis]:translate-y-0">
              <div className="font-display text-[2.5rem] font-extrabold tracking-[-0.04em] leading-none">{s.num}</div>
              <div className="text-sm text-[var(--text-3)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[600px] mx-auto px-6 py-20 text-center" id="cta">
        <h2 className="font-display text-[clamp(2rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] mb-4">
          Ready to see what your data{' '}
          <em className="font-accent italic font-normal text-[var(--teal)]">actually says?</em>
        </h2>
        <p className="text-base text-[var(--text-2)] mb-8">
          Join the waitlist. We'll show you what Coopr finds in your first 10 videos.
        </p>
        <a href="#" onClick={() => { window.location.hash = ''; setTimeout(() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }), 100) }} className="inline-flex items-center gap-2 font-body text-[15px] font-semibold text-[var(--text-inv)] bg-[var(--bg-dark)] border-none py-3.5 px-8 rounded-full no-underline cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow)]">
          Join the Waitlist
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="#FAFAF9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border-raw)] py-8">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between text-xs text-[var(--text-3)]">
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
