import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import ContextProvider from './providers/ContextProvider.tsx'
import { router } from './routes/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} >
      </RouterProvider>
    </ContextProvider>
  </StrictMode>,
)
