import React from 'react';

import ToggleGroup from '../ToggleGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'WIP/ToggleGroup',
    component: ToggleGroup
} as any;

export const Basic = {
    render: () => {
        return (
            <SandboxEditor>
                <div className="flex justify-center py-16">
                    <ToggleGroup.Root type="multiple" defaultValue={['bold']}>
                        <ToggleGroup.Item value="bold" aria-label="Bold" iconOnly>
                            <span className="text-[0.9375rem] font-bold font-sans leading-none">B</span>
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="italic" aria-label="Italic" iconOnly>
                            <span className="text-[0.9375rem] italic font-serif leading-none">I</span>
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="underline" aria-label="Underline" iconOnly>
                            <span className="text-[0.9375rem] font-sans underline leading-none">U</span>
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>
                </div>
            </SandboxEditor>
        );
    }
};
