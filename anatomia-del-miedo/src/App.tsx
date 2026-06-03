import { useAudio } from './hooks/useAudio'
import { PageFlip } from './components/layout/PageFlip'
import { PageContent } from './components/layout/PageContent'
import { SideNav } from './components/layout/SideNav'
import { ProgressBar } from './components/layout/ProgressBar'
import { AudioToggle } from './components/layout/AudioToggle'
import { Cover } from './components/sections/Cover'
import { Chapter1Timeline } from './components/sections/Chapter1Timeline'
import { Chapter2Tools } from './components/sections/Chapter2Tools'
import { Chapter3Gallery } from './components/sections/Chapter3Gallery'
import { Chapter4Map } from './components/sections/Chapter4Map'
import { Chapter5Cases } from './components/sections/Chapter5Cases'
import { Closing } from './components/sections/Closing'

const GLOWS = {
  cap1:   'radial-gradient(ellipse at 85% 12%, rgba(160, 20, 20, 0.28) 0%, transparent 60%)',
  cap2:   'radial-gradient(ellipse at 50% 5%,  rgba(15,  55, 120, 0.22) 0%, transparent 60%)',
  cap3:   'radial-gradient(ellipse at 88% 80%, rgba(85,  15, 110, 0.26) 0%, transparent 60%)',
  cap4:   'radial-gradient(ellipse at 50% 50%, rgba(10,  80,  70, 0.22) 0%, transparent 65%)',
  cap5:   'radial-gradient(ellipse at 12% 12%, rgba(110, 55,  8,  0.26) 0%, transparent 60%)',
  cierre: 'radial-gradient(ellipse at 50% 35%, rgba(160, 20, 20, 0.25) 0%, transparent 62%)',
}

export default function App() {
  const audio = useAudio()

  const pages = [
    {
      id: 'portada',
      label: 'Inicio',
      content: <PageContent fullBleed><Cover audio={audio} /></PageContent>,
    },
    {
      id: 'cap1',
      label: 'Cap. I',
      content: <PageContent glow={GLOWS.cap1}><Chapter1Timeline /></PageContent>,
    },
    {
      id: 'cap2',
      label: 'Cap. II',
      content: <PageContent glow={GLOWS.cap2}><Chapter2Tools /></PageContent>,
    },
    {
      id: 'cap3',
      label: 'Cap. III',
      content: <PageContent glow={GLOWS.cap3}><Chapter3Gallery /></PageContent>,
    },
    {
      id: 'cap4',
      label: 'Cap. IV',
      content: <PageContent glow={GLOWS.cap4}><Chapter4Map /></PageContent>,
    },
    {
      id: 'cap5',
      label: 'Cap. V',
      content: <PageContent glow={GLOWS.cap5}><Chapter5Cases /></PageContent>,
    },
    {
      id: 'cierre',
      label: 'Cierre',
      content: <PageContent glow={GLOWS.cierre}><Closing /></PageContent>,
    },
  ]

  return (
    <PageFlip pages={pages} onPageChange={audio.playTransition}>
      <SideNav />
      <ProgressBar />
      <AudioToggle audio={audio} />
    </PageFlip>
  )
}
