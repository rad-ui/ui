"use client"

import ScrollArea from "@radui/ui/ScrollArea"

const TAGS = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`)

const ScrollAreaExample = () => {
    return (
        <ScrollArea.Root style={{ height: 200, width: 260, border: '1px solid #e5e7eb', borderRadius: 8 }}>
            <ScrollArea.Viewport style={{ padding: '8px 12px' }}>
                {TAGS.map(tag => (
                    <div key={tag} style={{ padding: '4px 0', fontSize: 14 }}>{tag}</div>
                ))}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
        </ScrollArea.Root>
    )
}

export default ScrollAreaExample
