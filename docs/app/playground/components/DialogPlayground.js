'use client'

import Dialog from "@radui/ui/Dialog"
import ColorLooper from "../helpers/ColorLooper"

const DialogPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Dialog"
            docsLink="/docs/components/dialog"
            description="General-purpose modal surface for settings, forms, and detail views."
        >
            <Dialog.Root>
                <Dialog.Trigger>
                    Open settings
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content>
                        <Dialog.Title>
                            Workspace settings
                        </Dialog.Title>
                        <Dialog.Description>
                            Adjust the docs workspace without leaving the current page.
                        </Dialog.Description>
                        <Dialog.Footer>
                            <Dialog.Close>
                                Close
                            </Dialog.Close>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </ColorLooper>
    </div>
)

export default DialogPlayground
