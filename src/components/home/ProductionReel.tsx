import { motion } from 'motion/react'
import { DiscoverPreview, ScriptPreview, PlannerPreview, CadencePreview } from './home-sections'

const SCENES = [
  {
    num: '01',
    label: 'Discover',
    heading: 'Spot the opening others miss.',
    subline: 'Competitor shifts and trend data collapse into one clear view.',
    accent: 'var(--teal)',
    accentSoft: 'rgba(13,148,136,0.08)',
    Preview: DiscoverPreview,
  },
  {
    num: '02',
    label: 'Write',
    heading: 'Write it in your voice.',
    subline: 'Scripts matched to your style with voice scoring and novelty checks.',
    accent: 'var(--blue, #2563eb)',
    accentSoft: 'rgba(37,99,235,0.08)',
    Preview: ScriptPreview,
  },
  {
    num: '03',
    label: 'Plan',
    heading: 'Plan the shoot.',
    subline: 'Scene editor, shot storyboard, and production plan in one workspace.',
    accent: 'var(--slate, #475569)',
    accentSoft: 'rgba(71,85,105,0.08)',
    Preview: PlannerPreview,
  },
  {
    num: '04',
    label: 'Ship',
    heading: 'Pick the perfect window.',
    subline: 'Audience heatmaps and timing data so you post when it matters.',
    accent: 'var(--amber, #d97706)',
    accentSoft: 'rgba(217,119,6,0.08)',
    Preview: CadencePreview,
  },
]

export default function ProductionReel() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pt-8 pb-16">
      {/* Section header */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-3)] mb-3">
          The production reel
        </div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--text)]">
          Four moves. One scroll.
        </h2>
      </motion.div>

      {/* Scene cards — simple staggered reveal, no scroll hijacking */}
      <div className="space-y-8">
        {SCENES.map((scene, i) => (
          <motion.div
            key={scene.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.05,
            }}
          >
            <SceneCard scene={scene} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function SceneCard({ scene }: { scene: typeof SCENES[number] }) {
  return (
    <div
      className="rounded-[28px] border border-[var(--border-light)] bg-white/95 p-6 sm:p-8 shadow-[0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur-sm"
      style={{ background: `linear-gradient(180deg, ${scene.accentSoft}, rgba(255,255,255,0.98))` }}
    >
      {/* Scene header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-mono font-semibold"
          style={{ borderColor: scene.accent, background: scene.accentSoft, color: scene.accent }}
        >
          {scene.num}
        </div>
        <div
          className="font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: scene.accent }}
        >
          {scene.label}
        </div>
      </div>

      {/* Heading + subline */}
      <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--text)] mb-2">
        {scene.heading}
      </h3>
      <p className="text-[15px] leading-relaxed text-[var(--text-2)] mb-6 max-w-[480px]">
        {scene.subline}
      </p>

      {/* Product demo preview */}
      <div className="rounded-[22px] border border-[var(--border-light)] bg-white/80 p-4">
        <scene.Preview />
      </div>
    </div>
  )
}
