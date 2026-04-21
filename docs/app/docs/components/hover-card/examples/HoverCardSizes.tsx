"use client"

import HoverCard from "@radui/ui/HoverCard"

const HoverCardSizes = () => {
    const sizes = ['small', 'medium', 'large'] as const;
    return (
        <div className="flex flex-col gap-10">
            {sizes.map((size) => (
                <div key={size}>
                    <p className="text-gray-500 text-xs mb-4">size: {size}</p>
                    <HoverCard.Root openDelay={100} closeDelay={200}>
                        <HoverCard.Trigger>
                            <a href="#" className="underline font-medium">@radui</a>
                        </HoverCard.Trigger>
                        <HoverCard.Portal>
                            <HoverCard.Content size={size}>
                                <div className="space-y-2">
                                    <div className="font-semibold">Rad UI</div>
                                    <p className="text-gray-600">A headless component library for React. Build accessible UIs with full styling control.</p>
                                    <p className="text-xs text-gray-400">Joined December 2021</p>
                                </div>
                            </HoverCard.Content>
                        </HoverCard.Portal>
                    </HoverCard.Root>
                </div>
            ))}
        </div>
    )
}

export default HoverCardSizes
