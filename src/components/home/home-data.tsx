import type { LucideIcon } from 'lucide-react'
import { Clock3, Fingerprint, Radar, Sparkles } from 'lucide-react'

export interface HomeWorkflowStep {
  key: 'discover' | 'dna' | 'generate' | 'cadence'
  label: string
  title: string
  note: string
  chips: string[]
  accent: string
  accentSoft: string
  Icon: LucideIcon
}

export const HOME_WORKFLOW_STEPS: HomeWorkflowStep[] = [
  {
    key: 'discover',
    label: 'Discover',
    title: 'See the opening before your niche turns it into background noise.',
    note: 'Competitor shifts and trend lift collapse into one clear angle worth making.',
    chips: ['Trend lift', 'Comp shifts'],
    accent: 'var(--teal)',
    accentSoft: 'rgba(13,148,136,0.12)',
    Icon: Radar,
  },
  {
    key: 'dna',
    label: 'Match',
    title: 'Filter the idea through the creator profile your audience already knows.',
    note: 'Coopr cuts out ideas that may trend for others but would feel wrong in your feed.',
    chips: ['Voice fit', 'Audience memory'],
    accent: 'var(--slate)',
    accentSoft: 'rgba(71,85,105,0.12)',
    Icon: Fingerprint,
  },
  {
    key: 'generate',
    label: 'Generate',
    title: 'Rank the strongest way to say it before you post.',
    note: 'Prompt in, hook out, hold prediction moving, strongest option rising to the top.',
    chips: ['Hold score', 'Hook rank'],
    accent: 'var(--green)',
    accentSoft: 'rgba(22,163,74,0.12)',
    Icon: Sparkles,
  },
  {
    key: 'cadence',
    label: 'Ship',
    title: 'Pick the publish window with room to win.',
    note: 'Audience activity, pace, and crowding resolve into one recommended slot.',
    chips: ['Heatmap', 'Best slot'],
    accent: 'var(--amber)',
    accentSoft: 'rgba(217,119,6,0.12)',
    Icon: Clock3,
  },
]
