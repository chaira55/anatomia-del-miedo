import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText } from '../shared/RevealText'
import { IconRow } from '../shared/IconRow'

export function Closing() {
  return (
    <>
      <ChapterHeader
        eyebrow="Cierre"
        title="¿Qué te asusta más?"
        subtitle="El terror que más te afecta revela algo sobre ti. Descubre qué subgénero habla directamente a tu miedo dominante."
      />

      <RevealText>
        A lo largo de esta revista exploraste cómo el cine construye el miedo desde sus orígenes
        hasta el presente. Ahora es tu turno: ¿qué tipo de amenaza activa tu respuesta más visceral?
      </RevealText>

      <IconRow items={[
        { type: 'quiz', label: 'Test interactivo' },
        { type: 'interactive', label: '6 resultados posibles' },
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
        Test "descubre tu miedo dominante" — Fase 6
      </div>

      <footer style={{ marginTop: 'var(--s-6)', paddingTop: 'var(--s-4)', borderTop: '1px solid rgba(122,16,16,0.2)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-label)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sangre)' }}>
          Anatomía del Miedo
        </p>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--gris)', marginTop: 'var(--s-1)' }}>
          Una experiencia sobre el horror cinematográfico
        </p>
      </footer>
    </>
  )
}
