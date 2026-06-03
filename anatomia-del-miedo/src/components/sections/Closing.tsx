import { useState } from 'react'
import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText } from '../shared/RevealText'

// ── Tipos ──────────────────────────────────────────────────────────────────────

type FearKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

interface Option {
  key: FearKey
  label: string
}

interface Question {
  text: string
  options: Option[]
}

// ── Preguntas del documento ────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    text: 'Estás completamente solo en una casa durante la noche. ¿Qué te inquieta más?',
    options: [
      { key: 'A', label: 'Escuchar pasos en el piso superior.' },
      { key: 'B', label: 'Encontrar una puerta abierta que antes estaba cerrada.' },
      { key: 'C', label: 'Descubrir que algo está cambiando en mi cuerpo.' },
      { key: 'D', label: 'Sentir que alguien me observa.' },
      { key: 'E', label: 'Perderme sin saber dónde estoy.' },
      { key: 'F', label: 'Que algo sobrenatural esté presente.' },
    ],
  },
  {
    text: '¿Cuál de estas situaciones te parece más aterradora?',
    options: [
      { key: 'A', label: 'Ser perseguido por alguien.' },
      { key: 'B', label: 'Descubrir una presencia demoníaca.' },
      { key: 'C', label: 'Ver cómo tu cuerpo deja de responder como antes.' },
      { key: 'D', label: 'Encontrar una comunidad con reglas extrañas.' },
      { key: 'E', label: 'Descubrir una verdad terrible sobre la sociedad.' },
      { key: 'F', label: 'No saber qué es real y qué no.' },
    ],
  },
  {
    text: '¿Qué tipo de pesadillas recuerdas más?',
    options: [
      { key: 'A', label: 'Alguien intenta matarme.' },
      { key: 'B', label: 'Espíritus o entidades me persiguen.' },
      { key: 'C', label: 'Mi cuerpo se transforma.' },
      { key: 'D', label: 'Estoy atrapado en un lugar desconocido.' },
      { key: 'E', label: 'Todo parece normal, pero algo está mal.' },
      { key: 'F', label: 'Descubro que las personas que conozco no son quienes dicen ser.' },
    ],
  },
  {
    text: '¿Qué escena de terror te genera más incomodidad?',
    options: [
      { key: 'A', label: 'Un asesino acercándose lentamente.' },
      { key: 'B', label: 'Un exorcismo.' },
      { key: 'C', label: 'Una transformación física extrema.' },
      { key: 'D', label: 'Un ritual extraño.' },
      { key: 'E', label: 'Una conversación donde nadie parece de confianza.' },
      { key: 'F', label: 'Un personaje perdiendo la cordura.' },
    ],
  },
  {
    text: 'Si fueras protagonista de una película de terror, ¿qué amenaza te resultaría más difícil enfrentar?',
    options: [
      { key: 'A', label: 'Un asesino.' },
      { key: 'B', label: 'Un demonio.' },
      { key: 'C', label: 'Una enfermedad desconocida.' },
      { key: 'D', label: 'Una secta aislada.' },
      { key: 'E', label: 'Una conspiración social.' },
      { key: 'F', label: 'Tu propia mente.' },
    ],
  },
  {
    text: '¿Qué frase te resulta más inquietante?',
    options: [
      { key: 'A', label: '"Está detrás de ti."' },
      { key: 'B', label: '"Nunca se fue."' },
      { key: 'C', label: '"Te estás convirtiendo en otra cosa."' },
      { key: 'D', label: '"Aquí siempre hemos hecho las cosas así."' },
      { key: 'E', label: '"Todo el mundo lo sabía menos tú."' },
      { key: 'F', label: '"No puedes confiar en tus recuerdos."' },
    ],
  },
]

// ── Resultados del documento ───────────────────────────────────────────────────

