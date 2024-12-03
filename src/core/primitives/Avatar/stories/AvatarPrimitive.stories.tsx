import React from 'react';
import AvatarPrimitive from '..';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Primitives/AvatarPrimitive',
    component: AvatarPrimitive,
    render: (args: any) => <SandboxEditor>
        <div >
            <div className='flex space-x-2 w-full flex-1'>
                <AvatarPrimitive.Root>
                    <AvatarPrimitive.Image src={args.src} alt='Avatar' />
                    <AvatarPrimitive.Fallback>
                        <span>{args.fallback}</span>
                    </AvatarPrimitive.Fallback>
                </AvatarPrimitive.Root>

            </div>

        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const WithSrc = {
    args: {
        src: 'https://via.placeholder.com/150'
    }
};

export const WithError = {
    args: {
        src: 'brokenlink---',
        fallback: 'AB'
    }
};
