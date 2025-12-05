import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DinoGame from './game.jsx'
import Enunciado from './enunciado.jsx'
import { BrowserRouter, Routes, Route } from 'react-router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* El Router envuelve todo */}
      <Routes>
          <Route path="/" element={<DinoGame />} />
          <Route path="/enunciado" element={<Enunciado />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
