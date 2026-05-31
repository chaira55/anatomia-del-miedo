import { useNav } from '../../context/NavigationContext'
import styles from './ProgressBar.module.css'

export function ProgressBar() {
  const { currentPage, total } = useNav()
  const progress = total > 1 ? (currentPage / (total - 1)) * 100 : 0

  return (
    <div
      className={styles.bar}
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={currentPage + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Página ${currentPage + 1} de ${total}`}
    />
  )
}
