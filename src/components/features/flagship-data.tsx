import type { LucideIcon } from 'lucide-react'
import { BarChart3, ClipboardList, Clock3, FileText, Film, Radar } from 'lucide-react'

export type FlagshipStepKey = 'discover' | 'script' | 'planner' | 'cadence'
export type WorkspaceModuleKey = 'shoot' | 'editor' | 'review'

export interface FlagshipStep {
  key: FlagshipStepKey
  label: string
  title: string
  proof: string
  chips: string[]
  accent: string
  accentSoft: string
  Icon: LucideIcon
}

export interface WorkspaceModule {
  key: WorkspaceModuleKey
  label: string
  title: string
  proof: string
  chips: string[]
  status: 'live' | 'future'
  accent: string
  accentSoft: string
  Icon: LucideIcon
}

export const FLAGSHIP_STEPS: FlagshipStep[] = [
  {
    key: 'discover',
    label: 'Discover opportunity',
    title: 'Spot the angle before your niche turns it into background noise.',
    proof: 'Competitor shifts and trend lift collapse into one opening worth chasing.',
    chips: ['Trend lift', 'Comp shifts'],
    accent: 'var(--teal)',
    accentSoft: 'rgba(13,148,136,0.12)',
    Icon: Radar,
  },
  {
    key: 'script',
    label: 'Write it in your voice',
    title: 'Open the script editor, draft in your voice, then tighten it line by line.',
    proof: 'Pick the winning hook, ask Coopr for the draft, then edit against voice score and watch-through before you film.',
    chips: ['Editable script', 'Voice score'],
    accent: 'var(--blue)',
    accentSoft: 'rgba(37,99,235,0.12)',
    Icon: FileText,
  },
  {
    key: 'planner',
    label: 'Plan scenes and shots',
    title: 'Plan the shoot.',
    proof: 'Scene editor, storyboard, and production notes stay tied to the same draft.',
    chips: ['Scene editor', 'Shot storyboard', 'Production plan'],
    accent: 'var(--slate)',
    accentSoft: 'rgba(71,85,105,0.12)',
    Icon: ClipboardList,
  },
  {
    key: 'cadence',
    label: 'Ship at the right time',
    title: 'Pick the post slot.',
    proof: 'Audience, overlap, and pace resolve into one publish decision.',
    chips: ['Heatmap', 'Best slot'],
    accent: 'var(--amber)',
    accentSoft: 'rgba(217,119,6,0.12)',
    Icon: Clock3,
  },
]

export const WORKSPACE_MODULES: WorkspaceModule[] = [
  {
    key: 'shoot',
    label: 'Shoot Planner',
    title: 'Turn the winning idea into a real field-ready production brief.',
    proof: 'Plan the session, lock the shot order, and walk into the day knowing exactly what footage the story needs.',
    chips: ['Session brief', 'Shot storyboard', 'Capture reminders'],
    status: 'live',
    accent: 'var(--blue)',
    accentSoft: 'rgba(37,99,235,0.12)',
    Icon: ClipboardList,
  },
  {
    key: 'editor',
    label: 'Reel Editor',
    title: 'Preview the future vertical workspace where reel sequencing and AI edit notes stay together.',
    proof: 'This should read like a short-form editor, not desktop software: portrait preview, beat order, trim guidance, and safe-zone checks in one place.',
    chips: ['Portrait preview', 'Beat order', 'Concept preview'],
    status: 'future',
    accent: 'var(--blue)',
    accentSoft: 'rgba(37,99,235,0.12)',
    Icon: Film,
  },
  {
    key: 'review',
    label: 'Postmortem Review',
    title: 'Open old videos and inspect the exact moment performance started slipping.',
    proof: 'Reopen the post, see where viewers fell away, and turn the failure into the next testable change.',
    chips: ['Past videos', 'Drop-off review', 'Next actions'],
    status: 'live',
    accent: 'var(--amber)',
    accentSoft: 'rgba(217,119,6,0.12)',
    Icon: BarChart3,
  },
]
