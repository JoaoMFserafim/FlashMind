import { useState, useCallback, useRef } from 'react'
import type { GameSession, UserAnswer } from '../types'

export const useGameSession = (deckId: string, deckName: string, totalCards: number) => {
  const [session, setSession] = useState<GameSession>({
    deckId,
    deckName,
    totalCards,
    currentCardIndex: 0,
    answers: [],
    startTime: Date.now(),
  })

  const sessionRef = useRef(session)

  const addAnswer = useCallback((answer: UserAnswer) => {
    setSession(prev => {
      const newSession = {
        ...prev,
        answers: [...prev.answers, answer],
        currentCardIndex: prev.currentCardIndex + 1,
      }
      sessionRef.current = newSession
      return newSession
    })
  }, [])

  const finishSession = useCallback(() => {
    const endTime = Date.now()
    const totalTime = Math.floor((endTime - sessionRef.current.startTime) / 1000)
    
    const finalSession = {
      ...sessionRef.current,
      endTime,
      totalTime,
    }

    setSession(finalSession)
    sessionRef.current = finalSession

    return finalSession
  }, [])

  return { 
    session, 
    addAnswer, 
    finishSession,
    getSessionData: () => sessionRef.current
  }
}
