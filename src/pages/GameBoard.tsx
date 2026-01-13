import { useParams, useNavigate } from 'react-router-dom'
import { useState, useCallback } from 'react'
import { getDeckById, saveResults } from '../utils/storage'
import { useTimer } from '../hooks/useTimer'
import { useGameSession } from '../hooks/useGameSession'
import type { GameResults } from '../types'
import '../styles/pages/GameBoard.css'

function GameBoard() {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const deck = getDeckById(deckId || '')
  const [userAnswer, setUserAnswer] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)

  if (!deck || deck.cards.length === 0) {
    return <div className="error">Deck não encontrado ou vazio</div>
  }

  const { session, addAnswer, finishSession } = useGameSession(
    deck.id,
    deck.name,
    deck.cards.length
  )

  const handleTimeUp = useCallback(() => {
    handleSubmit(true)
  }, [userAnswer])

  const { time, reset, stop } = useTimer(15, handleTimeUp)

  const currentCard = deck.cards[session.currentCardIndex]
  const isLastCard = session.currentCardIndex === deck.cards.length - 1

const handleSubmit = useCallback((isTimeUp = false) => {
    if (!currentCard) return
    stop()

    const isCorrect = userAnswer.trim().toLowerCase() === currentCard.answer.trim().toLowerCase()
    const timeSpent = Math.max(15 - time, 1)

    const newAnswer = {
        cardId: currentCard.id,
        question: currentCard.question,
        userAnswer: userAnswer || '(sem resposta)',
        correctAnswer: currentCard.answer,
        isCorrect,
        timeSpent,
    }

    if (isLastCard) {
        addAnswer(newAnswer)
        
        setTimeout(() => {
            const finalSession = finishSession()
            const allAnswers = [...session.answers, newAnswer]
            const correctCount = allAnswers.filter(a => a.isCorrect).length
            
            const results: GameResults = {
                deckName: deck.name,
                totalCards: deck.cards.length,
                correctAnswers: correctCount,
                wrongAnswers: deck.cards.length - correctCount,
                totalTime: finalSession.totalTime || 0,
                averageTimePerCard: Math.round((finalSession.totalTime || 0) / deck.cards.length),
                accuracy: Math.round((correctCount / deck.cards.length) * 100),
                answers: allAnswers,
            }
            saveResults(results)
            navigate('/results', { state: { results } })
        }, 500)
    } else {
        addAnswer(newAnswer)
        setUserAnswer('')
        setShowAnswer(false)
        reset()
    }
}, [currentCard, userAnswer, time, isLastCard, session.answers, addAnswer, finishSession, navigate, stop, reset])

  return (
    <div className="game-board">
      <div className="game-header">
        <button onClick={() => navigate('/')} className="back-button">← Sair</button>
        <h1>{deck.name}</h1>
        <div className="progress-info">
          <span>{session.currentCardIndex + 1} / {deck.cards.length}</span>
        </div>
      </div>

      <div className="timer-container">
        <div className={`timer ${time <= 5 ? 'warning' : ''}`}>
          {time}s
        </div>
      </div>

      <div className="card-container">
        {currentCard && (
          <div className="flashcard">
            <div className="card-number">Card {session.currentCardIndex + 1}</div>
            <div className="card-face question">
              <p>{currentCard.question}</p>
              {currentCard.imageUrl && <img src={currentCard.imageUrl} alt="card" />}
            </div>
          </div>
        )}
      </div>

      <div className="input-section">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !showAnswer && handleSubmit()}
          placeholder="Sua resposta..."
          disabled={showAnswer}
          className="answer-input"
          autoFocus
        />
        
        {!showAnswer && (
          <button onClick={() => setShowAnswer(true)} className="reveal-btn">
            Revelar Resposta
          </button>
        )}

        {showAnswer && (
          <div className="answer-section">
            <div className="correct-answer">
              <strong>Resposta correta:</strong> {currentCard?.answer}
            </div>
            <div className="user-answer">
              <strong>Sua resposta:</strong> {userAnswer || '(sem resposta)'}
            </div>
            <button onClick={() => handleSubmit()} className="next-btn">
              {isLastCard ? 'Finalizar' : 'Próximo Card'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameBoard
