'use client'
import { useEffect, useRef, useState } from 'react'

// Mounts a gallery demo only while its card is near the viewport, and unmounts
// it again once it scrolls well away. With 90 live demos on /fx, mounting them
// all at once kept ~900 animations running and blocked the main thread.
const FxLazyDemo = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [near, setNear] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node || typeof IntersectionObserver === 'undefined') {
            setNear(true)
            return
        }
        const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '300px 0px' })
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return <div ref={ref} className={className}>{near ? children : null}</div>
}

export default FxLazyDemo
