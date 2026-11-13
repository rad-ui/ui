"use client"

import { useEffect, useMemo, useSyncExternalStore } from "react"

import Drawer from "@radui/ui/Drawer"
import Kbd from "@radui/ui/Kbd"
import Toast, { createToastManager } from "@radui/ui/Toast"
import Tooltip from "@radui/ui/Tooltip"
import { X } from "lucide-react"

/** Strips Clarity's default button chrome from a trigger so it can wrap an icon or avatar. */
export const bareTrigger = "min-h-0! border-0! bg-transparent! p-0! shadow-none!"

/** Makes an icon button at least 44px on touch screens, where a 32px target is easy to miss. */
export const touchTarget = "pointer-coarse:min-h-11 pointer-coarse:min-w-11"

/**
 * Grows the tappable area of a small control (a 16px checkbox, say) to 32px on
 * touch screens without changing how it looks. Use it where a 44px box would
 * overlap the next control. The theme should do this itself:
 * https://github.com/rad-ui/ui/issues/2359
 */
export const hitArea = "relative pointer-coarse:after:absolute pointer-coarse:after:left-1/2 pointer-coarse:after:top-1/2 pointer-coarse:after:size-8 pointer-coarse:after:-translate-x-1/2 pointer-coarse:after:-translate-y-1/2 pointer-coarse:after:content-['']"

/** `true` while the media query matches. `false` on the server and on the first client render. */
export const useMediaQuery = (query) => useSyncExternalStore(
    (onChange) => {
        const list = window.matchMedia(query)
        list.addEventListener("change", onChange)
        return () => list.removeEventListener("change", onChange)
    },
    () => window.matchMedia(query).matches,
    () => false
)

/**
 * Holds, on a small screen, what a wider layout shows in a column: a sidebar,
 * a details pane, a full player. The same content goes in both places, so
 * nothing is lost when the column is hidden.
 *
 * `closeAbove` is the media query at which the column is back on screen. The
 * drawer closes itself there, so it never covers the layout it stands in for.
 */
export const DrawerPanel = ({ open, onOpenChange, side = "left", title, closeAbove = "not all", className = "", children }) => {
    const columnVisible = useMediaQuery(closeAbove)

    useEffect(() => {
        if (columnVisible && open) onOpenChange(false)
    }, [columnVisible, open, onOpenChange])

    return (
        // `hidden!`: until @radui/ui ships https://github.com/rad-ui/ui/pull/2349, Drawer.Root renders
        // an empty wrapper div, which would take a cell in the grid or flex layout it sits in.
        <Drawer.Root open={open} onOpenChange={(next) => onOpenChange(next)} swipeDirection={side} className="hidden!">
            <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content className={`text-gray-1000 ${className}`}>
                    {side === "bottom" ? <Drawer.Handle /> : null}
                    <Drawer.Title>{title}</Drawer.Title>
                    <Drawer.Close aria-label={`Close ${title.toLowerCase()}`} className={touchTarget}>
                        <X />
                    </Drawer.Close>
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-[env(safe-area-inset-bottom)]">{children}</div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

/** Icon-only button with an accessible label and a tooltip (optionally showing a shortcut). */
export const IconButton = ({ label, onClick, active, shortcut, className = "", children }) => (
    <Tooltip.Root>
        <Tooltip.Trigger
            aria-label={label}
            aria-pressed={active}
            onClick={onClick}
            className={`grid h-8 w-8 place-items-center rounded-md transition-colors ${touchTarget} ${active ? "text-green-950" : "text-gray-950 hover:bg-gray-200 hover:text-gray-1000"} ${className}`}
        >
            {children}
        </Tooltip.Trigger>
        <Tooltip.Content>
            <span className="flex items-center gap-2">{label}{shortcut ? <Kbd size="small">{shortcut}</Kbd> : null}</span>
        </Tooltip.Content>
    </Tooltip.Root>
)

/** Renders the toasts of the nearest Toast.Provider. */
const ToastShelf = () => {
    const toast = Toast.useToastManager()
    return (
        <Toast.Portal>
            <Toast.Viewport>
                {toast.toasts.map((item) => (
                    <Toast.Root key={item.id} toast={item}>
                        <Toast.Content>
                            <Toast.Title>{item.title}</Toast.Title>
                            {item.description ? <Toast.Description>{item.description}</Toast.Description> : null}
                            <Toast.Close />
                        </Toast.Content>
                    </Toast.Root>
                ))}
            </Toast.Viewport>
        </Toast.Portal>
    )
}

/** Gives a demo its own toast queue so toasts never leak between demos. */
export const withToasts = (Component) => {
    const Wrapped = (props) => {
        const manager = useMemo(() => createToastManager(), [])
        return (
            <Toast.Provider toastManager={manager} position="bottom-right" limit={3} timeout={3000}>
                <Component {...props} />
                <ToastShelf />
            </Toast.Provider>
        )
    }
    Wrapped.displayName = `withToasts(${Component.displayName || Component.name || "Demo"})`
    return Wrapped
}

/** `notify(title, description?)` for the current demo's toast queue. */
export const useNotify = () => {
    const toast = Toast.useToastManager()
    return (title, description) => toast.add({ title, description })
}
