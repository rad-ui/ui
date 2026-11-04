import React, { useState } from 'react';

// import Button from '@/rad-';
import Dialog from '../Dialog';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';
import { X } from 'lucide-react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Dialog',
    component: Dialog,
    render: (args: any) => {
        return (
            <SandboxEditor>
                <Dialog.Root>
                    <Dialog.Trigger >
                        <>Open Dialog</>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay />
                        <Dialog.Content>
                            <Dialog.Title>
                                Are you sure you want to delete this account?
                            </Dialog.Title>
                            <Dialog.Description>
                                This action cannot be undone.
                            </Dialog.Description>
                            {/* <form>
                                <input type="text" />
                                <input type="text" />
                            </form> */}
                            <Dialog.Close>
                                <X width={15} height={15} />
                            </Dialog.Close>
                        </Dialog.Content>

                    </Dialog.Portal>

                </Dialog.Root>
            </SandboxEditor>
        );
    }
} as any;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    args: {
        children: 'Delete Account',
        actionButton: <button>Delete</button>
    }
};

const DetachedTriggersExample = () => {
    const handle = React.useMemo(() => Dialog.createHandle<{ name: string }>(), []);
    const files = [{ name: 'Invoice.pdf' }, { name: 'Contract.docx' }, { name: 'Photo.png' }];
    return (
        <SandboxEditor>
            <ul className="flex flex-col gap-2">
                {files.map((file) => (
                    <li key={file.name} className="flex items-center gap-3">
                        {file.name}
                        <Dialog.Trigger handle={handle} payload={file}>Delete</Dialog.Trigger>
                    </li>
                ))}
            </ul>
            <Dialog.Root handle={handle}>
                {({ payload }) => (
                    <Dialog.Portal>
                        <Dialog.Overlay />
                        <Dialog.Content>
                            <Dialog.Title>Delete {(payload as { name: string } | undefined)?.name}?</Dialog.Title>
                            <Dialog.Close>Cancel</Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </Dialog.Root>
        </SandboxEditor>
    );
};

export const DetachedTriggers = {
    render: () => <DetachedTriggersExample />
};
