"use client"

import type { HTMLAttributes, ReactElement } from "react"
import Slot, { useRender } from "@radui/ui/Slot"

// A Card that renders a <section> by default, or whatever element `render` passes.
function Card({ render, ...props }: { render?: ReactElement } & HTMLAttributes<HTMLElement>) {
    return useRender({ render, props: { className: "rounded-lg border p-4", ...props }, defaultTagName: "section" })
}

export default function SlotExample() {
    return (
        <div className="flex flex-col gap-3">
            <Card>A section card</Card>
            <Card render={<a href="#slot" />}>A card that is a link</Card>
            <Slot className="underline" onClick={() => console.log("clicked")}>
                <button type="button">Slot merged its props onto this button</button>
            </Slot>
        </div>
    )
}
