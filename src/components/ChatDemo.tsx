import { useRef, useState, useEffect, useCallback } from 'react'

// ============================================
// ANIMATION HELPERS
// ============================================

const noMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

function wait(ms: number): Promise<void> {
  if (noMotion) return Promise.resolve()
  return new Promise(r => setTimeout(r, ms))
}

function charDelay(ch: string, baseSpeed: number): number {
  if (ch === ',' || ch === ';') return baseSpeed + 60
  if (ch === '.' || ch === '!' || ch === '?') return baseSpeed + 100
  if (ch === ' ') return baseSpeed - 8
  return baseSpeed + Math.random() * 18
}

function typeInto(
  el: HTMLElement,
  text: string,
  speed: number,
  cursorDark: boolean,
  abortRef: { current: boolean }
): Promise<void> {
  if (noMotion) {
    el.textContent = text
    return Promise.resolve()
  }
  return new Promise(resolve => {
    const cur = document.createElement('span')
    cur.className = cursorDark ? 'tcur tcur--dark' : 'tcur'
    el.textContent = ''
    el.appendChild(cur)
    let i = 0
    function tick() {
      if (abortRef.current || i >= text.length) {
        setTimeout(() => { cur.remove(); resolve() }, 280)
        return
      }
      const ch = text[i]
      el.insertBefore(document.createTextNode(ch), cur)
      i++
      setTimeout(tick, charDelay(ch, speed))
    }
    tick()
  })
}

function countTo(
  el: HTMLElement,
  from: number,
  to: number,
  ms: number,
  suffix: string = '%'
): Promise<void> {
  if (noMotion) { el.textContent = to + suffix; return Promise.resolve() }
  return new Promise(resolve => {
    const start = performance.now()
    function tick(now: number) {
      const p = Math.min((now - start) / ms, 1)
      const e = 1 - Math.pow(1 - p, 4)
      let val = from + (to - from) * e
      if (p > 0.85 && p < 0.97) val = Math.min(to + (to - from) * 0.04, val)
      el.textContent = Math.round(Math.min(val, to)) + suffix
      if (p < 1) requestAnimationFrame(tick)
      else { el.textContent = to + suffix; resolve() }
    }
    requestAnimationFrame(tick)
  })
}

// ============================================
// DATA
// ============================================

interface StepData {
  color: 'g' | 'v'
  text: string
  boldParts: string[]
  time: string
  sub?: string
  subEmParts?: string[]
  delay: number
}

const REASONING_STEPS: StepData[] = [
  {
    color: 'g',
    text: 'Analyzed your {top-performing hooks}',
    boldParts: ['top-performing hooks'],
    time: '0.3s',
    sub: 'Your {question + reveal} hooks hold at 83%',
    subEmParts: ['question + reveal'],
    delay: 440,
  },
  {
    color: 'g',
    text: '{Scanned competitor hooks} in your niche',
    boldParts: ['Scanned competitor hooks'],
    time: '0.5s',
    sub: '{3 competitors} shifted to myth-busting this week',
    subEmParts: ['3 competitors'],
    delay: 380,
  },
  {
    color: 'v',
    text: '{Matched to your voice} — direct, conversational',
    boldParts: ['Matched to your voice'],
    time: '0.4s',
    delay: 420,
  },
  {
    color: 'g',
    text: 'Generated {5 hook variants}',
    boldParts: ['5 hook variants'],
    time: '1.2s',
    delay: 500,
  },
  {
    color: 'g',
    text: '{Predicted hold rate} for each variant',
    boldParts: ['Predicted hold rate'],
    time: '0.8s',
    sub: 'Trained on {your 47 videos} — not generic data',
    subEmParts: ['your 47 videos'],
    delay: 360,
  },
]

const TIMING_STEPS: StepData[] = [
  {
    color: 'g',
    text: 'Checked {your audience activity} patterns',
    boldParts: ['your audience activity'],
    time: '0.2s',
    sub: 'Peak engagement: {Tue 7pm, Thu 8pm} PST',
    subEmParts: ['Tue 7pm, Thu 8pm'],
    delay: 380,
  },
  {
    color: 'g',
    text: 'Analyzed {competitor posting schedule}',
    boldParts: ['competitor posting schedule'],
    time: '0.4s',
    sub: '{2 competitors} posted similar hooks Mon — avoid overlap',
    subEmParts: ['2 competitors'],
    delay: 340,
  },
  {
    color: 'v',
    text: 'Cross-referenced {your cadence pattern}',
    boldParts: ['your cadence pattern'],
    time: '0.3s',
    sub: "You post {3.2/wk} — Thursday slot is open",
    subEmParts: ['3.2/wk'],
    delay: 360,
  },
]

const SCORE_BARS = [
  { name: 'Curiosity gap', width: 90, value: '9/10', color: 'h' as const },
  { name: 'Pattern interrupt', width: 80, value: '8/10', color: 'h' as const },
  { name: 'Voice match', width: 90, value: '9/10', color: 'h' as const },
  { name: 'Trend alignment', width: 70, value: '7/10', color: 'm' as const },
]

// ============================================
// SUBCOMPONENTS
// ============================================

