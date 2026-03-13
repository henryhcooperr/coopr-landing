import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Clock3,
  Compass,
  Gauge,
  GitBranch,
  LineChart,
  LoaderCircle,
  MessageSquare,
  PenSquare,
  Radar,
  Search,
  Send,
  Settings2,
  Sparkles,
  TrendingUp,
  Users2,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react'

type NavKey = 'chat' | 'content' | 'trends' | 'competitors' | 'hook' | 'script' | 'plan' | 'engine' | 'settings'
type MetricTone = 'up' | 'neutral'
type ToolTone = 'search' | 'analyze' | 'generate' | 'score' | 'compare'

interface ToolStep {
  Icon: LucideIcon
  tone: ToolTone
  title: string
  sub: string
  time: string
}

interface ParallelItem {
  Icon: LucideIcon
  tone: ToolTone
  label: string
  time: string
  state: 'done' | 'running'
}

interface GateItem {
  label: string
  value: string
  state: 'pass' | 'fail' | 'pending'
}

interface RailMetric {
  label: string
  value: string
  delta?: string
  tone?: MetricTone
}

interface RailState {
  metrics: RailMetric[]
  score: string
  scoreCopy: string
  dna: string[]
  session: {
    tools: string
    data: string
    models: string
  }
}

interface HookResult {
  kind: 'hook'
  title: string
  hold: string
  subtitle: string
  bars: Array<{ label: string; value: string; width: number; tone: 'green' | 'amber' }>
}

interface ScriptResult {
  kind: 'script'
  lines: Array<{ ts: string; title: string; note: string }>
  note: string
  voiceFit: string
}

interface PlanResult {
  kind: 'plan'
  scenes: Array<{ label: string; title: string; note: string }>
  summary: string
}

interface TimingResult {
  kind: 'timing'
  slot: string
  rows: Array<{ label: string; note: string; value: string }>
}

type ResultState = HookResult | ScriptResult | PlanResult | TimingResult

interface DemoTurn {
  nav: NavKey
  ask: string
  intro: string
  toolCount: string
  elapsed: string
  steps: ToolStep[]
  parallel?: ParallelItem[]
  gates?: GateItem[]
  reply: string
  result: ResultState
  rail: RailState
}

type UserMessage = {
  id: string
  type: 'user'
  text: string
}

type ReasoningMessage = {
  id: string
  type: 'reasoning'
  intro: string
  toolCount: string
  elapsed: string
  steps: ToolStep[]
  visibleSteps: number
  parallel?: ParallelItem[]
  showParallel: boolean
  gates?: GateItem[]
  visibleGates: number
  complete: boolean
}

type AssistantMessage = {
  id: string
  type: 'assistant'
  text: string
}

type ResultMessage = {
  id: string
  type: 'result'
  result: ResultState
}

type Message = UserMessage | ReasoningMessage | AssistantMessage | ResultMessage

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function wait(ms: number, reducedMotion: boolean) {
  if (reducedMotion) return Promise.resolve()
  return new Promise(resolve => window.setTimeout(resolve, ms))
}

function charDelay(ch: string, baseSpeed: number) {
  if (',;'.includes(ch)) return baseSpeed + 55
  if ('.!?'.includes(ch)) return baseSpeed + 95
  if (ch === ' ') return Math.max(12, baseSpeed - 8)
  return baseSpeed + Math.random() * 16
}

const NAV_ITEMS: Array<{ key: NavKey; label: string; Icon: LucideIcon; section?: string }> = [
  { key: 'chat', label: 'Chat', Icon: MessageSquare },
  { key: 'content', label: 'Content', Icon: PenSquare },
  { key: 'trends', label: 'Trends', Icon: TrendingUp },
  { key: 'competitors', label: 'Competitors', Icon: Users2 },
  { key: 'hook', label: 'Hook Lab', Icon: Sparkles, section: 'Create' },
  { key: 'script', label: 'Scripts', Icon: PenSquare },
  { key: 'plan', label: 'Shot Lists', Icon: Compass },
  { key: 'engine', label: 'Engine', Icon: Radar, section: 'Analyze' },
  { key: 'settings', label: 'Settings', Icon: Settings2 },
]

