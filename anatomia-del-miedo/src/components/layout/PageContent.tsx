import type { ReactNode } from 'react'
import styles from './PageContent.module.css'

interface PageContentProps {
  children: ReactNode
  fullBleed?: boolean
}

export function PageContent({ children, fullBleed = false }: PageContentProps) {
  if (fullBleed) return <>{children}</>
  return <div className={styles.inner}>{children}</div>
}
