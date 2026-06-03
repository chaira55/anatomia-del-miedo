import { useCallback, useRef, useState } from 'react'

export interface AudioAPI {
  start: () => void
  toggleMute: () => void
  isMuted: boolean
  isStarted: boolean
  playEffect: (id: string) => void
  playTransition: () => void
}

export function useAudio(): AudioAPI {
  const ambientRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted,   setIsMuted]   = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const start = useCallback(() => {
    if (isStarted) return

    const ambient = new Audio('/assets/audio/ambient.mp3')
    ambient.loop   = true
    ambient.volume = 0.6
    ambient.play().catch(() => {})
    ambientRef.current = ambient

    setIsStarted(true)
  }, [isStarted])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      if (ambientRef.current) ambientRef.current.muted = next
      return next
    })
  }, [])

  const playEffect = useCallback((_id: string) => {}, [])

  const playTransition = useCallback(() => {
    if (!isStarted || isMuted) return
    const sfx = new Audio('/assets/audio/turnpage.mp3')
    sfx.volume = 0.8
    sfx.play().catch(() => {})
  }, [isStarted, isMuted])

  return { start, toggleMute, isMuted, isStarted, playEffect, playTransition }
}