const TURN_SEQUENCE: DemoTurn[] = [
  {
    nav: 'hook',
    ask: 'Write me a killer hook for my next reel.',
    intro: 'Working through the hook request with the same tool chain COOPR uses in studio.',
    toolCount: '8 tools',
    elapsed: '4.1s',
    steps: [
      { Icon: BarChart3, tone: 'search', title: 'Loaded your last 5 reels', sub: 'Avg hold rate 71% · best opener 86%', time: '0.2s' },
      { Icon: Users2, tone: 'compare', title: 'Pulled competitor benchmark data', sub: 'Comparing against 8 tracked cleanup creators', time: '0.8s' },
      { Icon: Radar, tone: 'analyze', title: 'Ran niche benchmark model', sub: 'Looking for myth-busting openings with proof in frame', time: '1.1s' },
      { Icon: Sparkles, tone: 'generate', title: 'Generated hook variants', sub: 'Built 5 candidates matched to Maya’s direct voice', time: '1.2s' },
      { Icon: Gauge, tone: 'score', title: 'Scored predicted hold rate', sub: 'Ranking variants against your recent audience pattern', time: '0.8s' },
    ],
    parallel: [
      { Icon: Search, tone: 'search', label: 'Hook analysis', time: '0.3s ✓', state: 'done' },
      { Icon: TrendingUp, tone: 'analyze', label: 'Trend check', time: '0.5s ✓', state: 'done' },
      { Icon: WandSparkles, tone: 'generate', label: 'Generating variants', time: '1.2s', state: 'running' },
      { Icon: Gauge, tone: 'score', label: 'Scoring predictions', time: '0.8s', state: 'running' },
    ],
    gates: [
      { label: 'Hold rate exceeds 85% target', value: '87%', state: 'pass' },
      { label: 'Voice match above threshold', value: '94%', state: 'pass' },
      { label: 'Trend alignment', value: '3 signals', state: 'pass' },
      { label: 'Competitor differentiation check', value: 'pending', state: 'pending' },
    ],
    reply: 'Top hook is ready. It beats Maya’s current baseline without sounding like a different person.',
    result: {
      kind: 'hook',
      title: 'People keep saying reef cleanup does nothing. Look at this patch 30 days later.',
      hold: '87% predicted hold',
      subtitle: '+15% vs Maya’s average proof-first opener',
      bars: [
        { label: 'Curiosity gap', value: '9/10', width: 90, tone: 'green' },
        { label: 'Pattern interrupt', value: '8/10', width: 82, tone: 'green' },
        { label: 'Voice match', value: '9/10', width: 91, tone: 'green' },
        { label: 'Trend alignment', value: '7/10', width: 72, tone: 'amber' },
      ],
    },
    rail: {
      metrics: [
        { label: 'Hold Rate', value: '61%', delta: '+19%', tone: 'up' },
        { label: 'Engagement', value: '4.7%', delta: '+1.2%', tone: 'up' },
        { label: 'Reach (7d)', value: '18.4K', delta: '+52%', tone: 'up' },
        { label: 'Velocity', value: '3.2/wk', tone: 'neutral' },
      ],
      score: '84',
      scoreCopy: 'Top 15% of your niche',
      dna: ['Direct hooks', 'Fast pacing', 'Natural light', 'Tutorial style'],
      session: { tools: '11', data: '47 videos', models: '3' },
    },
  },
  {
    nav: 'script',
    ask: 'Open the winning hook in Script Builder and keep the proof in the first five seconds.',
    intro: 'Moving the selected hook into the draft while keeping the proof-first structure visible.',
    toolCount: '5 tools',
    elapsed: '2.8s',
    steps: [
      { Icon: PenSquare, tone: 'generate', title: 'Opened Script Builder from the winning hook', sub: 'Locked the top opener so the draft inherits the exact same premise', time: '0.4s' },
      { Icon: MessageSquare, tone: 'analyze', title: 'Pulled Maya’s voice profile', sub: 'Short lines, direct claims, and proof before explanation', time: '0.5s' },
      { Icon: GitBranch, tone: 'compare', title: 'Checked pacing against top-performing reels', sub: 'Compressed the middle so the proof still lands early', time: '0.7s' },
      { Icon: Gauge, tone: 'score', title: 'Scored the updated draft', sub: 'Voice fit and watch-through stay above the current threshold', time: '1.2s' },
    ],
    gates: [
      { label: 'Voice fit above threshold', value: '0.85', state: 'pass' },
      { label: 'Watch-through estimate', value: '84%', state: 'pass' },
      { label: 'Weak beat', value: 'none', state: 'pass' },
    ],
    reply: 'Draft is tighter now. The proof lands early and the script is ready for teleprompter or shot planning.',
    result: {
      kind: 'script',
      voiceFit: '0.85 voice fit',
      lines: [
        { ts: '0s', title: 'People keep saying reef cleanup does nothing.', note: 'Open on the restored patch before Maya enters frame.' },
        { ts: '6s', title: 'This is the same reef after volunteers pulled the line and trash out.', note: 'Keep the sentence short enough to land in one breath.' },
        { ts: '16s', title: 'Save this and I’ll show what changes next month too.', note: 'Close on the next-proof promise, not a generic CTA.' },
      ],
      note: 'Shorter draft. Same voice. Ready for teleprompter and filming.',
    },
    rail: {
      metrics: [
        { label: 'Hold Rate', value: '63%', delta: '+14%', tone: 'up' },
        { label: 'Engagement', value: '5.1%', delta: '+1.0%', tone: 'up' },
        { label: 'Reach (7d)', value: '21.2K', delta: '+31%', tone: 'up' },
        { label: 'Velocity', value: '3.6/wk', tone: 'neutral' },
      ],
      score: '87',
      scoreCopy: 'Voice locked for filming',
      dna: ['Direct hooks', 'Tutorial style', 'Short lines', 'Proof cuts early'],
      session: { tools: '14', data: '47 videos', models: '3' },
    },
  },
  {
    nav: 'plan',
    ask: 'Open shot planning and give me the fastest version I can film today.',
    intro: 'Turning the approved draft into a production-ready shot plan without leaving the same workspace.',
    toolCount: '6 tools',
    elapsed: '3.1s',
    steps: [
      { Icon: Compass, tone: 'generate', title: 'Mapped the draft into scenes', sub: 'Hook, proof, payoff — same order as the approved script', time: '0.5s' },
      { Icon: Search, tone: 'search', title: 'Pulled the last successful reef shoot setup', sub: 'Same location, same golden-hour lighting, same handheld rhythm', time: '0.7s' },
      { Icon: GitBranch, tone: 'compare', title: 'Collapsed the plan to today’s constraints', sub: 'One location, one handheld follow, one optional pickup', time: '0.8s' },
      { Icon: Gauge, tone: 'score', title: 'Checked filmability against the draft', sub: 'Plan stays inside Maya’s normal shoot complexity threshold', time: '1.1s' },
    ],
    parallel: [
      { Icon: PenSquare, tone: 'generate', label: 'Scene editor', time: '0.4s ✓', state: 'done' },
      { Icon: Compass, tone: 'generate', label: 'Shot storyboard', time: '0.9s ✓', state: 'done' },
      { Icon: Clock3, tone: 'analyze', label: 'Shoot day plan', time: '1.1s', state: 'running' },
      { Icon: Gauge, tone: 'score', label: 'Complexity check', time: '0.8s', state: 'running' },
    ],
    reply: 'Shot plan is ready. Scene order, storyboard, and shoot-day notes are all tied back to the same draft.',
    result: {
      kind: 'plan',
      scenes: [
        { label: 'Scene editor', title: 'Hook scene', note: 'Talking head opener with the trash bag already in frame.' },
        { label: 'Shot storyboard', title: 'Proof cut', note: 'Macro coral detail matched against last month’s angle.' },
        { label: 'Shoot day', title: 'Payoff close', note: 'Wide cleanup reveal while Maya lands the save-worthy CTA.' },
      ],
      summary: '3 scenes · 12 shots · Monterey breakwall · golden hour',
    },
    rail: {
      metrics: [
        { label: 'Hold Rate', value: '65%', delta: '+16%', tone: 'up' },
        { label: 'Engagement', value: '5.0%', delta: '+0.9%', tone: 'up' },
        { label: 'Reach (7d)', value: '20.8K', delta: '+28%', tone: 'up' },
        { label: 'Velocity', value: '3.4/wk', tone: 'neutral' },
      ],
      score: '86',
      scoreCopy: 'Fastest filmable version',
      dna: ['Natural light', 'Proof shots', 'Low gear', 'Fast film days'],
      session: { tools: '16', data: '47 videos', models: '3' },
    },
  },
  {
    nav: 'engine',
    ask: 'Pick the best post slot once this reel is ready.',
    intro: 'Checking timing, overlap, and cadence before sending the reel out.',
    toolCount: '4 tools',
    elapsed: '1.9s',
    steps: [
      { Icon: Clock3, tone: 'analyze', title: 'Checked audience activity patterns', sub: 'Peak engagement is clustered on Thursday night for Maya’s cleanup audience', time: '0.2s' },
      { Icon: Users2, tone: 'compare', title: 'Scanned competitor overlap', sub: 'Two similar cleanup explainers already landed earlier in the week', time: '0.4s' },
      { Icon: LineChart, tone: 'analyze', title: 'Cross-referenced posting cadence', sub: 'Thursday keeps the schedule on pace without bunching the content mix', time: '0.5s' },
      { Icon: Gauge, tone: 'score', title: 'Ranked release windows', sub: 'Primary and fallback slots both scored against the same reel profile', time: '0.8s' },
    ],
    reply: 'Primary slot is clear. Thursday wins, Tuesday stays as the backup if the edit slips.',
    result: {
      kind: 'timing',
      slot: 'Thursday · 8:10 PM PST',
      rows: [
        { label: 'Best slot', note: 'Highest audience concentration with lower overlap from cleanup creators this week.', value: 'Thu 8:10 PM' },
        { label: 'Backup slot', note: 'Tuesday still works, but the feed is denser and the opener has to work harder.', value: 'Tue 7:12 PM' },
        { label: 'Why now', note: 'Proof-first reels perform best when the niche is quieter and the audience is peaking.', value: 'Low overlap' },
      ],
    },
    rail: {
      metrics: [
        { label: 'Hold Rate', value: '60%', delta: '+12%', tone: 'up' },
        { label: 'Engagement', value: '4.6%', delta: '+1.0%', tone: 'up' },
        { label: 'Reach (7d)', value: '17.9K', delta: '+24%', tone: 'up' },
        { label: 'Velocity', value: '3.7/wk', tone: 'neutral' },
      ],
      score: '85',
      scoreCopy: 'Best release window picked',
      dna: ['Audience-first timing', 'Cleaner release windows', 'Same voice', 'Proof-led posts'],
      session: { tools: '18', data: '47 videos', models: '3' },
    },
  },
]

