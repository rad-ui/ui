'use client'
import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import Card from '@radui/ui/Card'
import Text from '@radui/ui/Text'
import Link from '@radui/ui/Link'

interface SearchResult {
  title: string
  href: string
  description?: string
  category: string
}

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  
  // Mock search data - in a real app, this would come from an API or search index
  const searchData: SearchResult[] = [
    { title: 'Installation', href: '/docs/first-steps/installation', description: 'Get started with Rad UI', category: 'Getting Started' },
    { title: 'Introduction', href: '/docs/first-steps/introduction', description: 'Learn about Rad UI', category: 'Getting Started' },
    { title: 'Button', href: '/docs/components/button', description: 'Interactive button component', category: 'Components' },
    { title: 'Card', href: '/docs/components/card', description: 'Container component', category: 'Components' },
    { title: 'Input', href: '/docs/components/input', description: 'Form input component', category: 'Components' },
    { title: 'Modal', href: '/docs/components/modal', description: 'Overlay dialog component', category: 'Components' },
    { title: 'Accordion', href: '/docs/components/accordion', description: 'Collapsible content component', category: 'Components' },
    { title: 'Avatar', href: '/docs/components/avatar', description: 'User profile image component', category: 'Components' },
    { title: 'Badge', href: '/docs/components/badge', description: 'Status indicator component', category: 'Components' },
    { title: 'Playground', href: '/playground', description: 'Interactive component playground', category: 'Tools' },
    { title: 'Sponsors', href: '/sponsors', description: 'Our amazing sponsors', category: 'Community' },
  ]
  
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }
    
    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    )
    
    setResults(filtered.slice(0, 8)) // Limit to 8 results
  }, [query])
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
    }
  }
  
  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 border border-gray-200 shadow-lg z-50">
          <div className="space-y-2">
            {results.map((result, index) => (
              <Link
                key={index}
                href={result.href}
                className="block p-2 hover:bg-gray-50 rounded"
                onClick={() => {
                  setIsOpen(false)
                  setQuery('')
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <Text className="font-medium text-gray-1000">{result.title}</Text>
                    {result.description && (
                      <Text className="text-sm text-gray-600">{result.description}</Text>
                    )}
                  </div>
                  <Text className="text-xs text-gray-500 ml-2">{result.category}</Text>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default SearchBar
