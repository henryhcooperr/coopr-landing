import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { BrandLockup, HeaderActionCluster } from '@/components/shared/Brand'
import {
  Brain,
  AudioWaveform,
  ScanEye,
  Library,
  UsersRound,
  Fingerprint,
  GraduationCap,
  Activity,
  Lightbulb,
  Sparkles,
  FileText,
  ListChecks,
  Film,
  Bookmark,
  FolderKanban,
  LayoutGrid,
  Music,
  MessageSquareText,
  Binoculars,
  FlaskConical,
  Radar,
  TrendingUp,
  BarChart3,
  Clock,
  Thermometer,
  CalendarRange,
  Gauge,
  Search,
  LineChart,
  Hash,
  LayoutDashboard,
  GitCompareArrows,
  Target,
  Clapperboard,
  CalendarDays,
  Briefcase,
  Link2,
  Send,
  MonitorPlay,
  UserCog,
  type LucideIcon,
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  Tab + feature data                                                        */
/* -------------------------------------------------------------------------- */

type TabKey = 'understand' | 'create' | 'grow' | 'analyze' | 'manage'

interface FeatureItem {
  icon: LucideIcon
  name: string
  description: string
}

interface TabDefinition {
  key: TabKey
  label: string
  icon: LucideIcon
  features: FeatureItem[]
}

const TAB_ACCENTS: Record<TabKey, { hex: string; soft: string; border: string }> = {
  understand: { hex: '#D97706', soft: 'rgba(217,119,6,0.08)',  border: 'rgba(217,119,6,0.16)'  },
  create:     { hex: '#0D9488', soft: 'rgba(13,148,136,0.08)', border: 'rgba(13,148,136,0.16)' },
  grow:       { hex: '#7C3AED', soft: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.16)' },
  analyze:    { hex: '#2563EB', soft: 'rgba(37,99,235,0.08)',  border: 'rgba(37,99,235,0.16)'  },
  manage:     { hex: '#16A34A', soft: 'rgba(22,163,74,0.08)',  border: 'rgba(22,163,74,0.16)'  },
}

const TABS: TabDefinition[] = [
  {
    key: 'understand',
    label: 'Understand',
    icon: Brain,
    features: [
      {
        icon: Brain,
        name: 'Creative DNA',
        description: 'Your content fingerprint builds a living model of your voice and style, updated with every post.',
      },
      {
        icon: AudioWaveform,
        name: 'Voice Profile',
        description: '8 dimensions of your speaking patterns, scored against your real content.',
      },
      {
        icon: ScanEye,
        name: 'Visual Analysis',
        description: 'Frame-by-frame breakdown of what you are showing and why it works.',
      },
      {
        icon: Library,
        name: 'Content Library',
        description: 'Every post indexed and searchable by topic, format, and performance.',
      },
      {
        icon: UsersRound,
        name: 'Audience Intelligence',
        description: 'Who your engaged followers are, what they care about, who is new.',
      },
      {
        icon: Fingerprint,
        name: 'Content Fingerprint',
        description: 'Signals from all your content compiled into a profile that evolves.',
      },
      {
        icon: GraduationCap,
        name: 'Teach COOPR',
        description: 'Tell it your preferences explicitly and watch the model sharpen.',
      },
      {
        icon: Activity,
        name: 'Voice Evolution',
        description: 'Track how your creative voice changes month over month.',
      },
    ],
  },
  {
    key: 'create',
    label: 'Create',
    icon: Sparkles,
    features: [
      {
        icon: Lightbulb,
        name: 'Idea Generation',
        description: 'Surfaces ideas from the gap between what your audience wants and what you haven\'t made.',
      },
      {
        icon: Sparkles,
        name: 'Hook Lab',
        description: 'Generate and score hooks across 4 layers: opening shot, text, voiceover, and energy.',
      },
      {
        icon: FileText,
        name: 'Script Development',
        description: 'Turn any concept into a timed script structured for your format, in your voice.',
      },
      {
        icon: ListChecks,
        name: 'Shot List & Planning',
        description: 'Scene-by-scene shot lists built from patterns in your winning content.',
      },
      {
        icon: Film,
        name: 'Clip Lab',
        description: 'Upload any clip and get a scored breakdown with prioritized improvements.',
      },
      {
        icon: Bookmark,
        name: 'Inspiration Board',
        description: 'Save any video, get a deep format breakdown, and adapt it for your niche.',
      },
      {
        icon: FolderKanban,
        name: 'Projects & Storyboard',
        description: 'Hold everything together: concept, scenes, script, notes, assets.',
      },
      {
        icon: LayoutGrid,
        name: 'Viral Format Library',
        description: 'Proven format patterns with step-by-step filming instructions.',
      },
      {
        icon: Music,
        name: 'Audio & Music Intelligence',
        description: 'What sounds you use, what\'s trending, what correlates with performance.',
      },
      {
        icon: MessageSquareText,
        name: 'Caption Generation',
        description: 'Captions that match your voice with A/B variations and optimal hashtags.',
      },
    ],
  },
  {
    key: 'grow',
    label: 'Grow',
    icon: TrendingUp,
    features: [
      {
        icon: Binoculars,
        name: 'Inspiration Intelligence',
        description: 'Track any creator and see their engagement, hooks, and growth patterns.',
      },
      {
        icon: FlaskConical,
        name: 'Pattern Lab',
        description: 'Extract proven techniques from creators you admire, ranked by performance lift.',
      },
      {
        icon: Radar,
        name: 'Niche Intelligence',
        description: 'Map your positioning across the dimensions that matter in your space.',
      },
      {
        icon: TrendingUp,
        name: 'Trend Engine',
        description: 'Rising hooks, topics, and formats personalized to your niche.',
      },
      {
        icon: BarChart3,
        name: 'Growth Analytics',
        description: 'Follower trends, platform comparisons, and velocity alerts.',
      },
      {
        icon: Clock,
        name: 'Posting Time Optimizer',
        description: 'Best time to post based on your audience and content type.',
      },
      {
        icon: Thermometer,
        name: 'Content Fatigue Detection',
        description: 'Know when topics or formats are getting stale before your audience tells you.',
      },
      {
        icon: CalendarRange,
        name: 'Seasonal Calendar',
        description: 'What\'s relevant right now and what\'s coming up in your niche.',
      },
    ],
  },
  {
    key: 'analyze',
    label: 'Analyze',
    icon: LayoutDashboard,
    features: [
      {
        icon: Gauge,
        name: 'Performance Prediction',
        description: 'Predict how a video will perform before posting, with evidence.',
      },
      {
        icon: Search,
        name: 'Outlier Detection',
        description: 'Find and explain content that dramatically outperformed your averages.',
      },
      {
        icon: LineChart,
        name: 'Retention Analysis',
        description: 'Diagnose where viewers drop off and how to fix it before posting.',
      },
      {
        icon: Hash,
        name: 'Hashtag Intelligence',
        description: 'Full performance rankings with trend data and optimal suggestions.',
      },
      {
        icon: LayoutDashboard,
        name: 'Insights Dashboard',
        description: 'Retention curves, format breakdown, hashtag velocity, competitor comparison.',
      },
      {
        icon: GitCompareArrows,
        name: 'Correlation Engine',
        description: 'Which content styles, formats, and topics drive your best numbers.',
      },
      {
        icon: Target,
        name: 'Demand Radar',
        description: 'What your audience wants that you haven\'t made yet.',
      },
    ],
  },
  {
    key: 'manage',
    label: 'Manage',
    icon: Clapperboard,
    features: [
      {
        icon: Clapperboard,
        name: 'Studio Pipeline',
        description: 'Kanban production board: Spark through Published with next-action suggestions.',
      },
      {
        icon: CalendarDays,
        name: 'Content Calendar',
        description: 'Monthly plan built on your cadence patterns and seasonal signals.',
      },
      {
        icon: Briefcase,
        name: 'Brand Campaigns',
        description: 'Track partnerships from pitch to payment with rate suggestions.',
      },
      {
        icon: Link2,
        name: 'Link in Bio',
        description: 'Performance-aware link page builder with analytics.',
      },
      {
        icon: Send,
        name: 'Publishing Queue',
        description: 'Schedule posts with optimal timing suggestions.',
      },
      {
        icon: MonitorPlay,
        name: 'DaVinci Integration',
        description: 'Push storyboards and cut plans directly into Resolve.',
      },
      {
        icon: UserCog,
        name: 'Multi-Creator Profiles',
        description: 'Switch between creator profiles with separate fingerprints.',
      },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*  Differentiator bullets                                                    */
/* -------------------------------------------------------------------------- */

interface Differentiator {
  headline: string
  body: string
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    headline: 'Learns you, doesn\'t just count likes',
    body: 'COOPR builds a model of your creative identity that sharpens with every post you make.',
  },
  {
    headline: 'Suggests, doesn\'t decide',
    body: 'Every recommendation is a starting point, not a final answer. You stay in control.',
  },
  {
    headline: 'Closes the loop',
    body: 'From insight to idea to post to analysis, everything connects.',
  },
]

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function Features() {
  const [activeTab, setActiveTab] = useState<TabKey>('understand')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const currentTab = TABS.find(t => t.key === activeTab)!
  const accent = TAB_ACCENTS[activeTab]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-page, #F4F3F0)', color: 'var(--text, #1C1917)' }}>
      {/* ---------- Ambient glow ---------- */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div
          className="absolute left-[-4rem] top-20 h-[240px] w-[240px] rounded-full blur-[120px] transition-colors duration-700"
          style={{ background: accent.soft }}
        />
        <div
          className="absolute right-[-4rem] top-24 h-[220px] w-[220px] rounded-full blur-[120px] transition-colors duration-700"
          style={{ background: accent.soft }}
        />
      </div>

      {/* ---------- Nav ---------- */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ borderColor: 'var(--border-light, #F5F4F0)', background: 'color-mix(in srgb, var(--bg-page, #F4F3F0) 82%, transparent)' }}>
        <div className="mx-auto flex h-[72px] max-w-[1380px] items-center justify-between px-6">
          <a href="#" onClick={() => { window.location.hash = ''; window.scrollTo(0, 0) }} className="flex items-center gap-2 no-underline">
            <BrandLockup />
          </a>
          <HeaderActionCluster
            primaryHref="#"
            primaryLabel="Home"
            secondaryHref="#/get-started"
            secondaryLabel="Join Waitlist"
            onPrimaryClick={() => { window.location.hash = '' }}
          />
        </div>
      </nav>

      {/* ---------- Hero ---------- */}
      <header className="relative mx-auto max-w-[980px] px-6 pb-10 pt-20 text-center lg:pb-14 lg:pt-28">
        <BlurFade delay={0} inView>
          <h1
            className="mx-auto max-w-[760px] text-balance leading-[0.96]"
            style={{
              fontFamily: "var(--font-hero, 'Advercase', sans-serif)",
              fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            Everything COOPR does for you
          </h1>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <p
            className="mx-auto mt-5 max-w-[640px] text-[16px] leading-relaxed sm:text-[17px]"
            style={{ color: 'var(--text-2, #57534E)', fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)" }}
          >
            Your creative engine. Every tool works together to help you understand your content,
            create with confidence, and grow your audience.
          </p>
        </BlurFade>
      </header>

      {/* ---------- Tabs ---------- */}
      <div className="mx-auto max-w-[1380px] px-6">
        <BlurFade delay={0.2} inView>
          <div className="mb-10 flex justify-center">
            <div className="inline-flex gap-1 rounded-full border p-1.5" style={{ borderColor: 'var(--border-raw, #E4E2DD)', background: 'white' }}>
              {TABS.map(tab => {
                const Icon = tab.icon
                const isActive = activeTab === tab.key
                const tabAccent = TAB_ACCENTS[tab.key]
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className="relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-300"
                    style={{
                      fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
                      color: isActive ? 'var(--text, #1C1917)' : 'var(--text-3, #A8A29E)',
                      background: isActive ? 'var(--bg-page, #F4F3F0)' : 'transparent',
                    }}
                  >
                    <Icon size={15} strokeWidth={2} style={isActive ? { color: tabAccent.hex } : undefined} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute inset-x-3 -bottom-px h-[2px] rounded-full"
                        style={{ background: tabAccent.hex }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </BlurFade>

        {/* ---------- Feature grid ---------- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[1100px] pb-24"
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {currentTab.features.map((feature, idx) => {
                const num = String(idx + 1).padStart(2, '0')
                return (
                  <BlurFade key={feature.name} delay={0.04 * idx} inView>
                    <motion.div
                      className="group h-full"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div
                        className="relative h-full rounded-[16px]"
                        style={{
                          background: 'var(--bg-card, #fff)',
                          boxShadow: '0 1px 3px rgba(28,25,23,0.06), 0 4px 14px rgba(28,25,23,0.04)',
                          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 2px 6px rgba(28,25,23,0.08), 0 8px 24px rgba(28,25,23,0.06)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 1px 3px rgba(28,25,23,0.06), 0 4px 14px rgba(28,25,23,0.04)'
                        }}
                      >
                        <div className="p-6 pt-5">
                          {/* Number + Title row */}
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              style={{
                                fontFamily: "var(--font-hero, 'Advercase', sans-serif)",
                                fontSize: '28px',
                                fontWeight: 700,
                                lineHeight: 1,
                                color: accent.hex,
                                opacity: 0.18,
                              }}
                            >
                              {num}
                            </span>
                            <h3
                              className="text-[15px] font-bold leading-snug tracking-[-0.01em]"
                              style={{
                                fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
                                color: 'var(--text, #1C1917)',
                              }}
                            >
                              {feature.name}
                            </h3>
                          </div>
                          {/* Description */}
                          <p
                            className="text-[14px] leading-relaxed"
                            style={{
                              color: 'var(--text-2, #57534E)',
                              paddingLeft: 42,
                            }}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </BlurFade>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---------- Built different ---------- */}
      <section
        className="border-t py-20 lg:py-28"
        style={{ borderColor: 'var(--border-raw, #E4E2DD)' }}
      >
        <div className="mx-auto max-w-[740px] px-6 text-center">
          <BlurFade delay={0} inView>
            <h2
              className="text-balance leading-[1.05]"
              style={{
                fontFamily: "var(--font-hero, 'Advercase', sans-serif)",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
              }}
            >
              Built different.
            </h2>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-relaxed sm:text-[17px]" style={{ color: 'var(--text-2, #57534E)' }}>
              Other tools show you what happened. COOPR helps you figure out what to do next — and helps you do it.
            </p>
          </BlurFade>
          <div className="mt-10 flex flex-col gap-5 sm:items-center">
            {DIFFERENTIATORS.map((item, idx) => (
              <BlurFade key={item.headline} delay={0.15 + idx * 0.08} inView>
                <div
                  className="inline-flex flex-col gap-1.5 rounded-2xl border px-6 py-4 text-left sm:text-center"
                  style={{
                    borderColor: 'var(--border-raw, #E4E2DD)',
                    background: 'white',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                      style={{ background: 'var(--teal-soft, rgba(13,148,136,0.08))', color: 'var(--teal, #0D9488)' }}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className="text-[14px] font-bold"
                      style={{
                        fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
                        color: 'var(--text, #1C1917)',
                      }}
                    >
                      {item.headline}
                    </span>
                  </div>
                  <p className="pl-8 text-[13px] leading-relaxed sm:pl-0" style={{ color: 'var(--text-2, #57534E)' }}>
                    {item.body}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <div className="mx-auto max-w-[620px] px-6 py-20 text-center" id="cta">
        <BlurFade delay={0} inView>
          <div
            className="text-[11px] uppercase tracking-[0.16em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--teal, #0D9488)' }}
          >
            Ready to try it?
          </div>
          <h2
            className="mt-4 leading-[1.02] tracking-[-0.05em]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem, 4vw, 2.8rem)', fontWeight: 800 }}
          >
            See what COOPR sees in{' '}
            <em className="not-italic font-normal" style={{ fontFamily: 'var(--font-accent)', color: 'var(--teal, #0D9488)' }}>
              your content.
            </em>
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--text-2, #57534E)' }}>
            Join the waitlist. We will show you what your first 10 videos reveal — not just hand you a blank dashboard.
          </p>
          <a
            href="#/get-started"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold no-underline transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontFamily: 'var(--font-body)',
              background: 'var(--bg-dark, #1C1917)',
              color: 'var(--text-inv, #FAFAF9)',
              boxShadow: 'var(--shadow)',
            }}
          >
            Join the Waitlist
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="#FAFAF9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </BlurFade>
      </div>

      {/* ---------- Footer ---------- */}
      <footer className="border-t py-8" style={{ borderColor: 'var(--border-raw, #E4E2DD)' }}>
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 text-center text-xs sm:flex-row sm:text-left" style={{ color: 'var(--text-3, #A8A29E)' }}>
          <span>&copy; 2026 Coopr Labs. Built in California.</span>
          <div className="flex items-center gap-5">
            <a href="#/devlog" className="no-underline hover:opacity-80" style={{ color: 'var(--text-3, #A8A29E)' }}>Dev Log</a>
            <a href="#/privacy" className="no-underline hover:opacity-80" style={{ color: 'var(--text-3, #A8A29E)' }}>Privacy</a>
            <a href="#/terms" className="no-underline hover:opacity-80" style={{ color: 'var(--text-3, #A8A29E)' }}>Terms</a>
            <a href="#/data-deletion" className="no-underline hover:opacity-80" style={{ color: 'var(--text-3, #A8A29E)' }}>Data Deletion</a>
            <a href="mailto:henry@getcoopr.com" className="no-underline hover:opacity-80" style={{ color: 'var(--text-3, #A8A29E)' }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
