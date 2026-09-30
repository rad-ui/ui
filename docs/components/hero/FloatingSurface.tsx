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
        className={`w-fit rounded-[28px] border border-gray-300 bg-gray-50 shadow-xl backdrop-blur ${surfaceClassName}`}
      >
        {children}
      </div>
    </div>
  )
}
