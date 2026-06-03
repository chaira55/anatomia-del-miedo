export type FearKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface QuizOption {
  key: FearKey
  label: string
}

export interface Question {
  text: string
  options: QuizOption[]
}

export interface FearResult {
  genre: string
  title: string
  desc: string
  accent: string
}

export const QUESTIONS: Question[] = [
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

export const RESULTS: Record<FearKey, FearResult> = {
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

export function computeResult(answers: Partial<Record<number, FearKey>>): FearKey {
  const counts: Record<FearKey, number> = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
  Object.values(answers).forEach((k) => { if (k) counts[k]++ })
  return (Object.keys(counts) as FearKey[]).reduce((a, b) =>
    counts[a] >= counts[b] ? a : b
  )
}
