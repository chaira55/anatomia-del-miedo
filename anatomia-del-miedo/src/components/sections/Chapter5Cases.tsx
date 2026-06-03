import { useState } from 'react'
import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText, RevealQuote } from '../shared/RevealText'
import { ChapterFooter } from '../shared/ChapterFooter'

const FILMS = [
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

export function Chapter5Cases() {
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const activeFilm = FILMS.find((f) => f.id === selected)

  return (
    <>
      <ChapterHeader
        eyebrow="Capítulo V"
        title="El terror contemporáneo"
        subtitle="Cinco películas de la última década que redefinieron el género usando el miedo como alegoría de las crisis del presente."
        number="V"
      />

      <RevealText>
        El terror del siglo XXI ya no pretende solo asustar. Usa el miedo como lenguaje para
        hablar de trauma, racismo, identidad, el cuerpo y la memoria colectiva. Las mejores
        películas de terror actuales son, ante todo, películas sobre el mundo real.
      </RevealText>

      <RevealQuote author="Jordan Peele, director de Get Out">
        El terror es el único género en el que el público espera que algo salga mal.
        Esa anticipación es la materia prima con la que trabajo.
      </RevealQuote>

      <RevealText delay={100}>
        Selecciona una película para leer el análisis:
      </RevealText>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
        gap: 'var(--s-2)',
        marginTop: 'var(--s-3)',
      }}>
        {FILMS.map((film) => {
          const isActive  = selected === film.id
          const isHovered = hovered === film.id
          return (
            <button
              key={film.id}
              onClick={() => setSelected(isActive ? null : film.id)}
              onMouseEnter={() => setHovered(film.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                background: isActive
                  ? 'rgba(232,53,53,0.08)'
                  : isHovered
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(255,255,255,0.025)',
                border: `1px solid ${isActive ? 'rgba(232,53,53,0.45)' : isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '3px',
                padding: 'var(--s-3)',
                paddingLeft: 'calc(var(--s-3) + 10px)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.2s ease',
                transform: isHovered && !isActive ? 'translateY(-2px)' : 'translateY(0)',
                overflow: 'hidden',
              }}
            >
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '3px',
                height: '100%',
                background: film.accent,
                opacity: isActive || isHovered ? 1 : 0.5,
                transition: 'opacity 0.25s ease',
              }} />

              <span style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gris)',
                marginBottom: '6px',
              }}>
                {film.year} · {film.genre}
              </span>

              <span style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--hueso)' : 'var(--hueso)',
                marginBottom: '4px',
                lineHeight: 1.2,
              }}>
                {film.title}
              </span>

              <span style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '0.78rem',
                color: 'var(--gris)',
              }}>
                dir. {film.director}
              </span>
            </button>
          )
        })}
      </div>

      {activeFilm && (
        <div style={{
          marginTop: 'var(--s-3)',
          padding: 'var(--s-4)',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderLeft: `3px solid ${activeFilm.accent}`,
          borderRadius: '3px',
          animation: 'fadeInUp 0.35s ease forwards',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--gris)',
            marginBottom: 'var(--s-2)',
          }}>
            {activeFilm.genre} · {activeFilm.theme}
          </p>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--hueso)',
            marginBottom: 'var(--s-3)',
          }}>
            {activeFilm.technique}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            lineHeight: 1.75,
            color: 'var(--hueso)',
            opacity: 0.88,
          }}>
            {activeFilm.description}
          </p>
        </div>
      )}

      <ChapterFooter
        summary={[
          'Midsommar (2019): el duelo y la codependencia disfrazados de folk horror nórdico.',
          'Get Out (2017): el racismo liberal y la instrumentalización del cuerpo negro.',
          'Us (2019): la identidad fracturada y el doble como reflejo del yo reprimido.',
          'The Substance (2024): la industria de la belleza y el horror de envejecer.',
          'Sinners (2025): la memoria histórica y la comunidad como escudo y amenaza.',
        ]}
        prevLabel="Tipos de terror"
        nextLabel="Descubre tu miedo"
      />
    </>
  )
}
