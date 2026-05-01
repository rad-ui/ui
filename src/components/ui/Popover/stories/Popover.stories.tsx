import React from 'react';
import { X } from 'lucide-react';
import Popover from '../Popover';
import Button from '~/components/ui/Button/Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Components/Popover',
    component: Popover,
    render: () => (
        <SandboxEditor>
            <div style={{ padding: '5rem', display: 'flex', justifyContent: 'center' }}>
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <Button>Open popover</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content sideOffset={8}>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                <strong>Dimensions</strong>
                                <label style={{ display: 'grid', gap: '0.25rem' }}>
                                    Width
                                    <input defaultValue="100%" />
                                </label>
                                <label style={{ display: 'grid', gap: '0.25rem' }}>
                                    Max width
                                    <input defaultValue="300px" />
                                </label>
                                <Popover.Close
                                    aria-label="Close"
                                    style={{ position: 'absolute', top: 8, right: 8 }}
                                >
                                    <X width={14} height={14} />
                                </Popover.Close>
                            </div>
                            <Popover.Arrow />
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </div>
        </SandboxEditor>
    )
} as any;

export const Default = {};