function ThinkingDots() {
  return (
    <div className="flex items-start gap-[10px]">
      <div className="w-7 h-7 rounded-[7px] bg-[var(--bg-dark)] flex items-center justify-center text-xs font-bold text-[var(--text-inv)] flex-shrink-0">C</div>
      <div className="py-[14px] px-5 rounded-[14px] bg-[var(--bg-alt)] rounded-bl inline-flex items-center gap-1 min-w-[60px]">
        <span className="w-[7px] h-[7px] rounded-full bg-[var(--text-3)]" style={{ animation: 'think-bounce 1.2s ease-in-out infinite' }} />
        <span className="w-[7px] h-[7px] rounded-full bg-[var(--text-3)]" style={{ animation: 'think-bounce 1.2s ease-in-out infinite 0.15s' }} />
        <span className="w-[7px] h-[7px] rounded-full bg-[var(--text-3)]" style={{ animation: 'think-bounce 1.2s ease-in-out infinite 0.3s' }} />
      </div>
    </div>
  )
}

function renderTextWithBold(text: string, boldParts: string[]) {
  let remaining = text
  const elements: React.ReactNode[] = []
  let key = 0
  for (const part of boldParts) {
    const placeholder = `{${part}}`
    const idx = remaining.indexOf(placeholder)
    if (idx >= 0) {
      if (idx > 0) elements.push(<span key={key++}>{remaining.slice(0, idx)}</span>)
      elements.push(<strong key={key++} className="text-[var(--text)] font-semibold">{part}</strong>)
      remaining = remaining.slice(idx + placeholder.length)
    }
  }
  if (remaining) elements.push(<span key={key++}>{remaining}</span>)
  return elements
}

function renderTextWithEm(text: string, emParts: string[]) {
  let remaining = text
  const elements: React.ReactNode[] = []
  let key = 0
  for (const part of emParts) {
    const placeholder = `{${part}}`
    const idx = remaining.indexOf(placeholder)
    if (idx >= 0) {
      if (idx > 0) elements.push(<span key={key++}>{remaining.slice(0, idx)}</span>)
      elements.push(<em key={key++} className="not-italic font-mono font-medium text-[var(--green)]">{part}</em>)
      remaining = remaining.slice(idx + placeholder.length)
    }
  }
  if (remaining) elements.push(<span key={key++}>{remaining}</span>)
  return elements
}