const RESULTS: Record<FearKey, { genre: string; title: string; desc: string; accent: string }> = {
  A: {
    genre: 'Slasher',
    title: 'La amenaza física',
    desc: 'Te inquietan la persecución, la violencia y la pérdida de seguridad. El peligro tiene rostro humano. No necesita poderes sobrenaturales: solo la decisión de hacerte daño.',
    accent: '#8A2A2A',
  },
  B: {
    genre: 'Terror Sobrenatural',
    title: 'Lo inexplicable',
    desc: 'Te inquieta aquello que no puede comprenderse ni controlarse mediante la lógica. Las reglas del mundo que conoces dejan de aplicar, y eso te deja sin herramientas para enfrentarlo.',
    accent: '#4A2A7A',
  },
  C: {
    genre: 'Body Horror',
    title: 'La pérdida de control sobre tu propio cuerpo',
    desc: 'Te afectan especialmente los cambios físicos, la enfermedad y la transformación. El cuerpo que habitas se vuelve extraño, irreconocible, ajeno. No hay manera de escapar de ti mismo.',
    accent: '#8A4A2A',
  },
  D: {
    genre: 'Folk Horror',
    title: 'Lo desconocido dentro de una comunidad',
    desc: 'Te inquietan las tradiciones extrañas, los rituales y la sensación de no pertenecer. El horror surge del grupo: de sus reglas invisibles, de sus expectativas, de su fe ciega en algo que no comprendes.',
    accent: '#4A7A3A',
  },
  E: {
    genre: 'Terror Social',
    title: 'Las personas y los sistemas que te rodean',
    desc: 'Te preocupan la manipulación, la exclusión y las estructuras ocultas de poder. El monstruo no es sobrenatural: es el entorno, las instituciones, las sonrisas que esconden algo.',
    accent: '#7A6A2A',
  },
  F: {
    genre: 'Terror Psicológico',
    title: 'La pérdida de certeza sobre la realidad',
    desc: 'Te inquietan la locura, el aislamiento y la posibilidad de no poder confiar en tu propia percepción. El peor monstruo no viene de afuera. Ya está dentro de ti.',
    accent: '#5A3A7A',
  },
}

// ── Lógica de puntuación ───────────────────────────────────────────────────────

type Answers = Partial<Record<number, FearKey>>

function computeResult(answers: Answers): FearKey {
  const counts: Record<FearKey, number> = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
  Object.values(answers).forEach((k) => { if (k) counts[k]++ })
  return (Object.keys(counts) as FearKey[]).reduce((a, b) =>
    counts[a] >= counts[b] ? a : b
  )
}

// ── Componente ─────────────────────────────────────────────────────────────────

