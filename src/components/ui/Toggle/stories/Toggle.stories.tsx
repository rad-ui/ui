import React from 'react';
import Toggle from '../Toggle';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { Italic, Bold } from 'lucide-react';

export default {
    title: 'WIP/Toggle',
    component: Toggle
} as any;

export const Basic = {
    render: () => {
        return (
            <SandboxEditor>
                <div className="flex justify-center gap-4 py-16">
                    <Toggle defaultPressed onPressedChange={() => {}}>
                        <Italic />
                        <span>Italic</span>
                    </Toggle>
                    <Toggle onPressedChange={() => {}}>
                        <Bold />
                        <span>Bold</span>
                    </Toggle>
                </div>
            </SandboxEditor>
        );
    }
};
