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
    date: '2026-03-20',
    slug: 'photo-carousel-intelligence',
    title: 'COOPR now understands photos and carousels',
    summary:
      'Not just Reels anymore. COOPR analyzes every format you post — single photos, carousels, and video — with the same depth. Your creative fingerprint, scores, and trends reflect everything you make.',
    tags: ['new', 'improved'],
    alsoShipped: [
      'Slide-by-slide carousel breakdowns',
      'Photo composition and lighting analysis',
      'Format-aware scoring and trend tracking',
      'Library search across all content types',
    ],
  },
  {
    date: '2026-03-19',
    slug: 'clip-lab',
    title: 'Clip Lab: deep analysis for any clip',
    summary:
      'Upload a clip and get a full breakdown — what works, what to improve, and how it compares to your best-performing content. Frame-by-frame visual analysis included.',
    tags: ['new'],
    alsoShipped: [
      'AI-powered hook and pacing scores',
      'Visual scene-by-scene breakdown',
      'Improvement suggestions based on your style',
    ],
  },
  {
    date: '2026-03-19',
    slug: 'semantic-intelligence',
    title: 'Smarter search, smarter suggestions — everywhere',
    summary:
      'COOPR now uses vector intelligence across the entire platform. Search finds content by meaning, not just keywords. Captions pull from your best-performing style. Your calendar spaces topics to keep your feed fresh.',
    tags: ['new', 'improved'],
    alsoShipped: [
      'Hybrid semantic + keyword search across your library',
      'Style-aware caption generation from your own content',
      'Semantic topic spacing in your content calendar',
      'Content similarity map with explorable clusters',
      'Demand signal matching for trending opportunities',
    ],
  },
  {
    date: '2026-03-19',
    slug: 'chat-intelligence',
    title: 'Chat that actually knows your content',
    summary:
      'When you talk to COOPR, it pulls relevant context from your entire library before responding. You can see exactly where insights come from, and every conversation quietly builds your knowledge base.',
    tags: ['new', 'improved'],
    alsoShipped: [
      'Pre-response intelligence briefing from your library',
      'Source badges showing where insights come from',
      'Auto-extracted knowledge saved from conversations',
      'Project-aware context in every chat',
      'Content match blocks for visual similarity results',
    ],
  },
  {
    date: '2026-03-20',
    slug: 'settings-and-reliability',
    title: 'Account settings and under-the-hood upgrades',
    summary:
      'A proper settings page, plus major reliability improvements. Your data is now stored on cloud infrastructure that persists across deploys — no more resets.',
    tags: ['new', 'improved'],
    alsoShipped: [
      'Full account settings page',
      'Audience demographics from Instagram',
      'Cloud media storage for frames and analysis',
      'Stronger login security',
    ],
  },
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
