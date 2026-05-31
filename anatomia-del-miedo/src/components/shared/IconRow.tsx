import type { ReactElement } from 'react'
import React from 'react'
import styles from './IconRow.module.css'

type IconType = 'video' | 'audio' | 'interactive' | 'gallery' | 'map' | 'quiz'

interface IconRowItem {
  type: IconType
  label: string
}

interface IconRowProps {
  items: IconRowItem[]
}

const ICONS: Record<IconType, ReactElement> = {
  video: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
    </svg>
  ),
  audio: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6zm-2 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
    </svg>
  ),
  interactive: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26a1 1 0 0 0-.84 0L12 14.39V7.5a1.5 1.5 0 0 0-3 0V17l-3.41-.71a1 1 0 0 0-.79 1.8l4.87 3.25A2 2 0 0 0 11 22h6a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-.16-.63z"/>
    </svg>
  ),
  gallery: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14a2 2 0 0 0 2 2h14v-2H4V6H2z"/>
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9a.5.5 0 0 0-.36.48V20.5a.5.5 0 0 0 .5.5l.16-.03L9 18.9l6 2.1 5.64-1.9a.5.5 0 0 0 .36-.48V3.5a.5.5 0 0 0-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
    </svg>
  ),
  quiz: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
    </svg>
  ),
}

export function IconRow({ items }: IconRowProps) {
  return (
    <div className={styles.row} aria-label="Recursos de esta sección">
      {items.map(({ type, label }, i) => (
        <span key={type} style={{ display: 'contents' }}>
          {i > 0 && <span className={styles.separator} aria-hidden="true" />}
          <span className={styles.item}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              {(ICONS[type] as ReactElement<{ children: React.ReactNode }>).props.children}
            </svg>
            {label}
          </span>
        </span>
      ))}
    </div>
  )
}
