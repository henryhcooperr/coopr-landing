import type { LucideIcon } from 'lucide-react'
import { BarChart3, ClipboardList, Film, Radar } from 'lucide-react'

export interface HomeWorkflowStep {
  key: 'discover' | 'plan' | 'edit' | 'review'
  label: string
  title: string
  note: string
  accent: string
  accentSoft: string
  Icon: LucideIcon
}

export interface HomeSurfaceCard {
  key: string
  label: string
  title: string
  note: string
  metric: string
  href: string
  status?: 'live' | 'future'
  accent: string
  accentSoft: string
  Icon: LucideIcon
}

export const HOME_WORKFLOW_STEPS: HomeWorkflowStep[] = [
  {
    key: 'discover',
    label: 'Discover',
    title: 'Read the niche before you write the opener.',
    note: 'Competitor shifts, trend lift, and opportunity confidence stack into one angle worth making.',
    accent: 'var(--teal)',
    accentSoft: 'rgba(13,148,136,0.12)',
    Icon: Radar,
  },
  {
    key: 'plan',
    label: 'Plan',
    title: 'Turn the winning idea into a field-ready shoot brief.',
    note: 'Storyboards, shot order, and mobile-safe notes get locked before you start filming.',
    accent: 'var(--blue)',
    accentSoft: 'rgba(37,99,235,0.12)',
    Icon: ClipboardList,
  },
  {
    key: 'edit',
    label: 'Edit',
    title: 'Shape the reel inside a vertical-first editing workspace.',
    note: 'Phone-first preview, beat order, and edit guidance stay beside the reel instead of buried in desktop chrome.',
    accent: 'var(--blue)',
    accentSoft: 'rgba(37,99,235,0.12)',
    Icon: Film,
  },
  {
    key: 'review',
    label: 'Review',
    title: 'Reopen past videos and see exactly where the post slipped.',
    note: 'Drop-off, weak proof timing, and the next fix become clear fast enough to actually use.',
    accent: 'var(--amber)',
    accentSoft: 'rgba(217,119,6,0.12)',
    Icon: BarChart3,
  },
]

export const HOME_SURFACE_CARDS: HomeSurfaceCard[] = [
  {
    key: 'discover',
    label: 'Trend Radar',
    title: 'See which niche movements are actually worth turning into a post.',
    note: 'Track competitor shifts and topic lift instead of manually scrolling for fragments.',
    metric: '+24% lift',
    href: '#/features',
    status: 'live',
    accent: 'var(--teal)',
    accentSoft: 'rgba(13,148,136,0.12)',
    Icon: Radar,
  },
  {
    key: 'shoot',
    label: 'Shoot Planner',
    title: 'Build the shoot as a storyboard, not a vague note in your phone.',
    note: 'Session brief, shot frames, and capture reminders land in one production surface.',
    metric: '12-shot brief',
    href: '#/features?module=shoot',
    status: 'live',
    accent: 'var(--blue)',
    accentSoft: 'rgba(37,99,235,0.12)',
    Icon: ClipboardList,
  },
  {
    key: 'editor',
    label: 'Reel Editor',
    title: 'Preview the future vertical editor where the reel and AI edit notes stay together.',
    note: 'Portrait-first playback, beat order, trim notes, and caption safety checks in one place.',
    metric: '9:16 first',
    href: '#/features?module=editor',
    status: 'future',
    accent: 'var(--blue)',
    accentSoft: 'rgba(37,99,235,0.12)',
    Icon: Film,
  },
  {
    key: 'review',
    label: 'Postmortem Review',
    title: 'Open an old reel and diagnose what broke before you repeat it.',
    note: 'Pair the post itself with drop-off, pacing issues, and the next action to test.',
    metric: '18s drop-off',
    href: '#/features?module=review',
    status: 'live',
    accent: 'var(--amber)',
    accentSoft: 'rgba(217,119,6,0.12)',
    Icon: BarChart3,
  },
]
