"use client"

import HoverCard from "@radui/ui/HoverCard"

const HoverCardExample = () => {
    return (
        <HoverCard.Root openDelay={100} closeDelay={200}>
            <HoverCard.Trigger>
                <a href="#" className="underline font-medium">@radui</a>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content>
                    <div className="w-[240px] space-y-2">
                        <div className="font-semibold text-[var(--rad-ui-text-primary)]">Rad UI</div>
                        <p className="text-sm text-[var(--rad-ui-text-secondary)]">A headless component library for React. Build accessible UIs with full styling control.</p>
                        <p className="text-xs text-[var(--rad-ui-text-muted)]">Joined December 2021</p>
                    </div>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    )
}

export default HoverCardExample
