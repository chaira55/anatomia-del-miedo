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
      content: <PageContent><Chapter1Timeline /></PageContent>,
    },
    {
      id: 'cap2',
      label: 'Cap. II',
      content: <PageContent><Chapter2Tools /></PageContent>,
    },
    {
      id: 'cap3',
      label: 'Cap. III',
      content: <PageContent><Chapter3Gallery /></PageContent>,
    },
    {
      id: 'cap4',
      label: 'Cap. IV',
      content: <PageContent><Chapter4Map /></PageContent>,
    },
    {
      id: 'cap5',
      label: 'Cap. V',
      content: <PageContent><Chapter5Cases /></PageContent>,
    },
    {
      id: 'cierre',
      label: 'Cierre',
      content: <PageContent><Closing /></PageContent>,
    },
  ]

  return (
    <PageFlip pages={pages}>
      <SideNav />
      <ProgressBar />
      <AudioToggle audio={audio} />
    </PageFlip>
  )
}
