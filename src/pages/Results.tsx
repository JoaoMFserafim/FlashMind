import { useLocation, useNavigate } from 'react-router-dom'
import type { GameResults } from '../types'
import '../styles/pages/Results.css'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const results: GameResults = location.state?.results

  if (!results) {
    return <div className="error">Resultados não encontrados</div>
  }

  const getAccuracyLevel = (accuracy: number) => {
    if (accuracy >= 80) return '🏆 Excelente!'
    if (accuracy >= 60) return '👍 Bom!'
    if (accuracy >= 40) return '💪 Pode melhorar!'
    return '📚 Continue estudando!'
  }

  return (
    <div className="results-container">
      <div className="results-card">
        <h1>Resultado Final</h1>
        <h2>{results.deckName}</h2>

        <div className="accuracy-section">
          <div className="accuracy-circle">
            <span className="percentage">{results.accuracy}%</span>
          </div>
          <p className="accuracy-message">{getAccuracyLevel(results.accuracy)}</p>
        </div>

        <div className="stats-grid">
          <div className="stat">
            <span className="stat-label">Acertos</span>
            <span className="stat-value green">{results.correctAnswers}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Erros</span>
            <span className="stat-value red">{results.wrongAnswers}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Tempo Total</span>
            <span className="stat-value">{results.totalTime}s</span>
          </div>
          <div className="stat">
            <span className="stat-label">Tempo Médio</span>
            <span className="stat-value">{results.averageTimePerCard}s</span>
          </div>
        </div>

        <div className="answers-review">
          <h3>Revisão de Respostas</h3>
          {results.answers.map((answer, idx) => (
            <div key={idx} className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="answer-header">
                <span className="answer-number">Q{idx + 1}</span>
                <span className={`answer-status ${answer.isCorrect ? '✓' : '✗'}`}>
                  {answer.isCorrect ? '✓' : '✗'}
                </span>
              </div>
              <p><strong>Pergunta:</strong> {answer.question}</p>
              <p><strong>Sua resposta:</strong> {answer.userAnswer}</p>
              <p><strong>Resposta correta:</strong> {answer.correctAnswer}</p>
              <small>Tempo: {answer.timeSpent}s</small>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/')} className="home-btn">🏠 Voltar ao Menu</button>
          <button onClick={() => navigate(-1)} className="retry-btn">🔄 Jogar Novamente</button>
        </div>
      </div>
    </div>
  )
}

export default Results
