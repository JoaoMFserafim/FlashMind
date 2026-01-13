import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { getDecks, saveDeck, deleteDeck } from '../utils/storage'
import type { Deck, Flashcard } from '../types'
import '../styles/pages/DeckManager.css'

function DeckManager() {
  const navigate = useNavigate()
  const [decks, setDecks] = useState<Deck[]>(getDecks())
  const [editing, setEditing] = useState<string | null>(null)
  const [currentDeck, setCurrentDeck] = useState<Deck | null>(null)
  const [newCard, setNewCard] = useState({ question: '', answer: '', imageUrl: '' })

  const handleCreateDeck = () => {
    const newDeck: Deck = {
      id: uuidv4(),
      name: 'Novo Deck',
      description: '',
      cards: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setCurrentDeck(newDeck)
    setEditing(newDeck.id)
  }

  const handleAddCard = () => {
    if (!currentDeck || !newCard.question.trim() || !newCard.answer.trim()) return

    const card: Flashcard = {
      id: uuidv4(),
      question: newCard.question,
      answer: newCard.answer,
      imageUrl: newCard.imageUrl || undefined,
      createdAt: Date.now(),
    }

    const updated = {
      ...currentDeck,
      cards: [...currentDeck.cards, card],
      updatedAt: Date.now(),
    }
    setCurrentDeck(updated)
    setNewCard({ question: '', answer: '', imageUrl: '' })
  }

  const handleSaveDeck = () => {
    if (!currentDeck || !currentDeck.name.trim()) return
    saveDeck(currentDeck)
    setDecks(getDecks())
    setEditing(null)
    setCurrentDeck(null)
  }

  const handleDeleteDeck = (deckId: string) => {
    deleteDeck(deckId)
    setDecks(getDecks())
  }

  const handleDeleteCard = (cardId: string) => {
    if (!currentDeck) return
    const updated = {
      ...currentDeck,
      cards: currentDeck.cards.filter(c => c.id !== cardId),
    }
    setCurrentDeck(updated)
  }

  return (
    <div className="deck-manager-container">
      <button onClick={() => navigate('/')} className="back-button">← Voltar</button>

      {!editing ? (
        <div className="decks-list">
          <h1>Meus Decks</h1>
          <button onClick={handleCreateDeck} className="create-button">+ Criar Novo Deck</button>

          <div className="decks-display">
            {decks.map(deck => (
              <div key={deck.id} className="deck-item">
                <div className="deck-info">
                  <h3>{deck.name}</h3>
                  <p>{deck.description}</p>
                  <small>{deck.cards.length} flashcards</small>
                </div>
                <div className="deck-actions">
                  <button onClick={() => {
                    setCurrentDeck(deck)
                    setEditing(deck.id)
                  }} className="edit-btn">Editar</button>
                  <button onClick={() => handleDeleteDeck(deck.id)} className="delete-btn">Deletar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="deck-editor">
          <h1>Editando Deck</h1>
          
          <input
            type="text"
            placeholder="Nome do Deck"
            value={currentDeck?.name || ''}
            onChange={(e) => setCurrentDeck(prev => prev ? { ...prev, name: e.target.value } : null)}
            className="deck-input"
          />

          <textarea
            placeholder="Descrição (opcional)"
            value={currentDeck?.description || ''}
            onChange={(e) => setCurrentDeck(prev => prev ? { ...prev, description: e.target.value } : null)}
            className="deck-textarea"
          />

          <div className="card-form">
            <h2>Adicionar Flashcard</h2>
            <input
              type="text"
              placeholder="Pergunta"
              value={newCard.question}
              onChange={(e) => setNewCard(prev => ({ ...prev, question: e.target.value }))}
              className="card-input"
            />
            <textarea
              placeholder="Resposta"
              value={newCard.answer}
              onChange={(e) => setNewCard(prev => ({ ...prev, answer: e.target.value }))}
              className="card-textarea"
            />
            <input
              type="text"
              placeholder="URL da imagem (opcional)"
              value={newCard.imageUrl}
              onChange={(e) => setNewCard(prev => ({ ...prev, imageUrl: e.target.value }))}
              className="card-input"
            />
            <button onClick={handleAddCard} className="add-card-btn">Adicionar Card</button>
          </div>

          <div className="cards-preview">
            <h2>Flashcards ({currentDeck?.cards.length || 0})</h2>
            {currentDeck?.cards.map((card, idx) => (
              <div key={card.id} className="card-preview">
                <span className="card-number">{idx + 1}</span>
                <div className="card-content">
                  <p><strong>Q:</strong> {card.question}</p>
                  <p><strong>A:</strong> {card.answer}</p>
                </div>
                <button onClick={() => handleDeleteCard(card.id)} className="remove-card-btn">✕</button>
              </div>
            ))}
          </div>

          <div className="editor-actions">
            <button onClick={() => setEditing(null)} className="cancel-btn">Cancelar</button>
            <button onClick={handleSaveDeck} className="save-btn">Salvar Deck</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeckManager
