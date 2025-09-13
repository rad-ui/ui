'use client'
import { useState, useEffect } from 'react'
import Button from '@radui/ui/Button'
import Card from '@radui/ui/Card'
import Text from '@radui/ui/Text'
import { Eye, EyeOff, Type, Volume2, VolumeX } from 'lucide-react'

const AccessibilityFeatures = () => {
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  
  useEffect(() => {
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}px`
    
    return () => {
      document.documentElement.style.fontSize = ''
    }
  }, [fontSize])
  
  useEffect(() => {
    // Apply high contrast
    if (highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }
    
    return () => {
      document.body.classList.remove('high-contrast')
    }
  }, [highContrast])
  
  useEffect(() => {
    // Apply reduced motion
    if (reducedMotion) {
      document.body.classList.add('reduced-motion')
    } else {
      document.body.classList.remove('reduced-motion')
    }
    
    return () => {
      document.body.classList.remove('reduced-motion')
    }
  }, [reducedMotion])
  
  const toggleScreenReader = () => {
    setScreenReader(!screenReader)
    // In a real implementation, this would integrate with screen reader APIs
  }
  
  return (
    <Card className="p-4 border border-gray-200">
      <Text className="font-semibold text-gray-1000 mb-4">Accessibility</Text>
      
      <div className="space-y-3">
        {/* Font Size */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-gray-600" />
            <Text className="text-sm text-gray-700">Font Size</Text>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="small"
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              disabled={fontSize <= 12}
            >
              A-
            </Button>
            <Text className="text-xs text-gray-500 w-8 text-center">{fontSize}px</Text>
            <Button
              variant="ghost"
              size="small"
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              disabled={fontSize >= 24}
            >
              A+
            </Button>
          </div>
        </div>
        
        {/* High Contrast */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {highContrast ? <Eye className="w-4 h-4 text-gray-600" /> : <EyeOff className="w-4 h-4 text-gray-600" />}
            <Text className="text-sm text-gray-700">High Contrast</Text>
          </div>
          <Button
            variant={highContrast ? "solid" : "outline"}
            size="small"
            onClick={() => setHighContrast(!highContrast)}
          >
            {highContrast ? 'On' : 'Off'}
          </Button>
        </div>
        
        {/* Reduced Motion */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Text className="text-sm text-gray-700">Reduced Motion</Text>
          </div>
          <Button
            variant={reducedMotion ? "solid" : "outline"}
            size="small"
            onClick={() => setReducedMotion(!reducedMotion)}
          >
            {reducedMotion ? 'On' : 'Off'}
          </Button>
        </div>
        
        {/* Screen Reader */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {screenReader ? <Volume2 className="w-4 h-4 text-gray-600" /> : <VolumeX className="w-4 h-4 text-gray-600" />}
            <Text className="text-sm text-gray-700">Screen Reader</Text>
          </div>
          <Button
            variant={screenReader ? "solid" : "outline"}
            size="small"
            onClick={toggleScreenReader}
          >
            {screenReader ? 'On' : 'Off'}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default AccessibilityFeatures
