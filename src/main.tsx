import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import AppRouter from './router'
import { AppProvider } from '../appContext'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
    <AppProvider>
    <AppRouter />
    </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
