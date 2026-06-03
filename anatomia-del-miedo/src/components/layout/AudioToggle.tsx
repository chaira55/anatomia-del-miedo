import type { AudioAPI } from '../../hooks/useAudio'
import styles from './AudioToggle.module.css'

interface AudioToggleProps {
  audio: AudioAPI
}

export function AudioToggle({ audio }: AudioToggleProps) {
  const handleClick = () => {
    if (!audio.isStarted) {
      audio.start()
    } else {
      audio.toggleMute()
    }
  }

  const label = !audio.isStarted
    ? 'Activar audio ambiente'
    : audio.isMuted
    ? 'Activar audio'
    : 'Silenciar audio'

  const isPlaying = audio.isStarted && !audio.isMuted

  return (
    <button
      className={`${styles.btn} ${audio.isMuted ? styles.muted : ''} ${!audio.isStarted ? styles.inactive : ''}`}
      onClick={handleClick}
      aria-label={label}
      title={label}
    >
      {isPlaying ? (
        <span className={styles.waves} aria-hidden="true">
          <span className={styles.wave} />
          <span className={styles.wave} />
          <span className={styles.wave} />
        </span>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 3.53-2.04 6.6-5 8.13V3.87C17.96 5.4 19 8.47 19 12zM1 1l22 22-1.41 1.41L12 15.83V19l-5-5H3V9h1.17L1 5.83 2.41 4.41z"/>
        </svg>
      )}
    </button>
  )
}
