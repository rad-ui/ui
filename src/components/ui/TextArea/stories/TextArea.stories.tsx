import React from 'react';
import TextArea from '../TextArea';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'WIP/TextArea',
    component: TextArea
} as any;

export const Basic = {
    render: () => {
        return <SandboxEditor>
            <div className="flex justify-center py-16">
                <div className="w-full max-w-[40rem] space-y-3">
                    <div className="text-[0.9375rem] font-semibold text-[var(--rad-ui-text-primary)]">
                        Message
                    </div>
                    <div className="text-[0.9375rem] text-[var(--rad-ui-text-secondary)]">
                        Enter your message below.
                    </div>
                    <TextArea
                        placeholder="Type your message here."
                        aria-label="Message"
                    />
                </div>
            </div>
        </SandboxEditor>;
    }
};
