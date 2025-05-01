import React, { useState } from 'react';

// import Button from '@/rad-';
import AlertDialog from '../AlertDialog';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/AlertDialog',
    component: AlertDialog,
    render: (args:any) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <SandboxEditor>
                <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                        <Button>Open Dialog</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay />
                        <AlertDialog.Content>
                            <div>
                                Are you sure you want to delete this account?
                            </div>
                            <AlertDialog.Action asChild>
                                <Button>Confirm</Button>
                            </AlertDialog.Action>
                            <AlertDialog.Cancel asChild>
                                <Button>Cancel</Button>
                            </AlertDialog.Cancel>
                        </AlertDialog.Content>

                    </AlertDialog.Portal>

                </AlertDialog.Root>
            </SandboxEditor>
        );
    }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    args: {
        children: 'Delete Account',
        actionButton: <button>Delete</button>
    }
};
