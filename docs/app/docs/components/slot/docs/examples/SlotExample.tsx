"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import Slot, { mergeProps } from "@radui/ui/Slot"

// A button that can render as its child (for example a link) with `asChild`,
// the same way Rad UI parts do.
type ActionProps = ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }

const Action = forwardRef<HTMLButtonElement, ActionProps>(({ asChild, ...props }, ref) => {
    const merged = mergeProps({ className: "rounded-md border px-3 py-1.5" }, props)
    return asChild ? <Slot ref={ref} {...merged} /> : <button ref={ref} type="button" {...merged} />
})
Action.displayName = "Action"

export default function SlotExample() {
    return (
        <div className="flex gap-3">
            <Action onClick={() => console.log("clicked")}>A button</Action>
            <Action asChild>
                <a href="#slot">A link with the same styles</a>
            </Action>
        </div>
    )
}
