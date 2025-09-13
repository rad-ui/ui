'use client'
import { usePathname } from 'next/navigation'
import Link from '@radui/ui/Link'
import Text from '@radui/ui/Text'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

const Breadcrumbs = () => {
  const pathname = usePathname()
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ]
    
    let currentPath = ''
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === segments.length - 1
      
      // Format segment labels
      let label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      // Special cases
      if (segment === 'docs') {
        label = 'Documentation'
      } else if (segment === 'first-steps') {
        label = 'Getting Started'
      } else if (segment === 'components') {
        label = 'Components'
      } else if (segment === 'showcase') {
        label = 'Showcase'
      } else if (segment === 'playground') {
        label = 'Playground'
      } else if (segment === 'sponsors') {
        label = 'Sponsors'
      }
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isActive: isLast
      })
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  if (breadcrumbs.length <= 1) return null
  
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
          )}
          {item.isActive ? (
            <Text className="text-gray-1000 font-medium">{item.label}</Text>
          ) : (
            <Link 
              href={item.href}
              className="text-gray-600 hover:text-gray-1000"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumbs
