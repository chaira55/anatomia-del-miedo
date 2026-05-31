import { motion } from 'framer-motion'
import styles from './ChapterHeader.module.css'

interface ChapterHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  number?: string
}

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function ChapterHeader({ eyebrow, title, subtitle, number }: ChapterHeaderProps) {
  return (
    <header className={styles.header}>
      {number && (
        <span className={styles.number} aria-hidden="true">{number}</span>
      )}

      <motion.p
        className={styles.eyebrow}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        className={styles.title}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={styles.subtitle}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
      )}

      <div className={styles.divider} aria-hidden="true" />
    </header>
  )
}
