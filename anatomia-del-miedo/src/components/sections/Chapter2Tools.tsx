import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText, RevealQuote } from '../shared/RevealText'
import { IconRow } from '../shared/IconRow'
import { ChapterFooter } from '../shared/ChapterFooter'

export function Chapter2Tools() {
  return (
    <>
      <ChapterHeader
        eyebrow="Capítulo II"
        title="La anatomía del miedo"
        subtitle="Cuatro herramientas cinematográficas que convierten imágenes en terror: sonido, fotografía, montaje y diseño de producción."
        number="II"
      />

      <RevealText>
        El miedo en el cine no ocurre en la pantalla: ocurre en el cerebro del espectador.
        Los directores de terror son ingenieros de la atención, que manipulan tiempo, luz y sonido
        para forzar respuestas fisiológicas involuntarias.
      </RevealText>

      <RevealQuote author="Bernard Herrmann, compositor de Psicosis">
        Sin mi música, la escena de la ducha habría sido un cuadro. Con ella, se convirtió en un ataque.
      </RevealQuote>

      <RevealText delay={100}>
        Cada herramienta opera en una capa diferente de la percepción. El sonido llega primero,
        antes de que el ojo procese la imagen. El montaje controla el ritmo del miedo.
        La fotografía dirige la mirada hacia lo que no queremos ver.
      </RevealText>

      <IconRow items={[
        { type: 'audio', label: 'Ejemplos sonoros' },
        { type: 'video', label: 'Escenas clave' },
        { type: 'interactive', label: '4 herramientas' },
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
        Botones de herramientas — Fase 5
      </div>

      <ChapterFooter
        summary={[
          'El sonido anticipa el peligro antes de que la imagen lo confirme.',
          'El montaje discontinuo (cortes abruptos) eleva el cortisol del espectador.',
          'La iluminación de bajo contraste (chiaroscuro) oculta tanto como revela.',
          'El diseño de producción crea mundos en los que las reglas normales no aplican.',
        ]}
        prevLabel="Nacimiento del terror"
        nextLabel="Los monstruos cambian"
      />
    </>
  )
}
