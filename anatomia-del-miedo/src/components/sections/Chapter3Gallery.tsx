import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText, RevealQuote } from '../shared/RevealText'
import { ChapterFooter } from '../shared/ChapterFooter'
import { GeniallyEmbed } from '../shared/GeniallyEmbed'

export function Chapter3Gallery() {
  return (
    <>
      <ChapterHeader
        eyebrow="Capítulo III"
        title="Los monstruos cambian"
        subtitle="El monstruo siempre fue un espejo. Lo que nos aterra en cada época dice más sobre nosotros que sobre el horror mismo."
        number="III"
      />

      <RevealText>
        Si el miedo es universal, ¿por qué los monstruos cambian constantemente? Los monstruos
        nunca son solo monstruos. Son símbolos. Representan aquello que una sociedad teme en un
        momento específico de la historia.
      </RevealText>

      <RevealQuote author="Robin Wood (1986)">
        El monstruo cinematográfico suele representar aquello que una cultura intenta reprimir,
        ocultar o controlar. Por eso cada época crea sus propias criaturas.
      </RevealQuote>

      <GeniallyEmbed
        src="https://view.genially.com/6a1da0aef064f449e18f9d9c"
        title="Los monstruos cambian: galería interactiva"
      />

      <ChapterFooter
        summary={[
          'El monstruo encarna el miedo social de la época en que fue creado.',
          'El vampiro: seducción y contaminación. El demonio: pérdida de autonomía.',
          'El asesino humano es el más aterrador: no necesita poderes sobrenaturales.',
          'El body horror contemporáneo refleja la angustia por la pérdida de control del propio cuerpo.',
        ]}
        prevLabel="Anatomía del miedo"
        nextLabel="Tipos de terror"
      />
    </>
  )
}
