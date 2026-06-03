import {
  useState, useCallback, useEffect, useRef, type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavContext } from '../../context/NavigationContext'
import styles from './PageFlip.module.css'

export interface PageDef {
  id: string
  label: string
  content: ReactNode
}

interface PageFlipProps {
  pages: PageDef[]
  children?: ReactNode
  onPageChange?: () => void
}

const TURN_MS = 550

export function PageFlip({ pages, children, onPageChange }: PageFlipProps) {
  const [currentPage, setCurrentPage]   = useState(0)
  const [isTurning,   setIsTurning]     = useState(false)
  const dirRef  = useRef<'forward' | 'backward'>('forward')
  const lockRef = useRef(false)
  const total   = pages.length

  const goTo = useCallback((index: number) => {
    if (lockRef.current) return
    if (index < 0 || index >= total) return
    dirRef.current  = index > currentPage ? 'forward' : 'backward'
    lockRef.current = true
    setIsTurning(true)
    setCurrentPage(index)
    onPageChange?.()
    setTimeout(() => {
      setIsTurning(false)
      lockRef.current = false
    }, TURN_MS + 350)
  }, [currentPage, total])

  const goNext = useCallback(() => goTo(currentPage + 1), [goTo, currentPage])
  const goPrev = useCallback(() => goTo(currentPage - 1), [goTo, currentPage])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const touchStartX = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) < 50) return
    dx < 0 ? goNext() : goPrev()
  }

  const dir = dirRef.current

  return (
    <NavContext.Provider value={{ currentPage, total, goTo, goNext, goPrev }}>
      <div
        className={styles.book}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Interior oscuro del libro (visible durante la transición) */}
        <div className={styles.bookInterior} aria-hidden="true" />

        <div className={styles.spine}     aria-hidden="true" />
        <div className={styles.spineGlow} aria-hidden="true" />

        {/* ── Páginas ── */}
        <AnimatePresence mode="sync" custom={dir}>
          <motion.div
            key={currentPage}
            custom={dir}
            className={styles.page}

            // ── ENTRADA ──
            initial={{
              zIndex: 1,
              rotateY: dir === 'forward' ? 10 : -10,
              transformOrigin: dir === 'forward' ? 'left center' : 'right center',
              filter: 'brightness(0.5) contrast(0.9)',
              scale: 0.97,
            }}
            animate={{
              zIndex: 1,
              rotateY: 0,
              transformOrigin: 'center center',
              filter: 'brightness(1) contrast(1)',
              scale: 1,
              transition: {
                delay: TURN_MS / 1000 * 0.45,
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1] as const,
              },
            }}

            // ── SALIDA: usa variants con custom para conocer la dirección al desmontar ──
            variants={{
              exitForward:  { zIndex: 2, rotateY: -90, transformOrigin: 'left center',  filter: 'brightness(0.08)', transition: { duration: TURN_MS / 1000, ease: [0.55, 0, 0.9, 0.05] as const } },
              exitBackward: { zIndex: 2, rotateY:  90, transformOrigin: 'right center', filter: 'brightness(0.08)', transition: { duration: TURN_MS / 1000, ease: [0.55, 0, 0.9, 0.05] as const } },
            }}
            exit={dir === 'forward' ? 'exitForward' : 'exitBackward'}
          >
            {pages[currentPage].content}
          </motion.div>
        </AnimatePresence>

        {/* ── Sombra del pliegue que cruza la pantalla ── */}
        <AnimatePresence>
          {isTurning && (
            <motion.div
              key="fold-shadow"
              className={styles.foldShadow}
              style={{
                background: dir === 'forward'
                  ? 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.06) 32%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.85) 48%, rgba(255,248,235,0.18) 49.2%, rgba(255,248,235,0.35) 50%, rgba(255,248,235,0.18) 50.8%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.06) 68%, transparent 100%)'
                  : 'linear-gradient(to left,  transparent 0%, rgba(0,0,0,0.06) 32%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.85) 48%, rgba(255,248,235,0.18) 49.2%, rgba(255,248,235,0.35) 50%, rgba(255,248,235,0.18) 50.8%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.06) 68%, transparent 100%)',
              }}
              initial={{ x: dir === 'forward' ? '50%' : '-50%' }}
              animate={{ x: dir === 'forward' ? '-50%' : '50%' }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: TURN_MS / 1000, ease: [0.4, 0, 0.6, 1] }}
            />
          )}
        </AnimatePresence>

        {/* ── Borde derecho iluminado de la página (canto del papel) ── */}
        <AnimatePresence>
          {isTurning && (
            <motion.div
              key="page-edge"
              className={styles.pageEdge}
              initial={{ opacity: 0, x: dir === 'forward' ? 0 : 'auto', right: dir === 'forward' ? 0 : 'auto', left: dir === 'forward' ? 'auto' : 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: TURN_MS / 1000, times: [0, 0.1, 0.8, 1] }}
            />
          )}
        </AnimatePresence>

        {/* ── Flechas ── */}
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={goPrev}
          disabled={currentPage === 0}
          aria-label="Página anterior"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
          </svg>
        </button>

        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={goNext}
          disabled={currentPage === total - 1}
          aria-label="Página siguiente"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
          </svg>
        </button>

        {/* ── Puntos de página ── */}
        <div className={styles.pageIndicator} role="tablist" aria-label="Páginas">
          {pages.map((p, i) => (
            <button
              key={p.id}
              className={`${styles.dot} ${i === currentPage ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === currentPage}
              aria-label={p.label}
              title={p.label}
            />
          ))}
        </div>

        {children}
      </div>
    </NavContext.Provider>
  )
}