function toneStyles(tone: ToolTone) {
  if (tone === 'search') return 'border-[rgba(37,99,235,0.22)] bg-[rgba(37,99,235,0.09)] text-[var(--blue)]'
  if (tone === 'analyze') return 'border-[rgba(124,58,237,0.22)] bg-[rgba(124,58,237,0.08)] text-[var(--blue)]'
  if (tone === 'generate') return 'border-[rgba(22,163,74,0.22)] bg-[rgba(22,163,74,0.08)] text-[var(--green)]'
  if (tone === 'score') return 'border-[rgba(217,119,6,0.22)] bg-[rgba(217,119,6,0.08)] text-[var(--amber)]'
  return 'border-[rgba(225,29,72,0.22)] bg-[rgba(225,29,72,0.08)] text-[var(--rose)]'
}

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(13,148,136,0.12)] bg-white/88 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--teal)] shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
      {children}
    </span>
  )
}

function ToolChain({ message }: { message: ReasoningMessage }) {
  return (
    <div className="space-y-0">
      {message.steps.slice(0, message.visibleSteps).map((step, index) => {
        const isRunning = !message.complete && index === message.visibleSteps - 1
        const Icon = step.Icon
        return (
          <div key={`${step.title}-${index}`} className="relative flex gap-3">
            {index < message.visibleSteps - 1 ? (
              <div className="absolute left-[19px] top-10 bottom-[-10px] w-px bg-[linear-gradient(180deg,rgba(37,99,235,0.55),rgba(37,99,235,0.08))]" />
            ) : null}
            <div className={`relative z-[1] mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white ${isRunning ? 'border-[rgba(217,119,6,0.32)] text-[var(--amber)] animate-pulse' : 'border-[rgba(37,99,235,0.26)] bg-[rgba(37,99,235,0.08)] text-[var(--blue)]'}`}>
              <Icon className="h-4 w-4" strokeWidth={1.8} />
            </div>
            <div className="min-w-0 flex-1 pb-5 pt-1">
              <div className="flex items-start justify-between gap-3">
                <div className="text-[13px] font-medium text-[var(--text)]">{step.title}</div>
                <div className="font-mono text-[11px] text-[var(--text-3)]">{step.time}</div>
              </div>
              <div className="mt-1 text-xs leading-relaxed text-[var(--text-2)]">{step.sub}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ToolParallel({ items }: { items: ParallelItem[] }) {
  return (
    <div className="mt-3 rounded-[14px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
      <div className="mb-2 flex items-center gap-2 text-xs text-[var(--text-3)]">
        <GitBranch className="h-3.5 w-3.5 text-[var(--blue)]" strokeWidth={1.8} />
        Running analyses in parallel
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map(item => {
          const Icon = item.Icon
          return (
            <div key={item.label} className="flex items-center gap-2 rounded-[10px] border border-[var(--border-light)] bg-white px-3 py-2 text-xs">
              <span className={`h-2 w-2 rounded-full ${item.state === 'done' ? 'bg-[var(--green)]' : 'bg-[var(--amber)] animate-pulse'}`} />
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${toneStyles(item.tone)}`}>
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1 text-[var(--text)]">{item.label}</span>
              <span className={`font-mono ${item.state === 'done' ? 'text-[var(--text-3)]' : 'text-[var(--amber)]'}`}>{item.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function QualityGates({ gates, visibleGates }: { gates: GateItem[]; visibleGates: number }) {
  return (
    <div className="mt-3 space-y-2">
      {gates.slice(0, visibleGates).map(gate => (
        <div key={gate.label} className="flex items-center gap-3 rounded-[12px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-2 text-xs">
          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${gate.state === 'pass' ? 'bg-[rgba(22,163,74,0.12)] text-[var(--green)]' : gate.state === 'fail' ? 'bg-[rgba(225,29,72,0.12)] text-[var(--rose)]' : 'bg-white text-[var(--text-3)]'}`}>
            {gate.state === 'pass' ? <Check className="h-3.5 w-3.5" strokeWidth={2.4} /> : gate.state === 'fail' ? <ArrowRight className="h-3.5 w-3.5 rotate-45" strokeWidth={2} /> : <span className="font-mono text-[10px]">○</span>}
          </span>
          <span className="flex-1 text-[var(--text-2)]">{gate.label}</span>
          <span className={`font-mono font-medium ${gate.state === 'pass' ? 'text-[var(--green)]' : gate.state === 'fail' ? 'text-[var(--rose)]' : 'text-[var(--text-3)]'}`}>{gate.value}</span>
        </div>
      ))}
    </div>
  )
}

function ReasoningCard({ message }: { message: ReasoningMessage }) {
  return (
    <div className="anim-fade vis overflow-hidden rounded-xl border border-[var(--border-raw)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 border-b border-[var(--border-light)] bg-[rgba(250,248,244,0.82)] px-4 py-3 text-sm font-[550]">
        {message.complete ? (
          <>
            <span className="rc-check-pulse inline-flex text-[var(--green)]"><CheckCircle2 className="h-[13px] w-[13px]" strokeWidth={2.1} /></span>
            <span>Finished reasoning</span>
          </>
        ) : (
          <>
            <span className="inline-flex text-[var(--teal)]"><LoaderCircle className="h-[13px] w-[13px] animate-spin" strokeWidth={1.8} /></span>
            <span>Reasoning...</span>
          </>
        )}
        <div className="ml-auto flex gap-1">
          <span className="rounded-full bg-[rgba(22,163,74,0.07)] px-2 py-[3px] font-mono text-[11px] font-medium text-[var(--green)]">{message.toolCount}</span>
          <span className="rounded-full bg-[var(--bg-alt)] px-2 py-[3px] font-mono text-[11px] font-medium text-[var(--text-3)]">{message.elapsed}</span>
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="mb-3 text-xs leading-relaxed text-[var(--text-2)]">{message.intro}</div>
        <ToolChain message={message} />
        {message.parallel && message.showParallel ? <ToolParallel items={message.parallel} /> : null}
        {message.gates ? <QualityGates gates={message.gates} visibleGates={message.visibleGates} /> : null}
      </div>
    </div>
  )
}

function HookResultCard({ result }: { result: HookResult }) {
  return (
    <div className="anim-fade vis my-2 rounded-xl border border-[var(--border-raw)] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-3)]">Top Hook</span>
        <span className="rounded-full bg-[rgba(22,163,74,0.08)] px-[9px] py-[3px] font-mono text-[11px] font-semibold text-[var(--green)]">{result.hold}</span>
      </div>
      <div className="text-base font-semibold leading-snug text-[var(--text)]">“{result.title}”</div>
      <div className="mt-2 text-xs text-[var(--green)]">{result.subtitle}</div>
      <div className="mt-3 flex flex-col gap-[6px]">
        {result.bars.map(bar => (
          <div key={bar.label} className="flex items-center gap-2">
            <span className="w-[102px] shrink-0 text-xs text-[var(--text-3)]">{bar.label}</span>
            <div className="h-1 flex-1 overflow-hidden rounded-sm bg-[var(--bg-alt)]">
              <div
                className={`h-full rounded-sm ${bar.tone === 'green' ? 'bg-[var(--green)]' : 'bg-[var(--amber)]'}`}
                style={{ width: `${bar.width}%`, transition: 'width 0.55s cubic-bezier(0.22,0.61,0.36,1)' }}
              />
            </div>
            <span className="w-[34px] text-right font-mono text-xs font-semibold text-[var(--text-2)]">{bar.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-1.5">
        <button className="rounded-full bg-[var(--bg-dark)] px-3.5 py-2 text-xs font-semibold text-[var(--text-inv)]">Use this hook</button>
        <button className="rounded-full border border-[var(--border-raw)] bg-[var(--bg-alt)] px-3.5 py-2 text-xs font-semibold text-[var(--text-2)]">Iterate more</button>
      </div>
    </div>
  )
}

function ScriptResultCard({ result }: { result: ScriptResult }) {
  return (
    <div className="anim-fade vis my-2 rounded-xl border border-[var(--border-raw)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border-light)] bg-[rgba(250,248,244,0.82)] px-4 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-3)]">Script Builder</span>
        <span className="rounded-full bg-[rgba(13,148,136,0.08)] px-[9px] py-[3px] font-mono text-[11px] font-semibold text-[var(--teal)]">{result.voiceFit}</span>
      </div>
      <div className="space-y-0">
        {result.lines.map(line => (
          <div key={line.ts} className="grid grid-cols-[42px_1fr] gap-3 border-t border-[var(--border-light)] px-4 py-3 first:border-t-0">
            <span className="inline-flex h-[26px] w-[42px] items-center justify-center rounded-full bg-[var(--bg-alt)] font-mono text-[11px] text-[var(--text-3)]">{line.ts}</span>
            <div>
              <div className="text-[14px] font-semibold leading-relaxed text-[var(--text)]">{line.title}</div>
              <div className="mt-1 text-xs leading-relaxed text-[var(--text-2)]">{line.note}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--border-light)] bg-[rgba(250,248,244,0.82)] px-4 py-3 text-sm text-[var(--text-2)]">{result.note}</div>
    </div>
  )
}

function PlanResultCard({ result }: { result: PlanResult }) {
  return (
    <div className="anim-fade vis my-2 rounded-xl border border-[var(--border-raw)] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-3)]">Shot Planner</span>
        <span className="rounded-full bg-[rgba(13,148,136,0.08)] px-[9px] py-[3px] font-mono text-[11px] font-semibold text-[var(--teal)]">{result.summary}</span>
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {result.scenes.map(scene => (
          <div key={scene.label} className="rounded-[14px] border border-[var(--border-light)] bg-[var(--bg)] p-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-3)]">{scene.label}</div>
            <div className="mt-2 text-sm font-semibold text-[var(--text)]">{scene.title}</div>
            <div className="mt-1 text-xs leading-relaxed text-[var(--text-2)]">{scene.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TimingResultCard({ result }: { result: TimingResult }) {
  return (
    <div className="anim-fade vis my-2 rounded-xl border border-[var(--border-raw)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border-light)] bg-[rgba(250,248,244,0.82)] px-4 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-3)]">Post Timing</span>
        <span className="rounded-full bg-[rgba(217,119,6,0.08)] px-[9px] py-[3px] font-mono text-[11px] font-semibold text-[var(--amber)]">{result.slot}</span>
      </div>
      <div className="space-y-0">
        {result.rows.map(row => (
          <div key={row.label} className="flex items-start justify-between gap-3 border-t border-[var(--border-light)] px-4 py-3 first:border-t-0">
            <div>
              <div className="text-[13px] font-semibold text-[var(--text)]">{row.label}</div>
              <div className="mt-1 text-xs leading-relaxed text-[var(--text-2)]">{row.note}</div>
            </div>
            <div className="font-mono text-[11px] text-[var(--text-3)]">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ResultCard({ result }: { result: ResultState }) {
  if (result.kind === 'hook') return <HookResultCard result={result} />
  if (result.kind === 'script') return <ScriptResultCard result={result} />
  if (result.kind === 'plan') return <PlanResultCard result={result} />
  return <TimingResultCard result={result} />
}

function ChatMessage({ message }: { message: Message }) {
  if (message.type === 'user') {
    return (
      <div className="anim-slide-r vis flex flex-col items-end gap-1">
        <div className="flex flex-row-reverse items-start gap-[10px]">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[var(--blue)] text-xs font-bold text-white">H</div>
          <div className="max-w-[460px] rounded-[14px] rounded-br bg-[var(--bg-dark)] px-4 py-3 text-sm leading-relaxed text-[var(--text-inv)]">
            {message.text}
          </div>
        </div>
      </div>
    )
  }

  if (message.type === 'reasoning') {
    return (
      <div className="flex items-start gap-[10px]">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[var(--bg-dark)] text-xs font-bold text-[var(--text-inv)]">C</div>
        <div className="min-w-0 flex-1">
          <ReasoningCard message={message} />
        </div>
      </div>
    )
  }

  if (message.type === 'assistant') {
    return (
      <div className="flex items-start gap-[10px]">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[var(--bg-dark)] text-xs font-bold text-[var(--text-inv)]">C</div>
        <div className="max-w-full rounded-[14px] rounded-bl bg-[var(--bg-alt)] px-4 py-3 text-sm leading-relaxed text-[var(--text)]">
          {message.text}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-[10px]">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[var(--bg-dark)] text-xs font-bold text-[var(--text-inv)]">C</div>
      <div className="min-w-0 flex-1">
        <ResultCard result={message.result} />
      </div>
    </div>
  )
}

export default function ChatDemo() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const browserRef = useRef<HTMLDivElement>(null)
  const chatBodyRef = useRef<HTMLDivElement>(null)
  const loopAbortRef = useRef(false)
  const playingRef = useRef(false)
  const playedRef = useRef(false)
  const idRef = useRef(0)

  const [messages, setMessages] = useState<Message[]>([])
  const [activeNav, setActiveNav] = useState<NavKey>('hook')
  const [flashNav, setFlashNav] = useState<NavKey | null>(null)
  const [inputText, setInputText] = useState('Ask COOPR to sharpen the hook, rewrite the draft, open shot planning, or pick the post slot.')
  const [inputPlaceholder, setInputPlaceholder] = useState(true)
  const [sendReady, setSendReady] = useState(false)
  const [sendPressed, setSendPressed] = useState(false)
  const [rail, setRail] = useState<RailState>(TURN_SEQUENCE[0].rail)
  const [showReplay, setShowReplay] = useState(false)

  const makeId = useCallback(() => `msg-${idRef.current++}` , [])

  const scrollToBottom = useCallback((behavior?: ScrollBehavior) => {
    if (!chatBodyRef.current) return
    const mode = behavior ?? (prefersReducedMotion ? 'auto' : 'smooth')
    window.requestAnimationFrame(() => {
      chatBodyRef.current?.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: mode,
      })
    })
  }, [prefersReducedMotion])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const appendMessage = useCallback((message: Message) => {
    setMessages(prev => {
      const next = [...prev, message]
      return next.length > 8 ? next.slice(next.length - 8) : next
    })
  }, [])

  const updateMessage = useCallback((id: string, updater: (message: Message) => Message) => {
    setMessages(prev => prev.map(message => (message.id === id ? updater(message) : message)))
  }, [])

  const resetComposer = useCallback(() => {
    setInputPlaceholder(true)
    setInputText('Ask COOPR to sharpen the hook, rewrite the draft, open shot planning, or pick the post slot.')
    setSendReady(false)
    setSendPressed(false)
  }, [])

  const typeComposer = useCallback(async (text: string) => {
    setInputPlaceholder(false)
    setInputText('')
    setSendReady(false)
    if (prefersReducedMotion) {
      setInputText(text)
      setSendReady(true)
      return
    }
    for (let index = 0; index <= text.length; index += 1) {
      if (loopAbortRef.current) return
      setInputText(text.slice(0, index))
      await wait(charDelay(text[index] ?? ' ', 18), false)
    }
    setSendReady(true)
  }, [prefersReducedMotion])

  const flashSidebar = useCallback((key: NavKey) => {
    if (prefersReducedMotion) {
      setActiveNav(key)
      return
    }
    setFlashNav(key)
    window.setTimeout(() => {
      setFlashNav(null)
      setActiveNav(key)
    }, 280)
  }, [prefersReducedMotion])

  const pressSend = useCallback(async () => {
    setSendPressed(true)
    await wait(prefersReducedMotion ? 30 : 120, prefersReducedMotion)
    setSendPressed(false)
  }, [prefersReducedMotion])

  const runTurn = useCallback(async (turn: DemoTurn) => {
    flashSidebar(turn.nav)
    await typeComposer(turn.ask)
    if (loopAbortRef.current) return
    await wait(prefersReducedMotion ? 30 : 120, prefersReducedMotion)
    await pressSend()
    if (loopAbortRef.current) return

    appendMessage({ id: makeId(), type: 'user', text: turn.ask })
    resetComposer()
    await wait(prefersReducedMotion ? 40 : 280, prefersReducedMotion)

    const reasoningId = makeId()
    appendMessage({
      id: reasoningId,
      type: 'reasoning',
      intro: turn.intro,
      toolCount: turn.toolCount,
      elapsed: turn.elapsed,
      steps: turn.steps,
      visibleSteps: 0,
      parallel: turn.parallel,
      showParallel: false,
      gates: turn.gates,
      visibleGates: 0,
      complete: false,
    })

    for (let index = 0; index < turn.steps.length; index += 1) {
      if (loopAbortRef.current) return
      updateMessage(reasoningId, message => {
        if (message.type !== 'reasoning') return message
        return { ...message, visibleSteps: index + 1 }
      })
      await wait(360 + index * 40, prefersReducedMotion)
    }

    if (turn.parallel?.length) {
      updateMessage(reasoningId, message => {
        if (message.type !== 'reasoning') return message
        return { ...message, showParallel: true }
      })
      await wait(420, prefersReducedMotion)
    }

    if (turn.gates?.length) {
      for (let index = 0; index < turn.gates.length; index += 1) {
        if (loopAbortRef.current) return
        updateMessage(reasoningId, message => {
          if (message.type !== 'reasoning') return message
          return { ...message, visibleGates: index + 1 }
        })
        await wait(180, prefersReducedMotion)
      }
    }

    updateMessage(reasoningId, message => {
      if (message.type !== 'reasoning') return message
      return { ...message, complete: true }
    })
    setRail(turn.rail)
    await wait(260, prefersReducedMotion)

    appendMessage({ id: makeId(), type: 'assistant', text: turn.reply })
    await wait(200, prefersReducedMotion)
    appendMessage({ id: makeId(), type: 'result', result: turn.result })
    await wait(900, prefersReducedMotion)
  }, [appendMessage, flashSidebar, makeId, prefersReducedMotion, pressSend, resetComposer, typeComposer, updateMessage])

  const play = useCallback(async () => {
    if (playingRef.current) return
    playingRef.current = true
    loopAbortRef.current = false
    setShowReplay(false)

    setMessages([])
    setRail(TURN_SEQUENCE[0].rail)
    setActiveNav('hook')
    setFlashNav(null)
    resetComposer()
    await wait(300, prefersReducedMotion)

    for (const turn of TURN_SEQUENCE) {
      if (loopAbortRef.current) break
      await runTurn(turn)
    }

    if (!loopAbortRef.current) {
      setShowReplay(true)
      playedRef.current = true
    }
    playingRef.current = false
  }, [prefersReducedMotion, resetComposer, runTurn])

  const replay = useCallback(() => {
    loopAbortRef.current = true
    playingRef.current = false
    window.setTimeout(() => {
      loopAbortRef.current = false
      play()
    }, 80)
  }, [play])

  useEffect(() => {
    if (!browserRef.current) return undefined
    const node = browserRef.current
    const shouldPlayNow = () => {
      const rect = node.getBoundingClientRect()
      const visibleTop = rect.top < window.innerHeight * 0.88
      const visibleBottom = rect.bottom > window.innerHeight * 0.18
      return visibleTop && visibleBottom
    }

    if (!playingRef.current && !playedRef.current && shouldPlayNow()) {
      play()
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !playingRef.current && !playedRef.current) {
          play()
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -12% 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [play])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const maybePlayFromHash = () => {
      if (window.location.hash !== '#product') return
      if (playingRef.current || playedRef.current) return
      window.setTimeout(() => {
        if (!playingRef.current && !playedRef.current) {
          play()
        }
      }, 120)
    }

    maybePlayFromHash()
    window.addEventListener('hashchange', maybePlayFromHash)
    return () => window.removeEventListener('hashchange', maybePlayFromHash)
  }, [play])

  useEffect(() => () => { loopAbortRef.current = true }, [])

  const nav = useMemo(() => NAV_ITEMS, [])

  return (
    <section className="relative mx-auto max-w-[1380px] px-6 py-20 pb-[100px]" id="product">
      <div className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--text-3)] mb-4">
        See it work
      </div>
      <h2 className="text-center font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em] mb-3">
        An agent that shows <em className="font-accent italic font-normal">its work</em>
      </h2>
      <p className="mx-auto mb-12 max-w-[480px] text-center text-base text-[var(--text-2)]">
        One creator. One reel. One workspace that keeps moving without turning into a giant feed.
      </p>

      <div className="relative" ref={browserRef}>
        <div
          className="pointer-events-none absolute -inset-8 z-0 rounded-[40px]"
          style={{
            background: 'radial-gradient(ellipse at 50% 55%, rgba(13,148,136,0.1) 0%, transparent 72%)',
            animation: prefersReducedMotion ? 'none' : 'glow-pulse 4s ease-in-out infinite',
          }}
        />
        <div className="relative z-[1]">
          <div className="overflow-hidden rounded-[24px] border border-[var(--border-raw)] bg-white shadow-[var(--shadow-lg)]">
            <div className="flex items-center gap-2 border-b border-[var(--border-light)] bg-[var(--bg-alt)] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-[10px] w-[10px] rounded-full bg-[#FF5F57]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#FEBC2E]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 text-center font-mono text-[11px] text-[var(--text-3)]">app.coopr.studio</div>
              {showReplay ? (
                <button
                  type="button"
                  onClick={replay}
                  className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-1.5 text-[11px] font-medium text-[var(--text-2)] transition hover:border-[rgba(13,148,136,0.18)] hover:text-[var(--teal)]"
                >
                  Replay demo
                </button>
              ) : null}
            </div>

            <div className="grid h-[680px] grid-cols-[214px_minmax(0,1fr)_260px] max-[1100px]:grid-cols-[200px_minmax(0,1fr)] max-[900px]:h-auto max-[900px]:grid-cols-1">
              <aside className="bg-[var(--bg-dark)] p-3 text-[var(--text-inv)] max-[900px]:hidden">
                <div className="mb-3.5 flex items-center gap-[10px] border-b border-white/[0.06] px-3 pb-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white font-display text-xs font-extrabold text-[var(--bg-dark)]">C</div>
                  <span className="font-display text-[15px] font-bold tracking-[-0.03em]">Coopr</span>
                </div>
                {nav.map(item => {
                  const Icon = item.Icon
                  const active = activeNav === item.key
                  const flashing = flashNav === item.key
                  return (
                    <div key={item.key}>
                      {item.section ? (
                        <div className="mb-2 mt-4 px-3 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white/20">{item.section}</div>
                      ) : null}
                      <div className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-[9px] text-sm font-[450] transition-all duration-200 ${flashing ? 'sb-it-flash' : active ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:bg-white/[0.05] hover:text-white/70'}`}>
                        <Icon className={`h-[16px] w-[16px] shrink-0 ${active ? 'opacity-100' : 'opacity-55'}`} strokeWidth={1.8} />
                        {item.label}
                      </div>
                    </div>
                  )
                })}
              </aside>

              <div className="flex min-h-0 flex-col border-r border-[var(--border-light)] bg-[var(--bg)] max-[1100px]:border-r-0 max-[900px]:min-h-[580px]">
                <div className="flex items-center gap-[10px] border-b border-[var(--border-light)] px-5 py-3.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[var(--bg-dark)] text-xs font-bold text-[var(--text-inv)]">C</div>
                  <span className="text-[15px] font-semibold tracking-[-0.01em]">Coopr</span>
                  <span className="text-xs text-[var(--text-3)]">166 tools available</span>
                </div>

                <div className="relative flex-1 min-h-0">
                  <div className="pointer-events-none absolute left-0 right-0 top-0 z-[2] h-6 bg-gradient-to-b from-[var(--bg)] to-transparent opacity-0 transition-opacity duration-200" id="chat-fade-top" />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-6 bg-gradient-to-t from-[var(--bg)] to-transparent" id="chat-fade-bottom" />
                  <div
                    ref={chatBodyRef}
                    className="absolute inset-0 flex flex-col gap-[18px] overflow-y-auto px-6 py-5"
                    style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.15) transparent', scrollBehavior: prefersReducedMotion ? 'auto' : 'smooth' }}
                    onScroll={(event) => {
                      const el = event.currentTarget
                      const top = document.getElementById('chat-fade-top')
                      const bottom = document.getElementById('chat-fade-bottom')
                      if (top) top.style.opacity = el.scrollTop > 20 ? '1' : '0'
                      if (bottom) bottom.style.opacity = el.scrollHeight - el.scrollTop - el.clientHeight > 20 ? '1' : '0'
                    }}
                  >
                    {messages.map(message => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    <div className="h-4 shrink-0" />
                  </div>
                </div>

                <div className="border-t border-[var(--border-light)] px-5 py-4">
                  <div className="rounded-xl border border-[var(--border-raw)] bg-[var(--bg-alt)] px-4 py-3.5 text-sm text-[var(--text-3)]">
                    <div className="flex items-center gap-[10px]">
                      <span className={`${inputPlaceholder ? 'text-[var(--text-3)]' : 'text-[var(--text)]'} flex-1 overflow-hidden text-ellipsis whitespace-nowrap`}>
                        {inputText}
                      </span>
                      <button
                        type="button"
                        aria-label="Send request"
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${sendReady ? 'bg-[var(--teal)] text-white' : 'bg-[var(--bg-dark)] text-white'} ${sendPressed ? 'scale-90' : ''}`}
                      >
                        <Send className="h-[12px] w-[12px]" strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="grid content-start gap-4 bg-white px-4 py-4 max-[1100px]:hidden">
                <SectionBadge>Live studio preview</SectionBadge>
                <div className="grid gap-3">
                  <div className="grid gap-3 border-t border-[var(--border-light)] pt-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">Performance</div>
                    {rail.metrics.map(metric => (
                      <div key={metric.label} className="flex items-center justify-between gap-3 border-b border-[var(--border-light)] pb-3 text-[13px] last:border-b-0 last:pb-0">
                        <span className="text-[var(--text-2)]">{metric.label}</span>
                        <strong className="text-right text-[var(--text)]">
                          {metric.value}
                          {metric.delta ? <em className={`ml-1 not-italic ${metric.tone === 'up' ? 'text-[var(--green)]' : 'text-[var(--text-3)]'}`}>{metric.delta}</em> : null}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[18px] border border-[var(--border-light)] bg-[rgba(244,240,232,0.75)] px-4 py-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">Coopr score</div>
                    <div className="mt-2 text-[58px] font-display font-extrabold leading-none tracking-[-0.07em] text-[var(--text)]">{rail.score}</div>
                    <div className="mt-1 text-[13px] text-[var(--text-2)]">{rail.scoreCopy}</div>
                  </div>

                  <div className="grid gap-3 border-t border-[var(--border-light)] pt-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">Creative DNA</div>
                    <div className="flex flex-wrap gap-2">
                      {rail.dna.map(chip => (
                        <span key={chip} className="rounded-full border border-[var(--border-light)] bg-[var(--bg-alt)] px-3 py-2 text-[11px] font-semibold text-[var(--text-2)]">{chip}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 border-t border-[var(--border-light)] pt-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">Session</div>
                    <div className="flex items-center justify-between gap-3 text-[13px]">
                      <span className="text-[var(--text-2)]">Tools used</span>
                      <strong className="text-[var(--text)]">{rail.session.tools}</strong>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-[13px]">
                      <span className="text-[var(--text-2)]">Data points</span>
                      <strong className="text-[var(--text)]">{rail.session.data}</strong>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-[13px]">
                      <span className="text-[var(--text-2)]">Models active</span>
                      <strong className="text-[var(--text)]">{rail.session.models}</strong>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
