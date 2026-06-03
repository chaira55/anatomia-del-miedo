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
  const ctxRef        = useRef<AudioContext | null>(null)
  const gainRef       = useRef<GainNode | null>(null)
  const ambientGainRef = useRef<GainNode | null>(null)
  const oscRefs       = useRef<OscillatorNode[]>([])
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

  const startAmbience = useCallback((ctx: AudioContext) => {
    if (!gainRef.current || oscRefs.current.length > 0) return

    const ag = ctx.createGain()
    ag.gain.setValueAtTime(0, ctx.currentTime)
    ag.gain.setTargetAtTime(0.07, ctx.currentTime, 3.0)
    ag.connect(gainRef.current)
    ambientGainRef.current = ag

    // Drone: fundamental + fifth + octave con leve desafinación
    const configs: [number, OscillatorType, number][] = [
      [36,  'sine',     0],
      [54,  'sine',     4],
      [72,  'triangle', -3],
      [108, 'sine',     2],
    ]

    configs.forEach(([freq, type, detune]) => {
      const osc = ctx.createOscillator()
      osc.type = type
      osc.frequency.value = freq
      osc.detune.value = detune
      osc.connect(ag)
      osc.start()
      oscRefs.current.push(osc)
    })

    // LFO muy lento para movimiento sutil de amplitud
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.07
    lfoGain.gain.value = 0.018
    lfo.connect(lfoGain)
    lfoGain.connect(ag.gain)
    lfo.start()
    oscRefs.current.push(lfo)
  }, [])

  const start = useCallback(() => {
    if (isStarted) return
    const ctx = getCtx()
    if (ctx.state === 'suspended') ctx.resume()
    startAmbience(ctx)
    setIsStarted(true)
  }, [isStarted, getCtx, startAmbience])

  const toggleMute = useCallback(() => {
    const ctx = getCtx()
    if (!gainRef.current) return
    setIsMuted((prev) => {
      const next = !prev
      gainRef.current!.gain.setTargetAtTime(next ? 0 : 1, ctx.currentTime, 0.15)
      return next
    })
  }, [getCtx])

  const playEffect = useCallback((_id: string) => {
    // Reservado para efectos futuros por sección
  }, [])

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
