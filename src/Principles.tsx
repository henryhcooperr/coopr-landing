import { Button } from '@/components/ui/button'
import { BrandLockup, BrandMark } from '@/components/shared/Brand'

interface Principle {
  number: string
  title: string
  body: string
  alternative?: string
}

const PRINCIPLES: Principle[] = [
  {
    number: '01',
    title: 'A button that auto-publishes a month of posts while you sleep',
    body:
      "Hootsuite, Later, and a fresh wave of agents will write and publish thirty posts from a one-line brief. We won't. The whole point of COOPR is that every post carries your voice. A flow that ships posts without your eyes on them ships them in the model's voice, not yours. That's the opposite of what we sell.",
    alternative:
      'Plan a month, approve in a batch. We draft, you approve or edit each one before it ships. The wall-clock saving stays. The voice stays.',
  },
  {
    number: '02',
    title: 'AI that auto-replies to your DMs in your name',
    body:
      "Most inbox tools will quietly send replies that look like you wrote them. We won't. A bad reply lives forever as a screenshot tagged with your handle, not the tool's. And Meta has a long history of suspending accounts that touch DMs through automation — we are not going to put your account on that list.",
    alternative:
      "Inbox triage and draft-reply assist. We classify what's coming in and draft a voice-matched response. You tap approve, edit, or discard. Nothing sends without you.",
  },
  {
    number: '03',
    title: '"Make it viral" buttons and virality scores',
    body:
      "OpusClip slaps a 0–100 virality score on every clip. Their own users will tell you the low-scored clips often outperform the high-scored ones. A score we can't validate against your audience is a number that means nothing — and pretending otherwise is the kind of dishonest that kills a brand. There is no universal definition of viral, and we won't ship one.",
    alternative:
      "Per-creator pattern lift. We tell you when a hook matches a pattern that worked for you in the last ninety days, and we show you the receipts.",
  },
  {
    number: '04',
    title: 'Niche-specific template packs',
    body:
      "GoHighLevel ships a fitness pack and a real-estate pack. We will not ship a fitness pack, a real-estate pack, a finance pack, or any pack. Hard-coding niches is the canonical anti-pattern this product was built against. Your Content Fingerprint is the personalization. Anything else is a worse, more cloneable version of the same idea.",
  },
  {
    number: '05',
    title: 'Bulk caption generators that spit out ten options',
    body:
      "Buffer ships ten generic caption variants for free. We will not compete on that surface, because it is a quantity competition we would lose to a feature that already depresses engagement by fifteen percent. You don't need ten captions. You need one that sounds like you, on the post you are about to publish.",
    alternative:
      'One voice-anchored caption with surgical edit affordances. "Shorter," "more direct," "swap the hook." Every accept, edit, and reject teaches the system more about your voice.',
  },
  {
    number: '06',
    title: 'Engagement-bait hook generators',
    body:
      'Captain Hook AI ships a library of "controversial," "hot take," and "forbidden knowledge" templates trained on a thousand viral patterns scraped from other people. We will not. Polarization-by-formula is exactly what audiences are penalizing in 2026, and a universal controversy generator either flattens every niche into the same shape or hardcodes a different shape per niche. Both options break the product.',
    alternative:
      'Hook patterns from your last ninety days, sorted by lift, with the evidence visible. The training corpus is your own work.',
  },
  {
    number: '07',
    title: 'Follower-growth automations, engagement pods, and mass-DM',
    body:
      "Plixi, Upgrow, and the rest will sell you followers. Some of them will sell you engagement pods that fake the early-window signal. We will not, ever. Meta's systems flag this behavior; brand auditors flag this behavior; fifteen to twenty percent of major-platform followers are already inauthentic and adding to that pile actively shrinks your reach. One TechCrunch headline calling COOPR an Instagram bot tool ends the company. The downside is unbounded. The upside is a number you don't even believe.",
  },
  {
    number: '08',
    title: 'A one-click full auto-edit pipeline',
    body:
      "Submagic and OpusClip own the editor layer — silence detection, face-tracking zoom, sound effects, B-roll licensing, hook-title models. That is a different product, and a great one. COOPR sits upstream of the editor, where the creative decisions happen. Building our own auto-edit would be feature-creep into a layer we shouldn't own and don't want to.",
    alternative:
      "Use the editor you already use. We focus on what to film, what to say, and which of your past clips deserve another life.",
  },
  {
    number: '09',
    title: 'A link-in-bio storefront with affiliate monetization',
    body:
      "Beacons and Linktree own the link-in-bio layer. The market is saturated and the business model is affiliate revenue, which is not a business we want to be in. We will not clone them.",
    alternative:
      'Integrate, do not rebuild. Deep-link from your COOPR library and media kit into Beacons or Linktree. Let them own the storefront.',
  },
  {
    number: '10',
    title: 'AI Eye Contact and other post-production beauty filters',
    body:
      "Some tools will quietly redirect your gaze in post so you appear to look at the camera. That is a beauty filter, not a creative-decision tool, and it is not the job COOPR is positioned to do. We will not ship gaze correction, AI face smoothing, or any other in-post cosmetic patch.",
  },
]

function Principles() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <a href="#/" className="flex items-center gap-2">
            <BrandLockup />
          </a>
          <Button
            variant="outline"
            size="sm"
            className="text-[13px] h-8 px-3 rounded-lg border-border hover:bg-secondary"
            onClick={() => {
              window.location.hash = '#/'
              window.scrollTo(0, 0)
            }}
          >
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-28 pb-10 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[13px] uppercase tracking-[0.18em] text-coopr-subtle mb-4">
            Principles
          </p>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold tracking-[-0.03em] text-foreground mb-5 leading-[1.05]">
            What COOPR refuses to build.
          </h1>
          <p className="text-[17px] leading-[1.55] text-coopr-body">
            Most creator tools are racing to ship every AI feature on the
            roadmap. We're not. The shortcut features make worse work and
            cheaper creators, and a creative engine that does both is not a
            tool we'd use ourselves. So here is the list — in plain language —
            of the things competitors ship that we will not.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <ol className="space-y-12">
            {PRINCIPLES.map((p) => (
              <li key={p.number} className="border-t border-border pt-8">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-[14px] font-mono text-coopr-subtle tabular-nums">
                    {p.number}
                  </span>
                  <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-foreground leading-[1.3]">
                    {p.title}
                  </h2>
                </div>
                <p className="text-[15px] leading-relaxed text-coopr-body mb-3">
                  {p.body}
                </p>
                {p.alternative && (
                  <p className="text-[15px] leading-relaxed text-foreground">
                    <span className="font-medium">What we do instead. </span>
                    {p.alternative}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto border-t border-border pt-10">
          <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-foreground mb-3">
            Building something we should add to this list?
          </h2>
          <p className="text-[15px] leading-relaxed text-coopr-body mb-5">
            We will say no to a lot of features in public. Tell us where the
            line is wrong.
          </p>
          <a
            href="mailto:henry@getcoopr.com?subject=Add%20to%20the%20refuse-to-build%20list"
            className="inline-flex items-center text-[14px] font-medium text-coopr-serif underline underline-offset-4 hover:text-foreground transition-colors"
          >
            henry@getcoopr.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BrandMark className="h-5 w-5" />
            <span className="text-[13px] text-muted-foreground">
              Coopr by Lensofcoop LLC
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#/"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </a>
            <a
              href="#/features"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#/privacy"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#/terms"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a
              href="mailto:henry@getcoopr.com"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Principles
