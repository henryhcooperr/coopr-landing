import { type ReactNode, type CSSProperties } from 'react'

interface StarBorderProps {
  children: ReactNode
  color?: string
  speed?: string
  thickness?: number
  className?: string
  style?: CSSProperties
}

export default function StarBorder({
  children,
  color = '#0D9488',
  speed = '4s',
  thickness = 1,
  className = '',
  style,
}: StarBorderProps) {
  return (
    <div
      className={`star-border-container ${className}`.trim()}
      style={{ padding: `${thickness}px`, ...style }}
    >
      <div
        className="star-border-gradient star-border-gradient--top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="star-border-gradient star-border-gradient--bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="star-border-inner">{children}</div>
    </div>
  )
}
