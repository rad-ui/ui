'use client'
import { useEffect, useState } from 'react'
import Card from '@radui/ui/Card'
import Text from '@radui/ui/Text'
import Link from '@radui/ui/Link'
import Badge from '@radui/ui/Badge'

interface TocItem {
  id: string
  title: string
  level: number
  element: HTMLElement
}

const TableOfContents = () => {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  
  useEffect(() => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const items: TocItem[] = []
    
    headings.forEach((heading) => {
      const element = heading as HTMLElement
      const id = element.id || element.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || ''
      
      if (id) {
        element.id = id
        items.push({
          id,
          title: element.textContent || '',
          level: parseInt(element.tagName.charAt(1)),
          element
        })
      }
    })
    
    setTocItems(items)
    
    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -80% 0%',
        threshold: 0
      }
    )
    
    items.forEach((item) => observer.observe(item.element))
    
    return () => observer.disconnect()
  }, [])
  
  if (tocItems.length === 0) return null
  
  return (
    <Card className="p-6 border border-gray-200 sticky top-8">
      <div className="flex items-center gap-2 mb-4">
        <Badge color="purple" size="small">Contents</Badge>
        <Text className="font-semibold text-gray-1000">Table of Contents</Text>
      </div>
      
      <nav className="space-y-1">
        {tocItems.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm py-1 px-2 rounded ${
              activeId === item.id
                ? 'text-green-600 bg-green-50 font-medium'
                : 'text-gray-600 hover:text-gray-1000 hover:bg-gray-50'
            }`}
            style={{ marginLeft: `${(item.level - 1) * 12}px` }}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </Card>
  )
}

export default TableOfContents
