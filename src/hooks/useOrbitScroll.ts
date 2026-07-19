import { useEffect } from 'react'

export function useOrbitScroll() {
  useEffect(() => {
    const ring = document.getElementById('orbsRing')
    const hero = document.getElementById('hero')
    if (!ring || !hero) return

    const contents = ring.querySelectorAll<HTMLElement>('.orb-content')
    let frame: number | undefined

    function update() {
      const heroBottom = hero!.offsetTop + hero!.offsetHeight
      const active = window.scrollY > 0 && window.scrollY < heroBottom
      const state = active ? 'running' : 'paused'
      ring!.style.animationPlayState = state
      contents.forEach(c => (c.style.animationPlayState = state))
    }

    const onScroll = () => {
      if (frame !== undefined) return
      frame = requestAnimationFrame(() => {
        frame = undefined
        update()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
