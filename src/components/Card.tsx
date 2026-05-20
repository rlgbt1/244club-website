import { ReactNode } from 'react'

type CardVariant = 'white' | 'red' | 'yellow' | 'mint' | 'purple' | 'dark' | 'green'

interface CardProps {
  variant?: CardVariant
  className?: string
  children: ReactNode
  style?: React.CSSProperties
}

export default function Card({ variant = 'white', className = '', children, style }: CardProps) {
  const variantClass = variant === 'white' ? '' : `card-${variant}`
  return (
    <div className={`card ${variantClass} ${className}`} style={style}>
      {children}
    </div>
  )
}
