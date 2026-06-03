import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText, RevealQuote } from '../shared/RevealText'
import { ChapterFooter } from '../shared/ChapterFooter'

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

      {/* Genially — línea de tiempo interactiva */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%',
        marginTop: 'var(--s-4)',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid rgba(122,16,16,0.2)',
      }}>
        <iframe
          src="https://view.genially.com/6a1b8e697130115bf13e932d"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allowFullScreen
          loading="lazy"
          title="Línea de tiempo: El nacimiento del terror"
        />
      </div>

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
