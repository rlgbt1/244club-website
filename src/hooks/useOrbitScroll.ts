import { useEffect } from 'react'

export function useOrbitScroll() {
  useEffect(() => {
    const ring = document.getElementById('orbsRing')
    const hero = document.getElementById('hero')
    if (!ring || !hero) return

    const contents = ring.querySelectorAll<HTMLElement>('.orb-content')

    function update() {
      const heroBottom = hero!.offsetTop + hero!.offsetHeight
      const active = window.scrollY > 0 && window.scrollY < heroBottom
      const state = active ? 'running' : 'paused'
      ring!.style.animationPlayState = state
      contents.forEach(c => (c.style.animationPlayState = state))
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])
}
