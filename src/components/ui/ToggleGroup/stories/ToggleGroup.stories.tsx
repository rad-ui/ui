import React from 'react';
import { Bold, Italic, Underline } from 'lucide-react';

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
                        <ToggleGroup.Item value="bold" aria-label="Bold">
                            <Bold aria-hidden strokeWidth={2} />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="italic" aria-label="Italic">
                            <Italic aria-hidden strokeWidth={2} />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="underline" aria-label="Underline">
                            <Underline aria-hidden strokeWidth={2} />
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>
                </div>
            </SandboxEditor>
        );
    }
};
