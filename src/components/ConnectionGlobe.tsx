import { useEffect, useRef } from 'react'
import createGlobe, { type Globe } from 'cobe'

const ANGOLA: [number, number] = [-11.2027, 17.8739]
const DIASPORA_POINTS: [number, number][] = [
  [51.5072, -0.1276],   // United Kingdom
  [38.7223, -9.1393],   // Portugal
  [48.8566, 2.3522],    // France
  [52.52, 13.405],      // Germany
  [50.8503, 4.3517],    // Belgium
  [55.7558, 37.6173],   // Russia
  [40.7128, -74.006],   // United States
  [-30.5595, 22.9375],  // South Africa
]
const CONNECTION_ARCS = DIASPORA_POINTS.map((to) => ({
  from: ANGOLA,
  to,
  color: [0.5, 0.8, 0.54] as [number, number, number],
}))

function traceRoute(from: [number, number], to: [number, number], progress: number): [number, number] {
  return [
    from[0] + (to[0] - from[0]) * progress,
    from[1] + (to[1] - from[1]) * progress,
  ]
}

export function ConnectionGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let phi = 0.72
    let targetPhi = phi
    let frame = 0
    const animationStartedAt = performance.now()
    let pointerDown = false
    let previousPointerX = 0
    let globe: Globe | undefined

    globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 1.5),
      width: 720,
      height: 720,
      phi,
      theta: 0.18,
      dark: 1,
      diffuse: 1.25,
      mapSamples: 10000,
      mapBrightness: 2.25,
      baseColor: [0.13, 0.31, 0.18],
      markerColor: [1, 0.75, 0],
      glowColor: [0.42, 0.7, 0.46],
      markers: [
        { location: ANGOLA, size: 0.09, color: [0.8, 0, 0] },
        ...DIASPORA_POINTS.map((location) => ({ location, size: 0.045, color: [1, 0.75, 0] as [number, number, number] })),
      ],
      arcs: CONNECTION_ARCS,
      arcColor: [0.5, 0.8, 0.54],
      arcWidth: 0.78,
      arcHeight: 0.26,
      markerElevation: 0.02,
    })

    const onPointerDown = (event: PointerEvent) => {
      pointerDown = true
      previousPointerX = event.clientX
      canvas.setPointerCapture(event.pointerId)
    }
    const onPointerMove = (event: PointerEvent) => {
      if (!pointerDown) return
      targetPhi += (event.clientX - previousPointerX) * 0.012
      previousPointerX = event.clientX
    }
    const onPointerEnd = (event: PointerEvent) => {
      pointerDown = false
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId)
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerEnd)
    canvas.addEventListener('pointercancel', onPointerEnd)

    const render = (now: number) => {
      if (!pointerDown) targetPhi += 0.00135
      phi += (targetPhi - phi) * 0.08
      const cycleElapsed = (now - animationStartedAt) % 5000
      const linearProgress = Math.min(cycleElapsed / 2000, 1)
      const routeProgress = 1 - Math.pow(1 - linearProgress, 3)
      const tracedArcs = routeProgress < 0.01
        ? []
        : CONNECTION_ARCS.map(({ from, to, color }) => ({
          from,
          to: traceRoute(from, to, routeProgress),
          color,
        }))
      globe?.update({
        phi,
        arcs: tracedArcs,
        arcHeight: 0.26,
        arcWidth: 0.78,
      })
      frame = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(frame)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerEnd)
      canvas.removeEventListener('pointercancel', onPointerEnd)
      globe?.destroy()
    }
  }, [])

  return <canvas ref={canvasRef} className="connection-globe-canvas" aria-label="A globe connecting Angola and the United Kingdom" />
}
