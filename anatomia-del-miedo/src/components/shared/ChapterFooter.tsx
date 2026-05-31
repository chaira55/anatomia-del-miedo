import { useNav } from '../../context/NavigationContext'
import styles from './ChapterFooter.module.css'

interface ChapterFooterProps {
  summary: string[]
  prevLabel?: string
  nextLabel?: string
}

export function ChapterFooter({
  summary,
  prevLabel = 'Anterior',
  nextLabel = 'Siguiente',
}: ChapterFooterProps) {
  const { currentPage, total, goNext, goPrev } = useNav()

  return (
    <footer className={styles.footer}>
      <p className={styles.label}>En resumen</p>
      <ul className={styles.list} role="list">
        {summary.map((point, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.bullet} aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>

      <div className={styles.nav}>
        {currentPage > 0 ? (
          <button className={styles.navBtn} onClick={goPrev}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
            </svg>
            {prevLabel}
          </button>
        ) : (
          <span />
        )}
        {currentPage < total - 1 && (
          <button className={styles.navBtn} onClick={goNext}>
            {nextLabel}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
            </svg>
          </button>
        )}
      </div>
    </footer>
  )
}
