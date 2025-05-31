import React, { useState } from 'react';

// import Button from '@/rad-';
import DialogPrimitive from '../index';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Primitives/DialogPrimitive',
    component: DialogPrimitive,
    render: (args:any) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <SandboxEditor>
                <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
                    <DialogPrimitive.Overlay className="w-screen h-screen" style={{ opacity: 0.5, backgroundColor: 'rgba(0, 0, 0, 0.9)' }} />
                    <DialogPrimitive.Trigger>
                        Open Dialog
                    </DialogPrimitive.Trigger>
                    <DialogPrimitive.Portal>
                        <DialogPrimitive.Content className="p-4 z-50 fixed mx-auto bg-gray-200 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md ">
                            <DialogPrimitive.Action>
                                Confirm
                            </DialogPrimitive.Action>
                            <DialogPrimitive.Cancel>
                                Cancel
                            </DialogPrimitive.Cancel>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>

                </DialogPrimitive.Root>
                <div className=" bg-gray-200">
                    {Array.from({ length: 100 }).map((_, index) => (
                        <div key={index} className="bg-gray-200">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                        </div>
                    ))}
                </div>
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
