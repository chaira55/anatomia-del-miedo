import { useState, useRef, useEffect } from 'react'
import styles from './GeniallyEmbed.module.css'

interface GeniallyEmbedProps {
  src: string
  title: string
}

const TIMEOUT_MS = 10_000

export function GeniallyEmbed({ src, title }: GeniallyEmbedProps) {
  const [loaded, setLoaded] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => setTimedOut(true), TIMEOUT_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const handleLoad = () => {
    setLoaded(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    setTimedOut(false)
  }

  return (
    <div className={styles.wrap}>
      {!loaded && (
        <div className={styles.overlay}>
          {timedOut ? (
            <div className={styles.fallback}>
              <p className={styles.fallbackText}>
                No se pudo cargar el contenido interactivo.
              </p>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fallbackLink}
              >
                Abrir en Genially →
              </a>
            </div>
          ) : (
            <div
              className={styles.spinner}
              aria-label="Cargando contenido interactivo…"
              role="status"
            />
          )}
        </div>
      )}
      <iframe
        src={src}
        className={styles.iframe}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
        allowFullScreen
        loading="lazy"
        title={title}
        onLoad={handleLoad}
      />
    </div>
  )
}
