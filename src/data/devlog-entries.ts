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
      'Not just Reels anymore. COOPR analyzes every format you post — single photos, carousels, and video — with the same depth. Your fingerprint, scores, and trends reflect everything you make.',
    tags: ['new', 'improved'],
    alsoShipped: [
      'Slide-by-slide carousel breakdowns',
      'Photo composition and lighting analysis',
      'Format-aware scoring and trend tracking',
      'Library search across all content types',
    ],
  },
  {
    date: '2026-03-20',
    slug: 'settings-and-reliability',
    title: 'Account settings and under-the-hood upgrades',
    summary:
      'A proper settings page, audience demographics, and major reliability improvements. Your data now persists across updates — no more resets.',
    tags: ['new', 'improved'],
    alsoShipped: [
      'Full account settings page',
      'Audience demographics from Instagram',
      'Persistent cloud storage for your data',
      'Stronger login security',
    ],
  },
  {
    date: '2026-03-19',
    slug: 'clip-lab',
    title: 'Clip Lab: deep analysis for any clip',
    summary:
      'Upload a clip and get a full breakdown — what works, what to improve, and how it compares to your best-performing content.',
    tags: ['new'],
    alsoShipped: [
      'Hook and pacing scores',
      'Scene-by-scene visual breakdown',
      'Improvement suggestions based on your style',
    ],
  },
  {
    date: '2026-03-19',
    slug: 'smarter-search',
    title: 'Search that understands what you mean',
    summary:
      'Search your library by idea, not just keywords. COOPR finds content that matches your intent — even if the words are different. Your calendar and suggestions got smarter too.',
    tags: ['new', 'improved'],
    alsoShipped: [
      'Meaning-based search across your library',
      'Captions that match your voice and best-performing style',
      'Smarter topic spacing in your content calendar',
      'Visual content map you can explore',
    ],
  },
  {
    date: '2026-03-19',
    slug: 'chat-intelligence',
    title: 'Chat that actually knows your content',
    summary:
      'When you talk to COOPR, it draws on your entire library to give relevant answers. You can see where insights come from, and conversations build your knowledge base over time.',
    tags: ['new', 'improved'],
    alsoShipped: [
      'Contextual answers grounded in your content',
      'Source references on insights',
      'Knowledge saved automatically from conversations',
      'Project-aware responses',
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
      'Personalized suggestions for any niche',
      'Onboarding that adapts to your content style',
    ],
  },
  {
    date: '2026-03-12',
    slug: 'pulse-briefing',
    title: 'Pulse: your weekly creative briefing',
    summary:
      'A personalized rundown of what happened this week, what to post next, and what your competitors are doing. Like having a creative director check in every Monday.',
    tags: ['new'],
    alsoShipped: [
      'Weekly editorial summary',
      'Day-by-day content plan with suggestions',
      'Competitor and niche radar',
      'Quick-action cards for your next move',
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
    date: '2026-03-10',
    slug: 'chat-flagship',
    title: 'A new way to talk to COOPR',
    summary:
      'Chat got a complete redesign. COOPR now opens with a personalized greeting based on what you have been working on, and adapts between creative brainstorming and execution modes depending on what you need.',
    tags: ['new', 'improved'],
    alsoShipped: [
      'Personalized conversation openers',
      'Creative and execution modes',
      'Inline content cards in your thread',
      'Iterate on any suggestion with one tap',
    ],
  },
  {
    date: '2026-03-09',
    slug: 'production-desk',
    title: 'Studio: your production desk',
    summary:
      'Plan shoots, refine your hooks, and see predicted retention — all in one place. Studio now feels like sitting down at an edit bay built around your content.',
    tags: ['new', 'improved'],
    alsoShipped: [
      'Shoot session planner',
      'Editable hooks with predicted hold rates',
      'Script tools with pacing feedback',
      'Mobile-friendly layout',
    ],
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
  {
    date: '2026-02-28',
    slug: 'visual-understanding',
    title: 'COOPR sees what your audience sees',
    summary:
      'Every piece of content you post gets analyzed visually — composition, pacing, color, text placement. COOPR builds a picture of what makes your content yours.',
    tags: ['new'],
    alsoShipped: [
      'Visual analysis of every post',
      'Style patterns detected across your library',
      'Visual insights fed into your scores and suggestions',
    ],
  },
  {
    date: '2026-02-21',
    slug: 'trend-detection',
    title: 'COOPR spots what is working before you do',
    summary:
      'Automatic trend detection across your content and niche. COOPR identifies patterns in what is gaining traction, what is seasonal, and where momentum is shifting.',
    tags: ['new'],
    alsoShipped: [
      'Momentum and seasonal pattern detection',
      'Performance trends across your library',
      'Suggestions that adapt to what is trending now',
    ],
  },
  {
    date: '2026-02-14',
    slug: 'captions-and-scripts',
    title: 'Captions and scripts that sound like you',
    summary:
      'Generate captions and scripts trained on your voice and style. Get improvement suggestions for drafts, with specific feedback on what to tighten.',
    tags: ['new'],
    alsoShipped: [
      'Caption generation matched to your tone',
      'Script feedback with pacing notes',
      'Improvement suggestions for existing content',
    ],
  },
]
