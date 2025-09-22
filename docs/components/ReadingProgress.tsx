'use client'
import { useEffect, useState } from 'react'

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)
    }
    
    window.addEventListener('scroll', updateProgress)
    updateProgress() // Initial calculation
    
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])
  
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
      <div 
        className="h-full bg-green-600"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ReadingProgress
