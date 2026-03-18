import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { BrandLockup, HeaderActionCluster } from '@/components/shared/Brand'
import { DEVLOG_ENTRIES, type DevlogEntry } from '@/data/devlog-entries'

/* ── Helpers ───────────────────────────────────────── */

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function yearOf(iso: string): string {
  return iso.slice(0, 4)
}

const TAG_STYLES: Record<string, string> = {
  new: 'bg-[rgba(13,148,136,0.10)] text-[var(--teal)]',
  improved: 'bg-[rgba(124,58,237,0.10)] text-[var(--violet)]',
  fixed: 'bg-[rgba(234,88,12,0.10)] text-[var(--amber)]',
}

/* ── Scroll reveal hook (matches Features.tsx pattern) ─ */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(ref.current.querySelectorAll<HTMLElement>('.dl-reveal'))

    if (prefersReduced) {
      els.forEach(el => el.classList.add('vis'))
      return
    }

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )

    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return ref
}

/* ── Also Shipped (collapsible) ────────────────────── */

function AlsoShipped({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-3 border-t border-[var(--border-light)] pt-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="group flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0 font-body text-[13px] font-medium text-[var(--text-3)] transition-colors duration-200 hover:text-[var(--text-2)]"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={cn(
            'transition-transform duration-200',
            open && 'rotate-90',
          )}
        >
          <path d="M6 4l4 4-4 4" />
        </svg>
        Also shipped
      </button>
      {open && (
        <ul className="mt-2.5 list-none space-y-1.5 pl-0">
          {items.map((item, i) => (
            <li
              key={i}
              className="relative pl-3.5 text-[13px] leading-relaxed text-[var(--text-2)] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--text-3)]"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ── Single Entry ──────────────────────────────────── */

function Entry({
  entry,
  index,
  isLast,
}: {
  entry: DevlogEntry
  index: number
  isLast: boolean
}) {
  return (
    <article
      className="dl-reveal opacity-0 translate-y-6 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [&.vis]:opacity-100 [&.vis]:translate-y-0"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="grid grid-cols-[90px_24px_1fr] gap-x-3 pb-10 last:pb-0 max-sm:grid-cols-1 max-sm:gap-x-0 max-sm:pl-7">
        {/* Date */}
        <div className="text-right font-mono text-[13px] text-[var(--text-3)] pt-0.5 max-sm:text-left max-sm:mb-1 max-sm:text-xs">
          {formatDate(entry.date)}
        </div>

        {/* Timeline */}
        <div className="flex flex-col items-center max-sm:absolute max-sm:left-0 max-sm:top-0 max-sm:bottom-0 max-sm:w-6">
          <div className="relative z-[2] mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full border-2 border-[var(--bg)] bg-[var(--teal)] shadow-[0_0_0_2px_var(--teal)]">
            <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(13,148,136,0.08)]" />
          </div>
          <div
            className={cn(
              'mt-2 w-px flex-1',
              isLast
                ? 'bg-gradient-to-b from-[var(--border-light)] to-transparent'
                : 'bg-[var(--border-light)]',
            )}
          />
        </div>

        {/* Content */}
        <div className="min-w-0 max-sm:relative">
          {/* Title */}
          <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold leading-tight tracking-[-0.03em] text-[var(--text)]">
            {entry.title}
          </h2>

          {/* Summary */}
          <p className="mt-1.5 max-w-[520px] text-[15px] leading-relaxed text-[var(--text-2)]">
            {entry.summary}
          </p>

          {/* Tags */}
          {entry.tags.length > 0 && (
            <div className="mt-2.5 flex gap-2">
              {entry.tags.map(tag => (
                <span
                  key={tag}
                  className={cn(
                    'inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
                    TAG_STYLES[tag],
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Also Shipped */}
          {entry.alsoShipped && entry.alsoShipped.length > 0 && (
            <AlsoShipped items={entry.alsoShipped} />
          )}
        </div>
      </div>
    </article>
  )
}

/* ── Page ───────────────────────────────────────────── */

export default function Devlog() {
  const wrapRef = useScrollReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Group entries by year
  const years = Array.from(new Set(DEVLOG_ENTRIES.map(e => yearOf(e.date))))

  return (
    <div ref={wrapRef} className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border-light)] bg-[var(--bg)]/82 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1380px] items-center justify-between px-6">
          <a
            href="#"
            onClick={() => {
              window.location.hash = ''
              window.scrollTo(0, 0)
            }}
            className="flex items-center gap-2 no-underline"
          >
            <BrandLockup />
          </a>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center rounded-full border border-[rgba(13,148,136,0.15)] bg-[rgba(13,148,136,0.06)] px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider text-[var(--teal)]">
              BETA
            </span>
            <HeaderActionCluster
              primaryHref="#"
              primaryLabel="Home"
              secondaryHref="https://app.getcoopr.com"
              secondaryLabel="Open COOPR"
            />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="dl-reveal opacity-0 translate-y-6 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [&.vis]:opacity-100 [&.vis]:translate-y-0 mx-auto max-w-[720px] px-6 pb-6 pt-20 text-center sm:pt-24">
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.04em]">
          Dev Log
        </h1>
        <p className="mt-3 font-accent text-[clamp(1.05rem,2vw,1.3rem)] italic text-[var(--text-2)]">
          What we're building, every week.
        </p>
        <div className="mx-auto mt-8 h-px w-12 bg-[var(--teal)] opacity-40" />
      </header>

      {/* Timeline */}
      <main className="mx-auto max-w-[680px] px-6 pb-16 pt-8 sm:pb-20">
        {years.map(year => {
          const yearEntries = DEVLOG_ENTRIES.filter(e => yearOf(e.date) === year)
          return (
            <section key={year}>
              {/* Year header */}
              <div className="sticky top-[72px] z-10 bg-[var(--bg)] pb-3 pt-4">
                <span className="font-mono text-[13px] font-medium tracking-widest text-[var(--text-3)]">
                  {year}
                </span>
              </div>

              {/* Entries */}
              <div className="relative max-sm:[&>article]:relative">
                {yearEntries.map((entry, i) => (
                  <Entry
                    key={entry.slug}
                    entry={entry}
                    index={i}
                    isLast={i === yearEntries.length - 1}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-raw)] py-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 text-center text-xs text-[var(--text-3)] sm:flex-row sm:text-left">
          <span>&copy; 2026 Coopr Labs. Built in California.</span>
          <div className="flex items-center gap-5">
            <a
              href="#/privacy"
              className="text-[var(--text-3)] no-underline hover:text-[var(--text)]"
            >
              Privacy
            </a>
            <a
              href="#/terms"
              className="text-[var(--text-3)] no-underline hover:text-[var(--text)]"
            >
              Terms
            </a>
            <a
              href="#/data-deletion"
              className="text-[var(--text-3)] no-underline hover:text-[var(--text)]"
            >
              Data Deletion
            </a>
            <a
              href="mailto:henry@getcoopr.com"
              className="text-[var(--text-3)] no-underline hover:text-[var(--text)]"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
