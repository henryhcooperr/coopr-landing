import { useEffect, useState, type ReactNode } from 'react'
import { ArrowRight, BarChart3, CheckCircle2, Clock3, MapPinned, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WORKSPACE_MODULES, type WorkspaceModule, type WorkspaceModuleKey } from './flagship-data'
import { ShortFormPhoneMock, StoryboardShotTile } from '@/components/shared/ShortFormMocks'
import { IconBadge, StatusPill } from '@/components/shared/ProductPrimitives'

interface WorkspaceGalleryProps {
  initialModule?: WorkspaceModuleKey
  reducedMotion: boolean
}

function WorkspaceShell({
  module,
  children,
}: {
  module: WorkspaceModule
  children: ReactNode
}) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[var(--border-light)] bg-white p-5 shadow-[0_22px_56px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="ws-shell-glow" style={{ background: `radial-gradient(circle, ${module.accentSoft} 0%, transparent 72%)` }} />
      <div className="relative z-10 flex items-center justify-between gap-4 border-b border-[var(--border-light)] pb-4">
        <div className="flex items-center gap-3">
          <IconBadge Icon={module.Icon} accent={module.accent} accentSoft={module.accentSoft} />
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">Inside the workspace</div>
            <div className="mt-1 text-sm font-semibold text-[var(--text)]">{module.label}</div>
          </div>
        </div>
        <StatusPill status={module.status} futureLabel="concept preview" />
      </div>
      <div className="relative z-10 mt-5">{children}</div>
    </div>
  )
}

