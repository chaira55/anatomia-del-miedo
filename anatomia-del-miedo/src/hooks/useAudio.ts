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
  const ctxRef      = useRef<AudioContext | null>(null)
  const gainRef     = useRef<GainNode | null>(null)
  const audioElRef  = useRef<HTMLAudioElement | null>(null)
  const [isMuted,   setIsMuted]   = useState(false)
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

    // Audio ambiente en loop
    const audio = new Audio('/assets/audio/ambient.mp3')
    audio.loop = true
    const source = ctx.createMediaElementSource(audio)
    source.connect(gainRef.current!)
    audioElRef.current = audio
    audio.play().catch(() => {})

    setIsStarted(true)
  }, [isStarted, getCtx])

  const toggleMute = useCallback(() => {
    const ctx = getCtx()
    if (!gainRef.current) return
    setIsMuted((prev) => {
      const next = !prev
      gainRef.current!.gain.setTargetAtTime(next ? 0 : 1, ctx.currentTime, 0.15)
      return next
    })
  }, [getCtx])

  const playEffect = useCallback((_id: string) => {}, [])

  const playTransition = useCallback(() => {
    if (!isStarted || isMuted) return

    const sfx = new Audio('/assets/audio/turnpage.mp3')
    sfx.volume = 0.8
    sfx.play().catch(() => {})

    // Breve ducking del ambiente
    const ctx = getCtx()
    if (gainRef.current) {
      gainRef.current.gain.setTargetAtTime(0.25, ctx.currentTime, 0.04)
      gainRef.current.gain.setTargetAtTime(1, ctx.currentTime + 0.4, 0.12)
    }
  }, [isStarted, isMuted, getCtx])

  return { start, toggleMute, isMuted, isStarted, playEffect, playTransition }
}
