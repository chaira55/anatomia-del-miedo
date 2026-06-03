import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './RevealText.module.css'

interface RevealTextProps {
  children: ReactNode
  delay?: number
  as?: 'p' | 'div'
}

interface QuoteProps {
  children: ReactNode
  author?: string
}

export function RevealText({ children, delay = 0, as: Tag = 'p' }: RevealTextProps) {
  const { ref, visible } = useReveal(0.2)

  return (
    <div className={styles.wrap}>
      <Tag
        ref={ref as React.RefObject<HTMLParagraphElement & HTMLDivElement>}
        className={`${styles.text} ${visible ? styles.visible : ''}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </Tag>
    </div>
  )
}

export function RevealQuote({ children, author }: QuoteProps) {
  const { ref, visible } = useReveal(0.3)

  return (
    <blockquote
      ref={ref as React.RefObject<HTMLQuoteElement>}
      className={`${styles.quote} ${visible ? styles.visible : ''}`}
    >
      {children}
      {author && <cite className={styles.author}>— {author}</cite>}
    </blockquote>
  )
}
