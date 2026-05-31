import { ChapterHeader } from '../shared/ChapterHeader'
import { RevealText, RevealQuote } from '../shared/RevealText'
import { IconRow } from '../shared/IconRow'
import { ChapterFooter } from '../shared/ChapterFooter'

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
        El vampiro del siglo XIX era la sexualidad reprimida. El alienígena de los 50, el comunismo.
        El asesino enmascarado de los 80, el suburbanio. El monstruo corporal de hoy, la crisis
        de identidad en la era de las redes sociales.
      </RevealText>

      <RevealQuote author="Carol J. Clover, 'Men, Women and Chainsaws'">
        El género de terror no es escapismo. Es el único género que le permite a la cultura
        mirar directamente a sus miedos más profundos sin desviar la vista.
      </RevealQuote>

      <RevealText delay={100}>
        La galería explora cinco arquetipos del monstruo cinematográfico y cómo cada uno
        mutó a lo largo del tiempo en respuesta a la ansiedad cultural de su época.
      </RevealText>

      <IconRow items={[
        { type: 'gallery', label: 'Galería interactiva' },
        { type: 'interactive', label: '5 arquetipos' },
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
        Galería: Vampiros · Demonios · Asesinos · Alienígenas · Cuerpo — Fase 5
      </div>

      <ChapterFooter
        summary={[
          'El monstruo encarna el miedo social de la época en que fue creado.',
          'Los vampiros = seducción y contaminación. Los alienígenas = lo extranjero.',
          'El body horror contemporáneo refleja la angustia por la pérdida de control del propio cuerpo.',
        ]}
        prevLabel="Anatomía del miedo"
        nextLabel="Tipos de terror"
      />
    </>
  )
}
