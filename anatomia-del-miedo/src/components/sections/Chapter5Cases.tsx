import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText, RevealQuote } from '../shared/RevealText'
import { IconRow } from '../shared/IconRow'
import { ChapterFooter } from '../shared/ChapterFooter'

export function Chapter5Cases() {
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
        Los cinco casos de estudio exploran qué miedo específico articula cada película
        y cómo lo traduce en decisiones cinematográficas concretas.
      </RevealText>

      <IconRow items={[
        { type: 'video', label: 'Tarjetas multimedia' },
        { type: 'interactive', label: '5 casos' },
        { type: 'audio', label: 'Bandas sonoras' },
      ]} />

      <div style={{
        height: '120px',
        border: '1px dashed rgba(122,16,16,0.3)',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gris)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-label)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginTop: 'var(--s-4)',
      }}>
        Midsommar · Get Out · Us · The Substance · Sinners — Fase 5
      </div>

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
