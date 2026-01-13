import type{ Deck, GameResults } from '../types'

const DECKS_KEY = 'flashmind_decks'
const RESULTS_KEY = 'flashmind_results'

export const getDecks = (): Deck[] => {
  const data = localStorage.getItem(DECKS_KEY)
  return data ? JSON.parse(data) : []
}

export const saveDeck = (deck: Deck): void => {
  const decks = getDecks()
  const existing = decks.findIndex(d => d.id === deck.id)
  
  if (existing >= 0) {
    decks[existing] = deck
  } else {
    decks.push(deck)
  }
  
  localStorage.setItem(DECKS_KEY, JSON.stringify(decks))
}

export const deleteDeck = (deckId: string): void => {
  const decks = getDecks().filter(d => d.id !== deckId)
  localStorage.setItem(DECKS_KEY, JSON.stringify(decks))
}

export const getDeckById = (id: string): Deck | undefined => {
  return getDecks().find(d => d.id === id)
}

export const saveResults = (results: GameResults): void => {
  const allResults = localStorage.getItem(RESULTS_KEY)
  const resultsArray = allResults ? JSON.parse(allResults) : []
  resultsArray.push({ ...results, timestamp: Date.now() })
  localStorage.setItem(RESULTS_KEY, JSON.stringify(resultsArray))
}

export const getResults = (): (GameResults & { timestamp: number })[] => {
  const data = localStorage.getItem(RESULTS_KEY)
  return data ? JSON.parse(data) : []
}