export function Closing() {
  const [answers,  setAnswers]  = useState<Answers>({})
  const [step,     setStep]     = useState<'intro' | 'quiz' | 'result'>('intro')
  const [current,  setCurrent]  = useState(0)
  const [hovered,  setHovered]  = useState<FearKey | null>(null)

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

      {/* ── Test ── */}
      <div style={{
        marginTop: 'var(--s-4)',
        border: '1px solid rgba(232,53,53,0.18)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>

        {/* Intro */}
        {step === 'intro' && (
          <div style={{ padding: 'var(--s-5)', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-label)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gris)',
              marginBottom: 'var(--s-2)',
            }}>
              Test · 6 preguntas · 6 perfiles posibles
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--fs-sub)',
              fontStyle: 'italic',
              color: 'var(--hueso)',
              lineHeight: 1.4,
              marginBottom: 'var(--s-4)',
              maxWidth: '480px',
              margin: '0 auto var(--s-4)',
            }}>
              Selecciona la opción que más te identifique en cada pregunta.
            </p>
            <button
              onClick={() => setStep('quiz')}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-label)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--hueso)',
                background: 'var(--sangre)',
                border: 'none',
                borderRadius: '3px',
                padding: 'var(--s-2) var(--s-4)',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--rojo)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--sangre)')}
            >
              Comenzar
            </button>
          </div>
        )}

        {/* Quiz */}
        {step === 'quiz' && (
          <div style={{ padding: 'var(--s-4)' }}>
            {/* Progreso */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s-3)' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-label)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--sangre)',
              }}>
                {current + 1} / {QUESTIONS.length}
              </span>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                {QUESTIONS.map((_, i) => (
                  <span key={i} style={{
                    width: i === current ? '22px' : '5px',
                    height: '3px',
                    borderRadius: '2px',
                    background: i < current
                      ? 'var(--sangre)'
                      : i === current
                      ? 'var(--rojo)'
                      : 'rgba(255,255,255,0.12)',
                    transition: 'all 0.3s ease',
                    display: 'block',
                  }} />
                ))}
              </div>
            </div>

            {/* Pregunta */}
            <p
              key={current}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                fontStyle: 'italic',
                color: 'var(--hueso)',
                lineHeight: 1.45,
                marginBottom: 'var(--s-4)',
                animation: 'fadeInUp 0.3s ease forwards',
              }}
            >
              {QUESTIONS[current].text}
            </p>

            {/* Opciones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {QUESTIONS[current].options.map((opt) => {
                const isHov = hovered === opt.key
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleAnswer(opt.key)}
                    onMouseEnter={() => setHovered(opt.key)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--s-2)',
                      padding: 'var(--s-2) var(--s-3)',
                      background: isHov ? 'rgba(232,53,53,0.08)' : 'rgba(255,255,255,0.025)',
                      border: `1px solid ${isHov ? 'rgba(232,53,53,0.35)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '3px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--fs-body)',
                      color: 'var(--hueso)',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    <span style={{
                      flexShrink: 0,
                      width: '22px',
                      height: '22px',
                      border: `1px solid ${isHov ? 'var(--rojo)' : 'rgba(255,255,255,0.2)'}`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.65rem',
                      color: isHov ? 'var(--rojo)' : 'var(--gris)',
                      transition: 'all 0.18s ease',
                    }}>
                      {opt.key}
                    </span>
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Resultado */}
        {step === 'result' && result && resultKey && (
          <div style={{ padding: 'var(--s-4)', animation: 'fadeInUp 0.5s ease forwards' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-label)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: result.accent,
              marginBottom: 'var(--s-2)',
            }}>
              Tu miedo dominante
            </p>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--hueso)',
              lineHeight: 1.1,
              marginBottom: 'var(--s-1)',
            }}>
              {result.genre}
            </h3>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'var(--fs-sub)',
              color: 'var(--gris)',
              marginBottom: 'var(--s-3)',
            }}>
              {result.title}
            </p>

            <div style={{ width: '40px', height: '2px', background: result.accent, marginBottom: 'var(--s-3)' }} />

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              lineHeight: 1.75,
              color: 'var(--hueso)',
              opacity: 0.88,
              marginBottom: 'var(--s-4)',
            }}>
              {result.desc}
            </p>

            {/* Distribución de respuestas */}
            <div style={{ marginBottom: 'var(--s-4)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-label)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gris)', marginBottom: 'var(--s-2)' }}>
                Tu perfil de miedo
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(Object.keys(RESULTS) as FearKey[]).map((key) => {
                  const count = Object.values(answers).filter((v) => v === key).length
                  const pct = Math.round((count / QUESTIONS.length) * 100)
                  return (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        color: key === resultKey ? RESULTS[key].accent : 'var(--gris)',
                        width: '120px',
                        flexShrink: 0,
                      }}>
                        {RESULTS[key].genre}
                      </span>
                      <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${pct}%`,
                          background: key === resultKey ? RESULTS[key].accent : 'rgba(255,255,255,0.15)',
                          borderRadius: '2px',
                          transition: 'width 0.8s ease',
                        }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--gris)', width: '28px', textAlign: 'right' }}>
                        {pct}%
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              onClick={handleReset}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-label)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gris)',
                background: 'none',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '3px',
                padding: 'var(--s-1) var(--s-3)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--hueso)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--gris)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              }}
            >
              Repetir test
            </button>
          </div>
        )}
      </div>

      {/* ── Créditos ── */}
      <footer style={{
        marginTop: 'var(--s-6)',
        paddingTop: 'var(--s-4)',
        borderTop: '1px solid rgba(122,16,16,0.2)',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-label)',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--sangre)',
          textAlign: 'center',
          marginBottom: 'var(--s-4)',
        }}>
          Anatomía del Miedo
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'var(--s-4)',
          marginBottom: 'var(--s-4)',
        }}>
          {[
            { role: 'Dirección editorial', names: ['Sofía Usuga Gaviria'] },
            { role: 'Contenido e investigación', names: ['Sofía Usuga Gaviria'] },
            { role: 'Diseño & desarrollo', names: ['Sharik Jimena Guzmán Arroyo', 'Jacobo Losada Higuita'] },
          ].map(({ role, names }) => (
            <div key={role}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--gris)',
                marginBottom: 'var(--s-1)',
              }}>
                {role}
              </p>
              {names.map((n) => (
                <p key={n} style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.95rem',
                  color: 'var(--hueso)',
                  opacity: 0.75,
                }}>
                  {n}
                </p>
              ))}
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'var(--fs-label)',
          color: 'var(--gris)',
          textAlign: 'center',
          opacity: 0.45,
        }}>
          Una experiencia sobre el horror cinematográfico · 2025
        </p>
      </footer>
    </>
  )
}
