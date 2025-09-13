'use client'
import { useEffect } from 'react'
import Card from '@radui/ui/Card'
import Text from '@radui/ui/Text'
import Badge from '@radui/ui/Badge'

const KeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }
      
      // Ctrl/Cmd + / for help
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        // Toggle keyboard shortcuts help
        const helpElement = document.getElementById('keyboard-shortcuts-help')
        if (helpElement) {
          helpElement.style.display = helpElement.style.display === 'none' ? 'block' : 'none'
        }
      }
      
      // Escape to close modals/dropdowns
      if (e.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement
        if (activeElement && activeElement.blur) {
          activeElement.blur()
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  const shortcuts = [
    { keys: ['Ctrl', 'K'], description: 'Focus search' },
    { keys: ['Ctrl', '/'], description: 'Show shortcuts' },
    { keys: ['Esc'], description: 'Close dialogs' },
    { keys: ['Tab'], description: 'Navigate focus' },
    { keys: ['Enter'], description: 'Activate focused' },
    { keys: ['Space'], description: 'Toggle elements' },
  ]
  
  return (
    <Card className="p-4 border border-gray-200" id="keyboard-shortcuts-help" style={{ display: 'none' }}>
      <div className="flex items-center gap-2 mb-4">
        <Badge color="blue" size="small">Shortcuts</Badge>
        <Text className="font-semibold text-gray-1000">Keyboard Shortcuts</Text>
      </div>
      
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, keyIndex) => (
                <div key={keyIndex} className="flex items-center">
                  {keyIndex > 0 && <Text className="text-gray-400 mx-1">+</Text>}
                  <kbd className="px-2 py-1 text-xs bg-gray-100 border border-gray-300 rounded">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
            <Text className="text-sm text-gray-600">{shortcut.description}</Text>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-2 bg-gray-50 rounded text-xs text-gray-500">
        Press Ctrl + / to toggle this help
      </div>
    </Card>
  )
}

export default KeyboardShortcuts
