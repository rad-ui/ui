import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'motion/react';
import Popover from '../Popover';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';

const meta: Meta<typeof Popover> = {
    title: 'Components/Popover',
    component: Popover
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
    render: () => (
        <SandboxEditor>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button className='bg-gray-200 p-2'>Open</button>
                </Popover.Trigger>
                <Popover.Content>
                    <Popover.Arrow />
                    <div className='p-2'>Popover content</div>
                </Popover.Content>
            </Popover.Root>
        </SandboxEditor>
    )
};

export const AutoFocusOnOpen: Story = {
    render: () => (
        <SandboxEditor>
            <div style={{ minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <Button>Open (auto focus inside)</Button>
                    </Popover.Trigger>
                    <Popover.Content autoFocusOnOpen>
                        <Popover.Arrow />
                        <div style={{ width: '280px', padding: '8px', display: 'grid', gap: '8px' }}>
                            <strong>autoFocusOnOpen</strong>
                            <input type='text' placeholder='I should receive focus first' />
                            <button type='button'>Secondary action</button>
                        </div>
                    </Popover.Content>
                </Popover.Root>
            </div>
        </SandboxEditor>
    )
};

export const SideOffset: Story = {
    render: () => (
        <SandboxEditor>
            <div style={{ minHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
                <Popover.Root placement='bottom' sideOffset={4} defaultOpen>
                    <Popover.Trigger asChild>
                        <Button>sideOffset 4</Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Popover.Arrow />
                        <div style={{ width: '180px', padding: '8px' }}>Tighter offset</div>
                    </Popover.Content>
                </Popover.Root>

                <Popover.Root placement='bottom' sideOffset={20} defaultOpen>
                    <Popover.Trigger asChild>
                        <Button>sideOffset 20</Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Popover.Arrow />
                        <div style={{ width: '180px', padding: '8px' }}>Larger offset gap</div>
                    </Popover.Content>
                </Popover.Root>
            </div>
        </SandboxEditor>
    )
};

export const CollisionDetectionVisual: Story = {
    render: () => (
        <SandboxEditor>
            <div
                style={{
                    minHeight: '1600px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    border: '1px dashed #c7c9d4',
                    borderRadius: '8px',
                    background: 'linear-gradient(180deg, #f7f8fc 0%, #eef0f8 100%)'
                }}
            >
                <div>
                    <p style={{ margin: 0, fontSize: '14px', color: '#3b3e57' }}>
                        Collision test: open the bottom trigger. With <code>placement="bottom"</code>, popover should flip to top when there is not enough space.
                    </p>
                </div>

                <div style={{ height: '920px' }} />

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '420px' }}>
                    <Popover.Root placement='bottom' defaultOpen>
                        <Popover.Trigger asChild>
                            <Button>Bottom Trigger (auto-flip)</Button>
                        </Popover.Trigger>
                        <Popover.Content>
                            <Popover.Arrow />
                            <div style={{ width: '260px', padding: '8px' }}>
                                <strong>Collision Detection</strong>
                                <p style={{ margin: '8px 0 0', fontSize: '13px' }}>
                                    This should automatically reposition when there is not enough space below the trigger.
                                </p>
                            </div>
                        </Popover.Content>
                    </Popover.Root>
                </div>
            </div>
        </SandboxEditor>
    )
};

export const ForceMount: Story = {
    render: () => {
        const [open, setOpen] = React.useState(false);

        return (
            <SandboxEditor>
                <div style={{ minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <style>
                        {`
                        .rad-ui-popover-force-demo[data-state='closed'] {
                            opacity: 0;
                            transform: translateY(-16px) scale(0.92);
                            filter: blur(2px);
                        }
                        .rad-ui-popover-force-demo[data-state='open'] {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                            filter: blur(0);
                        }
                        .rad-ui-popover-force-demo {
                            transition: opacity 320ms cubic-bezier(0.16, 1, 0.3, 1), transform 320ms cubic-bezier(0.16, 1, 0.3, 1), filter 320ms cubic-bezier(0.16, 1, 0.3, 1);
                            will-change: opacity, transform, filter;
                        }
                        `}
                    </style>

                    <Popover.Root open={open} onOpenChange={setOpen} placement='bottom'>
                        <Popover.Trigger asChild>
                            <Button>{open ? 'Close popover' : 'Open popover'}</Button>
                        </Popover.Trigger>
                        <Popover.Content forceMount className='rad-ui-popover-force-demo'>
                            <Popover.Arrow />
                            <div style={{ width: '240px', padding: '8px' }}>
                                <strong>Force Mount Demo</strong>
                                <p style={{ margin: '8px 0 0', fontSize: '13px' }}>
                                    Content stays mounted while closed (`data-state="closed"`), so exit animations can run.
                                </p>
                            </div>
                        </Popover.Content>
                    </Popover.Root>
                </div>
            </SandboxEditor>
        );
    }
};

export const MotionFade: Story = {
    render: () => {
        const [open, setOpen] = React.useState(false);

        return (
            <SandboxEditor>
                <div style={{ minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <style>
                        {`
                        .rad-ui-popover-motion-shell[data-state='closed'] {
                            pointer-events: none;
                        }
                        .rad-ui-popover-motion-shell[data-state='open'] {
                            pointer-events: auto;
                        }
                        .rad-ui-popover-motion-shell {
                            background: transparent;
                            padding: 0;
                            box-shadow: none;
                            border: 0;
                        }
                        .rad-ui-popover-motion-surface {
                            background-color: var(--rad-ui-color-gray-50);
                            padding: 12px;
                            box-shadow: 0 10px 38px -10px #0e121659, 0 10px 20px -15px #0e121633;
                            border-radius: 8px;
                        }
                        `}
                    </style>
                    <Popover.Root open={open} onOpenChange={setOpen} placement='bottom'>
                        <Popover.Trigger asChild>
                            <Button>{open ? 'Close (Motion Fade)' : 'Open (Motion Fade)'}</Button>
                        </Popover.Trigger>

                        <Popover.Content forceMount className='rad-ui-popover-motion-shell'>
                            <motion.div
                                className='rad-ui-popover-motion-surface'
                                initial={false}
                                animate={open ? 'open' : 'closed'}
                                variants={{
                                    open: { opacity: 1, scale: 1 },
                                    closed: { opacity: 0, scale: 0.98 }
                                }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                            >
                                <Popover.Arrow />
                                <div style={{ width: '260px', padding: '8px' }}>
                                    <strong>motion.dev fade example</strong>
                                    <p style={{ margin: '8px 0 0', fontSize: '13px' }}>
                                        Uses <code>forceMount</code> + <code>motion/react</code> to animate in and out.
                                    </p>
                                </div>
                            </motion.div>
                        </Popover.Content>
                    </Popover.Root>
                </div>
            </SandboxEditor>
        );
    }
};
