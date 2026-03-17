import { motion } from 'motion/react'

interface GlowPulseButtonProps {
  children: React.ReactNode
  href?: string
  glowColor?: string
  intensity?: number
  speed?: number
  className?: string
  onClick?: () => void
}

export default function GlowPulseButton({
  children,
  href,
  glowColor = '#0D9488',
  intensity = 12,
  speed = 3,
  className = '',
  onClick,
}: GlowPulseButtonProps) {
  const Tag = href ? motion.a : motion.button

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={className}
      animate={{
        boxShadow: [
          `0 0 ${intensity}px ${glowColor}40`,
          `0 0 ${intensity * 2}px ${glowColor}60`,
          `0 0 ${intensity}px ${glowColor}40`,
        ],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        y: -2,
        boxShadow: `0 0 ${intensity * 2.5}px ${glowColor}70`,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </Tag>
  )
}