function ShootPlannerScene({ module }: { module: WorkspaceModule }) {
  const checklist = [
    'Cold open: myth in first sentence',
    'Wide reef pass before cleanup reveal',
    'Close-up coral detail for proof beat',
    'Before / after frame pair for the ending hold',
  ]

  return (
    <WorkspaceShell module={module}>
      <div className="grid gap-4 xl:grid-cols-[0.94fr_1.06fr]">
        <div className="grid gap-4">
          <div className="rounded-[26px] border border-[rgba(37,99,235,0.14)] bg-[linear-gradient(180deg,rgba(37,99,235,0.08),rgba(255,255,255,1))] p-5 shadow-[0_14px_30px_rgba(37,99,235,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">session brief</div>
                <div className="mt-3 text-[clamp(1.8rem,3vw,2.4rem)] font-display font-extrabold leading-[0.98] tracking-[-0.05em] text-[var(--text)]">
                  Reef cleanup myth-busting shoot
                </div>
              </div>
              <div className="rounded-[18px] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-3)]">ready score</div>
                <div className="mt-1 text-xl font-display font-extrabold tracking-[-0.04em] text-[var(--blue)]">92</div>
              </div>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {[
                ['Location', 'lagoon drop-off'],
                ['Conditions', 'calm tide + sun gaps'],
                ['Gear', 'macro + wide rig'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[18px] bg-white px-3 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-3)]">{label}</div>
                  <div className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-[var(--border-light)] bg-[var(--bg)] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">priority list</div>
              <div className="font-mono text-[10px] text-[var(--text-3)]">12 shots queued</div>
            </div>
            <div className="space-y-2">
              {checklist.map((item, idx) => (
                <div key={item} className={cn('flex items-center gap-3 rounded-[18px] bg-white px-3 py-3', idx === 0 && 'ws-priority-card')}>
                  <CheckCircle2 size={17} className="text-[var(--blue)]" />
                  <div className="text-sm font-medium text-[var(--text)]">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[26px] border border-[var(--border-light)] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">
                <MapPinned size={14} />
                shot storyboard
              </div>
              <span className="rounded-full bg-[rgba(37,99,235,0.08)] px-2.5 py-1 font-mono text-[10px] text-[var(--blue)]">field-ready</span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <StoryboardShotTile step="01" title="Hook" note="wave in and state the myth immediately" tone="blue" active />
              <StoryboardShotTile step="02" title="Mess" note="show the reef problem before the explanation" tone="slate" />
              <StoryboardShotTile step="03" title="Proof" note="cleanup result arrives early enough to stop the scroll" tone="blue" />
            </div>
          </div>

          <div className="rounded-[26px] border border-[var(--border-light)] bg-[var(--bg)] p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">mobile-safe capture reminders</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[20px] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                <div className="text-sm font-semibold text-[var(--text)]">Time split</div>
                <div className="mt-4 space-y-3">
                  {[
                    ['Hook', '8m', '22%'],
                    ['Action', '28m', '74%'],
                    ['Proof', '14m', '38%'],
                  ].map(([label, value, width]) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-xs text-[var(--text-2)]">
                        <span>{label}</span>
                        <span className="font-mono">{value}</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-[rgba(37,99,235,0.08)]">
                        <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--blue),#60a5fa)]" style={{ width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[20px] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                <div className="text-sm font-semibold text-[var(--text)]">Field notes</div>
                <div className="mt-3 space-y-2 text-sm text-[var(--text-2)]">
                  {[
                    'keep the face clear of the right-side action rail zone',
                    'capture one clean waving opener with room for captions',
                    'save the before / after pair for the final hold frame',
                  ].map(note => (
                    <div key={note} className="rounded-[18px] bg-[var(--bg)] px-3 py-3">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  )
}

function EditorCanvasScene({ module }: { module: WorkspaceModule }) {
  const beats = [
    { step: '01', title: 'Hook', note: 'state the myth in the first line', active: true },
    { step: '02', title: 'Mess', note: 'show the problem fast', active: false },
    { step: '03', title: 'Proof', note: 'bring the result to second 6', active: false },
    { step: '04', title: 'Payoff', note: 'close on visible change', active: false },
  ]

  return (
    <WorkspaceShell module={module}>
      <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[26px] border border-[rgba(37,99,235,0.14)] bg-[linear-gradient(180deg,rgba(37,99,235,0.08),rgba(255,255,255,1))] p-5 shadow-[0_14px_30px_rgba(37,99,235,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">future reel editor</div>
              <div className="mt-2 text-sm text-[var(--text-2)]">A vertical-first editing surface for short-form posts</div>
            </div>
            <StatusPill status="future" futureLabel="concept preview" />
          </div>
          <div className="mt-5 rounded-[24px] border border-[var(--border-light)] bg-[#0f172a] p-4 shadow-[0_14px_30px_rgba(15,23,42,0.16)]">
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3 text-white/76">
              <div>
                <div className="text-sm font-semibold text-white">Cleanup myth edit v1</div>
                <div className="mt-1 text-xs text-white/58">rough cut with beat order and AI edit guidance</div>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/80">03:12</div>
            </div>
            <ShortFormPhoneMock
              tone="blue"
              handle="@coopr.creator"
              platformLabel="future reel"
              caption="Everyone says reef cleanup does nothing."
              cue="hook to proof in 6s"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[26px] border border-[var(--border-light)] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
            <div className="mb-3 flex items-center justify-between text-xs text-[var(--text-3)]">
              <span className="font-mono uppercase tracking-[0.16em] text-[var(--blue)]">beat order</span>
              <span className="font-mono">portrait-first</span>
            </div>
            <div className="space-y-2">
              {beats.map(beat => (
                <div key={beat.step} className={cn('flex items-center gap-3 rounded-[18px] border px-3 py-3', beat.active ? 'border-[rgba(37,99,235,0.18)] bg-[rgba(37,99,235,0.06)] shadow-[0_10px_24px_rgba(37,99,235,0.05)]' : 'border-transparent bg-[var(--bg)]')}>
                  <div className={cn('inline-flex h-10 w-10 items-center justify-center rounded-[16px] font-mono text-[11px]', beat.active ? 'bg-[var(--blue)] text-white' : 'bg-white text-[var(--text-3)]')}>
                    {beat.step}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text)]">{beat.title}</div>
                    <div className="text-xs text-[var(--text-3)]">{beat.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {[
              ['Trim guidance', 'cut the pause before the proof beat'],
              ['Caption safety', 'keep the first line above the metadata strip'],
              ['Hook option', 'swap in a sharper opener if retention stays soft'],
              ['Why next', 'make editing a visible part of the Coopr workflow story'],
            ].map(([title, note]) => (
              <div key={title} className="rounded-[22px] border border-[var(--border-light)] bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                <div className="text-sm font-semibold text-[var(--text)]">{title}</div>
                <div className="mt-1 text-xs leading-relaxed text-[var(--text-3)]">{note}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[26px] border border-[var(--border-light)] bg-[var(--bg)] p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">
              <Sparkles size={14} />
              platform checks
            </div>
            <div className="space-y-2 text-sm text-[var(--text-2)]">
              <div className="rounded-[18px] bg-white px-3 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                caption block stays clear of the action rail and the bottom metadata strip.
              </div>
              <div className="rounded-[18px] bg-white px-3 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                the opener reads like a phone-native reel, not like desktop editing software.
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  )
}

function ReviewScene({ module, reducedMotion }: { module: WorkspaceModule; reducedMotion: boolean }) {
  const library = [
    { title: 'Reef cleanup myth', score: '68', active: true },
    { title: 'Night dive bait ball', score: '74', active: false },
    { title: 'Coral bleaching explainer', score: '81', active: false },
  ]

  return (
    <WorkspaceShell module={module}>
      <div className="grid gap-4 xl:grid-cols-[0.84fr_1.16fr]">
        <div className="rounded-[26px] border border-[var(--border-light)] bg-[var(--bg)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">past reels</div>
            <div className="font-mono text-[10px] text-[var(--text-3)]">tap to inspect</div>
          </div>
          <div className="space-y-2">
            {library.map(video => (
              <div
                key={video.title}
                className={cn(
                  'rounded-[18px] border px-3 py-3 transition-all',
                  video.active ? 'border-[rgba(217,119,6,0.20)] bg-white shadow-[0_10px_24px_rgba(217,119,6,0.08)]' : 'border-transparent bg-white/70',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-[var(--text)]">{video.title}</div>
                    <div className="mt-1 text-xs text-[var(--text-3)]">postmortem ready</div>
                  </div>
                  <div className={cn('rounded-full px-2.5 py-1 font-mono text-[10px]', video.active ? 'bg-[rgba(217,119,6,0.10)] text-[var(--amber)]' : 'bg-[var(--bg)] text-[var(--text-3)]')}>
                    score {video.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[26px] border border-[rgba(217,119,6,0.14)] bg-[linear-gradient(180deg,rgba(217,119,6,0.08),rgba(255,255,255,1))] p-5 shadow-[0_14px_30px_rgba(217,119,6,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">what went wrong</div>
                <div className="mt-3 text-[clamp(1.8rem,3vw,2.4rem)] font-display font-extrabold leading-[0.98] tracking-[-0.05em] text-[var(--text)]">
                  Strong topic. Weak opening proof.
                </div>
              </div>
              <div className="rounded-[18px] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-3)]">drop-off</div>
                <div className="mt-1 text-xl font-display font-extrabold tracking-[-0.04em] text-[var(--amber)]">18s</div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="rounded-[24px] border border-[var(--border-light)] bg-[#0f172a] p-4 shadow-[0_14px_30px_rgba(15,23,42,0.16)]">
                <ShortFormPhoneMock
                  tone="amber"
                  handle="@coopr.creator"
                  platformLabel="past reel"
                  caption="I thought the cleanup result alone would carry the post."
                  cue="proof arrives too late"
                />
              </div>
              <div className="rounded-[22px] border border-[var(--border-light)] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                <div className="mb-3 flex items-center justify-between text-xs text-[var(--text-3)]">
                  <span>retention review</span>
                  <span className="font-mono">0s → 30s</span>
                </div>
                <div className="ws-retention-line">
                  <svg viewBox="0 0 320 120" className="w-full" aria-hidden="true">
                    <path d="M6 18 C 54 22, 86 28, 116 42 S 184 72, 214 76 S 274 90, 314 102" fill="none" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" className={cn(!reducedMotion && 'ws-retention-path')} />
                    <circle cx="214" cy="76" r="7" fill="white" stroke="var(--amber)" strokeWidth="3" />
                  </svg>
                </div>
                <div className="mt-3 grid gap-2 md:grid-cols-3">
                  {[
                    ['Hook clarity', 'too abstract in the first second'],
                    ['Proof timing', 'result arrives after attention dips'],
                    ['Next fix', 'lead with the reveal shot'],
                  ].map(([title, note]) => (
                    <div key={title} className="rounded-[18px] bg-[rgba(217,119,6,0.08)] px-3 py-3 text-sm">
                      <div className="font-semibold text-[var(--text)]">{title}</div>
                      <div className="mt-1 text-xs text-[var(--text-3)]">{note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg)] p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">
                <BarChart3 size={14} />
                diagnosis
              </div>
              <div className="space-y-3">
                {[
                  ['Topic fit', 'good'],
                  ['Hook proof', 'weak'],
                  ['Pacing', 'stalls at second 12'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-[18px] bg-white px-3 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                    <span className="text-sm text-[var(--text-2)]">{label}</span>
                    <span className="font-mono text-xs text-[var(--text)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg)] p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]">
                <Clock3 size={14} />
                next actions
              </div>
              <div className="space-y-2 text-sm text-[var(--text-2)]">
                {[
                  'open on the cleanup result, not the premise',
                  'move the proof shot 8 seconds earlier',
                  'test a sharper first-line claim in Hook Lab',
                ].map(item => (
                  <div key={item} className="rounded-[18px] bg-white px-3 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  )
}

function WorkspacePreview({ module, reducedMotion }: { module: WorkspaceModule; reducedMotion: boolean }) {
  if (module.key === 'shoot') return <ShootPlannerScene module={module} />
  if (module.key === 'editor') return <EditorCanvasScene module={module} />
  return <ReviewScene module={module} reducedMotion={reducedMotion} />
}

function getModuleByKey(key: WorkspaceModuleKey) {
  return WORKSPACE_MODULES.find(module => module.key === key) ?? WORKSPACE_MODULES[0]
}

export function WorkspaceGallery({ initialModule = 'shoot', reducedMotion }: WorkspaceGalleryProps) {
  const [activeKey, setActiveKey] = useState<WorkspaceModuleKey>(initialModule)

  useEffect(() => {
    setActiveKey(initialModule)
  }, [initialModule])

  const activeModule = getModuleByKey(activeKey)

  const activate = (key: WorkspaceModuleKey) => {
    setActiveKey(key)
    if (typeof window !== 'undefined') {
      window.location.hash = `#/features?module=${key}`
    }
  }

  return (
    <section className="mx-auto max-w-[1220px] px-6 pb-24 lg:pb-28">
      <div className="feat-reveal opacity-0 translate-y-5 transition-all duration-700 ease-out [&.vis]:translate-y-0 [&.vis]:opacity-100">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-3)]">Act 2 · inside the workspace</div>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-0.05em] text-[var(--text)]">
              Show the actual surfaces without sliding back into a brochure wall.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--text-2)]">
              The flagship flow explains how Coopr thinks. These modules show where that thinking lands: planning the shoot, shaping the reel, and learning from past posts.
            </p>
          </div>
          <StatusPill status={activeModule.status} futureLabel="future module selected" liveLabel="live module selected" />
        </div>

        <div className="hidden gap-5 lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-3">
            {WORKSPACE_MODULES.map(module => {
              const active = module.key === activeKey
              return (
                <button
                  key={module.key}
                  type="button"
                  onClick={() => activate(module.key)}
                  className={cn(
                    'w-full rounded-[24px] border px-4 py-4 text-left transition-all duration-300',
                    active ? 'bg-white shadow-[0_16px_36px_rgba(15,23,42,0.08)]' : 'bg-[var(--bg)]/80 hover:bg-white',
                  )}
                  style={{ borderColor: active ? module.accent : 'var(--border-light)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <IconBadge Icon={module.Icon} accent={module.accent} accentSoft={module.accentSoft} />
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: module.accent }}>
                          {module.label}
                        </div>
                        <div className="mt-2 text-lg font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--text)]">
                          {module.title}
                        </div>
                        <div className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">{module.proof}</div>
                      </div>
                    </div>
                    <StatusPill status={module.status} futureLabel="future" liveLabel="live" className="shrink-0" />
                  </div>
                </button>
              )
            })}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-2 pt-1 font-body text-sm font-semibold text-[var(--teal)] no-underline transition-all duration-200 hover:gap-3"
            >
              See this in your own workflow
              <ArrowRight size={14} />
            </a>
          </div>

          <div key={activeModule.key} className="feat-reveal vis ws-panel-enter">
            <WorkspacePreview module={activeModule} reducedMotion={reducedMotion} />
          </div>
        </div>

        <div className="space-y-5 lg:hidden">
          {WORKSPACE_MODULES.map(module => (
            <article key={module.key} className="rounded-[28px] border border-[var(--border-light)] bg-white/92 p-5 shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <IconBadge Icon={module.Icon} accent={module.accent} accentSoft={module.accentSoft} />
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: module.accent }}>
                    {module.label}
                  </div>
                </div>
                <StatusPill status={module.status} futureLabel="concept preview" />
              </div>
              <h3 className="font-display text-[2rem] font-extrabold leading-[1] tracking-[-0.05em] text-[var(--text)]">{module.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-2)]">{module.proof}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {module.chips.map(chip => (
                  <span key={chip} className="rounded-full border border-[var(--border-raw)] bg-[var(--bg)] px-3 py-1.5 text-xs font-medium text-[var(--text-2)]">
                    {chip}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <WorkspacePreview module={module} reducedMotion={reducedMotion} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
