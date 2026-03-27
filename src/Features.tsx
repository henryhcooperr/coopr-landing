import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { MagicCard } from '@/components/ui/magic-card'
import { BrandLockup, HeaderActionCluster } from '@/components/shared/Brand'
import {
  Brain,
  AudioWaveform,
  Radar,
  BookOpen,
  Fingerprint,
  TrendingUp,
  Clapperboard,
  Sparkles,
  FileText,
  MapPin,
  Film,
  Layers,
  MessageSquareText,
  Clock,
  CalendarRange,
  Link2,
  BarChart3,
  Users,
  PieChart,
  Lightbulb,
  Target,
  type LucideIcon,
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  Tab + feature data                                                        */
/* -------------------------------------------------------------------------- */

type TabKey = 'intelligence' | 'production' | 'publishing' | 'analytics'

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

const TABS: TabDefinition[] = [
  {
    key: 'intelligence',
    label: 'Intelligence',
    icon: Brain,
    features: [
      {
        icon: Brain,
        name: 'Creative DNA',
        description: 'Your creative identity, visualized as a living constellation.',
      },
      {
        icon: AudioWaveform,
        name: 'Voice Profile',
        description: '8 dimensions of your voice so every script sounds like you.',
      },
      {
        icon: Radar,
        name: 'Niche Intelligence',
        description: 'Bayesian scoring of your positioning vs competitors.',
      },
      {
        icon: BookOpen,
        name: 'Knowledge System',
        description: 'Every conversation builds a searchable knowledge base.',
      },
      {
        icon: Fingerprint,
        name: 'Content Fingerprint',
        description: 'Signals from your content compiled into a unique fingerprint.',
      },
      {
        icon: TrendingUp,
        name: 'Trend Detection',
        description: 'Spots what\'s working before you do.',
      },
    ],
  },
  {
    key: 'production',
    label: 'Production',
    icon: Clapperboard,
    features: [
      {
        icon: Clapperboard,
        name: 'Studio Pipeline',
        description: '5-stage production flow from spark to published.',
      },
      {
        icon: Sparkles,
        name: 'Hook Lab',
        description: 'Generate and score hooks with predicted hold rates.',
      },
      {
        icon: FileText,
        name: 'Script Editor',
        description: 'Write scripts with pacing feedback in your voice.',
      },
      {
        icon: MapPin,
        name: 'Shoot Planner',
        description: 'Shot lists, locations, and timing from your script.',
      },
      {
        icon: Film,
        name: 'Clip Lab',
        description: 'Upload any clip for deep analysis and improvement suggestions.',
      },
      {
        icon: Layers,
        name: 'Series Management',
        description: 'Group content into narrative series.',
      },
    ],
  },
  {
    key: 'publishing',
    label: 'Publishing',
    icon: CalendarRange,
    features: [
      {
        icon: MessageSquareText,
        name: 'Caption Generation',
        description: 'Captions that match your voice with A/B variations.',
      },
      {
        icon: Clock,
        name: 'Optimal Timing',
        description: 'Best time to post based on your audience patterns.',
      },
      {
        icon: CalendarRange,
        name: 'Content Calendar',
        description: 'Visual calendar with topic spacing intelligence.',
      },
      {
        icon: Link2,
        name: 'Link in Bio',
        description: 'Performance-aware link page builder.',
      },
    ],
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    features: [
      {
        icon: BarChart3,
        name: 'Insights Panel',
        description: '19 components: retention curves, format breakdown, hashtag velocity.',
      },
      {
        icon: Users,
        name: 'Competitor Tracking',
        description: 'Win-loss comparison, growth history, strategy analysis.',
      },
      {
        icon: PieChart,
        name: 'Audience Demographics',
        description: 'Age, gender, location from platform insights.',
      },
      {
        icon: Lightbulb,
        name: 'Performance Correlations',
        description: 'Which content styles drive your best numbers.',
      },
      {
        icon: Target,
        name: 'Demand Radar',
        description: 'What your audience wants that you haven\'t made yet.',
      },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*  Differentiator bullets                                                    */
/* -------------------------------------------------------------------------- */

const DIFFERENTIATORS = [
  '285+ AI tools, not just dashboards',
  'Learns your voice, doesn\'t just analyze numbers',
  'Closes the loop from insight to publish to analysis',
]

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function Features() {
  const [activeTab, setActiveTab] = useState<TabKey>('intelligence')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const currentTab = TABS.find(t => t.key === activeTab)!

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-page, #F4F3F0)', color: 'var(--text, #1C1917)' }}>
      {/* ---------- Ambient glow ---------- */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div className="absolute left-[-4rem] top-20 h-[240px] w-[240px] rounded-full blur-[120px]" style={{ background: 'rgba(13,148,136,0.08)' }} />
        <div className="absolute right-[-4rem] top-24 h-[220px] w-[220px] rounded-full blur-[120px]" style={{ background: 'rgba(37,99,235,0.06)' }} />
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
            Everything COOPR does for you.
          </h1>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <p className="mx-auto mt-5 max-w-[600px] text-[16px] leading-relaxed sm:text-[17px]" style={{ color: 'var(--text-2, #57534E)' }}>
            Intelligence, production, publishing, and analytics — in one creative engine.
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
                    <Icon size={15} strokeWidth={2} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute inset-x-3 -bottom-px h-[2px] rounded-full"
                        style={{ background: 'var(--amber, #D97706)' }}
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentTab.features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <BlurFade key={feature.name} delay={0.05 * idx} inView>
                    <MagicCard
                      className="rounded-[20px] h-full"
                      gradientSize={260}
                      gradientColor="rgba(13,148,136,0.06)"
                      gradientFrom="var(--amber, #D97706)"
                      gradientTo="var(--teal, #0D9488)"
                      gradientOpacity={0.5}
                    >
                      <div className="relative z-40 p-6">
                        <div
                          className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                          style={{ background: 'var(--teal-soft, rgba(13,148,136,0.08))' }}
                        >
                          <Icon size={20} strokeWidth={1.75} style={{ color: 'var(--teal, #0D9488)' }} />
                        </div>
                        <h3
                          className="text-[15px] font-bold leading-snug tracking-[-0.01em]"
                          style={{
                            fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
                            color: 'var(--text, #1C1917)',
                          }}
                        >
                          {feature.name}
                        </h3>
                        <p
                          className="mt-1.5 text-[14px] leading-relaxed"
                          style={{ color: 'var(--text-2, #57534E)' }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </MagicCard>
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
              Other tools show you what happened. COOPR tells you what to do next — and helps you do it.
            </p>
          </BlurFade>
          <div className="mt-10 flex flex-col gap-4 sm:items-center">
            {DIFFERENTIATORS.map((text, idx) => (
              <BlurFade key={text} delay={0.15 + idx * 0.08} inView>
                <div
                  className="inline-flex items-center gap-3 rounded-full border px-5 py-3"
                  style={{
                    borderColor: 'var(--border-raw, #E4E2DD)',
                    background: 'white',
                  }}
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ background: 'var(--teal-soft, rgba(13,148,136,0.08))', color: 'var(--teal, #0D9488)' }}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-[14px] font-medium" style={{ color: 'var(--text, #1C1917)' }}>
                    {text}
                  </span>
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
