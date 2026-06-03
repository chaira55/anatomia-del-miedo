import { motion, useReducedMotion } from 'framer-motion'
import styles from './ChapterHeader.module.css'

interface ChapterHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  number?: string
}

const variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function ChapterHeader({ eyebrow, title, subtitle, number }: ChapterHeaderProps) {
  const reduce = useReducedMotion()

  const anim = reduce
    ? { initial: false as const }
    : {
        variants,
        initial:    'hidden'  as const,
        whileInView: 'visible' as const,
        viewport:   { once: true, amount: 0.3 } as const,
      }

  return (
    <header className={styles.header}>
      {number && (
        <span className={styles.number} aria-hidden="true">{number}</span>
      )}

      <motion.p
        className={styles.eyebrow}
        {...anim}
        viewport={reduce ? undefined : { once: true, amount: 0.5 }}
        transition={reduce ? undefined : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        className={styles.title}
        {...anim}
        transition={reduce ? undefined : { duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={styles.subtitle}
          {...anim}
          transition={reduce ? undefined : { duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
      )}

      <div className={styles.divider} aria-hidden="true" />
    </header>
  )
}
