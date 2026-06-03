import { useState } from 'react'
import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText, RevealQuote } from '../shared/RevealText'
import { ChapterFooter } from '../shared/ChapterFooter'
import { FILMS } from '../../data/films'
import styles from './Chapter5Cases.module.css'

export function Chapter5Cases() {
  const [selected, setSelected] = useState<string | null>(null)

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

      <div className={styles.grid}>
        {FILMS.map((film) => {
          const isActive = selected === film.id
          return (
            <button
              key={film.id}
              className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
              style={{ '--accent': film.accent } as React.CSSProperties}
              onClick={() => setSelected(isActive ? null : film.id)}
              aria-pressed={isActive}
            >
              <span className={styles.cardAccent} aria-hidden="true" />
              <span className={styles.cardYear}>{film.year} · {film.genre}</span>
              <span className={styles.cardTitle}>{film.title}</span>
              <span className={styles.cardDirector}>dir. {film.director}</span>
            </button>
          )
        })}
      </div>

      {activeFilm && (
        <div
          className={styles.detail}
          style={{ '--accent': activeFilm.accent } as React.CSSProperties}
        >
          <p className={styles.detailGenre}>{activeFilm.genre} · {activeFilm.theme}</p>
          <h3 className={styles.detailTitle}>{activeFilm.technique}</h3>
          <p className={styles.detailText}>{activeFilm.description}</p>
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
