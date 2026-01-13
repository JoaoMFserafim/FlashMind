import { Link } from 'react-router-dom'
import { getDecks } from '../utils/storage'
import '../styles/pages/Home.css'

function Home() {
  const decks = getDecks()

  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">FlashMind</h1>
        <p className="subtitle">Transformando estudo em diversão</p>
      </div>

      <div className="menu-cards">
        <Link to="/deck-manager" className="menu-card">
          <div className="card-icon">📝</div>
          <h2>Criar/Editar Decks</h2>
          <p>Crie seus próprios flashcards personalizados</p>
        </Link>

        <div className="menu-card disabled">
          <div className="card-icon">📊</div>
          <h2>Meu Desempenho</h2>
          <p>Veja seus históricos de jogo</p>
        </div>
      </div>

      {decks.length > 0 && (
        <div className="decks-section">
          <h2>Meus Decks</h2>
          <div className="decks-grid">
            {decks.map(deck => (
              <Link key={deck.id} to={`/game/${deck.id}`} className="deck-card">
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <span className="card-count">{deck.cards.length} cards</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
