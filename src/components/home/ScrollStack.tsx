import { useLayoutEffect, useRef, useCallback, type ReactNode } from 'react'
import Lenis from 'lenis'

interface ScrollStackProps {
  children: ReactNode
  className?: string
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  blurAmount?: number
}

export function ScrollStackItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`scroll-stack-card ${className}`.trim()}>{children}</div>
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  blurAmount = 0,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef<number>(0)
  const lenisRef = useRef<Lenis | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const lastTransformsRef = useRef(new Map<number, { translateY: number; scale: number; blur: number }>())
  const isUpdatingRef = useRef(false)

  const parsePercentage = useCallback((value: string, containerHeight: number) => {
    if (value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight
    }
    return parseFloat(value)
  }, [])

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return
    isUpdatingRef.current = true

    const scrollTop = window.scrollY
    const containerHeight = window.innerHeight
    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)

    const endElement = document.querySelector('.scroll-stack-end')
    const endElementTop = endElement
      ? endElement.getBoundingClientRect().top + scrollTop
      : 0

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      const cardTop = card.getBoundingClientRect().top + scrollTop
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i
      const pinEnd = endElementTop - containerHeight / 2

      // Scale progress
      const scaleRaw = scrollTop < triggerStart ? 0 : scrollTop > triggerEnd ? 1 : (scrollTop - triggerStart) / (triggerEnd - triggerStart)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleRaw * (1 - targetScale)

      // Blur
      let blur = 0
      if (blurAmount) {
        let topCardIndex = 0
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardsRef.current[j].getBoundingClientRect().top + scrollTop
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j
          if (scrollTop >= jTriggerStart) topCardIndex = j
        }
        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount)
        }
      }

      // Pin position
      let translateY = 0
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i
      }

      const newT = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        blur: Math.round(blur * 100) / 100,
      }

      const last = lastTransformsRef.current.get(i)
      const changed =
        !last ||
        Math.abs(last.translateY - newT.translateY) > 0.1 ||
        Math.abs(last.scale - newT.scale) > 0.001 ||
        Math.abs(last.blur - newT.blur) > 0.1

      if (changed) {
        card.style.transform = `translate3d(0, ${newT.translateY}px, 0) scale(${newT.scale})`
        card.style.filter = newT.blur > 0 ? `blur(${newT.blur}px)` : ''
        lastTransformsRef.current.set(i, newT)
      }
    })

    isUpdatingRef.current = false
  }, [itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, blurAmount, parsePercentage])

  const handleScroll = useCallback(() => {
    updateCardTransforms()
  }, [updateCardTransforms])

  useLayoutEffect(() => {
    // Reduced motion: skip Lenis, use native scroll
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const cards = Array.from(document.querySelectorAll<HTMLElement>('.scroll-stack-card'))
    cardsRef.current = cards

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`
      card.style.willChange = 'transform, filter'
      card.style.transformOrigin = 'top center'
    })

    if (prefersReduced) {
      // Just listen for native scroll
      window.addEventListener('scroll', handleScroll, { passive: true })
      updateCardTransforms()
      return () => {
        window.removeEventListener('scroll', handleScroll)
        cardsRef.current = []
        lastTransformsRef.current.clear()
      }
    }

    // Set up Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })
    lenis.on('scroll', handleScroll)
    lenisRef.current = lenis

    const raf = (time: number) => {
      lenis.raf(time)
      animationFrameRef.current = requestAnimationFrame(raf)
    }
    animationFrameRef.current = requestAnimationFrame(raf)

    updateCardTransforms()

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      lenis.destroy()
      lenisRef.current = null
      stackCompletedRef.current = false
      cardsRef.current = []
      lastTransformsRef.current.clear()
      isUpdatingRef.current = false
    }
  }, [itemDistance, handleScroll, updateCardTransforms])

  return (
    <div className={className} ref={scrollerRef}>
      {children}
      <div className="scroll-stack-end" />
    </div>
  )
}
