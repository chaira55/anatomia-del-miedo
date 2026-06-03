import { useState } from 'react'
import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText } from '../shared/RevealText'
import { QUESTIONS, RESULTS, computeResult } from '../../data/quiz'
import type { FearKey } from '../../data/quiz'
import styles from './Closing.module.css'

type Answers = Partial<Record<number, FearKey>>

const CREDITS = [
  { role: 'Dirección editorial',       names: ['Sofía Usuga Gaviria'] },
  { role: 'Contenido e investigación', names: ['Sofía Usuga Gaviria'] },
  { role: 'Diseño & desarrollo',       names: ['Sharik Jimena Guzmán Arroyo', 'Jacobo Losada Higuita'] },
]

export function Closing() {
  const [answers, setAnswers] = useState<Answers>({})
  const [step,    setStep]    = useState<'intro' | 'quiz' | 'result'>('intro')
  const [current, setCurrent] = useState(0)

  const handleAnswer = (key: FearKey) => {
    const next = { ...answers, [current]: key }
    setAnswers(next)
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1)
    } else {
      setStep('result')
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrent(0)
    setStep('intro')
  }

  const resultKey = step === 'result' ? computeResult(answers) : null
  const result    = resultKey ? RESULTS[resultKey] : null

  return (
    <>
      <ChapterHeader
        eyebrow="Cierre"
        title="¿Qué nos dice el terror sobre nosotros?"
        subtitle="Durante más de un siglo, el cine ha transformado nuestros miedos en historias. Descubre qué tipo de miedo domina tu imaginación."
      />

      <RevealText>
        No todos tememos a las mismas cosas. Algunas personas temen perder el control.
        Otras, quedarse solas. Algunas miran al monstruo. Otras miran hacia dentro.
      </RevealText>

      <div className={styles.quiz}>

        {/* ── Intro ── */}
        {step === 'intro' && (
          <div className={styles.intro}>
            <p className={styles.introLabel}>Test · 6 preguntas · 6 perfiles posibles</p>
            <p className={styles.introSubtitle}>
              Selecciona la opción que más te identifique en cada pregunta.
            </p>
            <button className={styles.btnStart} onClick={() => setStep('quiz')}>
              Comenzar
            </button>
          </div>
        )}

        {/* ── Quiz ── */}
        {step === 'quiz' && (
          <div className={styles.quizBody}>
            <div className={styles.progressRow}>
              <span className={styles.progressCounter}>{current + 1} / {QUESTIONS.length}</span>
              <div className={styles.progressDots} aria-hidden="true">
                {QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.dot} ${
                      i < current
                        ? styles.dotPast
                        : i === current
                        ? styles.dotCurrent
                        : styles.dotFuture
                    }`}
                  />
                ))}
              </div>
            </div>

            <p key={current} className={styles.question}>
              {QUESTIONS[current].text}
            </p>

            <div className={styles.options}>
              {QUESTIONS[current].options.map((opt) => (
                <button
                  key={opt.key}
                  className={styles.option}
                  onClick={() => handleAnswer(opt.key)}
                >
                  <span className={styles.optionKey} aria-hidden="true">{opt.key}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Resultado ── */}
        {step === 'result' && result && resultKey && (
          <div className={styles.resultBody}>
            <p className={styles.resultLabel} style={{ color: result.accent }}>
              Tu miedo dominante
            </p>
            <h3 className={styles.resultGenre}>{result.genre}</h3>
            <p className={styles.resultTitle}>{result.title}</p>
            <div className={styles.resultDivider} style={{ background: result.accent }} />
            <p className={styles.resultText}>{result.desc}</p>

            <div className={styles.barsSection}>
              <p className={styles.barsLabel}>Tu perfil de miedo</p>
              <div className={styles.bars}>
                {(Object.keys(RESULTS) as FearKey[]).map((key) => {
                  const count = Object.values(answers).filter((v) => v === key).length
                  const pct   = Math.round((count / QUESTIONS.length) * 100)
                  return (
                    <div key={key} className={styles.barRow}>
                      <span
                        className={styles.barName}
                        style={{ color: key === resultKey ? RESULTS[key].accent : undefined }}
                      >
                        {RESULTS[key].genre}
                      </span>
                      <div className={styles.barTrack}>
                        <div
                          className={styles.barFill}
                          style={{
                            width: `${pct}%`,
                            background: key === resultKey ? RESULTS[key].accent : 'rgba(255,255,255,0.15)',
                          }}
                        />
                      </div>
                      <span className={styles.barPct}>{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <button className={styles.btnReset} onClick={handleReset}>
              Repetir test
            </button>
          </div>
        )}
      </div>

      {/* ── Créditos ── */}
      <footer className={styles.credits}>
        <p className={styles.creditsTitle}>Anatomía del Miedo</p>
        <div className={styles.creditsGrid}>
          {CREDITS.map(({ role, names }) => (
            <div key={role}>
              <p className={styles.creditsRole}>{role}</p>
              {names.map((n) => (
                <p key={n} className={styles.creditsName}>{n}</p>
              ))}
            </div>
          ))}
        </div>
        <p className={styles.creditsCopyright}>
          Una experiencia sobre el horror cinematográfico · 2025
        </p>
      </footer>
    </>
  )
}
