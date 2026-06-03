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

    // Cargar y reproducir ambient.mp3
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
    const ctx = getCtx()
    if (!gainRef.current || isMuted) return

    // Susurro de papel al pasar la página
    const bufLen = Math.floor(ctx.sampleRate * 0.18)
    const buffer = ctx.createBuffer(1, bufLen, ctx.sampleRate)
    const data   = buffer.getChannelData(0)
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.045))
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 4500
    filter.Q.value = 0.8
    const ng = ctx.createGain()
    ng.gain.value = 0.22
    source.connect(filter)
    filter.connect(ng)
    ng.connect(gainRef.current)
    source.start()

    // Breve ducking del ambiente
    gainRef.current.gain.setTargetAtTime(0.25, ctx.currentTime, 0.04)
    gainRef.current.gain.setTargetAtTime(1, ctx.currentTime + 0.35, 0.12)
  }, [getCtx, isMuted])

  return { start, toggleMute, isMuted, isStarted, playEffect, playTransition }
}
