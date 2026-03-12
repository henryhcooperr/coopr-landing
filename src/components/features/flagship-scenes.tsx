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

function Stage({ children, className, animate, delay = 0 }: StageProps) {
  const style = animate
    ? ({ '--ft-delay': `${delay}ms` } as CSSProperties)
    : undefined

  return (
    <div className={cn(className, animate && 'ft-stage-in')} style={style}>
      {children}
    </div>
  )
}

function SceneShell({
  children,
  caption,
}: {
  children: ReactNode
  caption: string
}) {
  return (
    <div className="ft-scene-shell relative overflow-hidden rounded-[28px] border border-[var(--border-light)] bg-white p-4 shadow-[0_24px_80px_rgba(17,17,17,0.08)] sm:p-5 lg:min-h-[520px] lg:p-6">
      <div className="ft-scene-shell__glow" />
      <div className="ft-scene-shell__grid" />
      <div className="relative z-10 border-b border-[var(--border-light)] pb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">Flagship workflow</div>
          <div className="mt-1 text-sm font-semibold text-[var(--text)]">{caption}</div>
        </div>
      </div>
      <div className="relative z-10 mt-4">{children}</div>
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
  const competitors = [
    { name: 'Ocean Almanac', handle: '@oceanalmanac', hook: 'Debunking reef myths', lift: '+18%', hold: '79%', active: false },
    { name: 'Wild Lens Daily', handle: '@wildlensdaily', hook: 'Cleanup before/after reveal', lift: '+24%', hold: '91%', active: true },
    { name: 'Blue Planet Notes', handle: '@blueplanetnotes', hook: 'Fast fact carousel reel', lift: '+11%', hold: '74%', active: false },
  ]
  const bars = [62, 84, 58, 76, 93, 71]
  const flowStops: CursorStop[] = [
    { x: '23%', y: '41%', label: 'compare hooks' },
    { x: '73%', y: '28%', label: 'pick angle' },
    { x: '68%', y: '78%', label: 'check lift' },
  ]

  return (
    <SceneShell caption="Intelligence workspace -> winning angle selected">
      <Stage animate={animate} delay={110} className="relative rounded-[26px] border border-[rgba(17,17,17,0.08)] bg-[linear-gradient(180deg,#fcfcfb,#f4f4f1)] p-3 shadow-[0_18px_48px_rgba(17,17,17,0.08)]">
        <FlowCursor stops={flowStops} animate={animate} progress={progress} />
        <div className="rounded-[22px] border border-[rgba(17,17,17,0.06)] bg-white p-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-light)] pb-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-3)]">Intelligence</div>
              <div className="mt-1 text-sm font-semibold text-[var(--text)]">Maya Chen • cleanup myth research</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Competitors', 'Trends', 'Angles'].map(tab => (
                <span
                  key={tab}
                  className={cn(
                    'rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]',
                    tab === 'Competitors' ? 'bg-[rgba(13,148,136,0.12)] text-[var(--teal)]' : 'bg-[var(--bg)] text-[var(--text-3)]'
                  )}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.05fr)_340px]">
            <div className="space-y-2">
              {competitors.map(competitor => (
                <div
                  key={competitor.name}
                  className={cn(
                    'rounded-[20px] border px-3 py-3 transition-all',
                    competitor.active
                      ? 'border-[rgba(13,148,136,0.24)] bg-[rgba(13,148,136,0.05)] shadow-[0_10px_26px_rgba(13,148,136,0.08)]'
                      : 'border-[var(--border-light)] bg-[var(--bg)]'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-[var(--text)]">{competitor.name}</div>
                      <div className="text-xs text-[var(--text-3)]">{competitor.handle}</div>
                      <div className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">{competitor.hook}</div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        'rounded-full px-2.5 py-1 font-mono text-[10px]',
                        competitor.active ? 'bg-[rgba(13,148,136,0.12)] text-[var(--teal)]' : 'bg-white text-[var(--text-3)]'
                      )}>
                        {competitor.lift}
                      </div>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">hold {competitor.hold}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="rounded-[20px] border border-[rgba(13,148,136,0.18)] bg-[rgba(13,148,136,0.05)] px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Angle selected for Maya</div>
                  <div className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-[var(--teal)]">+24%</div>
                </div>
                <div className="mt-2 text-xl font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--text)]">
                  Myth-busting reef cleanup is accelerating now.
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {[
                    ['Trend confidence', '0.87'],
                    ['Comp overlap', 'Low'],
                    ['Voice fit', 'High'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[16px] bg-white px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                      <div className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-[16px] bg-white px-3 py-3 text-sm leading-relaxed text-[var(--text-2)]">
                  The reveal-plus-proof format matches Maya’s direct style and still feels underused in the current competitor set.
                </div>
              </div>

              <div className="rounded-[20px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Signal comparison</div>
                  <div className="font-mono text-[10px] text-[var(--text-3)]">7-day normalized score</div>
                </div>
                <div className="mt-3 flex items-end gap-2">
                  {bars.map((value, idx) => (
                    <div key={idx} className="flex-1">
                      <div className="ft-graph-bar rounded-t-[14px] bg-[linear-gradient(180deg,rgba(13,148,136,0.85),rgba(13,148,136,0.18))]" style={{ ['--ft-bar-height' as string]: `${value}%` } as CSSProperties} />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">
                  <span>competitors</span>
                  <span>your backlog</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="button" className="rounded-full border border-[rgba(13,148,136,0.16)] bg-[rgba(13,148,136,0.08)] px-3 py-2 text-xs font-medium text-[var(--teal)]">
                  Send to Hook Lab
                </button>
                <button type="button" className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-2 text-xs font-medium text-[var(--text-2)]">
                  Save opportunity
                </button>
              </div>
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
          text: 'Show the coral wall from last month, then cut to the same patch after volunteers pulled the fishing line and trash out. Explain why flow and light return first.',
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
        'Hook pulled from Maya’s top 5 direct-address openers.',
        'Scene 2 tightened after retention analysis flagged drag at 13s.',
        'Teleprompter and shot plan stay linked to the same draft.',
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
        'Liv’s audience saves mobility posts when the count overlay appears by 2s.',
        'The body copy was shortened to keep the demo visual first.',
        'This draft outperformed her 30-day baseline by 9 points.',
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
        ['Voice score', '0.9'],
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
        'Theo’s direct gear-price hooks hold best with prop reveal at 1s.',
        'The CTA was softened to keep the tutorial tone intact.',
        'Shot planner can reuse the same scene timing markers.',
      ],
    },
  ] as const
  const [activeCreatorIndex, setActiveCreatorIndex] = useState(0)
  const activeCreator = creators[activeCreatorIndex]
  const flowStops: CursorStop[] = [
    { x: '18%', y: '18%', label: 'open creator draft' },
    { x: '47%', y: '43%', label: 'edit script' },
    { x: '78%', y: '84%', label: 'open teleprompter' },
  ]

  return (
    <SceneShell caption="Real creator draft -> Script Builder -> teleprompter handoff">
      <div className="relative space-y-4">
        <FlowCursor stops={flowStops} animate={animate} progress={progress} />
        <Stage animate={animate} delay={90} className="relative rounded-[26px] border border-[rgba(17,17,17,0.08)] bg-[#171717] p-3 text-white shadow-[0_20px_60px_rgba(17,17,17,0.14)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">Studio examples</div>
              <div className="mt-1 text-sm font-medium text-white/82">Real creator drafts moving through script builder</div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60">
              {creators.length} live examples
            </div>
          </div>

          <div className="mt-3 grid gap-2 lg:grid-cols-3">
            {creators.map((creator, idx) => (
              <button
                key={creator.name}
                type="button"
                onClick={() => setActiveCreatorIndex(idx)}
                className={cn(
                  'rounded-[20px] border px-3 py-3 text-left transition-all',
                  idx === activeCreatorIndex
                    ? 'border-[rgba(59,130,246,0.32)] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] shadow-[0_12px_28px_rgba(0,0,0,0.18)]'
                    : 'border-white/8 bg-white/[0.04] hover:bg-white/[0.06]'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <div className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                      idx === activeCreatorIndex ? 'bg-[rgba(37,99,235,0.18)] text-white' : 'bg-white/8 text-white/72'
                    )}>
                      {creator.name.split(' ').map(part => part[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white">{creator.name}</div>
                      <div className="text-xs text-white/52">{creator.handle} • {creator.role}</div>
                    </div>
                  </div>
                  <div className={cn(
                    'rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]',
                    creator.status === 'Draft' && 'bg-[rgba(217,119,6,0.14)] text-[rgb(251,191,36)]',
                    creator.status === 'Published' && 'bg-[rgba(22,163,74,0.14)] text-[rgb(74,222,128)]',
                    creator.status === 'Review' && 'bg-[rgba(37,99,235,0.14)] text-[rgb(96,165,250)]',
                  )}>
                    {creator.status}
                  </div>
                </div>
                <div className="mt-3 rounded-[16px] bg-black/18 px-3 py-2.5">
                  <div className="truncate text-sm font-medium text-white/90">{creator.project}</div>
                  <div className="mt-1 text-xs leading-relaxed text-white/48">
                    {idx === activeCreatorIndex ? 'Selected for script editing' : 'Open example'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Stage>

        <Stage animate={animate} delay={210} className="min-w-0 rounded-[26px] border border-[rgba(17,17,17,0.08)] bg-[linear-gradient(180deg,#fcfcfb,#f4f4f1)] p-3 shadow-[0_18px_48px_rgba(17,17,17,0.08)]">
          <div className="rounded-[22px] border border-[rgba(17,17,17,0.06)] bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-light)] pb-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-3)]">Script Builder</div>
                <div className="mt-1 text-sm font-semibold text-[var(--text)]">{activeCreator.name} • {activeCreator.project}</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {['Concept', 'Hooks', 'Script', 'Shots', 'Notes'].map(stage => (
                  <span
                    key={stage}
                    className={cn(
                      'rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]',
                      stage === 'Script'
                        ? 'bg-[rgba(37,99,235,0.12)] text-[var(--blue)]'
                        : 'bg-[var(--bg)] text-[var(--text-3)]'
                    )}
                  >
                    {stage}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-[18px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{activeCreator.name} asks Coopr</div>
                <div className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">hook approved</div>
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--text)]">{activeCreator.prompt}</div>
            </div>

            <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_260px]">
              <div className="space-y-2">
                {activeCreator.blocks.map(block => (
                  <div key={block.label} className="rounded-[18px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ background: `color-mix(in srgb, ${block.color} 12%, white)`, color: block.color }}>
                        {block.label}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{block.range}</span>
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-[var(--text)] break-words">
                      {block.text}
                    </div>
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
                  <button type="button" className="rounded-full border border-[rgba(37,99,235,0.14)] bg-[rgba(37,99,235,0.08)] px-3 py-2 text-xs font-medium text-[var(--blue)]">
                    Open teleprompter
                  </button>
                  <button type="button" className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-2 text-xs font-medium text-[var(--text-2)]">
                    Send to shot planner
                  </button>
                </div>
              </div>

              <div className="space-y-2">
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
  const fields = [
    ['Script / Dialogue', 'Everyone says reef cleanup does nothing. They are wrong.'],
    ['Location', 'Monterey breakwall'],
    ['Time of day', 'Golden hour'],
    ['Camera setup', 'Handheld follow + lav'],
  ]
  const shots = [
    {
      step: '01',
      title: 'Direct opener',
      note: 'Chest-up frame. Maya waves the trash bag into frame before the line.',
      accent: 'rgba(217,119,6,0.12)',
    },
    {
      step: '02',
      title: 'Proof cut',
      note: 'Macro shot on coral patch. Match cut to last month for contrast.',
      accent: 'rgba(37,99,235,0.12)',
    },
    {
      step: '03',
      title: 'Payoff walk-out',
      note: 'Wide shot back to water. Tag the next dive CTA on-screen.',
      accent: 'rgba(13,148,136,0.12)',
    },
  ]
  const planGroups = [
    {
      location: 'Monterey breakwall',
      entries: [
        'Hook • 12s • golden hour',
        'Proof • 10s • macro coral close-up',
        'Payoff • 9s • walk-out reveal',
      ],
    },
    {
      location: 'Parking lot pickup',
      entries: [
        'Gear reset • spare lav battery',
        'B-roll • bag, gloves, cleanup line',
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
      { x: '31%', y: '42%', label: 'edit scene' },
      { x: '78%', y: '45%', label: 'review scene stack' },
    ],
    storyboard: [
      { x: '80%', y: '16%', label: 'open storyboard' },
      { x: '34%', y: '39%', label: 'review shot card' },
      { x: '77%', y: '48%', label: 'check shot table' },
    ],
    plan: [
      { x: '83%', y: '16%', label: 'open production plan' },
      { x: '21%', y: '33%', label: 'scan stats' },
      { x: '63%', y: '40%', label: 'group by location' },
    ],
  }

  return (
    <SceneShell caption="Planner workspace -> Scene editor / Shot storyboard / Production plan">
      <div className="space-y-4">
        <Stage animate={animate} delay={100} className="relative rounded-[26px] border border-[rgba(17,17,17,0.08)] bg-[linear-gradient(180deg,#fcfcfb,#f4f4f1)] p-3 shadow-[0_18px_48px_rgba(17,17,17,0.08)]">
          <FlowCursor stops={flowStopsByPreview[activePreview]} animate={animate} progress={progress} />
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

            <div key={activePreview} className={cn('mt-3 min-w-0', animate && 'ft-panel-enter')}>
              {activePreview === 'editor' ? (
                <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_260px]">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {['Overview', 'Production', 'Shots', 'Notes'].map(tab => (
                        <span
                          key={tab}
                          className={cn(
                            'rounded-full px-3 py-1.5 text-[11px] font-medium',
                            tab === 'Overview'
                              ? 'bg-[rgba(71,85,105,0.12)] text-[var(--slate)]'
                              : 'border border-[var(--border-raw)] bg-white text-[var(--text-2)]'
                          )}
                        >
                          {tab}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {fields.map(([label, value], idx) => (
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
                        ['Lighting notes', 'Natural light back to water. Bounce card on face.'],
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
                    <div className="rounded-[18px] border border-[rgba(13,148,136,0.14)] bg-[rgba(13,148,136,0.06)] px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">AI chat handoff</div>
                      <div className="mt-1 text-sm font-semibold text-[var(--text)]">Generate shot list for this scene</div>
                      <div className="mt-2 text-xs leading-relaxed text-[var(--text-2)]">
                        If the shots tab is empty, Coopr can fill it from the approved dialogue and the production notes.
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {activePreview === 'storyboard' ? (
                <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_280px]">
                  <div className="space-y-2">
                    {shots.map(shot => (
                      <div key={shot.step} className="overflow-hidden rounded-[22px] border border-[var(--border-light)] bg-[var(--bg)]">
                        <div className="grid gap-0 sm:grid-cols-[1.2fr_0.8fr]">
                          <div className="border-b border-[var(--border-light)] px-4 py-4 sm:border-b-0 sm:border-r">
                            <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Shot {shot.step}</div>
                            <div className="mt-1 text-lg font-semibold tracking-[-0.03em] text-[var(--text)]">{shot.title}</div>
                            <div className="mt-3 text-sm leading-relaxed text-[var(--text-2)]">{shot.note}</div>
                          </div>
                          <div className="flex items-center justify-center px-4 py-4">
                            <div className="h-28 w-full max-w-[180px] rounded-[20px] border border-white/70" style={{ background: `linear-gradient(135deg, ${shot.accent}, rgba(17,17,17,0.08))` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-[18px] border border-[var(--border-light)] bg-white px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Shot table</div>
                      <div className="mt-2 space-y-2">
                        {[
                          ['1', 'talking_head', 'trash bag enters frame'],
                          ['2', 'close_up', 'macro proof cut'],
                          ['3', 'wide_shot', 'cleanup payoff'],
                        ].map(([num, type, cue]) => (
                          <div key={num} className="grid grid-cols-[22px_96px_1fr] gap-2 rounded-[14px] bg-[var(--bg)] px-3 py-2 text-xs">
                            <div className="font-mono text-[var(--text-3)]">{num}</div>
                            <div className="text-[var(--text)]">{type}</div>
                            <div className="text-[var(--text-2)]">{cue}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[18px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Storyboard prompt</div>
                      <div className="mt-2 text-xs leading-relaxed text-[var(--text-2)]">
                        Generate a detailed shot list from the approved script. Include angle, visual action, prop, and text overlay guidance.
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {activePreview === 'plan' ? (
                <div className="grid gap-3 xl:grid-cols-[220px_minmax(0,1fr)]">
                  <div className="space-y-2">
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
                  <div className="space-y-2">
                    <div className="rounded-[18px] border border-[var(--border-light)] bg-white px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Shoot day plan by location</div>
                      <div className="mt-2 space-y-3">
                        {planGroups.map(group => (
                          <div key={group.location}>
                            <div className="text-sm font-semibold text-[var(--text)]">{group.location}</div>
                            <div className="mt-2 space-y-2">
                              {group.entries.map(entry => (
                                <div key={entry} className="rounded-[14px] bg-[var(--bg)] px-3 py-2 text-xs text-[var(--text-2)]">
                                  {entry}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="rounded-[18px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Equipment checklist</div>
                        <div className="mt-2 space-y-1 text-xs text-[var(--text)]">
                          {['Lav mic', 'Backup recorder', 'Wide lens', 'Gloves', 'Dry towel'].map(item => (
                            <div key={item}>□ {item}</div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[18px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Production notes</div>
                        <div className="mt-2 space-y-2 text-xs leading-relaxed text-[var(--text-2)]">
                          <div>Text overlay on shot 2: “1 month later”.</div>
                          <div>Pause after the opener before the proof cut.</div>
                          <div>Return to this draft after filming for edit notes.</div>
                        </div>
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
  const heatmap = [
    [1, 2, 3, 2, 1, 0, 0],
    [2, 3, 3, 2, 2, 1, 0],
    [1, 2, 3, 3, 2, 1, 0],
    [0, 1, 2, 3, 2, 1, 0],
  ]
  const posts = [
    ['Tue', '7:12p', 'good'],
    ['Thu', '8:10p', 'best'],
    ['Sat', '5:45p', 'crowded'],
  ] as const
  const flowStops: CursorStop[] = [
    { x: '28%', y: '44%', label: 'scan heatmap' },
    { x: '76%', y: '27%', label: 'lock slot' },
    { x: '76%', y: '72%', label: 'review schedule' },
  ]

  return (
    <SceneShell caption="Cadence workspace -> slot recommendation">
      <Stage animate={animate} delay={100} className="relative rounded-[26px] border border-[rgba(17,17,17,0.08)] bg-[linear-gradient(180deg,#fffaf4,#f4f4f1)] p-3 shadow-[0_18px_48px_rgba(17,17,17,0.08)]">
        <FlowCursor stops={flowStops} animate={animate} progress={progress} />
        <div className="rounded-[22px] border border-[rgba(17,17,17,0.06)] bg-white p-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-light)] pb-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-3)]">Cadence</div>
              <div className="mt-1 text-sm font-semibold text-[var(--text)]">Cleanup myth reel • ready to ship</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Audience', 'Crowding', 'Schedule'].map(tab => (
                <span
                  key={tab}
                  className={cn(
                    'rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]',
                    tab === 'Schedule' ? 'bg-[rgba(217,119,6,0.12)] text-[var(--amber)]' : 'bg-[var(--bg)] text-[var(--text-3)]'
                  )}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.02fr)_330px]">
            <div className="space-y-3">
              <div className="rounded-[20px] border border-[rgba(217,119,6,0.16)] bg-[rgba(217,119,6,0.06)] px-3 py-3">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Audience activity heatmap</div>
                    <div className="mt-1 text-sm text-[var(--text-2)]">Best windows after accounting for crowding</div>
                  </div>
                  <div className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-[var(--amber)]">PST</div>
                </div>
                <div className="grid grid-cols-[52px_repeat(7,minmax(0,1fr))] gap-2 text-center">
                  <div />
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-3)]">{day}</div>
                  ))}
                  {heatmap.map((row, rowIdx) => (
                    <Fragment key={`row-${rowIdx}`}>
                      <div className="flex items-center text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-3)]">
                        {['6p', '7p', '8p', '9p'][rowIdx]}
                      </div>
                      {row.map((value, colIdx) => (
                        <div
                          key={`${rowIdx}-${colIdx}`}
                          className={cn(
                            'ft-heat-cell h-12 rounded-[16px] border border-white/60',
                            value === 3 && 'ft-heat-cell--hot',
                            value === 2 && 'ft-heat-cell--warm',
                            value <= 1 && 'ft-heat-cell--cool'
                          )}
                        />
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Queue note</div>
                <div className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">
                  This post can go out Thursday night without colliding with the two recent cleanup explainers already sitting in the niche feed.
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" className="rounded-full border border-[rgba(217,119,6,0.16)] bg-white px-3 py-2 text-xs font-medium text-[var(--amber)]">
                    Schedule post
                  </button>
                  <button type="button" className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-2 text-xs font-medium text-[var(--text-2)]">
                    Hold for Friday
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="rounded-[20px] border border-[rgba(217,119,6,0.18)] bg-[rgba(217,119,6,0.06)] px-3 py-3 shadow-[0_16px_40px_rgba(217,119,6,0.08)]">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Recommended slot</div>
                <div className="mt-2 text-[30px] font-display font-extrabold leading-none tracking-[-0.04em] text-[var(--text)]">Thu 8:10 PM</div>
                <div className="mt-2 text-sm text-[var(--text-2)]">Your audience is peaking, competitor overlap is low, and your pace stays sustainable.</div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    ['Audience', 'High'],
                    ['Crowding', 'Low'],
                    ['Cadence', 'On pace'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[16px] bg-white px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                      <div className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-[var(--border-light)] bg-[var(--bg)] px-3 py-3">
                <div className="mb-3 text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">Recent schedule decisions</div>
                <div className="space-y-2">
                  {posts.map(([day, time, state]) => (
                    <div key={`${day}-${time}`} className="flex items-center justify-between rounded-[16px] bg-white px-3 py-3 text-sm">
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
