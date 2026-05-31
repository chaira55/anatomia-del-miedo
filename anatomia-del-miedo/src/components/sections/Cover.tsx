import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AudioAPI } from '../../hooks/useAudio'
import { useNav } from '../../context/NavigationContext'
import styles from './Cover.module.css'

interface CoverProps {
  audio: AudioAPI
}

const titleVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const EASE = [0.16, 1, 0.3, 1] as const

const lineVariants = {
  hidden:   { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible:  { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 1, ease: EASE } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.8, ease: EASE } },
}

export function Cover({ audio }: CoverProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [entered, setEntered] = useState(false)
  const { goNext } = useNav()

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.addEventListener('canplaythrough', () => setVideoReady(true), { once: true })
  }, [])

  const handleEnter = () => {
    setEntered(true)
    audio.start()
    setTimeout(() => goNext(), 600)
  }

  return (
    <div className={styles.cover}>
      {/* Fondo fallback (siempre visible, el video va encima) */}
      <div className={styles.fallbackBg} aria-hidden="true" />

      {/* Video de fondo — colocar assets/video/cover.mp4 */}
      <video
        ref={videoRef}
        className={styles.video}
        src="/assets/video/cover.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{ opacity: videoReady ? 0.25 : 0 }}
      />

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          Una revista sobre el cine de terror
        </motion.p>

        <motion.h1
          className={styles.title}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className={styles.titleLine} variants={lineVariants}>
            Anatomía
          </motion.span>
          <motion.span className={styles.titleLine} variants={lineVariants}>
            del Miedo
          </motion.span>
        </motion.h1>

        <motion.p
          className={styles.question}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          ¿Por qué nos gusta sentir miedo?
        </motion.p>

        <AnimatePresence>
          <motion.button
            className={styles.btn}
            onClick={handleEnter}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
            aria-label="Entrar a la revista"
            disabled={entered}
          >
            {entered ? 'Descendiendo…' : 'Entrar'}
            {!entered && (
              <svg className={styles.btnIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
              </svg>
            )}
          </motion.button>
        </AnimatePresence>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span>Descender</span>
      </div>
    </div>
  )
}
