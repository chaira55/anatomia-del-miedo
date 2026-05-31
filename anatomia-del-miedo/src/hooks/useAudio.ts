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
  const ctxRef = useRef<AudioContext | null>(null)
  const ambientRef = useRef<AudioBufferSourceNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
      gainRef.current = ctxRef.current.createGain()
      gainRef.current.connect(ctxRef.current.destination)
    }
    return ctxRef.current
  }, [])

  const start = useCallback(() => {
    if (isStarted) return
    const ctx = getCtx()
    if (ctx.state === 'suspended') ctx.resume()
    setIsStarted(true)
  }, [isStarted, getCtx])

  const toggleMute = useCallback(() => {
    if (!gainRef.current) return
    setIsMuted((prev) => {
      const next = !prev
      gainRef.current!.gain.setTargetAtTime(next ? 0 : 1, gainRef.current!.context.currentTime, 0.1)
      return next
    })
  }, [])

  const playEffect = useCallback((_id: string) => {
    // Placeholder — se conectará a buffers de audio reales en Fase 4
  }, [])

  const playTransition = useCallback(() => {
    const ctx = getCtx()
    if (!gainRef.current) return
    // Breve ducking de volumen al cambiar de capítulo
    gainRef.current.gain.setTargetAtTime(0.2, ctx.currentTime, 0.05)
    gainRef.current.gain.setTargetAtTime(isMuted ? 0 : 1, ctx.currentTime + 0.4, 0.1)
  }, [getCtx, isMuted])

  return { start, toggleMute, isMuted, isStarted, playEffect, playTransition }
}
