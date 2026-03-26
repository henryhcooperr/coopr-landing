import { Fragment, type CSSProperties, type ReactNode, useState } from 'react'
import { MousePointer2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FlagshipStepKey } from './flagship-data'

interface FlagshipSceneProps {
  stepKey: FlagshipStepKey
  animate: boolean
  progress?: number
  plannerPreview?: PlannerPreviewKey
  onPlannerPreviewChange?: (next: PlannerPreviewKey) => void
}

export type PlannerPreviewKey = 'editor' | 'storyboard' | 'plan'

interface StageProps {
  children: ReactNode
  className?: string
  animate: boolean
  delay?: number
}

interface CursorStop {
  x: string
  y: string
  label: string
}

interface SceneShellMetric {
  label: string
  value: string
  delta?: string
  tone?: 'up' | 'neutral'
}

interface SceneShellMeta {
  navKey: 'hook' | 'script' | 'plan' | 'engine'
  workspace: string
  status: string
  metrics: SceneShellMetric[]
  score: string
  scoreCopy: string
  chips: string[]
}

const STUDIO_NAV = [
  { key: 'chat', label: 'Chat', section: null },
  { key: 'content', label: 'Content', section: null },
  { key: 'trends', label: 'Trends', section: null },
  { key: 'competitors', label: 'Competitors', section: null },
  { key: 'hook', label: 'Hook Lab', section: 'Create' },
  { key: 'script', label: 'Scripts', section: null },
  { key: 'plan', label: 'Shot Lists', section: null },
  { key: 'engine', label: 'Engine', section: 'Analyze' },
  { key: 'settings', label: 'Settings', section: null },
] as const

const SHELL_META: Record<FlagshipStepKey, SceneShellMeta> = {
  discover: {
    navKey: 'engine',
    workspace: 'Concept evaluation',
    status: 'Opportunity locked',
    metrics: [
      { label: 'Trend lift', value: '+24%', delta: 'up', tone: 'up' },
      { label: 'Comp overlap', value: 'Low', tone: 'neutral' },
      { label: 'Voice fit', value: 'High', tone: 'up' },
      { label: 'Signals', value: '7 active', tone: 'neutral' },
    ],
    score: '87',
    scoreCopy: 'Best opening this week',
    chips: ['Myth-busting', 'Proof-first', 'Low overlap', 'Direct fit'],
  },
  script: {
    navKey: 'script',
    workspace: 'Script Builder',
    status: 'Draft ready',
    metrics: [
      { label: 'Voice fit', value: '0.87', tone: 'up' },
      { label: 'Watch-through', value: '84%', tone: 'up' },
      { label: 'Weak beat', value: 'None', tone: 'neutral' },
      { label: 'Blocks ready', value: '3', tone: 'neutral' },
    ],
    score: '86',
    scoreCopy: 'Ready for teleprompter',
    chips: ['Direct hooks', 'Short lines', 'Proof first', 'Editable draft'],
  },
  planner: {
    navKey: 'plan',
    workspace: 'Shot Planner',
    status: 'Shoot plan ready',
    metrics: [
      { label: 'Scenes', value: '3', tone: 'neutral' },
      { label: 'Shots', value: '12', tone: 'neutral' },
      { label: 'Locations', value: '2', tone: 'neutral' },
      { label: 'Complexity', value: 'Low', tone: 'up' },
    ],
    score: '88',
    scoreCopy: 'Fastest filmable version',
    chips: ['Scene editor', 'Storyboard', 'Shoot day', 'Low gear'],
  },
  cadence: {
    navKey: 'engine',
    workspace: 'Publish',
    status: 'Best slot picked',
    metrics: [
      { label: 'Best slot', value: 'Thu 8:10', tone: 'up' },
      { label: 'Audience', value: 'High', tone: 'up' },
      { label: 'Crowding', value: 'Low', tone: 'up' },
      { label: 'Cadence', value: 'On pace', tone: 'neutral' },
    ],
    score: '85',
    scoreCopy: 'Room to win this week',
    chips: ['Audience-first', 'Low overlap', 'On pace', 'Proof-led'],
  },
}

