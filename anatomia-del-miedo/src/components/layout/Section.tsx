import type { ReactNode } from 'react'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  fullBleed?: boolean
}

export function Section({ id, children, className = '', fullBleed = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${fullBleed ? '' : ''} ${className}`}
      style={fullBleed ? { padding: 0 } : undefined}
    >
      {children}
    </section>
  )
}
