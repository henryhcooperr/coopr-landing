export interface DevlogEntry {
  date: string
  slug: string
  title: string
  summary: string
  tags: ('new' | 'improved' | 'fixed')[]
  alsoShipped?: string[]
}

/**
 * Dev Log entries — only add entries for features that are LIVE on app.getcoopr.com.
 * Never add entries for in-progress or planned work.
 * Keep titles as outcomes ("Studio now does X"), never implementation ("Fixed series_id").
 */
export const DEVLOG_ENTRIES: DevlogEntry[] = [
  {
    date: '2026-03-17',
    slug: 'studio-series',
    title: 'Studio: organize your ideas into series',
    summary:
      'Group content into series, plan your narrative arc, and see everything in one place.',
    tags: ['new'],
    alsoShipped: [
      'Series grid with drag-and-drop reordering',
      'Auto-generated series thumbnails',
    ],
  },
  {
    date: '2026-03-14',
    slug: 'niche-agnostic',
    title: 'COOPR works for every kind of creator',
    summary:
      'We rebuilt the engine from the ground up to understand any content niche — not just one. Your creative fingerprint adapts to what you actually make.',
    tags: ['improved'],
    alsoShipped: [
      'Universal content categorization',
      'Niche-specific language removed from all prompts',
      'Bootstrap data adapts to your content style',
    ],
  },
  {
    date: '2026-03-11',
    slug: 'creative-fingerprint',
    title: 'Your creative fingerprint, visualized',
    summary:
      'A living wordcloud of your creative style — built from your actual content, not assumptions. It evolves as you create.',
    tags: ['new'],
  },
  {
    date: '2026-03-10',
    slug: 'voice-input',
    title: 'Talk to COOPR while you shoot',
    summary:
      'Voice input lets you capture ideas on location. Just talk, and COOPR turns it into structured notes.',
    tags: ['new'],
  },
  {
    date: '2026-03-07',
    slug: 'onboarding',
    title: 'A new way to get started',
    summary:
      'Connect your account, and COOPR analyzes your content to build your creative profile. The whole thing takes under two minutes.',
    tags: ['new'],
    alsoShipped: [
      'Invite code gating for beta access',
      'Automatic content fingerprinting on signup',
    ],
  },
]