function ReasoningNode({ step, showLine }: { step: StepData; showLine: boolean }) {
  return (
    <div>
      <div className="anim-fade vis flex items-start gap-[10px] py-1.5 relative">
        {showLine && (
          <div
            className="absolute left-[6px] top-5 bottom-[-6px] w-px bg-[var(--border-raw)]"
            style={{ transformOrigin: 'top', animation: 'line-grow 0.4s cubic-bezier(0.16,1,0.3,1) forwards' }}
          />
        )}
        <div className={`w-[13px] h-[13px] rounded-full flex-shrink-0 mt-[3px] flex items-center justify-center ${
          step.color === 'g'
            ? 'bg-[rgba(22,163,74,0.1)] border-[1.5px] border-[var(--green)]'
            : 'bg-[rgba(37,99,235,0.1)] border-[1.5px] border-[var(--blue)]'
        }`}>
          <span className={`w-1 h-1 rounded-full ${step.color === 'g' ? 'bg-[var(--green)]' : 'bg-[var(--blue)]'}`} />
        </div>
        <span className="text-[13px] text-[var(--text-2)] leading-relaxed">
          {renderTextWithBold(step.text, step.boldParts)}
        </span>
        <span className="font-mono text-[11px] text-[var(--text-3)] ml-auto flex-shrink-0">{step.time}</span>
      </div>
      {step.sub && step.subEmParts && (
        <div className="anim-fade vis text-xs text-[var(--text-3)] mt-0.5 pl-[23px]">
          {renderTextWithEm(step.sub, step.subEmParts)}
        </div>
      )}
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function ChatDemo() {
  const chatBodyRef = useRef<HTMLDivElement>(null)
  const browserRef = useRef<HTMLDivElement>(null)
  const holdValRef = useRef<HTMLSpanElement>(null)
  const scoreNumRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef(false)
  const playedRef = useRef(false)
  const playingRef = useRef(false)

  // Turn 1 state
  const [phase, setPhase] = useState<string>('idle')
  const [showReplay, setShowReplay] = useState(false)
  const [showThinking, setShowThinking] = useState(false)
  const [showAgentBlock, setShowAgentBlock] = useState(false)
  const [visibleNodes, setVisibleNodes] = useState<number>(0)
  const [showItBar, setShowItBar] = useState(false)
  const [showRefNode, setShowRefNode] = useState(false)
  const [showQualityGate, setShowQualityGate] = useState(false)
  const [rcFinished, setRcFinished] = useState(false)
  const [showResponseBub, setShowResponseBub] = useState(false)
  const [showHookCard, setShowHookCard] = useState(false)
  const [showTrail, setShowTrail] = useState(false)

  // Turn 2 state
  const [showUserMsg2, setShowUserMsg2] = useState(false)
  const [showThinking2, setShowThinking2] = useState(false)
  const [showAgentBlock2, setShowAgentBlock2] = useState(false)
  const [visibleTimingNodes, setVisibleTimingNodes] = useState(0)
  const [rcFinished2, setRcFinished2] = useState(false)
  const [showResponseBub2, setShowResponseBub2] = useState(false)
  const [showTimingCard, setShowTimingCard] = useState(false)

  // Proactive insight
  const [showInsight, setShowInsight] = useState(false)

  // Sidebar
  const [activeSidebarIdx, setActiveSidebarIdx] = useState(0)
  const [flashSidebarIdx, setFlashSidebarIdx] = useState<number | null>(null)

  // Refs for imperative DOM manipulation
  const userTypeRef = useRef<HTMLSpanElement>(null)
  const userType2Ref = useRef<HTMLSpanElement>(null)
  const itS1Ref = useRef<HTMLSpanElement>(null)
  const itS2Ref = useRef<HTMLSpanElement>(null)
  const itS3Ref = useRef<HTMLSpanElement>(null)
  const qgFillRef = useRef<HTMLDivElement>(null)
  const qgValRef = useRef<HTMLSpanElement>(null)
  const responseTypeRef = useRef<HTMLSpanElement>(null)
  const responseType2Ref = useRef<HTMLSpanElement>(null)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  const scroll = useCallback(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: noMotion ? 'instant' : 'smooth',
      })
    }
  }, [])

  const flashSidebar = useCallback((idx: number) => {
    if (noMotion) return
    setFlashSidebarIdx(idx)
    setTimeout(() => {
      setFlashSidebarIdx(null)
      setActiveSidebarIdx(idx)
    }, 320)
  }, [])

  const resetState = useCallback(() => {
    setPhase('idle')
    setShowReplay(false)
    setShowThinking(false)
    setShowAgentBlock(false)
    setVisibleNodes(0)
    setShowItBar(false)
    setShowRefNode(false)
    setShowQualityGate(false)
    setRcFinished(false)
    setShowResponseBub(false)
    setShowHookCard(false)
    setShowTrail(false)
    setShowUserMsg2(false)
    setShowThinking2(false)
    setShowAgentBlock2(false)
    setVisibleTimingNodes(0)
    setRcFinished2(false)
    setShowResponseBub2(false)
    setShowTimingCard(false)
    setShowInsight(false)
    setActiveSidebarIdx(0)
    setFlashSidebarIdx(null)
    if (holdValRef.current) holdValRef.current.textContent = '61%'
    if (scoreNumRef.current) scoreNumRef.current.textContent = '84'
    barRefs.current.forEach(bar => { if (bar) bar.style.width = '0' })
  }, [])

  const play = useCallback(async () => {
    if (playingRef.current) return
    playingRef.current = true
    abortRef.current = false

    setActiveSidebarIdx(0)
    await wait(350)

    // ─── TURN 1: Hook generation ───
    setPhase('user-typing')
    await wait(180)
    await wait(50)
    if (userTypeRef.current) {
      await typeInto(userTypeRef.current, 'Write me a killer hook for my next reel', 32, false, abortRef)
    }
    if (abortRef.current) return
    scroll()
    await wait(520)

    // Thinking
    setShowThinking(true)
    setPhase('thinking')
    scroll()
    await wait(1300)
    if (abortRef.current) return

    // Reasoning chain
    setShowThinking(false)
    await wait(180)
    setShowAgentBlock(true)
    setPhase('reasoning')
    scroll()
    await wait(480)
    if (abortRef.current) return

    flashSidebar(4) // Hook Lab

    for (let i = 0; i < REASONING_STEPS.length; i++) {
      if (abortRef.current) return
      setVisibleNodes(i + 1)
      scroll()
      await wait(REASONING_STEPS[i].delay)
    }
    if (abortRef.current) return

    // Iteration bar
    setShowItBar(true)
    setPhase('scoring')
    scroll()
    await wait(180)

    if (itS1Ref.current) await countTo(itS1Ref.current, 0, 72, 480)
    if (abortRef.current) return
    await wait(260)
    if (itS2Ref.current) await countTo(itS2Ref.current, 0, 84, 480)
    if (abortRef.current) return
    await wait(260)
    if (itS3Ref.current) await countTo(itS3Ref.current, 0, 87, 480)
    if (abortRef.current) return

    // Update right panel
    if (holdValRef.current && !noMotion) {
      holdValRef.current.style.transition = 'color 0.3s'
      holdValRef.current.style.color = 'var(--green)'
      holdValRef.current.textContent = '68%'
      setTimeout(() => { if (holdValRef.current) holdValRef.current.style.color = '' }, 900)
    }

    setShowRefNode(true)
    scroll()
    await wait(380)
    if (abortRef.current) return

    // Quality gate
    setShowQualityGate(true)
    scroll()
    await wait(180)

    if (qgFillRef.current) {
      requestAnimationFrame(() => { if (qgFillRef.current) qgFillRef.current.style.width = '87%' })
      setTimeout(() => { if (qgFillRef.current) qgFillRef.current.classList.add('glowing') }, 600)
    }
    if (qgValRef.current) await countTo(qgValRef.current, 0, 87, 900)
    if (abortRef.current) return

    setRcFinished(true)
    await wait(460)
    if (abortRef.current) return

    // Response
    setShowResponseBub(true)
    setPhase('response')
    scroll()
    await wait(180)
    if (responseTypeRef.current) {
      await typeInto(responseTypeRef.current, "Here's your top hook, refined through 2 rounds:", 24, true, abortRef)
    }
    if (abortRef.current) return

    // Hook card
    setShowHookCard(true)
    setPhase('hook')
    scroll()
    await wait(350)
    if (abortRef.current) return

    for (let j = 0; j < SCORE_BARS.length; j++) {
      if (abortRef.current) return
      const bar = barRefs.current[j]
      if (bar) {
        requestAnimationFrame(() => { bar.style.width = SCORE_BARS[j].width + '%' })
        if (!noMotion) {
          setTimeout(() => {
            bar.classList.add('sc-fill--shimmer')
            setTimeout(() => bar.classList.remove('sc-fill--shimmer'), 1100)
          }, 400)
        }
      }
      await wait(130)
    }
    if (abortRef.current) return
    await wait(380)

    // Update Coopr Score
    if (scoreNumRef.current && !noMotion) {
      scoreNumRef.current.style.transition = 'color 0.3s'
      scoreNumRef.current.style.color = 'var(--green)'
      const scoreStart = performance.now()
      const scoreEl = scoreNumRef.current;
      (function scoreAnim(now: number) {
        const p = Math.min((now - scoreStart) / 800, 1)
        const e = 1 - Math.pow(1 - p, 3)
        const v = Math.round(84 + 4 * e)
        if (scoreEl) scoreEl.textContent = String(Math.min(v, 88))
        if (p < 1) requestAnimationFrame(scoreAnim)
        else if (scoreEl) scoreEl.textContent = '88'
      })(performance.now())
      setTimeout(() => { if (scoreNumRef.current) scoreNumRef.current.style.color = '' }, 1200)
    }

    setShowTrail(true)
    scroll()
    await wait(1200)
    if (abortRef.current) return

    // ─── TURN 2: Timing analysis ───
    setShowUserMsg2(true)
    setPhase('user2-typing')
    scroll()
    await wait(180)
    await wait(50)
    if (userType2Ref.current) {
      await typeInto(userType2Ref.current, 'When should I post this?', 32, false, abortRef)
    }
    if (abortRef.current) return
    scroll()
    await wait(520)

    // Thinking 2
    setShowThinking2(true)
    scroll()
    await wait(1000)
    if (abortRef.current) return

    // Reasoning chain 2
    setShowThinking2(false)
    await wait(180)
    setShowAgentBlock2(true)
    scroll()
    await wait(400)
    if (abortRef.current) return

    flashSidebar(1) // Content

    for (let i = 0; i < TIMING_STEPS.length; i++) {
      if (abortRef.current) return
      setVisibleTimingNodes(i + 1)
      scroll()
      await wait(TIMING_STEPS[i].delay)
    }
    if (abortRef.current) return

    setRcFinished2(true)
    await wait(400)
    if (abortRef.current) return

    // Response 2
    setShowResponseBub2(true)
    scroll()
    await wait(180)
    if (responseType2Ref.current) {
      await typeInto(responseType2Ref.current, "Post Thursday at 8pm PST. Here's why:", 24, true, abortRef)
    }
    if (abortRef.current) return

    // Timing card
    setShowTimingCard(true)
    scroll()
    await wait(700)
    if (abortRef.current) return

    // Proactive insight
    setShowInsight(true)
    scroll()
    await wait(600)
    if (abortRef.current) return

    flashSidebar(2) // Trends

    setPhase('done')
    setShowReplay(true)
    playingRef.current = false
    playedRef.current = true
  }, [scroll, flashSidebar])

  const handleReplay = useCallback(() => {
    abortRef.current = true
    playingRef.current = false
    playedRef.current = false
    resetState()
    setTimeout(() => {
      abortRef.current = false
      play()
    }, 90)
  }, [resetState, play])

  // IntersectionObserver trigger
  useEffect(() => {
    if (!browserRef.current) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !playedRef.current && !playingRef.current) {
            play()
          }
        })
      },
      { threshold: 0.22 }
    )
    obs.observe(browserRef.current)
    return () => obs.disconnect()
  }, [play])

  const sidebarItems = [
    { icon: '\u25C8', label: 'Chat' },
    { icon: '\u25A0', label: 'Content' },
    { icon: '\u25B2', label: 'Trends' },
    { icon: '\u25C6', label: 'Competitors' },
    { icon: '\u2726', label: 'Hook Lab', section: 'Create' },
    { icon: '\u270E', label: 'Scripts' },
    { icon: '\u2637', label: 'Shot Lists' },
    { icon: '\u2630', label: 'Engine', section: 'Analyze' },
    { icon: '\u2699', label: 'Settings' },
  ]

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20 pb-[100px] relative" id="product">
      <div className="text-center font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--text-3)] mb-4">
        See it work
      </div>
      <h2 className="text-center font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em] mb-3">
        An agent that shows <em className="font-accent italic font-normal">its work</em>
      </h2>
      <p className="text-center text-base text-[var(--text-2)] max-w-[440px] mx-auto mb-12">
        Ask a question. Coopr orchestrates tools, iterates on quality, and shows you every step.
      </p>

      {/* Floating wrapper + glow backdrop */}
      <div className="relative" ref={browserRef}>
        <div
          className="absolute -inset-8 rounded-[40px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(13,148,136,0.12) 0%, transparent 70%)',
            animation: 'glow-pulse 4s ease-in-out infinite',
          }}
        />
        <div className="relative z-[1]" style={{ animation: noMotion ? 'none' : 'browser-float 6s ease-in-out infinite' }}>
          <div className="bg-white border border-[var(--border-raw)] rounded-[20px] overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
            {/* Browser chrome */}
            <div className="flex items-center py-3 px-4 bg-[var(--bg-alt)] border-b border-[var(--border-light)] gap-2">
              <div className="flex gap-1.5">
                <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                <span className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
                <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 text-center font-mono text-[11px] text-[var(--text-3)]">
                app.coopr.studio
              </div>
            </div>

            {/* App grid */}
            <div className="grid grid-cols-[220px_1fr_260px] h-[720px] max-lg:grid-cols-1 max-lg:h-auto">
              {/* Sidebar */}
              <div className="bg-[var(--bg-dark)] p-3 text-[var(--text-inv)] max-lg:hidden">
                <div className="flex items-center gap-[10px] px-3 pb-4 border-b border-white/[0.06] mb-3.5">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-display text-xs font-extrabold text-[var(--bg-dark)]">C</div>
                  <span className="font-display text-[15px] font-bold tracking-[-0.03em]">Coopr</span>
                </div>
                {sidebarItems.map((item, idx) => (
                  <div key={item.label}>
                    {item.section && (
                      <div className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase text-white/20 px-3 mt-4 mb-2">
                        {item.section}
                      </div>
                    )}
                    <div
                      className={`flex items-center gap-3 py-[9px] px-3 rounded-lg text-sm font-[450] cursor-pointer transition-all duration-250 ${
                        flashSidebarIdx === idx
                          ? 'sb-it-flash'
                          : activeSidebarIdx === idx
                          ? 'bg-white/[0.08] text-white'
                          : 'text-white/40 hover:bg-white/[0.05] hover:text-white/70'
                      }`}
                    >
                      <span className={`text-sm w-[18px] text-center ${activeSidebarIdx === idx ? 'opacity-100' : 'opacity-50'}`}>{item.icon}</span>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat */}
              <div className="flex flex-col min-h-0 bg-[var(--bg)] border-r border-[var(--border-light)] max-lg:min-h-[500px]">
                <div className="flex items-center gap-[10px] py-3.5 px-5 border-b border-[var(--border-light)]">
                  <div className="w-7 h-7 rounded-[7px] bg-[var(--bg-dark)] flex items-center justify-center text-xs font-bold text-[var(--text-inv)]">C</div>
                  <span className="text-[15px] font-semibold tracking-[-0.01em]">Coopr</span>
                  <span className="text-xs text-[var(--text-3)]">166 tools available</span>
                </div>

                <div className="flex-1 min-h-0 relative">
                  {/* Scroll fade top */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[var(--bg)] to-transparent z-[2] pointer-events-none opacity-0 transition-opacity duration-200" id="chat-fade-top" />
                  {/* Scroll fade bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[var(--bg)] to-transparent z-[2] pointer-events-none" id="chat-fade-bottom" />
                <div
                  ref={chatBodyRef}
                  className="absolute inset-0 py-5 px-6 overflow-y-auto flex flex-col gap-[18px]"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.15) transparent' }}
                  onScroll={(e) => {
                    const el = e.currentTarget
                    const top = document.getElementById('chat-fade-top')
                    const bot = document.getElementById('chat-fade-bottom')
                    if (top) top.style.opacity = el.scrollTop > 20 ? '1' : '0'
                    if (bot) bot.style.opacity = (el.scrollHeight - el.scrollTop - el.clientHeight) > 20 ? '1' : '0'
                  }}
                >
                  {/* ─── TURN 1 ─── */}

                  {/* User message 1 */}
                  {phase !== 'idle' && (
                    <div className="anim-slide-r vis flex flex-col items-end gap-1">
                      <div className="flex flex-row-reverse items-start gap-[10px]">
                        <div className="w-7 h-7 rounded-[7px] bg-[var(--blue)] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">H</div>
                        <div className="py-3 px-4 rounded-[14px] bg-[var(--bg-dark)] text-[var(--text-inv)] rounded-br text-sm leading-relaxed max-w-[460px]">
                          <span ref={userTypeRef} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Thinking dots 1 */}
                  {showThinking && (
                    <div className="anim-fade vis">
                      <ThinkingDots />
                    </div>
                  )}

                  {/* Agent block 1 */}
                  {showAgentBlock && (
                    <div className="flex items-start gap-[10px]">
                      <div className="w-7 h-7 rounded-[7px] bg-[var(--bg-dark)] flex items-center justify-center text-xs font-bold text-[var(--text-inv)] flex-shrink-0">C</div>
                      <div className="flex-1 min-w-0">
                        {/* Reasoning chain */}
                        <div className="anim-fade vis bg-white border border-[var(--border-raw)] rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] my-1">
                          <div className="flex items-center gap-2 py-3 px-4 text-sm font-[550] transition-opacity duration-200">
                            {!rcFinished ? (
                              <>
                                <span className="text-[var(--teal)] flex">
                                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#0D9488" strokeWidth="1.5" fill="none" /></svg>
                                </span>
                                <span>Reasoning...</span>
                              </>
                            ) : (
                              <>
                                <span className="rc-check-pulse inline-flex text-[var(--green)]">
                                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7.5L5.5 10L11 4" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </span>
                                <span>Finished reasoning</span>
                                <div className="flex gap-1 ml-auto">
                                  <span className="font-mono text-[11px] font-medium py-[3px] px-2 rounded-full bg-[rgba(22,163,74,0.07)] text-[var(--green)]">8 tools</span>
                                  <span className="font-mono text-[11px] font-medium py-[3px] px-2 rounded-full bg-[var(--bg-alt)] text-[var(--text-3)]">2 iterations</span>
                                  <span className="font-mono text-[11px] font-medium py-[3px] px-2 rounded-full bg-[var(--bg-alt)] text-[var(--text-3)]">4.1s</span>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="px-4 pb-3 pt-1.5 border-t border-[var(--border-light)]">
                            {REASONING_STEPS.slice(0, visibleNodes).map((step, i) => (
                              <ReasoningNode key={i} step={step} showLine={i < visibleNodes - 1} />
                            ))}

                            {/* Iteration bar */}
                            {showItBar && (
                              <div className="anim-fade vis flex items-center gap-1.5 py-1.5 px-0 text-xs">
                                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M11 7A4 4 0 1 1 7 3" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" /><path d="M7 1l2 2-2 2" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <span className="font-medium text-[var(--blue)]">Iterating on top 2</span>
                                <div className="flex items-center gap-1 ml-auto font-mono text-xs font-semibold">
                                  <span ref={itS1Ref} className="text-[var(--text-3)]">0%</span>
                                  <span className="text-[var(--text-3)] text-[10px]">&rarr;</span>
                                  <span ref={itS2Ref} className="text-[var(--amber)]">0%</span>
                                  <span className="text-[var(--text-3)] text-[10px]">&rarr;</span>
                                  <span ref={itS3Ref} className="text-[var(--green)]">0%</span>
                                </div>
                              </div>
                            )}

                            {/* Refinement node */}
                            {showRefNode && (
                              <div className="anim-fade vis flex items-start gap-[10px] py-1.5 relative">
                                <div className="w-[13px] h-[13px] rounded-full flex-shrink-0 mt-[3px] flex items-center justify-center bg-[rgba(37,99,235,0.1)] border-[1.5px] border-[var(--blue)]">
                                  <span className="w-1 h-1 rounded-full bg-[var(--blue)]" />
                                </div>
                                <span className="text-[13px] text-[var(--text-2)] leading-relaxed">
                                  <strong className="text-[var(--text)] font-semibold">Refined top 2</strong> against your voice profile
                                </span>
                                <span className="font-mono text-[11px] text-[var(--text-3)] ml-auto flex-shrink-0">1.1s</span>
                              </div>
                            )}

                            {/* Quality gate */}
                            {showQualityGate && (
                              <div className="anim-fade vis flex items-center gap-1.5 py-2 px-0 text-xs font-medium text-[var(--green)]">
                                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 7.5L5.5 10L11 4" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                Exceeds 85% target
                                <div className="flex-none w-20 h-1 bg-[var(--bg-alt)] rounded-sm overflow-visible relative">
                                  <div
                                    ref={qgFillRef}
                                    className="qg-fill h-full rounded-sm bg-[var(--green)] relative"
                                    style={{ width: '0%', transition: 'width 1s cubic-bezier(0.34,1.2,0.64,1)' }}
                                  />
                                </div>
                                <span ref={qgValRef} className="font-mono text-xs font-semibold">0%</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Response bubble 1 */}
                        {showResponseBub && (
                          <div className="anim-fade vis py-3 px-4 rounded-[14px] bg-[var(--bg-alt)] text-[var(--text)] rounded-bl text-sm leading-relaxed max-w-full mt-[5px]">
                            <span ref={responseTypeRef} />
                          </div>
                        )}

                        {/* Hook card */}
                        {showHookCard && (
                          <div className={`anim-spring vis my-2 p-4 bg-white border border-[var(--border-raw)] rounded-xl ${!noMotion ? 'hk-glow' : ''}`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-3)]">Top Hook</span>
                              <span className="font-mono text-[11px] font-semibold text-[var(--green)] bg-[rgba(22,163,74,0.06)] py-[3px] px-[9px] rounded-full flex items-center gap-1">
                                <svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M3 7.5L5.5 10L11 4" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                87% hold rate
                              </span>
                            </div>
                            <div className="text-base font-semibold leading-snug mb-1.5">&ldquo;Nobody talks about this morning routine mistake&rdquo;</div>
                            <div className="text-xs text-[var(--green)] flex items-center gap-1 mb-2.5">
                              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M6 9V3M4 5l2-2 2 2" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              +15% vs your average
                            </div>

                            <div className="flex flex-col gap-[5px]">
                              {SCORE_BARS.map((bar, j) => (
                                <div key={bar.name} className="flex items-center gap-2">
                                  <span className="text-xs text-[var(--text-3)] w-[100px] flex-shrink-0">{bar.name}</span>
                                  <div className="flex-1 h-1 bg-[var(--bg-alt)] rounded-sm overflow-hidden">
                                    <div
                                      ref={el => { barRefs.current[j] = el }}
                                      className={`h-full rounded-sm ${bar.color === 'h' ? 'bg-[var(--green)]' : 'bg-[var(--amber)]'} ${bar.color === 'm' ? 'sc-fill--m' : ''}`}
                                      style={{ width: '0', transition: 'width 0.6s cubic-bezier(0.22,0.61,0.36,1)' }}
                                    />
                                  </div>
                                  <span className="font-mono text-xs font-semibold text-[var(--text-2)] w-[30px] text-right">{bar.value}</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-1.5 mt-3">
                              <button className="font-body text-xs font-semibold py-2 px-3.5 rounded-full bg-[var(--bg-dark)] text-[var(--text-inv)] border-none cursor-pointer">Use this hook</button>
                              <button className="font-body text-xs font-semibold py-2 px-3.5 rounded-full bg-[var(--bg-alt)] text-[var(--text-2)] border border-[var(--border-raw)] cursor-pointer">Iterate more</button>
                              <button className="font-body text-xs font-semibold py-2 px-3.5 rounded-full bg-[var(--bg-alt)] text-[var(--text-2)] border border-[var(--border-raw)] cursor-pointer">Different angle</button>
                            </div>
                          </div>
                        )}

                        {/* Trail 1 */}
                        {showTrail && (
                          <div className="anim-fade vis flex items-center gap-1.5 text-xs text-[var(--text-3)] mt-1">
                            <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2v6" stroke="#999" strokeWidth="1.2" strokeLinecap="round" /></svg>
                            <span>How I thought about this</span>
                            <span className="font-mono text-[11px]">8 tools &middot; 2 iterations &middot; 87% quality &middot; 4.1s</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ─── TURN 2: Timing ─── */}

                  {/* User message 2 */}
                  {showUserMsg2 && (
                    <div className="anim-slide-r vis flex flex-col items-end gap-1">
                      <div className="flex flex-row-reverse items-start gap-[10px]">
                        <div className="w-7 h-7 rounded-[7px] bg-[var(--blue)] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">H</div>
                        <div className="py-3 px-4 rounded-[14px] bg-[var(--bg-dark)] text-[var(--text-inv)] rounded-br text-sm leading-relaxed max-w-[460px]">
                          <span ref={userType2Ref} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Thinking dots 2 */}
                  {showThinking2 && (
                    <div className="anim-fade vis">
                      <ThinkingDots />
                    </div>
                  )}

                  {/* Agent block 2 */}
                  {showAgentBlock2 && (
                    <div className="flex items-start gap-[10px]">
                      <div className="w-7 h-7 rounded-[7px] bg-[var(--bg-dark)] flex items-center justify-center text-xs font-bold text-[var(--text-inv)] flex-shrink-0">C</div>
                      <div className="flex-1 min-w-0">
                        {/* Reasoning chain 2 */}
                        <div className="anim-fade vis bg-white border border-[var(--border-raw)] rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] my-1">
                          <div className="flex items-center gap-2 py-3 px-4 text-sm font-[550]">
                            {!rcFinished2 ? (
                              <>
                                <span className="text-[var(--teal)] flex">
                                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#0D9488" strokeWidth="1.5" fill="none" /></svg>
                                </span>
                                <span>Reasoning...</span>
                              </>
                            ) : (
                              <>
                                <span className="rc-check-pulse inline-flex text-[var(--green)]">
                                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7.5L5.5 10L11 4" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </span>
                                <span>Finished reasoning</span>
                                <div className="flex gap-1 ml-auto">
                                  <span className="font-mono text-[11px] font-medium py-[3px] px-2 rounded-full bg-[rgba(22,163,74,0.07)] text-[var(--green)]">3 tools</span>
                                  <span className="font-mono text-[11px] font-medium py-[3px] px-2 rounded-full bg-[var(--bg-alt)] text-[var(--text-3)]">0.9s</span>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="px-4 pb-3 pt-1.5 border-t border-[var(--border-light)]">
                            {TIMING_STEPS.slice(0, visibleTimingNodes).map((step, i) => (
                              <ReasoningNode key={i} step={step} showLine={i < visibleTimingNodes - 1} />
                            ))}
                          </div>
                        </div>

                        {/* Response bubble 2 */}
                        {showResponseBub2 && (
                          <div className="anim-fade vis py-3 px-4 rounded-[14px] bg-[var(--bg-alt)] text-[var(--text)] rounded-bl text-sm leading-relaxed max-w-full mt-[5px]">
                            <span ref={responseType2Ref} />
                          </div>
                        )}

                        {/* Timing card */}
                        {showTimingCard && (
                          <div className="anim-spring vis my-2 p-4 bg-white border border-[var(--border-raw)] rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-3)]">Recommended</span>
                              <span className="font-mono text-[11px] font-semibold text-[var(--teal)] bg-[rgba(13,148,136,0.06)] py-[3px] px-[9px] rounded-full">Optimal window</span>
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-xl font-bold tracking-[-0.02em]">Thursday</span>
                              <span className="text-base font-semibold text-[var(--teal)]">8:00 PM PST</span>
                            </div>
                            <div className="flex flex-col gap-1.5 text-xs text-[var(--text-2)]">
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
                                Your audience is 2.4x more active vs. average
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
                                No competitor overlap in this window
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
                                Matches your best-performing posting pattern
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Proactive insight */}
                        {showInsight && (
                          <div className="anim-fade vis py-3 px-4 rounded-[14px] bg-[rgba(13,148,136,0.04)] border border-[rgba(13,148,136,0.12)] text-sm leading-relaxed max-w-full mt-[5px]">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--teal)] mb-1.5">
                              <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7 1v4l2.5 1.5" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="7" cy="7" r="6" stroke="#0D9488" strokeWidth="1.5" /></svg>
                              Learning from your data
                            </div>
                            <span className="text-[var(--text-2)]">
                              Your hold rate improved <strong className="text-[var(--text)] font-semibold">19% since switching to direct hooks</strong> last month. This one follows that pattern — it should compound further.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bottom padding for scroll room */}
                  <div className="h-4 flex-shrink-0" />
                </div>
                </div>

                {/* Chat input */}
                <div className="py-4 px-5 border-t border-[var(--border-light)]">
                  <div className="flex items-center gap-[10px] py-3.5 px-4 bg-[var(--bg-alt)] border border-[var(--border-raw)] rounded-xl text-sm text-[var(--text-3)]">
                    <span>Ask Coopr anything...</span>
                    <div className="w-8 h-8 rounded-full bg-[var(--bg-dark)] flex items-center justify-center ml-auto flex-shrink-0">
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="#FAFAF9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel */}
              <div className="p-5 bg-white overflow-y-auto max-lg:hidden">
                <div className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--text-3)] mb-3.5 pb-2 border-b border-[var(--border-light)]">
                  Performance
                </div>
                <div className="flex justify-between items-baseline py-2.5 border-b border-[var(--border-light)]">
                  <span className="text-[13px] text-[var(--text-2)]">Hold Rate</span>
                  <span><span ref={holdValRef} className="font-mono text-[15px] font-bold">61%</span><span className="text-xs font-semibold ml-1 text-[var(--green)]">+19%</span></span>
                </div>
                <div className="flex justify-between items-baseline py-2.5 border-b border-[var(--border-light)]">
                  <span className="text-[13px] text-[var(--text-2)]">Engagement</span>
                  <span><span className="font-mono text-[15px] font-bold">4.7%</span><span className="text-xs font-semibold ml-1 text-[var(--green)]">+1.2%</span></span>
                </div>
                <div className="flex justify-between items-baseline py-2.5 border-b border-[var(--border-light)]">
                  <span className="text-[13px] text-[var(--text-2)]">Reach (7d)</span>
                  <span><span className="font-mono text-[15px] font-bold">18.4K</span><span className="text-xs font-semibold ml-1 text-[var(--green)]">+32%</span></span>
                </div>
                <div className="flex justify-between items-baseline py-2.5 border-b border-[var(--border-light)]">
                  <span className="text-[13px] text-[var(--text-2)]">Velocity</span>
                  <span className="font-mono text-[15px] font-bold">3.2/wk</span>
                </div>

                <div className="mt-4 p-4 bg-[var(--bg-alt)] rounded-xl border border-[var(--border-light)]">
                  <div className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--text-3)] mb-1.5">Coopr Score</div>
                  <div ref={scoreNumRef} className="font-display text-[40px] font-extrabold leading-none tracking-[-0.04em]">84</div>
                  <div className="text-xs text-[var(--text-3)] mt-1">Top 15% of your niche</div>
                </div>

                <div className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--text-3)] mt-3.5 mb-3.5 pb-2 border-b border-[var(--border-light)]">
                  Creative DNA
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Direct hooks', 'Fast pacing', 'Natural light', 'Tutorial style'].map(tag => (
                    <span key={tag} className="text-[11px] font-medium py-[5px] px-[10px] rounded-full bg-[var(--bg-alt)] text-[var(--text-2)] border border-[var(--border-light)]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--text-3)] mt-5 mb-2 pb-2 border-b border-[var(--border-light)]">
                  Session
                </div>
                <div className="flex flex-col gap-1.5 text-xs text-[var(--text-3)]">
                  <div className="flex justify-between">
                    <span>Tools used</span>
                    <span className="font-mono font-medium text-[var(--text-2)]">11</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data points</span>
                    <span className="font-mono font-medium text-[var(--text-2)]">47 videos</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Models active</span>
                    <span className="font-mono font-medium text-[var(--text-2)]">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Replay button */}
      <button
        onClick={handleReplay}
        className={`absolute bottom-5 right-10 flex items-center gap-1.5 font-mono text-[11px] font-medium text-[var(--text-3)] bg-white border border-[var(--border-raw)] py-2 px-3.5 rounded-full cursor-pointer z-10 transition-all duration-300 hover:text-[var(--text)] hover:border-[var(--teal)] hover:shadow-[0_2px_8px_rgba(13,148,136,0.1)] ${
          showReplay ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 8a6 6 0 1 1 1.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M2 13V9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Replay
      </button>
    </section>
  )
}
