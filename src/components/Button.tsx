import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'accent' | 'outline'
  size?: 'default' | 'large'
  to?: string
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

export default function Button({
  children,
  variant = 'default',
  size = 'default',
  to,
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const classes = [
    'btn',
    variant !== 'default' ? `btn-${variant}` : '',
    size === 'large' ? 'btn-large' : '',
    className,
  ].filter(Boolean).join(' ')

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>
  }

  if (href) {
    return <a href={href} className={classes} target="_blank" rel="noopener noreferrer">{children}</a>
  }

  return <button className={classes} onClick={onClick} type={type}>{children}</button>
}
