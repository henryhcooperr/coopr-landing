import type { LucideIcon } from 'lucide-react'
import { ClipboardList, Clock3, FileText, Radar } from 'lucide-react'

export interface HomeWorkflowStep {
  key: 'discover' | 'script' | 'planner' | 'cadence'
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
    key: 'script',
    label: 'Write',
    title: 'Build the script in your voice, then keep it editable.',
    note: 'Script Builder scores authenticity, projects watch-through, and lays retention cues onto the timeline.',
    chips: ['Voice score', 'Watch-through'],
    accent: 'var(--blue)',
    accentSoft: 'rgba(37,99,235,0.12)',
    Icon: FileText,
  },
  {
    key: 'planner',
    label: 'Plan',
    title: 'Turn the script into scenes, shots, and a real shoot-day plan.',
    note: 'Shot Planner keeps dialogue, locations, camera notes, and shot order in one editable production surface.',
    chips: ['Scene tabs', 'Shot plan'],
    accent: 'var(--slate)',
    accentSoft: 'rgba(71,85,105,0.12)',
    Icon: ClipboardList,
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
