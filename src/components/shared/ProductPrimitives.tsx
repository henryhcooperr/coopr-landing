import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconBadgeProps {
  Icon: LucideIcon
  accent: string
  accentSoft: string
  className?: string
  iconClassName?: string
  iconSize?: number
}

interface StatusPillProps {
  status: 'live' | 'future'
  className?: string
  futureLabel?: string
  liveLabel?: string
}

export function IconBadge({
  Icon,
  accent,
  accentSoft,
  className,
  iconClassName,
  iconSize = 18,
}: IconBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border bg-white shadow-[0_8px_18px_rgba(15,23,42,0.06)]',
        className,
      )}
      style={{ color: accent, borderColor: accentSoft }}
    >
      <Icon size={iconSize} strokeWidth={1.9} className={iconClassName} />
    </span>
  )
}

export function StatusPill({
  status,
  className,
  futureLabel = 'future workspace',
  liveLabel = 'live now',
}: StatusPillProps) {
  const isFuture = status === 'future'

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em]',
        className,
      )}
      style={{
        background: isFuture ? 'rgba(37,99,235,0.08)' : 'rgba(22,163,74,0.10)',
        color: isFuture ? 'var(--blue)' : 'var(--green)',
      }}
    >
      {isFuture ? futureLabel : liveLabel}
    </span>
  )
}
