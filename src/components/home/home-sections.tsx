import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HOME_WORKFLOW_STEPS } from './home-data'
import { IconBadge } from '@/components/shared/ProductPrimitives'
import Iridescence from './Iridescence'

type WorkflowKey = typeof HOME_WORKFLOW_STEPS[number]['key']

function getWorkflowWash(key: WorkflowKey) {
  if (key === 'discover') return 'radial-gradient(circle at 82% 18%, rgba(13,148,136,0.12), transparent 34%), radial-gradient(circle at 16% 84%, rgba(13,148,136,0.08), transparent 30%)'
  if (key === 'script') return 'radial-gradient(circle at 82% 18%, rgba(37,99,235,0.12), transparent 34%), radial-gradient(circle at 16% 84%, rgba(37,99,235,0.08), transparent 30%)'
  if (key === 'planner') return 'radial-gradient(circle at 82% 18%, rgba(71,85,105,0.12), transparent 34%), radial-gradient(circle at 16% 84%, rgba(71,85,105,0.08), transparent 30%)'
  return 'radial-gradient(circle at 82% 18%, rgba(217,119,6,0.14), transparent 34%), radial-gradient(circle at 16% 84%, rgba(217,119,6,0.08), transparent 30%)'
}

function DiscoverPreview() {
  return (
    <div className="grid gap-3 sm:grid-cols-[0.88fr_1.12fr]">
      <div className="rounded-[22px] border border-[var(--border-light)] bg-white p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--teal)]">tracked feed</div>
        <div className="mt-3 space-y-2">
          {[
            ['Wild Lens Daily', '+24%'],
            ['Ocean Almanac', '+18%'],
          ].map(([name, lift], idx) => (
            <div key={name} className={cn('rounded-[16px] px-3 py-3', idx === 0 ? 'bg-[rgba(13,148,136,0.08)]' : 'bg-[var(--bg)]')}>
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-[var(--text)]">{name}</div>
                <div className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-[var(--teal)]">{lift}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[22px] border border-[rgba(13,148,136,0.14)] bg-[linear-gradient(180deg,rgba(13,148,136,0.08),rgba(255,255,255,1))] p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">selected opportunity</div>
        <div className="mt-3 text-[clamp(1.35rem,2vw,1.8rem)] font-display font-extrabold leading-[1.02] tracking-[-0.05em] text-[var(--text)]">
          Myth-busting reef cleanup is accelerating now.
        </div>
        <div className="mt-4 rounded-[18px] bg-white p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-[var(--text-3)]">
            <span>lift</span>
            <span className="font-mono text-[var(--teal)]">+24%</span>
          </div>
          <div className="flex items-end gap-1.5">
            {[28, 42, 36, 54, 70, 82].map((height, idx) => (
              <div key={idx} className="flex-1 rounded-t-[10px] bg-[linear-gradient(180deg,rgba(13,148,136,0.84),rgba(13,148,136,0.18))]" style={{ height: `${height}px` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ScriptPreview() {
  return (
    <div className="grid gap-3 sm:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-3">
        <div className="rounded-[22px] border border-[rgba(37,99,235,0.14)] bg-[linear-gradient(180deg,rgba(37,99,235,0.08),rgba(255,255,255,1))] p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--blue)]">script builder</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {['direct opener', 'proof-first', 'low fluff'].map(trait => (
              <span key={trait} className="rounded-full border border-[rgba(37,99,235,0.12)] bg-white px-3 py-1 text-xs font-medium text-[var(--text-2)]">
                {trait}
              </span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {[
              ['Voice score', '0.86'],
              ['Watch-through', '81%'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[16px] bg-white px-3 py-3">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                <div className="mt-1 font-mono text-[var(--text)]">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[22px] border border-[var(--border-light)] bg-white p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">novelty check</div>
          <div className="mt-3 rounded-[16px] border border-[rgba(22,163,74,0.18)] bg-[rgba(22,163,74,0.08)] px-3 py-3 text-xs text-[var(--green)]">
            Fresh enough to test (1 similar existing)
          </div>
        </div>
      </div>
      <div className="rounded-[22px] border border-[var(--border-light)] bg-white p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">script timeline</div>
        <div className="mt-3 space-y-2 font-mono text-[12px]">
          {[
            ['0s', 'Everyone says reef cleanup does nothing.'],
            ['7s', 'Show the one proof that myth gets wrong.'],
            ['15s', 'Explain why the reef actually responds.'],
            ['22s', 'Land on the visual payoff and next dive CTA.'],
          ].map(([time, cue], idx) => (
            <div key={time} className={cn('grid grid-cols-[34px_1fr] gap-2 rounded-[16px] px-3 py-3', idx < 2 ? 'bg-[rgba(37,99,235,0.06)]' : 'bg-[var(--bg)]')}>
              <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--blue)]">{time}</div>
              <div className="leading-relaxed text-[var(--text)]">{cue}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlannerPreview() {
  return (
    <div className="grid gap-3 sm:grid-cols-[1.02fr_0.98fr]">
      <div className="rounded-[22px] border border-[rgba(71,85,105,0.14)] bg-[linear-gradient(180deg,rgba(71,85,105,0.08),rgba(255,255,255,1))] p-4">
        <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">
          <span className="text-[var(--slate)]">overview</span>
          <span>production</span>
          <span>shots</span>
          <span>notes</span>
        </div>
        <div className="mt-3 space-y-2">
          {[
            ['Script / Dialogue', 'Everyone says reef cleanup does nothing. They are wrong.'],
            ['Location', 'Monterey breakwall'],
            ['Time of Day', 'golden hour'],
            ['Shot Type', 'talking head'],
          ].map(([label, value], idx) => (
            <div key={label} className={cn('rounded-[16px] px-3 py-3', idx === 0 ? 'bg-white' : 'bg-[var(--bg)]')}>
              <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
              <div className="mt-1 text-sm leading-relaxed text-[var(--text)]">{value}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            ['Camera', 'handheld close follow'],
            ['Audio', 'lav + backup recorder'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[16px] bg-white px-3 py-3">
              <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
              <div className="mt-1 text-xs text-[var(--text)]">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-[22px] border border-[var(--border-light)] bg-white p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">shot planner</div>
          <div className="mt-3 space-y-2 text-xs">
            {[
              ['1', 'talking head', 'myth opener'],
              ['2', 'close up', 'proof detail'],
              ['3', 'wide shot', 'cleanup payoff'],
            ].map(([num, shot, cue]) => (
              <div key={num} className="grid grid-cols-[20px_78px_1fr] gap-2 rounded-[16px] bg-[var(--bg)] px-3 py-3 text-[var(--text)]">
                <div className="font-mono text-[var(--text-3)]">{num}</div>
                <div>{shot}</div>
                <div>{cue}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[22px] border border-[var(--border-light)] bg-white p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">shoot day plan</div>
          <div className="mt-3 space-y-2 text-xs text-[var(--text)]">
            <div className="rounded-[16px] bg-[var(--bg)] px-3 py-3">Monterey breakwall • 3 scenes • golden hour</div>
            <div className="rounded-[16px] bg-[var(--bg)] px-3 py-3">Equipment: lav, backup recorder, wide lens</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CadencePreview() {
  const heatmap = [
    [1, 2, 3, 2],
    [2, 3, 3, 2],
    [1, 2, 3, 3],
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_0.92fr]">
      <div className="rounded-[22px] border border-[rgba(217,119,6,0.14)] bg-[linear-gradient(180deg,rgba(217,119,6,0.08),rgba(255,255,255,1))] p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--amber)]">audience heatmap</div>
        <div className="mt-4 grid grid-cols-[42px_repeat(4,minmax(0,1fr))] gap-2 text-center">
          <div />
          {['Tue', 'Wed', 'Thu', 'Fri'].map(day => (
            <div key={day} className="text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-3)]">{day}</div>
          ))}
          {heatmap.map((row, rowIdx) => (
            <div key={`row-${rowIdx}`} className="contents">
              <div className="flex items-center text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-3)]">
                {['7p', '8p', '9p'][rowIdx]}
              </div>
              {row.map((value, colIdx) => (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className={cn(
                    'h-11 rounded-[14px] border border-white/60',
                    value === 3 && 'bg-[linear-gradient(180deg,rgba(217,119,6,0.44),rgba(217,119,6,0.20))]',
                    value === 2 && 'bg-[rgba(217,119,6,0.18)]',
                    value === 1 && 'bg-[rgba(17,17,17,0.06)]',
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[22px] border border-[var(--border-light)] bg-white p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">recommended slot</div>
        <div className="mt-3 text-[clamp(1.35rem,2vw,1.8rem)] font-display font-extrabold leading-[1.02] tracking-[-0.05em] text-[var(--text)]">
          Thu 8:10 PM
        </div>
        <div className="mt-3 space-y-2 text-sm text-[var(--text-2)]">
          {['audience high', 'crowding low'].map(item => (
            <div key={item} className="rounded-[16px] bg-[var(--bg)] px-3 py-3">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WorkflowPreview({ activeKey }: { activeKey: WorkflowKey }) {
  if (activeKey === 'discover') return <DiscoverPreview />
  if (activeKey === 'script') return <ScriptPreview />
  if (activeKey === 'planner') return <PlannerPreview />
  return <CadencePreview />
}

export function HomeHeroSignalField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hm-bg-grid" />
      <Iridescence
        color={[0.05, 0.58, 0.53]}
        speed={0.6}
        amplitude={0.08}
        mouseReact={true}
        style={{ opacity: 'var(--hero-iridescence-opacity, 0.35)' }}
      />
      {/* Film grain overlay — lightweight CSS, no extra WebGL context */}
      <div className="hm-grain-overlay" />
    </div>
  )
}

export function HomeWorkflowRail() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = HOME_WORKFLOW_STEPS[activeIndex]

  return (
    <section className="mx-auto max-w-[1060px] px-6 pb-16 pt-2">
      <div className="rounded-[34px] border border-[var(--border-light)] bg-white/92 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-6">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
          <div className="text-left">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-3)]">Core workflow</div>
            <div className="mt-2 max-w-[420px] text-[15px] leading-relaxed text-[var(--text-2)]">
              One clean view of the production path. The homepage shows the core moves. The deeper tour lives on `/features`.
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {HOME_WORKFLOW_STEPS.map((step, idx) => {
                const active = idx === activeIndex
                return (
                  <button
                    key={step.key}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                      active ? 'bg-white shadow-[0_8px_18px_rgba(15,23,42,0.05)]' : 'bg-[var(--bg)] text-[var(--text-2)]',
                    )}
                    style={{ borderColor: active ? step.accent : 'var(--border-raw)', color: active ? step.accent : undefined }}
                  >
                    {step.label}
                  </button>
                )
              })}
            </div>

            <div key={activeStep.key} className="hm-panel-enter mt-6">
              <div className="flex items-center gap-3">
                <IconBadge Icon={activeStep.Icon} accent={activeStep.accent} accentSoft={activeStep.accentSoft} />
                <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: activeStep.accent }}>
                  {activeStep.label}
                </div>
              </div>
              <h2 className="mt-4 max-w-[440px] text-[clamp(2rem,3vw,2.8rem)] font-display font-extrabold leading-[0.98] tracking-[-0.05em] text-[var(--text)]">
                {activeStep.title}
              </h2>
              <p className="mt-3 max-w-[430px] text-[15px] leading-relaxed text-[var(--text-2)]">
                {activeStep.note}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {activeStep.chips.map(chip => (
                  <span key={chip} className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--text-2)]">
                    {chip}
                  </span>
                ))}
              </div>
              <a href="#/features" className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-[var(--teal)] no-underline transition-all duration-200 hover:gap-3">
                See the full tour
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] border border-[var(--border-light)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,250,249,0.88))] p-4 sm:p-5">
            <div className="hm-stage-wash" style={{ background: getWorkflowWash(activeStep.key) }} />
            <div key={activeStep.key} className="hm-panel-enter relative z-10">
              <WorkflowPreview activeKey={activeStep.key} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
