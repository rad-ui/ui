import React, { useState } from 'react';

// import Button from '@/rad-';
import AlertDialog from '../AlertDialog';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/AlertDialog',
    component: AlertDialog,
    render: (args:any) => {
        return (
            <SandboxEditor>
                <AlertDialog.Root>
                    <AlertDialog.Trigger >
                        <>Open Dialog</>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay />
                        <AlertDialog.Content>
                            <AlertDialog.Title>
                                Are you sure you want to delete this account?
                            </AlertDialog.Title>
                            <AlertDialog.Description>
                                This action cannot be undone.
                            </AlertDialog.Description>
                            <div className="flex justify-end">
                                <AlertDialog.Action>
                                    <>Confirm</>
                                </AlertDialog.Action>
                                <AlertDialog.Cancel>
                                    <>Cancel</>
                                </AlertDialog.Cancel>
                            </div>
                        </AlertDialog.Content>

                    </AlertDialog.Portal>

                </AlertDialog.Root>
            </SandboxEditor>
        );
    }
};

// Basic usage story
export const Basic = {
    render: () => (
        <SandboxEditor>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    Open Alert Dialog
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content>
                        <AlertDialog.Title>
                            Are you sure you want to delete this account?
                        </AlertDialog.Title>
                        <AlertDialog.Description>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-2 mt-4">
                            <AlertDialog.Cancel>
                                Cancel
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                                Delete Account
                            </AlertDialog.Action>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </SandboxEditor>
    )
};

// Controlled usage story
export const Controlled = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <SandboxEditor>
                <div className="space-y-4">
                    <Button onClick={() => setOpen(true)}>
                        Open Controlled Dialog
                    </Button>
                    <p>Dialog is {open ? 'open' : 'closed'}</p>
                    <AlertDialog.Root open={open} onOpenChange={setOpen}>
                        <AlertDialog.Portal>
                            <AlertDialog.Overlay />
                            <AlertDialog.Content>
                                <AlertDialog.Title>
                                    Controlled Dialog
                                </AlertDialog.Title>
                                <AlertDialog.Description>
                                    This dialog is controlled by external state. It opens when you click the button above.
                                </AlertDialog.Description>
                                <div className="flex justify-end gap-2 mt-4">
                                    <AlertDialog.Cancel>
                                        Cancel
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        Confirm
                                    </AlertDialog.Action>
                                </div>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>
                    </AlertDialog.Root>
                </div>
            </SandboxEditor>
        );
    }
};

// Default open story
export const DefaultOpen = {
    render: () => (
        <SandboxEditor>
            <AlertDialog.Root defaultOpen>
                <AlertDialog.Trigger>
                    Dialog is open by default
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content>
                        <AlertDialog.Title>
                            Default Open Dialog
                        </AlertDialog.Title>
                        <AlertDialog.Description>
                            This dialog opens by default when the component mounts.
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-2 mt-4">
                            <AlertDialog.Cancel>
                                Close
                            </AlertDialog.Cancel>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </SandboxEditor>
    )
};

// Disabled trigger story
export const DisabledTrigger = {
    render: () => (
        <SandboxEditor>
            <div className="space-y-4">
                <AlertDialog.Root>
                    <AlertDialog.Trigger disabled>
                        Disabled Trigger
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay />
                        <AlertDialog.Content>
                            <AlertDialog.Title>
                                This won't open
                            </AlertDialog.Title>
                            <AlertDialog.Description>
                                The trigger is disabled, so this dialog won't open.
                            </AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>

                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        Enabled Trigger
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay />
                        <AlertDialog.Content>
                            <AlertDialog.Title>
                                This will open
                            </AlertDialog.Title>
                            <AlertDialog.Description>
                                This trigger is enabled and will open the dialog.
                            </AlertDialog.Description>
                            <div className="flex justify-end gap-2 mt-4">
                                <AlertDialog.Cancel>
                                    Close
                                </AlertDialog.Cancel>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            </div>
        </SandboxEditor>
    )
};

// Force mount story
export const ForceMount = {
    render: () => (
        <SandboxEditor>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    Open with Force Mount
                </AlertDialog.Trigger>
                <AlertDialog.Portal forceMount>
                    <AlertDialog.Overlay forceMount />
                    <AlertDialog.Content forceMount>
                        <AlertDialog.Title>
                            Force Mounted Dialog
                        </AlertDialog.Title>
                        <AlertDialog.Description>
                            This dialog and its overlay are force mounted, meaning they stay in the DOM even when closed.
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-2 mt-4">
                            <AlertDialog.Cancel>
                                Close
                            </AlertDialog.Cancel>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </SandboxEditor>
    )
};

// AsChild polymorphism story
export const AsChildPolymorphism = {
    render: () => (
        <SandboxEditor>
            <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                    <Button variant="destructive">
                        Delete Account
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content>
                        <AlertDialog.Title>
                            Delete Account
                        </AlertDialog.Title>
                        <AlertDialog.Description>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-2">
                            <AlertDialog.Cancel>
                                Cancel
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                                Delete
                            </AlertDialog.Action>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </SandboxEditor>
    )
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
