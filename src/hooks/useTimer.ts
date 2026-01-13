import { useState, useEffect, useCallback, useRef } from 'react'

export const useTimer = (initialTime: number = 15, onTimeUp?: () => void) => {
  const [time, setTime] = useState(initialTime)
  const [isActive, setIsActive] = useState(true)
  const [startTime, setStartTime] = useState(Date.now())
  
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onTimeUpRef = useRef(onTimeUp)

  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  useEffect(() => {
    // Limpar intervalo anterior
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (!isActive || time <= 0) {
      if (time <= 0 && isActive) {
        setIsActive(false)
        onTimeUpRef.current?.()
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setTime(prev => {
        const newTime = prev - 1
        if (newTime <= 0) {
          setIsActive(false)
          onTimeUpRef.current?.()
          return 0
        }
        return newTime
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isActive])

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setStartTime(Date.now())
    setTime(initialTime)
    setIsActive(true)
  }, [initialTime])

  const stop = useCallback(() => {
    setIsActive(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const getElapsedTime = useCallback(() => {
    return Math.floor((Date.now() - startTime) / 1000)
  }, [startTime])

  return { time, isActive, reset, stop, getElapsedTime }
}
