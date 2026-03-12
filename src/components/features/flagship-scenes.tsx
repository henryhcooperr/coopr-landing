import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { FlagshipStepKey } from './flagship-data'

interface FlagshipSceneProps {
  stepKey: FlagshipStepKey
  animate: boolean
}

interface StageProps {
  children: ReactNode
  className?: string
  animate: boolean
  delay?: number
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

function DiscoverScene({ animate }: Omit<FlagshipSceneProps, 'stepKey'>) {
  const competitors = [
    { name: 'Ocean Almanac', hook: 'Debunking reef myths', lift: '+18%', active: false },
    { name: 'Wild Lens Daily', hook: 'Cleanup before/after reveal', lift: '+24%', active: true },
    { name: 'Blue Planet Notes', hook: 'Fast fact carousel reel', lift: '+11%', active: false },
  ]
  const bars = [62, 84, 58, 76, 93, 71]

  return (
    <SceneShell caption="Competitor Intelligence + Trend Radar">
      <div className="grid gap-4 lg:grid-cols-[0.94fr_1.06fr]">
        <Stage animate={animate} delay={120} className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg)]/90 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Competitor feed</div>
              <div className="mt-1 text-sm text-[var(--text-2)]">New hooks moving in your niche</div>
            </div>
            <div className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-[var(--teal)]">3 tracked</div>
          </div>
          <div className="space-y-2">
            {competitors.map(competitor => (
              <div
                key={competitor.name}
                className={cn(
                  'rounded-[18px] border px-3 py-3 transition-all',
                  competitor.active
                    ? 'border-[rgba(13,148,136,0.26)] bg-white shadow-[0_10px_30px_rgba(13,148,136,0.10)]'
                    : 'border-transparent bg-white/70'
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-[var(--text)]">{competitor.name}</div>
                    <div className="mt-1 text-xs text-[var(--text-3)]">{competitor.hook}</div>
                  </div>
                  <div className={cn(
                    'rounded-full px-2.5 py-1 font-mono text-[10px]',
                    competitor.active ? 'bg-[rgba(13,148,136,0.12)] text-[var(--teal)]' : 'bg-[var(--bg)] text-[var(--text-3)]'
                  )}>
                    {competitor.lift}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Stage>

        <div className="grid gap-4">
          <Stage animate={animate} delay={240} className="rounded-[24px] border border-[rgba(13,148,136,0.16)] bg-white p-4 shadow-[0_18px_50px_rgba(13,148,136,0.08)]">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Opportunity selected</div>
                <div className="mt-2 max-w-[280px] text-xl font-display font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--text)]">
                  Myth-busting reef cleanup is accelerating now.
                </div>
              </div>
              <div className="rounded-[20px] bg-[rgba(13,148,136,0.08)] px-3 py-2 text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-3)]">Lift</div>
                <div className="text-2xl font-display font-extrabold tracking-[-0.04em] text-[var(--teal)]">+24%</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ['Trend confidence', '0.87'],
                ['Comp overlap', 'Low'],
                ['Best angle', 'Reveal + proof'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[18px] bg-[var(--bg)] p-3">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                  <div className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</div>
                </div>
              ))}
            </div>
          </Stage>

          <Stage animate={animate} delay={340} className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg)] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Signal comparison</div>
              <div className="font-mono text-[10px] text-[var(--text-3)]">7-day normalized score</div>
            </div>
            <div className="flex items-end gap-2">
              {bars.map((value, idx) => (
                <div key={idx} className="flex-1">
                  <div className="ft-graph-bar rounded-t-[14px] bg-[linear-gradient(180deg,rgba(13,148,136,0.85),rgba(13,148,136,0.18))]" style={{ ['--ft-bar-height' as string]: `${value}%` } as CSSProperties} />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">
              <span>Competitors</span>
              <span>Your backlog</span>
            </div>
          </Stage>
        </div>
      </div>
    </SceneShell>
  )
}

function DnaScene({ animate }: Omit<FlagshipSceneProps, 'stepKey'>) {
  const traits = ['direct opener', 'field footage', 'proof-first', 'warm authority', 'low fluff']
  const concepts = [
    { title: 'The reef cleanup myth people still repeat', fit: '97% fit', active: true },
    { title: 'A polished cinematic montage with voiceover poetry', fit: '42% fit', active: false },
    { title: 'Show the mess, then the single proof everyone remembers', fit: '91% fit', active: false },
  ]

  return (
    <SceneShell caption="Creative DNA + voice profile">
      <div className="grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
        <Stage animate={animate} delay={100} className="rounded-[24px] border border-[rgba(71,85,105,0.16)] bg-[linear-gradient(180deg,rgba(71,85,105,0.08),rgba(255,255,255,1))] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Creator DNA</div>
              <div className="mt-1 text-sm text-[var(--text-2)]">What your audience already recognizes as yours</div>
            </div>
            <div className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-[var(--slate)]">updated daily</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {traits.map(trait => (
              <span key={trait} className="rounded-full border border-[rgba(71,85,105,0.18)] bg-white px-3 py-1 text-xs font-medium text-[var(--text-2)]">
                {trait}
              </span>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {[
              ['Voice match', 92],
              ['Visual consistency', 88],
              ['Trust pattern', 95],
            ].map(([label, score]) => (
              <div key={label as string}>
                <div className="mb-1 flex items-center justify-between text-xs text-[var(--text-2)]">
                  <span>{label}</span>
                  <span className="font-mono">{score}%</span>
                </div>
                <div className="h-2 rounded-full bg-[rgba(71,85,105,0.08)]">
                  <div className={cn('ft-progress-fill h-full rounded-full bg-[linear-gradient(90deg,var(--slate),#94a3b8)]', animate && 'ft-progress-fill--animate')} style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Stage>

        <div className="grid gap-4">
          <Stage animate={animate} delay={220} className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg)] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Concept filter</div>
              <div className="font-mono text-[10px] text-[var(--text-3)]">keeping what sounds like you</div>
            </div>
            <div className="space-y-3">
              {concepts.map(concept => (
                <div
                  key={concept.title}
                  className={cn(
                    'rounded-[20px] border px-3 py-3',
                    concept.active
                      ? 'border-[rgba(71,85,105,0.26)] bg-white shadow-[0_12px_30px_rgba(71,85,105,0.10)]'
                      : 'border-transparent bg-white/70'
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="max-w-[290px] text-sm font-semibold leading-snug text-[var(--text)]">{concept.title}</div>
                    <div className={cn(
                      'rounded-full px-2.5 py-1 font-mono text-[10px]',
                      concept.active ? 'bg-[rgba(71,85,105,0.12)] text-[var(--slate)]' : 'bg-white text-[var(--text-3)]'
                    )}>
                      {concept.fit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Stage>

        </div>
      </div>
    </SceneShell>
  )
}

function GenerateScene({ animate }: Omit<FlagshipSceneProps, 'stepKey'>) {
  const hooks = [
    { title: 'Everyone says reef cleanup is pointless. They are wrong.', score: 91, hold: 84, active: true },
    { title: 'Watch what changed after one hour underwater with this team.', score: 86, hold: 79, active: false },
    { title: 'The part of reef restoration most people never see first.', score: 79, hold: 73, active: false },
  ]

  return (
    <SceneShell caption="Hook Lab + scoring proof">
      <div className="space-y-4">
        <Stage animate={animate} delay={70} className="rounded-[24px] border border-[rgba(22,163,74,0.16)] bg-[linear-gradient(180deg,rgba(22,163,74,0.08),rgba(255,255,255,1))] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Hook Lab prompt</div>
              <div className="mt-1 text-sm text-[var(--text-2)]">Generated from your DNA plus the selected opportunity</div>
            </div>
            <div className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-[var(--green)]">predicting hold</div>
          </div>
          <div className="mt-4 rounded-[18px] border border-[var(--border-light)] bg-white px-4 py-3 font-mono text-[13px] text-[var(--text)]">
            <div className={cn('ft-type-line', !animate && 'ft-type-line--static')} style={{ ['--ft-chars' as string]: '55ch' } as CSSProperties}>
              make strangers care about reef cleanup in 1 second
            </div>
          </div>
        </Stage>

        <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
          <Stage animate={animate} delay={180} className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg)] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Ranked hooks</div>
              <div className="font-mono text-[10px] text-[var(--text-3)]">47 videos + 3 niche shifts</div>
            </div>
            <div className="space-y-3">
              {hooks.map(hook => (
                <div
                  key={hook.title}
                  className={cn(
                    'rounded-[22px] border px-4 py-4 transition-all',
                    hook.active
                      ? 'border-[rgba(22,163,74,0.26)] bg-white shadow-[0_16px_40px_rgba(22,163,74,0.12)]'
                      : 'border-transparent bg-white/80'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="max-w-[320px] text-[15px] font-semibold leading-snug text-[var(--text)]">{hook.title}</div>
                    <div className={cn(
                      'rounded-full px-2.5 py-1 font-mono text-[10px]',
                      hook.active ? 'bg-[rgba(22,163,74,0.12)] text-[var(--green)]' : 'bg-[var(--bg)] text-[var(--text-3)]'
                    )}>
                      {hook.score} score
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-[var(--text-2)]">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span>Predicted hold</span>
                        <span className="font-mono">{hook.hold}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[rgba(22,163,74,0.08)]">
                        <div className={cn('ft-progress-fill h-full rounded-full bg-[linear-gradient(90deg,var(--green),#4ade80)]', animate && 'ft-progress-fill--animate')} style={{ width: `${hook.hold}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span>Voice fit</span>
                        <span className="font-mono">{Math.min(hook.score + 4, 98)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[rgba(13,148,136,0.08)]">
                        <div className={cn('ft-progress-fill h-full rounded-full bg-[linear-gradient(90deg,var(--teal),#2dd4bf)]', animate && 'ft-progress-fill--animate')} style={{ width: `${Math.min(hook.score + 4, 98)}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Stage>

          <div className="grid gap-4">
            <Stage animate={animate} delay={280} className="rounded-[24px] border border-[rgba(22,163,74,0.16)] bg-white p-4 shadow-[0_16px_44px_rgba(22,163,74,0.08)]">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Top pick</div>
              <div className="mt-2 text-[26px] font-display font-extrabold leading-[0.98] tracking-[-0.04em] text-[var(--text)]">
                84% predicted hold
              </div>
              <div className="mt-2 text-sm text-[var(--text-2)]">Strong curiosity gap, clear proof promise, and high alignment with your direct tone.</div>
              <div className="mt-4 space-y-3">
                {[
                  ['Curiosity gap', 92],
                  ['Pattern interrupt', 86],
                  ['Trend alignment', 74],
                ].map(([label, value], idx) => (
                  <div key={label as string}>
                    <div className="mb-1 flex items-center justify-between text-xs text-[var(--text-2)]">
                      <span>{label}</span>
                      <span className="font-mono">{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--bg)]">
                      <div
                        className={cn(
                          'ft-progress-fill h-full rounded-full',
                          idx < 2 ? 'bg-[linear-gradient(90deg,var(--green),#4ade80)]' : 'bg-[linear-gradient(90deg,var(--amber),#fbbf24)]',
                          animate && 'ft-progress-fill--animate'
                        )}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Stage>

          </div>
        </div>
      </div>
    </SceneShell>
  )
}

function CadenceScene({ animate }: Omit<FlagshipSceneProps, 'stepKey'>) {
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

  return (
    <SceneShell caption="Cadence Engine recommendation">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.92fr]">
        <Stage animate={animate} delay={90} className="rounded-[24px] border border-[rgba(217,119,6,0.16)] bg-[linear-gradient(180deg,rgba(217,119,6,0.08),rgba(255,255,255,1))] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Audience activity heatmap</div>
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
        </Stage>

        <div className="grid gap-4">
          <Stage animate={animate} delay={210} className="rounded-[24px] border border-[rgba(217,119,6,0.16)] bg-white p-4 shadow-[0_16px_44px_rgba(217,119,6,0.10)]">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Recommended slot</div>
            <div className="mt-2 text-[28px] font-display font-extrabold leading-none tracking-[-0.04em] text-[var(--text)]">Thu 8:10 PM</div>
            <div className="mt-2 text-sm text-[var(--text-2)]">Your audience is peaking, competitor overlap is low, and your pace stays sustainable.</div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ['Audience', 'High'],
                ['Crowding', 'Low'],
                ['Cadence', 'On pace'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[18px] bg-[rgba(217,119,6,0.08)] p-3">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                  <div className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</div>
                </div>
              ))}
            </div>
          </Stage>

          <Stage animate={animate} delay={320} className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg)] p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">Recent schedule decisions</div>
            <div className="space-y-2">
              {posts.map(([day, time, state]) => (
                <div key={`${day}-${time}`} className="flex items-center justify-between rounded-[18px] bg-white px-3 py-3 text-sm">
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
          </Stage>
        </div>
      </div>
    </SceneShell>
  )
}

export function FlagshipScene({ stepKey, animate }: FlagshipSceneProps) {
  if (stepKey === 'discover') return <DiscoverScene animate={animate} />
  if (stepKey === 'dna') return <DnaScene animate={animate} />
  if (stepKey === 'generate') return <GenerateScene animate={animate} />
  return <CadenceScene animate={animate} />
}
