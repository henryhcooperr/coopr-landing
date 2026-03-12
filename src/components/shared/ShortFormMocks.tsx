import { Bookmark, Heart, MessageCircle, Music4 } from 'lucide-react'
import { cn } from '@/lib/utils'

type MockTone = 'blue' | 'slate' | 'amber'

interface ShortFormPhoneMockProps {
  caption: string
  cue: string
  handle: string
  platformLabel: string
  tone?: MockTone
  compact?: boolean
  showActions?: boolean
}

interface StoryboardShotTileProps {
  step: string
  title: string
  note: string
  tone?: MockTone
  active?: boolean
}

const TONES: Record<MockTone, { shell: string; bezel: string; canvas: string; overlay: string; accent: string; accentSoft: string }> = {
  blue: {
    shell: '#0f172a',
    bezel: '#111827',
    canvas: 'linear-gradient(180deg,#dbeafe 0%, #93c5fd 35%, #1d4ed8 100%)',
    overlay: 'radial-gradient(circle at 52% 20%, rgba(255,255,255,0.75), transparent 26%), radial-gradient(circle at 50% 78%, rgba(15,23,42,0.18), transparent 36%)',
    accent: '#2563EB',
    accentSoft: 'rgba(37,99,235,0.14)',
  },
  slate: {
    shell: '#111827',
    bezel: '#0f172a',
    canvas: 'linear-gradient(180deg,#e5e7eb 0%, #cbd5e1 38%, #334155 100%)',
    overlay: 'radial-gradient(circle at 52% 20%, rgba(255,255,255,0.68), transparent 24%), radial-gradient(circle at 50% 78%, rgba(15,23,42,0.18), transparent 36%)',
    accent: '#475569',
    accentSoft: 'rgba(71,85,105,0.16)',
  },
  amber: {
    shell: '#111827',
    bezel: '#0f172a',
    canvas: 'linear-gradient(180deg,#fef3c7 0%, #fcd34d 34%, #b45309 100%)',
    overlay: 'radial-gradient(circle at 52% 20%, rgba(255,255,255,0.72), transparent 26%), radial-gradient(circle at 50% 78%, rgba(15,23,42,0.18), transparent 38%)',
    accent: '#D97706',
    accentSoft: 'rgba(217,119,6,0.14)',
  },
}

function getInitials(handle: string) {
  const cleaned = handle.replace(/[@._-]/g, ' ').trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  const initials = parts.slice(0, 2).map(part => part[0]?.toUpperCase() ?? '').join('')
  return initials || 'CC'
}

