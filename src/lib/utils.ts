import { useEffect, useRef, useState } from 'react'

export function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

// Delays mounting until the browser is idle (or a fallback timeout), so
// heavy client-only content (e.g. 3D scenes) doesn't compete with the
// initial page paint/hydration.
export function useDeferredMount(timeout = 300) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout })
      return () => w.cancelIdleCallback?.(id)
    }

    const id = window.setTimeout(() => setReady(true), timeout)
    return () => window.clearTimeout(id)
  }, [timeout])

  return ready
}

// True when the OS/browser asks for reduced motion — used to skip mounting
// heavy animated 3D scenes entirely for those users.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}

// Tracks whether an element is on-screen, so animated content (3D scenes,
// canvases) can pause/unmount once scrolled away instead of rendering
// forever in the background.
export function useInView<T extends HTMLElement>(rootMargin = '200px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}