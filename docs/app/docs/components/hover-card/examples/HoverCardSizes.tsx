"use client"

import HoverCard from "@radui/ui/HoverCard"

const HoverCardSizes = () => {
    const sizes = ['small', 'medium', 'large'] as const;
    return (
        <div className="flex flex-col gap-10">
            {sizes.map((size) => (
                <div key={size}>
                    <p className="text-[var(--rad-ui-text-secondary)] text-xs mb-4">size: {size}</p>
                    <HoverCard.Root openDelay={100} closeDelay={200}>
                        <HoverCard.Trigger>
                            <a href="#" className="underline font-medium">@radui</a>
                        </HoverCard.Trigger>
                        <HoverCard.Portal>
                            <HoverCard.Content size={size}>
                                <div className="space-y-2">
                                    <div className="font-semibold text-[var(--rad-ui-text-primary)]">Rad UI</div>
                                    <p className="text-[var(--rad-ui-text-secondary)]">A headless component library for React. Build accessible UIs with full styling control.</p>
                                    <p className="text-xs text-[var(--rad-ui-text-muted)]">Joined December 2021</p>
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
