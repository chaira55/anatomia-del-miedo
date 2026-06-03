export interface Film {
  id: string
  title: string
  year: string
  director: string
  genre: string
  theme: string
  technique: string
  accent: string
  description: string
}

export const FILMS: Film[] = [
  {
    id: 'midsommar',
    title: 'Midsommar',
    year: '2019',
    director: 'Ari Aster',
    genre: 'Folk Horror',
    theme: 'El duelo y la codependencia',
    technique: 'Luz solar como horror',
    accent: '#D4A756',
    description:
      'En lugar de las sombras nocturnas, Aster usa el sol escandinavo de medianoche para crear una pesadilla a plena luz. El horror del personaje principal es interno: una relación tóxica y un duelo sin procesar que la comunidad sueca externaliza y ritualiza de forma atroz.',
  },
  {
    id: 'getout',
    title: 'Get Out',
    year: '2017',
    director: 'Jordan Peele',
    genre: 'Horror Social',
    theme: 'El racismo liberal y el cuerpo negro',
    technique: 'La microagresión como motor narrativo',
    accent: '#8B6E52',
    description:
      'Peele convierte cada acto de microagresión racial en una pieza de un puzzle siniestro. El espectador negro reconoce el peligro antes que el protagonista; el espectador blanco aprende a leerlo. El horror ya existía: la instrumentalización del cuerpo negro.',
  },
  {
    id: 'us',
    title: 'Us',
    year: '2019',
    director: 'Jordan Peele',
    genre: 'Thriller Psicológico',
    theme: 'La identidad fracturada',
    technique: 'El doble como espejo roto',
    accent: '#C0392B',
    description:
      'Los "Tethered" no son monstruos: son lo que América descarta. Cada doble refleja el yo reprimido de su original. La película pregunta: ¿quién tiene el derecho de ocupar el espacio, la vida, la identidad? El monstruo y la víctima comparten la misma cara.',
  },
  {
    id: 'substance',
    title: 'The Substance',
    year: '2024',
    director: 'Coralie Fargeat',
    genre: 'Body Horror',
    theme: 'La industria de la belleza',
    technique: 'Body horror como crítica feminista',
    accent: '#B07BAC',
    description:
      'Fargeat lleva el cuerpo femenino al límite de lo grotesco para exponer la violencia normalizada de los estándares de belleza. La transformación física es una metáfora de lo que la industria exige: borrarse para dar paso a una versión "mejorada" que tampoco será suficiente.',
  },
  {
    id: 'sinners',
    title: 'Sinners',
    year: '2025',
    director: 'Ryan Coogler',
    genre: 'Horror de Época',
    theme: 'La memoria histórica como amenaza',
    technique: 'El folklore como portal temporal',
    accent: '#4A6FA5',
    description:
      'Coogler usa los vampiros como metáfora de las fuerzas que drenan a las comunidades negras del Sur profundo: el racismo sistémico, la apropiación cultural, el olvido histórico. El juke joint es refugio y objetivo al mismo tiempo.',
  },
]
