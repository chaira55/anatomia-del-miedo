import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText, RevealQuote } from '../shared/RevealText'
import { IconRow } from '../shared/IconRow'
import { ChapterFooter } from '../shared/ChapterFooter'

export function Chapter1Timeline() {
  return (
    <>
      <ChapterHeader
        eyebrow="Capítulo I"
        title="El nacimiento del terror"
        subtitle="De las sombras del cine mudo a los monstruos digitales: cómo un siglo de cine aprendió a hacernos temblar."
        number="I"
      />

      <RevealText>
        El miedo es tan antiguo como la imaginación humana, pero el cine le dio forma visual por primera
        vez en 1922, cuando F. W. Murnau filmó la sombra de Nosferatu trepando por una escalera.
        Desde entonces, cada década reinventó el horror a su imagen.
      </RevealText>

      <RevealQuote author="Robin Wood, 'An Introduction to the American Horror Film'">
        El monstruo en el cine de terror representa todo lo que la cultura reprime. Lo que nos aterra
        revela quiénes somos.
      </RevealQuote>

      <RevealText delay={100}>
        La línea de tiempo interactiva explora los hitos que transformaron el género: desde el
        expresionismo alemán hasta el terror elevado del siglo XXI.
      </RevealText>

      <IconRow items={[
        { type: 'interactive', label: 'Línea de tiempo' },
        { type: 'gallery', label: 'Carteles históricos' },
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
        Línea de tiempo — Fase 5
      </div>

      <ChapterFooter
        summary={[
          'El cine de terror nació en 1922 con Nosferatu (Murnau), padre del horror visual.',
          'Cada época proyecta sus miedos colectivos: la posguerra trajo invasiones alienígenas, los 70 el terror doméstico.',
          'El "terror elevado" (2010+) regresa al horror psicológico y a la alegoría social.',
        ]}
        nextLabel="La anatomía del miedo"
      />
    </>
  )
}
