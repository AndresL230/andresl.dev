import { useEffect, useRef } from 'react'

export type BgVariant = 'off' | 'field' | 'scatter' | 'flock'

export default function HeroBackground({ variant }: { variant: BgVariant }) {
  if (variant === 'off') return null
  return <ParticleCanvas behavior={variant} />
}

type Dot = {
  bx: number; by: number
  x: number;  y: number
  vx: number; vy: number
  size: number
  alpha: number
}

function ParticleCanvas({ behavior }: { behavior: 'field' | 'scatter' | 'flock' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let dots: Dot[] = []
    const mouse = { x: -9999, y: -9999 }
    let raf = 0

    function resize() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
    }

    function init() {
      dots = []
      if (behavior === 'flock') {
        const count = Math.min(240, Math.max(120, Math.floor((w * h) / 7200)))
        for (let i = 0; i < count; i++) {
          const bx = Math.random() * w
          const by = Math.random() * h
          dots.push({
            bx, by, x: bx, y: by,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            size: 1 + Math.random() * 1.6,
            alpha: 0.18 + Math.random() * 0.22,
          })
        }
      } else {
        const step = 34
        const offsetX = ((w % step) + step) / 2
        const offsetY = ((h % step) + step) / 2
        for (let y = offsetY; y < h; y += step) {
          for (let x = offsetX; x < w; x += step) {
            const j = step * 0.22
            const bx = x + (Math.random() - 0.5) * j
            const by = y + (Math.random() - 0.5) * j
            dots.push({
              bx, by, x: bx, y: by,
              vx: 0, vy: 0,
              size: 1.25,
              alpha: 0.26,
            })
          }
        }
      }
    }

    function tick() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      const R = 150
      const R2 = R * R

      for (const d of dots) {
        const dx = d.x - mouse.x
        const dy = d.y - mouse.y
        const d2 = dx * dx + dy * dy

        if (behavior === 'field') {
          let p = 0
          if (d2 < R2) p = 1 - Math.sqrt(d2) / R
          const size = 1.2 + p * 3.8
          const a = 0.2 + p * 0.55
          ctx.beginPath()
          ctx.arc(d.x, d.y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(28,24,18,${a})`
          ctx.fill()
        } else if (behavior === 'scatter') {
          let tx = d.bx
          let ty = d.by
          if (d2 < R2 && d2 > 1) {
            const dist = Math.sqrt(d2)
            const strength = (1 - dist / R) * 46
            tx = d.bx + (dx / dist) * strength
            ty = d.by + (dy / dist) * strength
          }
          d.x += (tx - d.x) * 0.14
          d.y += (ty - d.y) * 0.14
          const offset = Math.hypot(d.x - d.bx, d.y - d.by)
          const heat = Math.min(1, offset / 30)
          ctx.beginPath()
          ctx.arc(d.x, d.y, 1.3 + heat * 0.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(28,24,18,${0.24 + heat * 0.3})`
          ctx.fill()
        } else {
          if (d2 < R2 && d2 > 1) {
            const dist = Math.sqrt(d2)
            const strength = (1 - dist / R) * 0.55
            d.vx += (dx / dist) * strength
            d.vy += (dy / dist) * strength
          }
          d.vx *= 0.93
          d.vy *= 0.93
          d.vx += (Math.random() - 0.5) * 0.04
          d.vy += (Math.random() - 0.5) * 0.04
          d.x += d.vx
          d.y += d.vy
          if (d.x < -4) d.x += w + 8
          if (d.x > w + 4) d.x -= w + 8
          if (d.y < -4) d.y += h + 8
          if (d.y > h + 4) d.y -= h + 8
          ctx.beginPath()
          ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(28,24,18,${d.alpha})`
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(tick)
    }

    function onMove(e: PointerEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const lx = e.clientX - rect.left
      const ly = e.clientY - rect.top
      if (lx < -50 || ly < -50 || lx > w + 50 || ly > h + 50) {
        mouse.x = -9999
        mouse.y = -9999
      } else {
        mouse.x = lx
        mouse.y = ly
      }
    }

    function onLeaveDoc() {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeaveDoc)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeaveDoc)
    }
  }, [behavior])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        maskImage: 'linear-gradient(180deg, #000 0%, #000 72%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 72%, transparent 100%)',
      }}
    />
  )
}
