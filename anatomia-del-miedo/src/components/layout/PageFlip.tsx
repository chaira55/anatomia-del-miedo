import {
  useState, useCallback, useEffect, useRef, type ReactNode,
} from 'react'
import { motion } from 'framer-motion'
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
const EASE_OUT: [number, number, number, number] = [0.55, 0, 0.9, 0.05]
const EASE_IN:  [number, number, number, number] = [0.16, 1, 0.3, 1]

export function PageFlip({ pages, children, onPageChange }: PageFlipProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [prevPage,    setPrevPage]    = useState<number | null>(null)
  const [dir,         setDir]         = useState<'forward' | 'backward'>('forward')
  const [exitDir,     setExitDir]     = useState<'forward' | 'backward'>('forward')
  const [isTurning,   setIsTurning]   = useState(false)
  const lockRef      = useRef(false)
  const hasNavigated = useRef(false)
  const total        = pages.length

  const goTo = useCallback((index: number) => {
    if (lockRef.current) return
    if (index < 0 || index >= total) return
    const newDir = index > currentPage ? 'forward' : 'backward'
    lockRef.current    = true
    hasNavigated.current = true
    setExitDir(newDir)
    setDir(newDir)
    setPrevPage(currentPage)
    setIsTurning(true)
    setCurrentPage(index)
    onPageChange?.()
    setTimeout(() => {
      setIsTurning(false)
      setPrevPage(null)
      lockRef.current = false
    }, TURN_MS + 350)
  }, [currentPage, total, onPageChange])

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

  return (
    <NavContext.Provider value={{ currentPage, total, goTo, goNext, goPrev }}>
      <div
        className={styles.book}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.bookInterior} aria-hidden="true" />
        <div className={styles.spine}        aria-hidden="true" />
        <div className={styles.spineGlow}    aria-hidden="true" />

        {/* ── Página saliente: siempre en el árbol de React con la dirección correcta ── */}
        {prevPage !== null && (
          <motion.div
            key={`exit-${prevPage}`}
            className={styles.page}
            style={{ zIndex: 2 }}
            initial={{ rotateY: 0, filter: 'brightness(1)', scale: 1 }}
            animate={{
              rotateY: exitDir === 'forward' ? -90 : 90,
              transformOrigin: exitDir === 'forward' ? 'left center' : 'right center',
              filter: 'brightness(0.08)',
            }}
            transition={{ duration: TURN_MS / 1000, ease: EASE_OUT }}
          >
            {pages[prevPage].content}
          </motion.div>
        )}

        {/* ── Página entrante ── */}
        <motion.div
          key={`page-${currentPage}`}
          className={styles.page}
          style={{ zIndex: 1 }}
          initial={hasNavigated.current ? {
            rotateY: dir === 'forward' ? 10 : -10,
            transformOrigin: dir === 'forward' ? 'left center' : 'right center',
            filter: 'brightness(0.5) contrast(0.9)',
            scale: 0.97,
          } : false}
          animate={{
            rotateY: 0,
            transformOrigin: 'center center',
            filter: 'brightness(1) contrast(1)',
            scale: 1,
          }}
          transition={{
            delay:    prevPage !== null ? TURN_MS / 1000 * 0.45 : 0,
            duration: prevPage !== null ? 0.45 : 0,
            ease: EASE_IN,
          }}
        >
          {pages[currentPage].content}
        </motion.div>

        {/* ── Sombra del pliegue ── */}
        {isTurning && (
          <motion.div
            key={`fold-${currentPage}`}
            className={styles.foldShadow}
            style={{
              background: exitDir === 'forward'
                ? 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.06) 32%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.85) 48%, rgba(255,248,235,0.18) 49.2%, rgba(255,248,235,0.35) 50%, rgba(255,248,235,0.18) 50.8%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.06) 68%, transparent 100%)'
                : 'linear-gradient(to left,  transparent 0%, rgba(0,0,0,0.06) 32%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.85) 48%, rgba(255,248,235,0.18) 49.2%, rgba(255,248,235,0.35) 50%, rgba(255,248,235,0.18) 50.8%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.06) 68%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 300,
            }}
            initial={{ x: exitDir === 'forward' ? '50%' : '-50%' }}
            animate={{ x: exitDir === 'forward' ? '-50%' : '50%' }}
            transition={{ duration: TURN_MS / 1000, ease: [0.4, 0, 0.6, 1] }}
          />
        )}

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
