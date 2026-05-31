import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText } from '../shared/RevealText'
import { IconRow } from '../shared/IconRow'
import { ChapterFooter } from '../shared/ChapterFooter'

export function Chapter4Map() {
  return (
    <>
      <ChapterHeader
        eyebrow="Capítulo IV"
        title="Los distintos tipos de terror"
        subtitle="El miedo no es monolítico. Hay seis caminos hacia el horror, y cada uno activa un tipo diferente de respuesta en el espectador."
        number="IV"
      />

      <RevealText>
        El terror psicológico trabaja con la ambigüedad y el silencio. El sobrenatural,
        con lo incomprensible. El slasher, con la persecución y la supervivencia.
        El found footage, con la ilusión de realidad. El folk horror, con lo primitivo
        que persiste bajo la civilización. El body horror, con el cuerpo como campo de batalla.
      </RevealText>

      <RevealText delay={100}>
        El mapa radial permite explorar cada subgénero, sus características y las películas
        que lo definen, desde el nodo central hacia cada rama.
      </RevealText>

      <IconRow items={[
        { type: 'map', label: 'Mapa radial' },
        { type: 'interactive', label: '6 subgéneros' },
        { type: 'video', label: 'Clips de ejemplo' },
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
        Mapa radial: MIEDO → 6 ramas — Fase 5
      </div>

      <ChapterFooter
        summary={[
          'Psicológico: la amenaza vive en la mente del protagonista (y del espectador).',
          'Folk horror: el pasado y la comunidad como fuente de terror (Midsommar, The Wicker Man).',
          'Body horror: el propio cuerpo traiciona, muta o es colonizado (The Fly, The Substance).',
          'Found footage: la cámara como testigo, la realidad como horror (El proyecto Blair Witch).',
        ]}
        prevLabel="Los monstruos"
        nextLabel="Terror contemporáneo"
      />
    </>
  )
}
