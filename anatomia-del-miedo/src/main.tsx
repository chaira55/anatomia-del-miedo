import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/cinzel/400.css'
import '@fontsource/cinzel/700.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'

import './styles/global.css'
import './styles/animations.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
