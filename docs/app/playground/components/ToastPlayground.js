'use client'

import Button from "@radui/ui/Button"
import Toast from "@radui/ui/Toast"
import PlaygroundSection from "../helpers/PlaygroundSection"

const ToastShelf = () => {
    const manager = Toast.useToastManager()

    return (
        <>
            <Toast.Portal>
                <Toast.Viewport>
                    {manager.toasts.map((toast) => (
                        <Toast.Root key={toast.id} toast={toast}>
                            <Toast.Content>
                                <Toast.Title>{toast.title}</Toast.Title>
                                {toast.description ? <Toast.Description>{toast.description}</Toast.Description> : null}
                                <Toast.Close />
                            </Toast.Content>
                        </Toast.Root>
                    ))}
                </Toast.Viewport>
            </Toast.Portal>
            <div className="flex flex-wrap gap-2">
                <Button onClick={() => manager.add({ title: "Saved changes", variant: "success" })}>Success</Button>
                <Button variant="outline" onClick={() => manager.add({ title: "Build failed", description: "Check the release logs.", variant: "error" })}>Error</Button>
                <Button variant="soft" onClick={() => manager.add({ title: "Sync queued", variant: "info" })}>Info</Button>
            </div>
        </>
    )
}

const ToastPlayground = () => (
    <div>
        <PlaygroundSection
            title="Toast"
            docsLink="/docs/components/toast"
            description="Stacked, dismissible notifications with success, error, and info variants."
        >
            <Toast.Provider position="bottom-right" limit={3}>
                <ToastShelf />
            </Toast.Provider>
        </PlaygroundSection>
    </div>
)

export default ToastPlayground
