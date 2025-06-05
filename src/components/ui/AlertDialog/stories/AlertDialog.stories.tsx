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
                            <AlertDialog.Action>
                                <>Confirm</>
                            </AlertDialog.Action>
                            <AlertDialog.Cancel>
                                <>Cancel</>
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

const WithoutPortalTemplate = () => {
    return (
        <SandboxEditor>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <>Open Dialog</>
                </AlertDialog.Trigger>
                <AlertDialog.Overlay />
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Are you sure you want to delete this account?
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                        This action cannot be undone.
                    </AlertDialog.Description>
                    <AlertDialog.Action>
                        <>Confirm</>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>
                        <>Cancel</>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </SandboxEditor>
    );
};

export const WithoutPortal = {
    render: () => <WithoutPortalTemplate />
};

const ControlledOpenTemplate = () => {
    return (
        <SandboxEditor>
            <AlertDialog.Root open={true}>
                <AlertDialog.Trigger>
                    <>Open Dialog</>
                </AlertDialog.Trigger>
                <AlertDialog.Overlay />
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Are you sure you want to delete this account?
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                        This action cannot be undone.
                    </AlertDialog.Description>
                    <AlertDialog.Action>
                        <>Confirm</>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>
                        <>Cancel</>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </SandboxEditor>
    );
};

export const ControlledOpen = {
    render: () => <ControlledOpenTemplate />
};
