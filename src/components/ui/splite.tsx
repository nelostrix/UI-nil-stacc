import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  // Fraction of the container's linear size to actually render at (then
  // CSS-scaled back up to fill it). Cuts the pixel count Spline's WebGL
  // renderer has to shade — e.g. 0.65 renders ~42% of the pixels.
  renderScale?: number
}

export function SplineScene({ scene, className, renderScale = 0.65 }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <div className={className} style={{ overflow: 'hidden' }}>
        <div
          style={{
            width: `${renderScale * 100}%`,
            height: `${renderScale * 100}%`,
            transform: `scale(${1 / renderScale})`,
            transformOrigin: 'top left',
          }}
        >
          <Spline
            scene={scene}
            className="w-full h-full"
            renderOnDemand
          />
        </div>
      </div>
    </Suspense>
  )
}