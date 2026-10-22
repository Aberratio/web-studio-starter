'use client'

import { useEffect, useRef } from 'react'
import { SceneCanvas, ShaderPlane } from 'web-studio-kit'

/** Full-screen shader behind the hero. `uScroll` goes from 0 to 1 over the first screen. */
export default function HeroCanvas() {
  const scroll = useRef(0)

  useEffect(() => {
    const update = () => {
      scroll.current = Math.min(1, window.scrollY / window.innerHeight)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    // SceneCanvas: capped pixel ratio, no MSAA, and no rendering while off screen.
    <SceneCanvas>
      <ShaderPlane scroll={scroll} />
    </SceneCanvas>
  )
}
