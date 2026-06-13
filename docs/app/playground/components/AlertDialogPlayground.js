'use client'

import AlertDialog from "@radui/ui/AlertDialog"
import ColorLooper from "../helpers/ColorLooper"

const AlertDialogPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="AlertDialog"
            docsLink="/docs/components/alert-dialog"
            description="Confirmation flow for destructive actions with focus trapping and explicit cancel/action controls."
        >
            <div className='flex flex-wrap gap-3'>
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        Delete draft
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay />
                        <AlertDialog.Content>
                            <AlertDialog.Title>
                                Delete this draft?
                            </AlertDialog.Title>
                            <AlertDialog.Description>
                                This action cannot be undone and will remove the draft from the workspace.
                            </AlertDialog.Description>
                            <AlertDialog.Footer>
                                <AlertDialog.Cancel>
                                    Cancel
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    Delete
                                </AlertDialog.Action>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            </div>
        </ColorLooper>
    </div>
)

export default AlertDialogPlayground
