'use client'

import ScrollArea from "@radui/ui/ScrollArea"
import PlaygroundSection from "../helpers/PlaygroundSection"

const ScrollAreaPlayground = () => (
    <div>
        <PlaygroundSection
            title="ScrollArea"
            docsLink="/docs/components/scroll-area"
            description="Custom scrollbars for both axes while keeping native scrolling."
        >
            <div className="h-44 min-w-0 rounded-lg border border-gray-200">
                <ScrollArea.Root type="always" style={{ height: "100%" }}>
                    <ScrollArea.Viewport>
                        <div className="grid w-[720px] gap-2 p-4">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <div key={index} className="rounded-md bg-gray-100 p-2 text-sm">Scrollable row {index + 1}</div>
                            ))}
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar orientation="horizontal"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </PlaygroundSection>
    </div>
)

export default ScrollAreaPlayground
