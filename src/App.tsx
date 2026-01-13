import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const DeckManager = lazy(() => import('./pages/DeckManager'))
const GameBoard = lazy(() => import('./pages/GameBoard'))
const Results = lazy(() => import('./pages/Results'))

function App() {
  return (
    <div className="app-container">
      <Suspense fallback={<div className="loading">Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deck-manager" element={<DeckManager />} />
          <Route path="/game/:deckId" element={<GameBoard />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
