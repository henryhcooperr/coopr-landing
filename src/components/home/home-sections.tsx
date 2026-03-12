import { useState } from 'react'
import { ArrowLeft, ArrowRight, BarChart3, Radar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HOME_SURFACE_CARDS, HOME_WORKFLOW_STEPS } from './home-data'
import { ShortFormPhoneMock, StoryboardShotTile } from '@/components/shared/ShortFormMocks'
import { IconBadge, StatusPill } from '@/components/shared/ProductPrimitives'

type WorkflowKey = typeof HOME_WORKFLOW_STEPS[number]['key']

type SurfaceCardKey = typeof HOME_SURFACE_CARDS[number]['key']

function getWorkflowBullets(key: WorkflowKey) {
  if (key === 'discover') return ['competitor shifts', 'trend lift', 'signal confidence']
  if (key === 'plan') return ['shot storyboard', 'session brief', 'mobile-safe notes']
  if (key === 'edit') return ['portrait preview', 'beat order', 'caption safe zone']
  return ['past post', 'drop-off review', 'next fix']
}

function getWorkflowWash(key: WorkflowKey) {
  if (key === 'discover') return 'radial-gradient(circle at 82% 18%, rgba(13,148,136,0.14), transparent 32%), radial-gradient(circle at 12% 86%, rgba(13,148,136,0.10), transparent 28%)'
  if (key === 'plan') return 'radial-gradient(circle at 82% 18%, rgba(37,99,235,0.14), transparent 32%), radial-gradient(circle at 12% 86%, rgba(37,99,235,0.10), transparent 28%)'
  if (key === 'edit') return 'radial-gradient(circle at 82% 18%, rgba(37,99,235,0.14), transparent 32%), radial-gradient(circle at 12% 86%, rgba(71,85,105,0.10), transparent 28%)'
  return 'radial-gradient(circle at 82% 18%, rgba(217,119,6,0.16), transparent 32%), radial-gradient(circle at 12% 86%, rgba(217,119,6,0.10), transparent 28%)'
}

function getNextIndex(index: number, length: number, direction: 1 | -1) {
  return (index + direction + length) % length
}

