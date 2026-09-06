import React, { useState } from 'react';
import LiveRegion from '../LiveRegion';
import Button from '~/components/ui/Button/Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Components/LiveRegion',
    component: LiveRegion
};

export const Default = {
    render: () => {
        const [message, setMessage] = useState('Ready');

        return (
            <SandboxEditor>
                <div className="flex items-center gap-3">
                    <Button onClick={() => setMessage(`Saved at ${new Date().toLocaleTimeString()}`)}>
                        Save
                    </Button>
                    <span aria-hidden="true">{message}</span>
                    <LiveRegion>{message}</LiveRegion>
                </div>
            </SandboxEditor>
        );
    }
};

export const Assertive = {
    render: () => (
        <SandboxEditor>
            <LiveRegion politeness="assertive">
                Payment failed. Check the card details and try again.
            </LiveRegion>
        </SandboxEditor>
    )
};
