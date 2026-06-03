import type { ReactNode } from 'react'
import styles from './PageContent.module.css'

interface PageContentProps {
  children: ReactNode
  fullBleed?: boolean
  glow?: string
}

export function PageContent({ children, fullBleed = false, glow }: PageContentProps) {
  if (fullBleed) return <>{children}</>
  return (
    <div
      className={styles.inner}
      style={glow ? ({ '--glow': glow } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
