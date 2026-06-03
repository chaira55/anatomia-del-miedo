import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText, RevealQuote } from '../shared/RevealText'
import { ChapterFooter } from '../shared/ChapterFooter'
import { GeniallyEmbed } from '../shared/GeniallyEmbed'

export function Chapter1Timeline() {
  return (
    <>
      <ChapterHeader
        eyebrow="Capítulo I"
        title="El nacimiento del terror"
        subtitle="¿Cómo el miedo evolucionó? De las sombras del cine mudo a los monstruos del siglo XXI."
        number="I"
      />

      <RevealText>
        El miedo es tan antiguo como la imaginación humana, pero el cine le dio forma visual por primera
        vez en 1922, cuando F. W. Murnau filmó la sombra de Nosferatu trepando por una escalera.
        Desde entonces, cada década reinventó el horror a su imagen.
      </RevealText>

      <RevealQuote author="Robin Wood, An Introduction to the American Horror Film">
        El monstruo en el cine de terror representa todo lo que la cultura reprime.
        Lo que nos aterra revela quiénes somos.
      </RevealQuote>

      <GeniallyEmbed
        src="https://view.genially.com/6a1b8e697130115bf13e932d"
        title="Línea de tiempo: El nacimiento del terror"
      />

      <ChapterFooter
        summary={[
          'El cine de terror nació en 1922 con Nosferatu (Murnau), padre del horror visual.',
          'Cada década proyecta sus miedos colectivos: la posguerra trajo invasiones, los 70 el terror doméstico.',
          'El terror del siglo XXI usa el horror para hablar de racismo, identidad y ansiedad social.',
        ]}
        nextLabel="La anatomía del miedo"
      />
    </>
  )
}