function DiscoverPreview() {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[26px] border border-[rgba(13,148,136,0.14)] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--teal)]">competitor feed</div>
            <div className="mt-2 text-sm text-[var(--text-2)]">Hooks moving now in your niche</div>
          </div>
          <Radar size={16} className="text-[var(--teal)]" />
        </div>
        <div className="mt-4 space-y-2">
          {[
            ['Wild Lens Daily', 'cleanup before/after reveal', '+24%', true],
            ['Ocean Almanac', 'myth-busting opener', '+18%', false],
            ['Blue Planet Notes', 'fast fact reel', '+11%', false],
          ].map(([name, hook, lift, active]) => (
            <div
              key={name}
              className={cn(
                'rounded-[20px] border px-3 py-3',
                active ? 'border-[rgba(13,148,136,0.22)] bg-[rgba(13,148,136,0.06)] shadow-[0_10px_24px_rgba(13,148,136,0.08)]' : 'border-transparent bg-[var(--bg)]',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-[var(--text)]">{name}</div>
                  <div className="mt-1 text-xs text-[var(--text-3)]">{hook}</div>
                </div>
                <span className={cn('rounded-full px-2.5 py-1 font-mono text-[10px]', active ? 'bg-white text-[var(--teal)]' : 'bg-white text-[var(--text-3)]')}>
                  {lift}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[26px] border border-[rgba(13,148,136,0.14)] bg-[linear-gradient(180deg,rgba(13,148,136,0.08),rgba(255,255,255,1))] p-5 shadow-[0_16px_34px_rgba(13,148,136,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">selected opportunity</div>
            <div className="mt-3 text-[clamp(1.8rem,3vw,2.4rem)] font-display font-extrabold leading-[0.98] tracking-[-0.05em] text-[var(--text)]">
              Myth-busting reef cleanup is accelerating now.
            </div>
          </div>
          <div className="rounded-[18px] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-3)]">lift</div>
            <div className="mt-1 text-xl font-display font-extrabold tracking-[-0.04em] text-[var(--teal)]">+24%</div>
          </div>
        </div>
        <div className="mt-5 rounded-[22px] bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
          <div className="mb-3 flex items-center justify-between text-xs text-[var(--text-3)]">
            <span>signal comparison</span>
            <span className="font-mono">7 days</span>
          </div>
          <div className="flex items-end gap-2">
            {[38, 56, 52, 71, 84, 96, 82].map((height, idx) => (
              <div key={idx} className="flex-1 rounded-t-[14px] bg-[linear-gradient(180deg,rgba(13,148,136,0.88),rgba(13,148,136,0.18))]" style={{ height: `${height}px` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PlanPreview() {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.94fr_1.06fr]">
      <div className="rounded-[26px] border border-[rgba(37,99,235,0.14)] bg-[linear-gradient(180deg,rgba(37,99,235,0.08),rgba(255,255,255,1))] p-5 shadow-[0_16px_34px_rgba(37,99,235,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">shoot brief</div>
            <div className="mt-3 text-[clamp(1.8rem,3vw,2.4rem)] font-display font-extrabold leading-[0.98] tracking-[-0.05em] text-[var(--text)]">
              Reef cleanup myth-busting shoot
            </div>
          </div>
          <div className="rounded-[18px] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-3)]">ready</div>
            <div className="mt-1 text-xl font-display font-extrabold tracking-[-0.04em] text-[var(--blue)]">12 shots</div>
          </div>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {[
            ['Location', 'lagoon drop-off'],
            ['Gear', 'macro + wide rig'],
            ['Hook frame', 'wave in + myth'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[18px] bg-white px-3 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
              <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
              <div className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-[22px] border border-[var(--border-light)] bg-white p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--blue)]">mobile-safe reminders</div>
          <div className="mt-3 space-y-2 text-sm text-[var(--text-2)]">
            {[
              'keep face and captions away from the action rail zone',
              'capture one clean waving opener for the first second',
              'save the before / after frame for the ending hold',
            ].map(note => (
              <div key={note} className="rounded-[18px] bg-[var(--bg)] px-3 py-3">
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[26px] border border-[var(--border-light)] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--blue)]">shot storyboard</div>
            <div className="mt-2 text-sm text-[var(--text-2)]">The planned reel reads like short-form frames, not a spreadsheet.</div>
          </div>
          <span className="rounded-full bg-[rgba(37,99,235,0.08)] px-2.5 py-1 font-mono text-[10px] text-[var(--blue)]">field-ready</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <StoryboardShotTile step="01" title="Hook" note="creator waves into frame and states the myth" tone="blue" active />
          <StoryboardShotTile step="02" title="Mess" note="show the reef problem before the context lands" tone="slate" />
          <StoryboardShotTile step="03" title="Proof" note="cleanup result arrives early enough to stop the scroll" tone="blue" />
        </div>
      </div>
    </div>
  )
}

function EditPreview() {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[26px] border border-[rgba(37,99,235,0.14)] bg-[linear-gradient(180deg,rgba(37,99,235,0.08),rgba(255,255,255,1))] p-5 shadow-[0_16px_34px_rgba(37,99,235,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">future reel editor</div>
            <div className="mt-2 text-[clamp(1.8rem,3vw,2.4rem)] font-display font-extrabold leading-[0.98] tracking-[-0.05em] text-[var(--text)]">
              Portrait-first editing with the reel and the notes in one view.
            </div>
          </div>
          <StatusPill status="future" futureLabel="concept preview" />
        </div>
        <div className="mt-5 rounded-[24px] border border-[var(--border-light)] bg-[#0f172a] p-4 shadow-[0_14px_30px_rgba(15,23,42,0.16)]">
          <ShortFormPhoneMock
            tone="blue"
            handle="@coopr.creator"
            platformLabel="short-form post"
            caption="Everyone says reef cleanup does nothing."
            cue="proof lands by second 6"
          />
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[26px] border border-[var(--border-light)] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs text-[var(--text-3)]">
            <span className="font-mono uppercase tracking-[0.16em] text-[var(--blue)]">beat order</span>
            <span className="font-mono">portrait-first</span>
          </div>
          <div className="space-y-2">
            {[
              ['01', 'Hook', 'claim + tension in the first line', true],
              ['02', 'Mess', 'show the problem fast', false],
              ['03', 'Proof', 'bring the result forward', false],
              ['04', 'Payoff', 'end on visible change', false],
            ].map(([num, label, note, active]) => (
              <div key={label} className={cn('flex items-center gap-3 rounded-[18px] border px-3 py-3', active ? 'border-[rgba(37,99,235,0.18)] bg-[rgba(37,99,235,0.06)]' : 'border-transparent bg-[var(--bg)]')}>
                <div className={cn('inline-flex h-10 w-10 items-center justify-center rounded-[16px] font-mono text-[11px]', active ? 'bg-[var(--blue)] text-white' : 'bg-white text-[var(--text-3)]')}>
                  {num}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text)]">{label}</div>
                  <div className="text-xs text-[var(--text-3)]">{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {[
            ['trim guidance', 'cut the pause before the proof beat'],
            ['caption safety', 'keep the first line above the bottom metadata strip'],
          ].map(([label, note]) => (
            <div key={label} className="rounded-[22px] border border-[var(--border-light)] bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--blue)]">{label}</div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--text)]">{note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReviewPreview() {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
      <div className="rounded-[26px] border border-[rgba(217,119,6,0.14)] bg-[linear-gradient(180deg,rgba(217,119,6,0.08),rgba(255,255,255,1))] p-5 shadow-[0_16px_34px_rgba(217,119,6,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">past post review</div>
            <div className="mt-2 text-[clamp(1.8rem,3vw,2.4rem)] font-display font-extrabold leading-[0.98] tracking-[-0.05em] text-[var(--text)]">
              Reopen the reel and see why viewers left before the proof landed.
            </div>
          </div>
          <div className="rounded-[18px] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-3)]">drop-off</div>
            <div className="mt-1 text-xl font-display font-extrabold tracking-[-0.04em] text-[var(--amber)]">18s</div>
          </div>
        </div>
        <div className="mt-5 rounded-[24px] border border-[var(--border-light)] bg-[#0f172a] p-4 shadow-[0_14px_30px_rgba(15,23,42,0.16)]">
          <ShortFormPhoneMock
            tone="amber"
            handle="@coopr.creator"
            platformLabel="past reel"
            caption="I thought the cleanup result would carry the whole post."
            cue="proof arrives too late"
          />
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[26px] border border-[var(--border-light)] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--amber)]">what went wrong</div>
            <BarChart3 size={16} className="text-[var(--amber)]" />
          </div>
          <div className="mt-4 overflow-hidden rounded-[18px] bg-[rgba(217,119,6,0.08)] p-2">
            <svg viewBox="0 0 320 120" className="w-full" aria-hidden="true">
              <path d="M6 18 C 54 22, 86 28, 116 42 S 184 72, 214 76 S 274 90, 314 102" fill="none" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" />
              <circle cx="214" cy="76" r="7" fill="white" stroke="var(--amber)" strokeWidth="3" />
            </svg>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ['Hook clarity', 'too soft for the first second'],
              ['Proof timing', 'evidence arrives after interest dips'],
              ['Pacing', 'stall between setup and result'],
            ].map(([label, note]) => (
              <div key={label} className="rounded-[18px] bg-[var(--bg)] px-3 py-3">
                <div className="text-sm font-semibold text-[var(--text)]">{label}</div>
                <div className="mt-1 text-xs leading-relaxed text-[var(--text-3)]">{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[26px] border border-[var(--border-light)] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--amber)]">next actions</div>
          <div className="mt-3 space-y-2 text-sm text-[var(--text-2)]">
            {[
              'open on the cleanup result instead of the premise',
              'move the proof beat eight seconds earlier',
              'test the sharper first-line claim in Hook Lab',
            ].map(note => (
              <div key={note} className="rounded-[18px] bg-[var(--bg)] px-3 py-3">
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function WorkflowPreview({ activeKey }: { activeKey: WorkflowKey }) {
  if (activeKey === 'discover') return <DiscoverPreview />
  if (activeKey === 'plan') return <PlanPreview />
  if (activeKey === 'edit') return <EditPreview />
  return <ReviewPreview />
}

function DockVisual({ cardKey }: { cardKey: SurfaceCardKey }) {
  if (cardKey === 'discover') {
    return (
      <div className="grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[20px] border border-[var(--border-light)] bg-white p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--teal)]">trend lift</div>
          <div className="mt-3 text-3xl font-display font-extrabold tracking-[-0.05em] text-[var(--text)]">+24%</div>
          <div className="mt-2 text-sm text-[var(--text-2)]">cleanup myth spiking this week</div>
        </div>
        <div className="rounded-[20px] border border-[var(--border-light)] bg-white p-4">
          <div className="mb-3 flex items-center justify-between text-xs text-[var(--text-3)]">
            <span>signal view</span>
            <span className="font-mono">7-day</span>
          </div>
          <div className="flex items-end gap-2">
            {[30, 48, 43, 61, 76, 92].map((height, idx) => (
              <div key={idx} className="flex-1 rounded-t-[12px] bg-[linear-gradient(180deg,rgba(13,148,136,0.88),rgba(13,148,136,0.18))]" style={{ height: `${height}px` }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (cardKey === 'shoot') {
    return (
      <div className="grid gap-3 md:grid-cols-3">
        <StoryboardShotTile step="01" title="Hook" note="wave in and state the myth" tone="blue" active />
        <StoryboardShotTile step="02" title="Mess" note="show the reef problem fast" tone="slate" />
        <StoryboardShotTile step="03" title="Proof" note="cleanup result before the explanation" tone="blue" />
      </div>
    )
  }

  if (cardKey === 'editor') {
    return (
      <div className="grid gap-4 md:grid-cols-[0.78fr_1.22fr] md:items-center">
        <ShortFormPhoneMock
          compact
          tone="blue"
          handle="@coopr.creator"
          platformLabel="future reel"
          caption="Everyone says reef cleanup does nothing."
          cue="proof by second 6"
        />
        <div className="space-y-2">
          {[
            ['01', 'Hook'],
            ['02', 'Mess'],
            ['03', 'Proof'],
            ['04', 'Payoff'],
          ].map(([step, label], idx) => (
            <div key={label} className={cn('flex items-center gap-3 rounded-[18px] px-3 py-3', idx === 0 ? 'bg-[rgba(37,99,235,0.08)]' : 'bg-white')}>
              <div className={cn('inline-flex h-9 w-9 items-center justify-center rounded-[14px] font-mono text-[11px]', idx === 0 ? 'bg-[var(--blue)] text-white' : 'bg-[var(--bg)] text-[var(--text-3)]')}>
                {step}
              </div>
              <div className="text-sm font-semibold text-[var(--text)]">{label}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
      <ShortFormPhoneMock
        compact
        tone="amber"
        handle="@coopr.creator"
        platformLabel="past reel"
        caption="The proof landed too late to hold the scroll."
        cue="drop-off starts at 18s"
      />
      <div className="space-y-2">
        {[
          ['weak hook proof'],
          ['pacing slows before the result'],
          ['next test: lead with the reveal'],
        ].map(([note]) => (
          <div key={note} className="rounded-[18px] bg-white px-3 py-3 text-sm text-[var(--text-2)]">
            {note}
          </div>
        ))}
      </div>
    </div>
  )
}

export function HomeHeroSignalField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hm-bg-grid" />
      <div className="hm-bg-wash" />
      <div className="hm-bg-orb hm-bg-orb--a" />
      <div className="hm-bg-orb hm-bg-orb--b" />
      <div className="hm-bg-orb hm-bg-orb--c" />
    </div>
  )
}

export function HomeWorkflowRail() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = HOME_WORKFLOW_STEPS[activeIndex]
  const bullets = getWorkflowBullets(activeStep.key)

  const stepBackward = () => setActiveIndex(prev => getNextIndex(prev, HOME_WORKFLOW_STEPS.length, -1))
  const stepForward = () => setActiveIndex(prev => getNextIndex(prev, HOME_WORKFLOW_STEPS.length, 1))

  return (
    <section className="mx-auto max-w-[1120px] px-6 pb-8 pt-2">
      <div className="rounded-[36px] border border-[var(--border-light)] bg-white/92 p-5 shadow-[0_22px_54px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px] text-left">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-3)]">Across the main sections</div>
            <div className="mt-2 text-[15px] leading-relaxed text-[var(--text-2)]">
              The agentic demo proves how Coopr thinks. This section shows where that thinking lands across the creator workflow.
            </div>
          </div>
          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="hidden rounded-full border border-[var(--border-raw)] bg-[var(--bg)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-3)] sm:inline-flex">
              section {activeIndex + 1} of {HOME_WORKFLOW_STEPS.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={stepBackward}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-raw)] bg-white text-[var(--text)] transition-all duration-200 hover:border-[var(--text)]"
                aria-label="Show previous section"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={stepForward}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-raw)] bg-white text-[var(--text)] transition-all duration-200 hover:border-[var(--text)]"
                aria-label="Show next section"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {HOME_WORKFLOW_STEPS.map((step, idx) => {
            const active = idx === activeIndex
            return (
              <button
                key={step.key}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                  active ? 'bg-white shadow-[0_8px_22px_rgba(15,23,42,0.06)]' : 'bg-[var(--bg)] text-[var(--text-2)]',
                )}
                style={{ borderColor: active ? step.accent : 'var(--border-raw)', color: active ? step.accent : undefined }}
              >
                {step.label}
              </button>
            )
          })}
        </div>

        <div className="relative mt-5 overflow-hidden rounded-[32px] border border-[var(--border-light)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,250,249,0.84))] p-5 sm:p-6">
          <div className="hm-stage-wash" style={{ background: getWorkflowWash(activeStep.key) }} />
          <div key={activeStep.key} className="hm-panel-enter relative z-10 grid gap-6 xl:grid-cols-[0.86fr_1.14fr] xl:items-center">
            <div className="text-left">
              <div className="flex items-center gap-3">
                <IconBadge Icon={activeStep.Icon} accent={activeStep.accent} accentSoft={activeStep.accentSoft} />
                <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: activeStep.accent }}>
                  {activeStep.label}
                </div>
              </div>
              <div className="mt-4 text-[clamp(2.1rem,3.2vw,3.25rem)] font-display font-extrabold leading-[0.96] tracking-[-0.05em] text-[var(--text)]">
                {activeStep.title}
              </div>
              <div className="mt-3 max-w-[430px] text-[15px] leading-relaxed text-[var(--text-2)]">
                {activeStep.note}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {bullets.map(bullet => (
                  <span key={bullet} className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--text-2)]">
                    {bullet}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                {HOME_WORKFLOW_STEPS.map((step, idx) => (
                  <span
                    key={step.key}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: idx === activeIndex ? '52px' : '18px',
                      background: idx === activeIndex ? activeStep.accent : 'rgba(17,17,17,0.12)',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-[var(--border-light)] bg-[var(--bg)]/92 p-4 shadow-[0_12px_34px_rgba(15,23,42,0.05)] sm:p-5">
              <WorkflowPreview activeKey={activeStep.key} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeFeatureDock() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCard = HOME_SURFACE_CARDS[activeIndex]

  return (
    <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-2">
      <div className="rounded-[36px] border border-[var(--border-light)] bg-white/92 p-5 shadow-[0_22px_54px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[720px]">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-3)]">Deeper product surfaces</div>
            <h3 className="mt-2 font-display text-[clamp(1.9rem,3vw,2.8rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-[var(--text)]">
              The home page previews the same product language the deeper tour uses.
            </h3>
          </div>
          <a href="#/features" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[var(--teal)] no-underline transition-all duration-200 hover:gap-3">
            Explore the full tour
            <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <a
            key={activeCard.key}
            href={activeCard.href}
            className="hm-panel-enter group relative overflow-hidden rounded-[32px] border border-[var(--border-light)] bg-[var(--bg)] p-5 no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]"
          >
            <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),transparent)]" />
            <div className="absolute right-[-3rem] top-[-3rem] h-40 w-40 rounded-full blur-3xl" style={{ background: activeCard.accentSoft }} />
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <IconBadge Icon={activeCard.Icon} accent={activeCard.accent} accentSoft={activeCard.accentSoft} />
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: activeCard.accent }}>
                    {activeCard.label}
                  </div>
                  <div className="mt-2 text-[clamp(1.9rem,3vw,2.8rem)] font-display font-extrabold leading-[0.98] tracking-[-0.05em] text-[var(--text)]">
                    {activeCard.metric}
                  </div>
                </div>
              </div>
              <StatusPill status={activeCard.status ?? 'live'} futureLabel="concept preview" />
            </div>
            <div className="relative z-10 mt-5 max-w-[560px] text-[clamp(1.9rem,3vw,2.7rem)] font-display font-extrabold leading-[1] tracking-[-0.05em] text-[var(--text)]">
              {activeCard.title}
            </div>
            <div className="relative z-10 mt-3 max-w-[540px] text-sm leading-relaxed text-[var(--text-2)]">
              {activeCard.note}
            </div>
            <div className="relative z-10 mt-5 flex flex-wrap gap-2">
              {[
                'creator-specific data',
                activeCard.status === 'future' ? 'concept surface' : 'working surface',
                'inside the deeper tour',
              ].map(item => (
                <span key={item} className="rounded-full border border-[var(--border-raw)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--text-2)]">
                  {item}
                </span>
              ))}
            </div>
            <div className="relative z-10 mt-6 rounded-[26px] border border-[var(--border-light)] bg-white/88 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
              <DockVisual cardKey={activeCard.key as SurfaceCardKey} />
            </div>
            <div className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: activeCard.accent }}>
              Open this preview
              <ArrowRight size={14} />
            </div>
          </a>

          <div className="grid gap-3">
            {HOME_SURFACE_CARDS.map((card, idx) => {
              const active = idx === activeIndex
              return (
                <button
                  key={card.key}
                  type="button"
                  onFocus={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    'rounded-[24px] border px-4 py-4 text-left transition-all duration-300',
                    active ? 'bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]' : 'bg-[var(--bg)]/70 hover:bg-white',
                  )}
                  style={{ borderColor: active ? card.accent : 'var(--border-light)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <IconBadge Icon={card.Icon} accent={card.accent} accentSoft={card.accentSoft} />
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: card.accent }}>
                          {card.label}
                        </div>
                        <div className="mt-2 text-base font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--text)]">
                          {card.title}
                        </div>
                      </div>
                    </div>
                    <StatusPill
                      status={card.status ?? 'live'}
                      futureLabel="future"
                      liveLabel="live"
                      className="shrink-0"
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
