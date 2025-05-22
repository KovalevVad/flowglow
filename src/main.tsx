import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AppRouter } from './App'

import '@assets/reset.css'
import '@assets/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
        <AppRouter />
     </BrowserRouter>
  </StrictMode>,
)
