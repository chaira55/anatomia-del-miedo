import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText } from '../shared/RevealText'
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
        Antes de que aparezca un monstruo. Antes del grito. Antes del susto. Nuestro cerebro
        ya sabe que algo está mal. El cine de terror no genera miedo por accidente. Cada sombra,
        cada silencio y cada corte de edición está diseñado para manipular nuestras emociones.
      </RevealText>

      <RevealText delay={80}>
        Por eso el miedo no vive únicamente en la historia. Vive en cómo la historia está contada.
      </RevealText>

      {/* Genially — anatomía del miedo interactivo */}
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
          src="https://view.genially.com/6a1da07639f22dd24fe4cabe"
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
          title="La anatomía del miedo: herramientas cinematográficas"
        />
      </div>

      <ChapterFooter
        summary={[
          'El sonido anticipa el peligro antes de que la imagen lo confirme.',
          'La iluminación cinematográfica dirige la mirada y oculta información de forma deliberada.',
          'El montaje controla cuánto y cuándo sabe el espectador: la espera suele ser peor que el susto.',
          'El diseño de producción convierte el espacio en un personaje que conspira contra el protagonista.',
        ]}
        prevLabel="Nacimiento del terror"
        nextLabel="Los monstruos cambian"
      />
    </>
  )
}
