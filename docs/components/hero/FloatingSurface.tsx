'use client'

type FloatingSurfaceProps = {
  children: React.ReactNode
  className?: string
  surfaceClassName?: string
}

export default function FloatingSurface({
  children,
  className = "",
  surfaceClassName = "",
}: FloatingSurfaceProps) {
  return (
    <div className={className}>
      <div
        className={`rounded-[28px] border border-gray-300 bg-gray-50/80 shadow-xl backdrop-blur w-fit ${surfaceClassName}`}
      >
        {children}
      </div>
    </div>
  )
}
