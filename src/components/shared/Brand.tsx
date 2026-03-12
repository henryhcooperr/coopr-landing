import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { ReactNode } from 'react'

type BrandAssetProps = {
  className?: string
  alt?: string
}

export function BrandMark({ className, alt = 'Coopr' }: BrandAssetProps) {
  return (
    <img
      src="/coopr-mark.png"
      alt={alt}
      className={cn('h-8 w-auto object-contain', className)}
    />
  )
}

export function BrandBanner({ className, alt = 'Coopr Labs' }: BrandAssetProps) {
  return (
    <img
      src="/coopr-labs-banner.png"
      alt={alt}
      className={cn('h-4 w-auto object-contain', className)}
    />
  )
}

type BrandLockupProps = {
  className?: string
  bannerClassName?: string
}

export function BrandLockup({
  className,
  bannerClassName,
}: BrandLockupProps) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <BrandBanner className={cn('h-[24px] sm:h-[34px] lg:h-[40px]', bannerClassName)} />
    </span>
  )
}

export function HeroBrandStack() {
  return (
    <div className="mb-9 flex flex-col items-center sm:mb-10">
      <BrandMark className="h-[120px] sm:h-[132px]" />
    </div>
  )
}

type HeaderActionClusterProps = {
  primaryHref?: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  secondaryIcon?: ReactNode
}

export function HeaderActionCluster({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  secondaryIcon,
}: HeaderActionClusterProps) {
  const secondaryContent = (
    <>
      <span>{secondaryLabel}</span>
      {secondaryIcon}
    </>
  )

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[rgba(17,17,17,0.08)] bg-white/88 p-1.5 shadow-[0_12px_32px_rgba(17,17,17,0.06)] backdrop-blur-md">
      {primaryHref ? (
        <a
          href={primaryHref}
          onClick={onPrimaryClick}
          className="inline-flex items-center rounded-full px-4 py-2 text-[13px] font-medium text-[var(--text-2)] no-underline transition-colors hover:text-[var(--text)]"
        >
          {primaryLabel}
        </a>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 rounded-full px-4 text-[13px] font-medium text-[var(--text-2)] hover:bg-transparent hover:text-[var(--text)]"
          onClick={onPrimaryClick}
        >
          {primaryLabel}
        </Button>
      )}

      {secondaryHref ? (
        <a
          href={secondaryHref}
          onClick={onSecondaryClick}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-dark)] px-4 py-2 text-[13px] font-semibold text-[var(--text-inv)] no-underline transition-all duration-200 hover:-translate-y-px hover:shadow-[var(--shadow)]"
        >
          {secondaryContent}
        </a>
      ) : (
        <Button
          size="sm"
          className="h-9 rounded-full bg-[var(--bg-dark)] px-4 text-[13px] font-semibold text-[var(--text-inv)] hover:bg-[var(--bg-dark)] hover:-translate-y-px hover:shadow-[var(--shadow)]"
          onClick={onSecondaryClick}
        >
          {secondaryContent}
        </Button>
      )}
    </div>
  )
}
