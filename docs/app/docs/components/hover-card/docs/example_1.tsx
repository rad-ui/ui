"use client"

import HoverCard from "@radui/ui/HoverCard"

const HoverCardExample = () => {
    return (
        <HoverCard.Root>
            <HoverCard.Trigger>
                <a href="#" className="underline font-medium">@radui</a>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content className="p-4 rounded-xl border shadow-lg bg-white w-[240px]">
                    <div className="font-bold mb-1">Rad UI</div>
                    <div className="text-sm text-gray-600">A headless component library for React. Build accessible UIs with full styling control.</div>
                    <HoverCard.Arrow />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    )
}

export default HoverCardExample
