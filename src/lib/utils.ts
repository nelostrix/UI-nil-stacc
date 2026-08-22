import { useEffect, useState } from 'react'

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