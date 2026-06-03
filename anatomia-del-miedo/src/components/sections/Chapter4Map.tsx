import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText } from '../shared/RevealText'
import { ChapterFooter } from '../shared/ChapterFooter'
import { GeniallyEmbed } from '../shared/GeniallyEmbed'

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
        ¿Por qué algunas películas nos aterran y otras no nos provocan nada? Dos personas
        pueden ver la misma película. Una puede dormir perfectamente. La otra puede pasar
        semanas pensando en ella.
      </RevealText>

      <RevealText delay={80}>
        Esto ocurre porque no existe un único miedo. Cada subgénero del terror explora una
        ansiedad diferente: la muerte, la enfermedad, la pérdida de identidad, el aislamiento
        o lo desconocido.
      </RevealText>

      <GeniallyEmbed
        src="https://view.genially.com/6a1dba6739f22dd24ff1fb5b"
        title="Los distintos tipos de terror: mapa visual"
      />

      <ChapterFooter
        summary={[
          'Psicológico: la amenaza vive en la mente del protagonista — y del espectador.',
          'Folk horror: la comunidad aislada y sus rituales como fuente de terror (Midsommar, The Witch).',
          'Body horror: el propio cuerpo traiciona, muta o es colonizado (The Fly, The Substance).',
          'Found footage: la cámara como testigo, la realidad como horror (Blair Witch Project).',
        ]}
        prevLabel="Los monstruos"
        nextLabel="Terror contemporáneo"
      />
    </>
  )
}
