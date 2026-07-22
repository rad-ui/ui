import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';
import LiveRegion from '../LiveRegion';
import { useAnnounce } from '../useAnnounce';

export default {
    title: 'Utilities/LiveRegion',
    component: LiveRegion,
    parameters: {
        docs: {
            description: {
                component:
                    'Live regions expose dynamic status to screen readers. Use the declarative LiveRegion component or the useAnnounce hook for programmatic updates.'
            }
        }
    }
};

export const Declarative = {
    render: () => (
        <SandboxEditor>
            <LiveRegion politeness="polite" atomic>
                Three items selected
            </LiveRegion>
            <p className="text-sm text-gray-600">
                The selection count above is announced when this story mounts (content is visually hidden).
            </p>
        </SandboxEditor>
    )
};

function AnnounceDemo() {
    const { announce, Announcer } = useAnnounce({ politeness: 'polite' });

    return (
        <SandboxEditor>
            <div className="flex gap-2">
                <Button onClick={() => announce('Draft saved')}>Save draft</Button>
                <Button onClick={() => announce('Item removed from list')}>Remove item</Button>
            </div>
            <Announcer />
            <p className="text-sm text-gray-600 mt-4">
                Activate a button to hear a polite announcement in supporting assistive technology.
            </p>
        </SandboxEditor>
    );
}

export const Programmatic = {
    render: () => <AnnounceDemo />
};