function Stage({ children, className, animate, delay = 0 }: StageProps) {
  const style = animate
    ? ({ '--ft-delay': `${delay}ms` } as CSSProperties)
    : undefined

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

function SceneShell({
  children,
  caption,
  stepKey,
}: {
  children: ReactNode
  caption: string
  stepKey: FlagshipStepKey
}) {
  const meta = SHELL_META[stepKey]

  return (
    <div className="ft-scene-shell relative flex flex-col overflow-hidden rounded-[28px] border border-[var(--border-light)] bg-white shadow-[0_24px_80px_rgba(17,17,17,0.08)] lg:h-[590px] xl:h-[610px]">
      <div className="ft-scene-shell__glow" />
      <div className="ft-scene-shell__grid" />
      <div className="relative z-10 flex items-center gap-2 border-b border-[var(--border-light)] bg-[var(--bg-alt)] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-[10px] w-[10px] rounded-full bg-[var(--border-light)]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[var(--border-light)]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[var(--border-light)]" />
        </div>
        <div className="flex-1 text-center font-mono text-[11px] text-[var(--text-3)]">app.coopr.studio</div>
      </div>

      <div className="relative z-10 grid min-h-0 flex-1 grid-cols-[176px_minmax(0,1fr)_224px] max-[1180px]:grid-cols-[168px_minmax(0,1fr)] max-[900px]:grid-cols-1">
        <aside className="bg-[var(--bg-dark)] p-3 text-[var(--text-inv)] max-[900px]:hidden">
          <div className="mb-3.5 flex items-center gap-[10px] border-b border-white/[0.06] px-3 pb-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white font-display text-xs font-extrabold text-[var(--bg-dark)]">C</div>
            <span className="font-display text-[15px] font-bold tracking-[-0.03em]">Coopr</span>
          </div>
          {STUDIO_NAV.map((item, index) => {
            const active = item.key === meta.navKey
            const showSection = item.section && (index === 0 || STUDIO_NAV[index - 1]?.section !== item.section)
            return (
              <Fragment key={item.key}>
                {showSection ? (
                  <div className="mb-2 mt-4 px-3 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white/20">
                    {item.section}
                  </div>
                ) : null}
                <div className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-[9px] text-sm font-[450] transition-all duration-200',
                  active ? 'bg-white/[0.08] text-white' : 'text-white/40'
                )}>
                  <span className={cn('h-2 w-2 rounded-full', active ? 'bg-white/85' : 'bg-white/18')} />
                  {item.label}
                </div>
              </Fragment>
            )
          })}
        </aside>

        <div className="flex min-h-0 min-w-0 flex-col border-r border-[var(--border-light)] bg-[var(--bg)] max-[1180px]:border-r-0">
          <div className="flex items-center gap-[10px] border-b border-[var(--border-light)] px-5 py-3.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[var(--bg-dark)] text-xs font-bold text-[var(--text-inv)]">C</div>
            <span className="text-[15px] font-semibold tracking-[-0.01em]">Coopr</span>
            <span className="text-xs text-[var(--text-3)]">{meta.workspace}</span>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden px-4 py-4 sm:px-5">
            <div className="flex h-full min-h-0 flex-col rounded-[22px] border border-[rgba(17,17,17,0.06)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-light)] px-4 py-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">Flagship workflow</div>
                  <div className="mt-1 text-sm font-semibold text-[var(--text)]">{caption}</div>
                </div>
                <div className="rounded-full border border-[rgba(13,148,136,0.12)] bg-[rgba(13,148,136,0.08)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--teal)]">
                  {meta.status}
                </div>
              </div>
              <div className="min-h-0 overflow-hidden p-3 sm:p-4">{children}</div>
            </div>
          </div>
        </div>

        <aside className="grid content-start gap-4 bg-white px-4 py-4 max-[1180px]:hidden">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(13,148,136,0.12)] bg-white/88 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--teal)] shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
            Live studio preview
          </div>
          <div className="grid gap-3">
            <div className="grid gap-3 border-t border-[var(--border-light)] pt-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">Stage metrics</div>
              {meta.metrics.map(metric => (
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
              <div className="mt-2 text-[58px] font-display font-extrabold leading-none tracking-[-0.07em] text-[var(--text)]">{meta.score}</div>
              <div className="mt-1 text-[13px] text-[var(--text-2)]">{meta.scoreCopy}</div>
            </div>

            <div className="grid gap-3 border-t border-[var(--border-light)] pt-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">Creative DNA</div>
              <div className="flex flex-wrap gap-2">
                {meta.chips.map(chip => (
                  <span key={chip} className="rounded-full border border-[var(--border-light)] bg-[var(--bg-alt)] px-3 py-2 text-[11px] font-semibold text-[var(--text-2)]">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function FlowCursor({
  stops,
  animate,
  progress = 0,
  className,
}: {
  stops: CursorStop[]
  animate: boolean
  progress?: number
  className?: string
}) {
  const normalized = Math.max(0, Math.min(1, progress))

  if (!animate || stops.length === 0) return null

  const segmentMax = Math.max(0, stops.length - 1)
  const rawSegment = normalized * segmentMax
  const startIndex = Math.min(segmentMax, Math.floor(rawSegment))
  const endIndex = Math.min(segmentMax, startIndex + 1)
  const segmentProgress = rawSegment - startIndex
  const startStop = stops[startIndex] ?? stops[0]
  const endStop = stops[endIndex] ?? startStop
  const startX = Number.parseFloat(startStop.x)
  const startY = Number.parseFloat(startStop.y)
  const endX = Number.parseFloat(endStop.x)
  const endY = Number.parseFloat(endStop.y)
  const x = `${startX + (endX - startX) * segmentProgress}%`
  const y = `${startY + (endY - startY) * segmentProgress}%`
  const activeIndex = Math.round(rawSegment)
  const activeLabel = segmentProgress > 0.45 ? endStop.label : startStop.label

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 z-20 hidden lg:block', className)}>
      {stops.map((stop, idx) => (
        <div
          key={`${stop.label}-${idx}`}
          className={cn('ft-flow-target', idx === activeIndex && 'ft-flow-target--active')}
          style={{ left: stop.x, top: stop.y }}
        />
      ))}
      <div
        className={cn('ft-flow-cursor', animate && 'ft-flow-cursor--animate')}
        style={{
          left: x,
          top: y,
          transitionDuration: animate ? '120ms' : '0ms',
        }}
      >
        <MousePointer2 className="h-3.5 w-3.5" strokeWidth={1.8} />
        <span>{activeLabel}</span>
      </div>
    </div>
  )
}

function DiscoverScene({ animate, progress = 0 }: Omit<FlagshipSceneProps, 'stepKey'>) {
  const evaluations = [
    ['Opportunity', 'HIGH', 'Low competition in the niche'],
    ['Content gap', '82', 'Fills a hole in Maya’s catalog'],
    ['Timing', 'NOW', 'Cleanup discourse is active this week'],
  ] as const
  const winners = [
    ['Cleanup myth reel', '89 score · 24K views'],
    ['Coral before and after', '84 score · 18K views'],
    ['What the divers missed', '78 score · 12K views'],
  ] as const
  const signalNotes = [
    'Direct myth-busting hooks are rising faster than generic cleanup explainers.',
    'Maya’s proof-first reels hold better when the visual contrast lands before 8s.',
    'The niche is active, but the before/after reveal format still looks underused.',
  ]
  return (
    <SceneShell stepKey="discover" caption="Concept evaluation -> winning angle selected">
      <Stage animate={animate} delay={110} className="relative rounded-[26px] border border-[rgba(17,17,17,0.08)] bg-[linear-gradient(180deg,#fcfcfb,#f4f4f1)] p-3 shadow-[0_18px_48px_rgba(17,17,17,0.08)] lg:h-full">
        <FlowCursor stops={[]} animate={animate} progress={progress} />
        <div className="rounded-[22px] border border-[rgba(17,17,17,0.06)] bg-white p-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-light)] pb-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-3)]">Concept stage</div>
              <div className="mt-1 text-sm font-semibold text-[var(--text)]">What should Maya’s next cleanup reel be about?</div>
            </div>
            <button type="button" className="rounded-full border border-[rgba(13,148,136,0.16)] bg-[rgba(13,148,136,0.08)] px-3 py-2 text-xs font-medium text-[var(--teal)]">
              Evaluate idea
            </button>
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.05fr)_300px]">
            <div className="space-y-3">
              <div className="rounded-[20px] border border-[var(--border-light)] bg-[var(--bg)] px-4 py-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--text-3)]">Draft concept</div>
                <div className="mt-3 rounded-[18px] border border-[var(--border-light)] bg-white px-4 py-4 text-[15px] leading-relaxed text-[var(--text)]">
                  Reef cleanup myths people still believe, but filmed with a before-and-after proof cut from the exact same dive spot.
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" className="rounded-full border border-[rgba(13,148,136,0.16)] bg-white px-3 py-2 text-xs font-medium text-[var(--teal)]">
                    Compare against library
                  </button>
                  <button type="button" className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-2 text-xs font-medium text-[var(--text-2)]">
                    Check voice fit
                  </button>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {evaluations.map(([label, value, copy], index) => (
                  <div
                    key={label}
                    className={cn(
                      'rounded-[18px] border px-4 py-4',
                      index === 0 ? 'border-[rgba(13,148,136,0.16)] bg-[rgba(13,148,136,0.06)]' : 'border-[var(--border-light)] bg-white'
                    )}
                  >
                    <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                    <div className="mt-2 text-[24px] font-display font-extrabold leading-none tracking-[-0.05em] text-[var(--text)]">{value}</div>
                    <div className="mt-2 text-xs leading-relaxed text-[var(--text-2)]">{copy}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-[20px] border border-[var(--border-light)] bg-white px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Similar winners from Maya’s library</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Top performance matches</div>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {winners.map(([title, meta], index) => (
                    <div
                      key={title}
                      className={cn(
                        'rounded-[18px] border px-3 py-3',
                        index === 0 ? 'border-[rgba(13,148,136,0.16)] bg-[rgba(13,148,136,0.05)]' : 'border-[var(--border-light)] bg-[var(--bg)]'
                      )}
                    >
                      <div className="text-sm font-semibold text-[var(--text)]">{title}</div>
                      <div className="mt-1 text-xs text-[var(--text-3)]">{meta}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="rounded-[20px] border border-[rgba(13,148,136,0.18)] bg-[rgba(13,148,136,0.06)] px-4 py-4 shadow-[0_16px_40px_rgba(13,148,136,0.08)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Angle selected for Maya</div>
                  <div className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-[var(--teal)]">0.87 fit</div>
                </div>
                <div className="mt-2 text-[28px] font-display font-extrabold leading-[0.96] tracking-[-0.05em] text-[var(--text)]">
                  Myth-busting reef cleanup is spiking now.
                </div>
                <div className="mt-3 text-sm leading-relaxed text-[var(--text-2)]">
                  Matches Maya’s direct explainer tone, leaves room for a visual proof cut, and still looks underused by nearby competitors.
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    ['Trend lift', '+24%'],
                    ['Overlap', 'Low'],
                    ['Hook shape', 'Proof-first'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[16px] bg-white px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                      <div className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-[var(--border-light)] bg-[var(--bg)] px-4 py-4">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Why Coopr is choosing it</div>
                <div className="mt-3 space-y-2">
                  {signalNotes.map(note => (
                    <div key={note} className="rounded-[14px] bg-white px-3 py-2 text-xs leading-relaxed text-[var(--text-2)]">
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              <button type="button" className="w-full rounded-[18px] border border-[rgba(13,148,136,0.16)] bg-white px-4 py-3 text-left text-sm font-semibold text-[var(--teal)]">
                Lock concept and continue to Hook Lab →
              </button>
            </div>
          </div>
        </div>
      </Stage>
    </SceneShell>
  )
}

function ScriptScene({ animate, progress = 0 }: Omit<FlagshipSceneProps, 'stepKey'>) {
  const creators = [
    {
      name: 'Maya Chen',
      handle: '@tidelogs',
      role: 'Marine educator',
      project: 'Cleanup myth reel',
      status: 'Draft',
      prompt: 'Turn the cleanup myth hook into a 32 second explainer in my voice. Keep the opener direct and leave room for a visual proof cut.',
      stats: [
        ['Voice score', '0.87'],
        ['Watch-through', '84%'],
        ['Weakest beat', 'none'],
      ],
      blocks: [
        {
          label: 'Hook',
          range: '0:00 - 0:04',
          color: 'var(--amber)',
          text: 'Everyone says reef cleanup does nothing. They are wrong.',
          actions: ['Regenerate', 'Edit'],
        },
        {
          label: 'Body',
          range: '0:04 - 0:24',
          color: 'var(--blue)',
          text: 'Show the coral wall from last month, then cut to the same patch after volunteers pulled the line and trash out. Explain why flow and light return first.',
          actions: ['Shorten', 'Expand'],
        },
        {
          label: 'CTA',
          range: '0:24 - 0:32',
          color: 'var(--green)',
          text: 'Save this before the next person tells you cleanup is pointless.',
          actions: ['Regenerate'],
        },
      ],
      notes: [
        'Hook pulled from Maya’s best direct-address openers.',
        'Scene 2 tightened after retention analysis flagged drag at 13s.',
        'Teleprompter and shot planner stay tied to the same approved draft.',
      ],
    },
    {
      name: 'Liv Torres',
      handle: '@liftwithliv',
      role: 'Fitness creator',
      project: 'Morning mobility reset',
      status: 'Published',
      prompt: 'Write a save-worthy 28 second reset in my direct style. Keep each move visual and fast.',
      stats: [
        ['Voice score', '0.82'],
        ['Watch-through', '79%'],
        ['Weakest beat', 'scene 3'],
      ],
      blocks: [
        {
          label: 'Hook',
          range: '0:00 - 0:03',
          color: 'var(--amber)',
          text: 'Your hips feel terrible in the morning for one obvious reason.',
          actions: ['Regenerate', 'Edit'],
        },
        {
          label: 'Body',
          range: '0:03 - 0:21',
          color: 'var(--blue)',
          text: 'Start with one slow lunge stretch, then cut immediately to the standing rotation. Keep the pace tight and count the moves on-screen.',
          actions: ['Shorten', 'Expand'],
        },
        {
          label: 'CTA',
          range: '0:21 - 0:28',
          color: 'var(--green)',
          text: 'Save this and do it before coffee tomorrow.',
          actions: ['Regenerate'],
        },
      ],
      notes: [
        'Save-heavy mobility posts work best when the count overlay appears by 2s.',
        'The body copy was shortened to keep the demo visual first.',
        'This draft outperformed Liv’s 30-day baseline by 9 points.',
      ],
    },
    {
      name: 'Theo Park',
      handle: '@cutbytheo',
      role: 'Creator educator',
      project: 'How I light brand reels',
      status: 'Review',
      prompt: 'Draft a 35 second lighting breakdown with one fast prop reveal and no filler.',
      stats: [
        ['Voice score', '0.90'],
        ['Watch-through', '81%'],
        ['Weakest beat', 'hook alt 2'],
      ],
      blocks: [
        {
          label: 'Hook',
          range: '0:00 - 0:05',
          color: 'var(--amber)',
          text: 'This $14 light trick makes brand reels look expensive.',
          actions: ['Regenerate', 'Edit'],
        },
        {
          label: 'Body',
          range: '0:05 - 0:27',
          color: 'var(--blue)',
          text: 'Start with the lamp off, flip it on into the product shot, then show the bounce card angle before the final reveal frame.',
          actions: ['Shorten', 'Expand'],
        },
        {
          label: 'CTA',
          range: '0:27 - 0:35',
          color: 'var(--green)',
          text: 'Comment light and I will post the full setup.',
          actions: ['Regenerate'],
        },
      ],
      notes: [
        'Theo’s direct gear-price hooks hold best when the prop reveal lands at 1s.',
        'The CTA was softened to keep the tutorial tone intact.',
        'Shot planner can reuse the same scene timing markers.',
      ],
    },
  ] as const
  const [activeCreatorIndex, setActiveCreatorIndex] = useState(0)
  const activeCreator = creators[activeCreatorIndex]
  const flowStops: CursorStop[] = [
    { x: '18%', y: '18%', label: 'open draft' },
    { x: '39%', y: '43%', label: 'rewrite block' },
    { x: '73%', y: '80%', label: 'open teleprompter' },
  ]
  return (
    <SceneShell stepKey="script" caption="Selected hook -> Script editor -> teleprompter handoff">
      <div className="relative">
        <FlowCursor stops={flowStops} animate={animate} progress={progress} />
        <Stage animate={animate} delay={120} className="min-h-0 min-w-0 rounded-[26px] border border-[rgba(17,17,17,0.08)] bg-[linear-gradient(180deg,#fcfcfb,#f4f4f1)] p-3 shadow-[0_18px_48px_rgba(17,17,17,0.08)] lg:h-full">
          <div className="rounded-[22px] border border-[rgba(17,17,17,0.06)] bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-light)] pb-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-3)]">Script editor</div>
                <div className="mt-1 text-sm font-semibold text-[var(--text)]">{activeCreator.name} • {activeCreator.project}</div>
              </div>
              <button type="button" className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-2 text-xs font-medium text-[var(--text-2)]">
                Open teleprompter
              </button>
            </div>

            <div className="mt-3 grid gap-2 lg:grid-cols-3">
              {creators.map((creator, idx) => (
                <button
                  key={creator.name}
                  type="button"
                  onClick={() => setActiveCreatorIndex(idx)}
                  className={cn(
                    'rounded-[18px] border px-3 py-3 text-left transition-all',
                    idx === activeCreatorIndex
                      ? 'border-[rgba(37,99,235,0.18)] bg-[rgba(37,99,235,0.06)]'
                      : 'border-[var(--border-light)] bg-[var(--bg)]'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-[var(--text)]">{creator.name}</div>
                      <div className="truncate text-xs text-[var(--text-3)]">{creator.handle} • {creator.role}</div>
                    </div>
                    <div className={cn(
                      'rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]',
                      creator.status === 'Draft' && 'bg-[rgba(217,119,6,0.14)] text-[var(--amber)]',
                      creator.status === 'Published' && 'bg-[rgba(22,163,74,0.14)] text-[var(--green)]',
                      creator.status === 'Review' && 'bg-[rgba(37,99,235,0.14)] text-[var(--blue)]',
                    )}>
                      {creator.status}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-[var(--text-2)]">{creator.project}</div>
                </button>
              ))}
            </div>

            <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_260px]">
              <div className="space-y-2">
                <div className="rounded-[18px] border border-[rgba(37,99,235,0.14)] bg-[rgba(37,99,235,0.06)] px-3 py-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Selected hook</div>
                  <div className="mt-2 text-sm leading-relaxed text-[var(--text)]">“Everyone says reef cleanup does nothing. They are wrong.”</div>
                </div>

                {activeCreator.blocks.map(block => (
                  <div key={block.label} className="rounded-[18px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ background: `color-mix(in srgb, ${block.color} 12%, white)`, color: block.color }}>
                        {block.label}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{block.range}</span>
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-[var(--text)] break-words">{block.text}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {block.actions.map(action => (
                        <button key={action} type="button" className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-1.5 text-[11px] font-medium text-[var(--text-2)]">
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap gap-2 border-t border-[var(--border-light)] pt-3">
                  <button type="button" className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-2 text-xs font-medium text-[var(--text-2)]">
                    AI critique
                  </button>
                  <button type="button" className="rounded-full border border-[rgba(37,99,235,0.14)] bg-[rgba(37,99,235,0.08)] px-3 py-2 text-xs font-medium text-[var(--blue)]">
                    Open teleprompter
                  </button>
                  <button type="button" className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-2 text-xs font-medium text-[var(--text-2)]">
                    Send to shot planner
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="rounded-[18px] border border-[var(--border-light)] bg-white px-3 py-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{activeCreator.name} asks Coopr</div>
                  <div className="mt-2 text-sm leading-relaxed text-[var(--text)]">{activeCreator.prompt}</div>
                </div>

                {activeCreator.stats.map(([label, value], idx) => (
                  <div
                    key={label}
                    className={cn(
                      'rounded-[18px] border px-3 py-3',
                      idx === 0 ? 'border-[rgba(37,99,235,0.14)] bg-[rgba(37,99,235,0.06)]' : 'border-[var(--border-light)] bg-[var(--bg)]'
                    )}
                  >
                    <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                    <div className="mt-1 text-lg font-semibold tracking-[-0.03em] text-[var(--text)]">{value}</div>
                  </div>
                ))}

                <div className="rounded-[18px] border border-[var(--border-light)] bg-white px-3 py-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Coopr notes</div>
                  <div className="mt-2 space-y-2">
                    {activeCreator.notes.map(note => (
                      <div key={note} className="rounded-[14px] bg-[var(--bg)] px-2.5 py-2 text-xs leading-relaxed text-[var(--text-2)]">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Stage>
      </div>
    </SceneShell>
  )
}

function PlannerScene({
  animate,
  progress = 0,
  plannerPreview,
  onPlannerPreviewChange,
}: Omit<FlagshipSceneProps, 'stepKey'>) {
  const [internalPreview, setInternalPreview] = useState<PlannerPreviewKey>('editor')
  const activePreview = plannerPreview ?? internalPreview
  const setActivePreview = onPlannerPreviewChange ?? setInternalPreview
  const scenes = [
    ['1', 'Hook', 'Talking head opener'],
    ['2', 'Proof', 'Close-up coral detail'],
    ['3', 'Payoff', 'Wide cleanup reveal'],
  ]
  const editorFields = [
    ['Script / Dialogue', 'Everyone says reef cleanup does nothing. They are wrong.'],
    ['Location', 'Monterey breakwall'],
    ['Time of day', 'Golden hour'],
    ['Camera setup', 'Handheld follow + lav'],
  ]
  const storyboardFrames = [
    {
      step: '01',
      title: 'POV opener',
      note: 'Maya lifts the trash bag into frame before the first line lands.',
      cue: '0:03 · Close-up',
      tint: 'rgba(217,119,6,0.14)',
    },
    {
      step: '02',
      title: 'Proof cut',
      note: 'Macro pass on the coral patch, then match cut to the same reef from last month.',
      cue: '0:05 · Macro',
      tint: 'rgba(37,99,235,0.14)',
    },
    {
      step: '03',
      title: 'Payoff walk-out',
      note: 'Wide reveal back to the waterline with the CTA tagged on-screen.',
      cue: '0:06 · Wide',
      tint: 'rgba(13,148,136,0.14)',
    },
    {
      step: '04',
      title: 'CTA plate',
      note: 'Direct-to-camera outro with calm delivery and one save-focused CTA.',
      cue: '0:04 · Talking head',
      tint: 'rgba(71,85,105,0.12)',
    },
  ]
  const planGroups = [
    {
      label: 'Shoot order',
      entries: [
        'Breakwall • hook, proof, payoff in one light window',
        'Parking lot • bag insert and reset shot',
        'Wrap with direct CTA take before sunset drops',
      ],
    },
    {
      label: 'Prep notes',
      entries: [
        'Wide lens + lav + backup recorder',
        'Record opener clean before wind picks up',
        'Hold two extra seconds on the proof cut',
      ],
    },
  ]
  const previewTabs: { key: PlannerPreviewKey; label: string }[] = [
    { key: 'editor', label: 'Scene editor' },
    { key: 'storyboard', label: 'Shot storyboard' },
    { key: 'plan', label: 'Production plan' },
  ]
  const flowStopsByPreview: Record<PlannerPreviewKey, CursorStop[]> = {
    editor: [
      { x: '80%', y: '16%', label: 'open scene editor' },
      { x: '41%', y: '46%', label: 'edit scene' },
      { x: '78%', y: '44%', label: 'review shot handoff' },
    ],
    storyboard: [
      { x: '80%', y: '16%', label: 'open storyboard' },
      { x: '37%', y: '36%', label: 'review frame' },
      { x: '76%', y: '77%', label: 'check timeline' },
    ],
    plan: [
      { x: '83%', y: '16%', label: 'open production plan' },
      { x: '36%', y: '38%', label: 'scan checklist' },
      { x: '79%', y: '42%', label: 'export plan' },
    ],
  }

  return (
    <SceneShell stepKey="planner" caption="Planner workspace -> Scene editor / Shot storyboard / Production plan">
      <div className="lg:h-full">
        <Stage animate={animate} delay={100} className="relative rounded-[26px] border border-[rgba(17,17,17,0.08)] bg-[linear-gradient(180deg,#fcfcfb,#f4f4f1)] p-3 shadow-[0_18px_48px_rgba(17,17,17,0.08)] lg:h-full">
          <FlowCursor stops={activePreview === 'plan' ? [] : flowStopsByPreview[activePreview]} animate={animate} progress={progress} />
          <div className="rounded-[22px] border border-[rgba(17,17,17,0.06)] bg-white p-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-light)] pb-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-3)]">Project detail</div>
                <div className="mt-1 text-sm font-semibold text-[var(--text)]">Cleanup myth reel • production</div>
              </div>
              <div className="flex gap-1 rounded-lg p-1" style={{ background: 'var(--bg)' }}>
                {previewTabs.map(tab => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActivePreview(tab.key)}
                    className={cn(
                      'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                      activePreview === tab.key
                        ? 'bg-white text-[var(--text)] shadow-[0_1px_2px_rgba(17,17,17,0.08)]'
                        : 'text-[var(--text-3)]'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div key={activePreview} className="mt-3 min-h-0 min-w-0 overflow-hidden">
              {activePreview === 'editor' ? (
                <div className="grid gap-3 2xl:grid-cols-[180px_minmax(0,1fr)_230px] xl:grid-cols-[180px_minmax(0,1fr)]">
                  <div className="space-y-2">
                    <div className="rounded-[18px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Scene stack</div>
                      <div className="mt-2 space-y-2">
                        {scenes.map(([num, label, note], idx) => (
                          <div
                            key={num}
                            className={cn(
                              'rounded-[14px] px-3 py-2 text-sm',
                              idx === 1 ? 'bg-white shadow-[0_8px_20px_rgba(17,17,17,0.05)]' : 'bg-white/60'
                            )}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{num}</span>
                              <span className="text-xs font-semibold text-[var(--text)]">{label}</span>
                            </div>
                            <div className="mt-1 text-xs text-[var(--text-2)]">{note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {['Concept', 'Hooks', 'Script', 'Shots', 'Notes', 'Review'].map(tab => (
                        <span
                          key={tab}
                          className={cn(
                            'rounded-full px-3 py-1.5 text-[11px] font-medium',
                            tab === 'Shots'
                              ? 'bg-[rgba(71,85,105,0.12)] text-[var(--slate)]'
                              : 'border border-[var(--border-raw)] bg-white text-[var(--text-2)]'
                          )}
                        >
                          {tab}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {editorFields.map(([label, value], idx) => (
                        <div
                          key={label}
                          className={cn(
                            'rounded-[18px] border px-3 py-3',
                            idx === 0 ? 'border-[rgba(71,85,105,0.12)] bg-[var(--bg)]' : 'border-[var(--border-light)] bg-white'
                          )}
                        >
                          <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                          <div className="mt-1 text-sm leading-relaxed text-[var(--text)]">{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {[
                        ['Lighting notes', 'Natural light back to water. Bounce card on Maya’s face.'],
                        ['Audio notes', 'Lav on hoodie plus backup recorder.'],
                        ['Performance direction', 'Calm authority. Pause before the proof cut.'],
                        ['Hook text', 'Trash bag enters frame before the opener lands.'],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-[16px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
                          <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                          <div className="mt-1 text-xs leading-relaxed text-[var(--text)]">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 2xl:block xl:col-span-2">
                    <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-1">
                      <div className="rounded-[18px] border border-[rgba(13,148,136,0.14)] bg-[rgba(13,148,136,0.06)] px-3 py-3">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">AI handoff</div>
                        <div className="mt-1 text-sm font-semibold text-[var(--text)]">Generate the shot list for this scene</div>
                        <div className="mt-2 text-xs leading-relaxed text-[var(--text-2)]">
                          Coopr fills the shots tab from the approved dialogue and the production notes.
                        </div>
                      </div>
                      <div className="rounded-[18px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Production reminders</div>
                        <div className="mt-2 space-y-2 text-xs leading-relaxed text-[var(--text-2)]">
                          <div>Pause after the opener before cutting to the proof shot.</div>
                          <div>Keep natural backlight and use the bounce card on Maya’s face.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {activePreview === 'storyboard' ? (
                <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_260px]">
                  <div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {storyboardFrames.map(frame => (
                        <div key={frame.step} className="overflow-hidden rounded-[22px] border border-[var(--border-light)] bg-[var(--bg)]">
                          <div className="border-b border-[var(--border-light)] px-4 py-3">
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Frame {frame.step}</div>
                              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{frame.cue}</div>
                            </div>
                            <div className="mt-1 text-sm font-semibold text-[var(--text)]">{frame.title}</div>
                          </div>
                          <div className="px-4 py-4">
                            <div className="flex h-[132px] items-center justify-center rounded-[18px] border border-white/70" style={{ background: `linear-gradient(135deg, ${frame.tint}, rgba(17,17,17,0.04))` }}>
                              <div className="h-[92px] w-[132px] rounded-[16px] border border-[rgba(17,17,17,0.08)] bg-white/75" />
                            </div>
                            <div className="mt-3 text-sm leading-relaxed text-[var(--text-2)]">{frame.note}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 rounded-[20px] border border-[var(--border-light)] bg-white px-4 py-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Timeline</div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">28s total</div>
                      </div>
                      <div className="mt-3 flex h-7 gap-2">
                        {[
                          ['10%', 'rgba(217,119,6,0.2)', 'var(--amber)'],
                          ['18%', 'rgba(37,99,235,0.18)', 'var(--blue)'],
                          ['50%', 'rgba(13,148,136,0.18)', 'var(--teal)'],
                          ['22%', 'rgba(71,85,105,0.16)', 'var(--slate)'],
                        ].map(([width, bg, color], index) => (
                          <div
                            key={index}
                            className="flex items-center justify-center rounded-[12px] text-[10px] font-semibold"
                            style={{ width, background: bg, color }}
                          >
                            {index + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-[18px] border border-[var(--border-light)] bg-white px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Shot table</div>
                      <div className="mt-2 space-y-2">
                        {storyboardFrames.map(frame => (
                          <div key={`row-${frame.step}`} className="grid grid-cols-[22px_92px_1fr] gap-2 rounded-[14px] bg-[var(--bg)] px-3 py-2 text-xs">
                            <div className="font-mono text-[var(--text-3)]">{frame.step}</div>
                            <div className="text-[var(--text)]">{frame.title.toLowerCase()}</div>
                            <div className="text-[var(--text-2)]">{frame.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[18px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Pattern match</div>
                      <div className="mt-2 text-sm font-semibold text-[var(--text)]">POV → proof cut → reveal → direct CTA</div>
                      <div className="mt-2 text-xs leading-relaxed text-[var(--text-2)]">
                        Pulls from Maya’s top-performing explainer structure without making the reel feel scripted.
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {activePreview === 'plan' ? (
                <div className="space-y-3">
                  <div className="grid gap-2 sm:grid-cols-3">
                    {[
                      ['Scenes', '3'],
                      ['Total duration', '31s'],
                      ['Locations', '2'],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[18px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3 text-center">
                        <div className="text-lg font-semibold tracking-[-0.03em] text-[var(--text)]">{value}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 xl:grid-cols-2">
                    {planGroups.map(group => (
                      <div key={group.label} className="rounded-[20px] border border-[var(--border-light)] bg-white px-4 py-4">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{group.label}</div>
                        <div className="mt-3 space-y-2">
                          {group.entries.map(entry => (
                            <div key={entry} className="flex gap-3 rounded-[14px] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-2)]">
                              <span className="mt-[3px] text-[var(--text-3)]">□</span>
                              <span>{entry}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_250px]">
                    <div className="rounded-[18px] border border-[rgba(13,148,136,0.14)] bg-[rgba(13,148,136,0.06)] px-4 py-4">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Production note</div>
                      <div className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">
                        The shoot plan stays tied to the approved script, so edit notes and reshoots can come back into the same project later.
                      </div>
                    </div>
                    <div className="rounded-[18px] border border-[var(--border-light)] bg-white px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Export</div>
                      <div className="mt-3 flex flex-col gap-2">
                        {['Export PDF', 'Print plan', 'Share project'].map(action => (
                          <button key={action} type="button" className="rounded-full border border-[var(--border-raw)] bg-[var(--bg)] px-3 py-2 text-left text-xs font-medium text-[var(--text-2)]">
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Stage>
      </div>
    </SceneShell>
  )
}

function CadenceScene({ animate, progress = 0 }: Omit<FlagshipSceneProps, 'stepKey'>) {
  const windows = [
    ['Tue', '7:12 PM', 'good'],
    ['Thu', '8:10 PM', 'best'],
    ['Sat', '5:45 PM', 'crowded'],
  ] as const
  return (
    <SceneShell stepKey="cadence" caption="Publish step -> best slot selected">
      <Stage animate={animate} delay={100} className="relative rounded-[26px] border border-[rgba(17,17,17,0.08)] bg-[linear-gradient(180deg,#fffaf4,#f4f4f1)] p-3 shadow-[0_18px_48px_rgba(17,17,17,0.08)] lg:h-full">
        <FlowCursor stops={[]} animate={animate} progress={progress} />
        <div className="rounded-[22px] border border-[rgba(17,17,17,0.06)] bg-white p-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-light)] pb-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-3)]">Ready to publish</div>
              <div className="mt-1 text-sm font-semibold text-[var(--text)]">Cleanup myth reel • ready to ship</div>
            </div>
            <button type="button" className="rounded-full border border-[rgba(217,119,6,0.16)] bg-[rgba(217,119,6,0.08)] px-3 py-2 text-xs font-medium text-[var(--amber)]">
              Schedule post
            </button>
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_270px]">
            <div className="space-y-3">
              <div className="rounded-[20px] border border-[rgba(217,119,6,0.16)] bg-[rgba(217,119,6,0.06)] px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Predicted performance</div>
                    <div className="mt-1 text-sm text-[var(--text-2)]">Audience, pace, and crowding resolved into one publish call</div>
                  </div>
                  <div className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-[var(--amber)]">high confidence</div>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {[
                    ['Score', '84/100'],
                    ['Expected views', '15K–22K'],
                    ['Best time', 'Thu 8:10 PM'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[16px] bg-white px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                      <div className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm leading-relaxed text-[var(--text-2)]">
                  Thursday evening gives Maya the cleanest audience peak without colliding with the two nearby cleanup explainers already in feed.
                </div>
              </div>

              <div className="rounded-[20px] border border-[var(--border-light)] bg-white px-4 py-4">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Caption</div>
                <div className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">
                  Everyone says reef cleanup does nothing. Then they see the same coral patch thirty days later. Save this before the next person tells you cleanup is pointless.
                </div>
                <div className="mt-3 text-xs text-[var(--blue)]">#reefcleanup #oceancreator #conservation</div>
              </div>

              <div className="rounded-[20px] border border-[var(--border-light)] bg-white px-4 py-4">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Posting windows</div>
                <div className="mt-3 space-y-2">
                  {windows.map(([day, time, state]) => (
                    <div key={`${day}-${time}`} className="flex items-center justify-between rounded-[16px] bg-[var(--bg)] px-3 py-3 text-sm">
                      <div className="font-semibold text-[var(--text)]">{day}</div>
                      <div className="font-mono text-[var(--text-2)]">{time}</div>
                      <div className={cn(
                        'rounded-full px-2.5 py-1 font-mono text-[10px]',
                        state === 'best' && 'bg-[rgba(22,163,74,0.12)] text-[var(--green)]',
                        state === 'good' && 'bg-[rgba(13,148,136,0.12)] text-[var(--teal)]',
                        state === 'crowded' && 'bg-[rgba(217,119,6,0.12)] text-[var(--amber)]'
                      )}>
                        {state}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="rounded-[20px] border border-[rgba(217,119,6,0.18)] bg-[rgba(217,119,6,0.06)] px-3 py-3 shadow-[0_16px_40px_rgba(217,119,6,0.08)]">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Recommended slot</div>
                <div className="mt-2 text-[30px] font-display font-extrabold leading-none tracking-[-0.04em] text-[var(--text)]">Thu 8:10 PM</div>
                <div className="mt-2 text-sm text-[var(--text-2)]">High audience activity, low crowding, and still on pace for Maya’s week.</div>
              </div>

              <div className="rounded-[18px] border border-[var(--border-light)] bg-white px-3 py-3">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Publish checklist</div>
                <div className="mt-3 space-y-2 text-xs text-[var(--text-2)]">
                  {[
                    'Caption approved',
                    'Thumbnail frame selected',
                    'Hook block tested',
                    'Project marked ready',
                  ].map(item => (
                    <div key={item} className="flex gap-2 rounded-[14px] bg-[var(--bg)] px-3 py-2">
                      <span className="text-[var(--green)]">●</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[18px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Export options</div>
                <div className="mt-3 flex flex-col gap-2">
                  {['Copy caption', 'Export to scheduler', 'Share project'].map(action => (
                    <button key={action} type="button" className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-2 text-left text-xs font-medium text-[var(--text-2)]">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Stage>
    </SceneShell>
  )
}

export function FlagshipScene({ stepKey, animate, progress, plannerPreview, onPlannerPreviewChange }: FlagshipSceneProps) {
  if (stepKey === 'discover') return <DiscoverScene animate={animate} progress={progress} />
  if (stepKey === 'script') return <ScriptScene animate={animate} progress={progress} />
  if (stepKey === 'planner') {
    return <PlannerScene animate={animate} progress={progress} plannerPreview={plannerPreview} onPlannerPreviewChange={onPlannerPreviewChange} />
  }
  return <CadenceScene animate={animate} progress={progress} />
}
