'use client'
import { Suspense, lazy } from 'react'
import Card from '@radui/ui/Card'
import Text from '@radui/ui/Text'

interface LazyComponentProps {
  component: () => Promise<any>
  fallback?: React.ReactNode
  className?: string
}

const DefaultFallback = () => (
  <Card className="p-8 border border-gray-200">
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  </Card>
)

const LazyComponent = ({ component, fallback, className }: LazyComponentProps) => {
  const LazyLoadedComponent = lazy(component)

  return (
    <Suspense fallback={fallback || <DefaultFallback />}>
      <div className={className}>
        <LazyLoadedComponent />
      </div>
    </Suspense>
  )
}

export default LazyComponent
