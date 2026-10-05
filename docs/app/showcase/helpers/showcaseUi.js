"use client"

import { useMemo } from "react"

import Kbd from "@radui/ui/Kbd"
import Toast, { createToastManager } from "@radui/ui/Toast"
import Tooltip from "@radui/ui/Tooltip"

/** Strips Clarity's default button chrome from a trigger so it can wrap an icon or avatar. */
export const bareTrigger = "min-h-0! border-0! bg-transparent! p-0! shadow-none!"

/** Icon-only button with an accessible label and a tooltip (optionally showing a shortcut). */
export const IconButton = ({ label, onClick, active, shortcut, className = "", children }) => (
    <Tooltip.Root>
        <Tooltip.Trigger
            aria-label={label}
            aria-pressed={active}
            onClick={onClick}
            className={`grid h-8 w-8 place-items-center rounded-md transition-colors ${active ? "text-green-900" : "text-gray-900 hover:bg-gray-200 hover:text-gray-1000"} ${className}`}
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