function CreatorSilhouette({ tone }: { tone: MockTone }) {
  const theme = TONES[tone]

  return (
    <svg viewBox="0 0 220 360" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <ellipse cx="112" cy="308" rx="76" ry="20" fill="rgba(15,23,42,0.12)" />
      <path d="M78 318c10-44 30-70 60-70 32 0 52 26 62 70" fill="rgba(255,255,255,0.18)" />
      <path d="M84 234c0-34 24-62 56-62s56 28 56 62v28H84z" fill="rgba(255,255,255,0.28)" />
      <path d="M112 116c-32 0-58 26-58 58 0 6 1 12 3 18 8-18 28-31 55-31 26 0 46 12 55 29 2-5 3-10 3-16 0-32-26-58-58-58z" fill="rgba(15,23,42,0.18)" />
      <circle cx="112" cy="134" r="42" fill="rgba(255,255,255,0.76)" />
      <path d="M78 174c12 10 22 14 34 14 17 0 31-8 40-21" fill="none" stroke="rgba(15,23,42,0.16)" strokeWidth="9" strokeLinecap="round" />
      <path d="M70 224c-16-18-18-40-8-52 10-10 28-6 46 10" fill="none" stroke="rgba(255,255,255,0.78)" strokeWidth="20" strokeLinecap="round" />
      <path d="M160 184c18-18 34-24 45-14 10 10 4 28-14 48" fill="none" stroke="rgba(255,255,255,0.84)" strokeWidth="18" strokeLinecap="round" />
      <path d="M182 140c8-8 22-8 30 0 8 8 8 22 0 30" fill="none" stroke={theme.accentSoft} strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

function ActionRail({ compact, tone }: { compact: boolean; tone: MockTone }) {
  const theme = TONES[tone]
  const iconSize = compact ? 12 : 15

  return (
    <div className="absolute right-3 top-20 flex flex-col items-center gap-3 text-white">
      {[
        [Heart, '24k'],
        [MessageCircle, '312'],
        [Bookmark, 'save'],
      ].map(([Icon, label]) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <span
            className="inline-flex items-center justify-center rounded-full border backdrop-blur-sm"
            style={{
              width: compact ? 28 : 34,
              height: compact ? 28 : 34,
              background: 'rgba(15,23,42,0.34)',
              borderColor: theme.accentSoft,
            }}
          >
            <Icon size={iconSize} strokeWidth={1.9} />
          </span>
          <span className="text-[10px] font-medium text-white/78">{label}</span>
        </div>
      ))}
    </div>
  )
}

export function ShortFormPhoneMock({
  caption,
  cue,
  handle,
  platformLabel,
  tone = 'blue',
  compact = false,
  showActions = true,
}: ShortFormPhoneMockProps) {
  const theme = TONES[tone]
  const initials = getInitials(handle)

  return (
    <div
      className="mx-auto rounded-[34px] border p-2 shadow-[0_20px_42px_rgba(15,23,42,0.22)]"
      style={{ maxWidth: compact ? '206px' : '258px', background: theme.shell, borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="mx-auto h-5 w-24 rounded-full bg-black/34" />
      <div
        className="relative mt-2 overflow-hidden rounded-[28px] border p-3"
        style={{ aspectRatio: '9 / 16', background: theme.canvas, borderColor: 'rgba(255,255,255,0.12)' }}
      >
        <div className="absolute inset-0" style={{ background: theme.overlay }} />
        <CreatorSilhouette tone={tone} />

        <div className="absolute inset-x-3 top-3 flex items-center justify-between text-white/84">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.18)' }}
            >
              {initials}
            </span>
            <div>
              <div className="text-[10px] font-semibold">{handle}</div>
              <div className="text-[9px] uppercase tracking-[0.14em] text-white/62">{platformLabel}</div>
            </div>
          </div>
          <span className="rounded-full bg-white/16 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            following
          </span>
        </div>

        <div className="absolute left-3 top-16 rounded-full border px-3 py-1 text-[10px] font-medium text-white backdrop-blur-sm" style={{ background: 'rgba(15,23,42,0.22)', borderColor: theme.accentSoft }}>
          creator POV
        </div>

        {showActions ? <ActionRail compact={compact} tone={tone} /> : null}

        <div className={cn('absolute inset-x-3 rounded-[22px] bg-black/26 px-3 py-3 text-white backdrop-blur-sm', compact ? 'bottom-14' : 'bottom-[60px]')}>
          <div className={cn('font-display font-extrabold leading-[0.92] tracking-[-0.05em]', compact ? 'text-[22px]' : 'text-[32px]')}>
            {caption}
          </div>
        </div>

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-full bg-black/34 px-3 py-2 text-[10px] font-medium text-white backdrop-blur-sm">
          <span>{cue}</span>
          <span className="inline-flex items-center gap-1 text-white/72">
            <Music4 size={11} strokeWidth={1.8} />
            original audio
          </span>
        </div>
      </div>
    </div>
  )
}

export function StoryboardShotTile({
  step,
  title,
  note,
  tone = 'blue',
  active = false,
}: StoryboardShotTileProps) {
  const theme = TONES[tone]

  return (
    <div
      className={cn(
        'rounded-[22px] border p-3 transition-all',
        active ? 'bg-white shadow-[0_14px_28px_rgba(37,99,235,0.08)]' : 'bg-white/78',
      )}
      style={{ borderColor: active ? theme.accentSoft : 'transparent' }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-[12px] font-mono text-[11px]"
          style={{ background: active ? theme.accent : 'var(--bg)', color: active ? 'white' : 'var(--text-3)' }}
        >
          {step}
        </span>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-3)]">{title}</div>
      </div>
      <div className="mt-3 overflow-hidden rounded-[18px] border p-2" style={{ borderColor: theme.accentSoft, background: 'rgba(255,255,255,0.78)' }}>
        <div className="relative overflow-hidden rounded-[16px]" style={{ aspectRatio: '9 / 15', background: theme.canvas }}>
          <div className="absolute inset-0" style={{ background: theme.overlay }} />
          <CreatorSilhouette tone={tone} />
          <div className="absolute left-2 top-2 rounded-full bg-black/32 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            {title.toLowerCase()}
          </div>
          <div className="absolute inset-x-2 bottom-2 rounded-[14px] bg-black/38 px-2.5 py-1.5 text-[9px] font-medium leading-snug text-white backdrop-blur-sm">
            {note}
          </div>
        </div>
      </div>
    </div>
  )
}
