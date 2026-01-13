export interface Flashcard {
  id: string
  question: string
  answer: string
  imageUrl?: string
  createdAt: number
}

export interface Deck {
  id: string
  name: string
  description: string
  cards: Flashcard[]
  createdAt: number
  updatedAt: number
}

export interface GameSession {
  deckId: string
  deckName: string
  totalCards: number
  currentCardIndex: number
  answers: UserAnswer[]
  startTime: number
  endTime?: number
  totalTime?: number
}

export interface UserAnswer {
  cardId: string
  question: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  timeSpent: number
}

export interface GameResults {
  deckName: string
  totalCards: number
  correctAnswers: number
  wrongAnswers: number
  totalTime: number
  averageTimePerCard: number
  accuracy: number
  answers: UserAnswer[]
}
