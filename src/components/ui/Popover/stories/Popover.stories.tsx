import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import Popover from '../Popover';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';
import Heading from '~/components/ui/Heading/Heading';
import Text from '~/components/ui/Text/Text';
import TextField from '~/components/ui/TextField/TextField';

export default {
    title: 'Components/Popover',
    component: Popover,
    render: () => (
        <PopoverDemo />
    )
} as any;

const PopoverDemo = ({ modal = false }: { modal?: boolean }) => (
    <SandboxEditor>
        <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
            <Popover.Root modal={modal}>
                <Popover.Trigger asChild>
                    <Button aria-label="Adjust dimensions" variant="soft">
                        <SlidersHorizontal />
                    </Button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content sideOffset={12}>
                        <div style={{ display: 'grid', gap: '1rem', minWidth: '18rem' }}>
                            <Heading as="h3">Dimensions</Heading>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                <div style={{ display: 'grid', gap: '0.35rem' }}>
                                    <Text as="label" htmlFor="popover-width">Width</Text>
                                    <TextField id="popover-width" defaultValue="100%" />
                                </div>
                                <div style={{ display: 'grid', gap: '0.35rem' }}>
                                    <Text as="label" htmlFor="popover-max-width">Max. width</Text>
                                    <TextField id="popover-max-width" defaultValue="300px" />
                                </div>
                                <div style={{ display: 'grid', gap: '0.35rem' }}>
                                    <Text as="label" htmlFor="popover-height">Height</Text>
                                    <TextField id="popover-height" defaultValue="25px" />
                                </div>
                                <div style={{ display: 'grid', gap: '0.35rem' }}>
                                    <Text as="label" htmlFor="popover-max-height">Max. height</Text>
                                    <TextField id="popover-max-height" defaultValue="none" />
                                </div>
                            </div>
                            <Popover.Close aria-label="Close">
                                <X width={18} height={18} />
                            </Popover.Close>
                        </div>
                        <Popover.Arrow />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>
    </SandboxEditor>
);

export const Default = {
    render: () => <PopoverDemo />
};

export const Modal = {
    render: () => <PopoverDemo modal />
};

export const CssTransitions = {
    render: () => (
        <SandboxEditor>
            <style>{`
                .transition-demo {
                    transition: opacity 180ms ease, transform 180ms ease;
                }
                .transition-demo[data-starting-style],
                .transition-demo[data-ending-style] {
                    opacity: 0;
                    transform: scale(0.96);
                }
                @media (prefers-reduced-motion: reduce) {
                    .transition-demo { transition: none; }
                }
            `}</style>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <Button>Open with a transition</Button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content className="transition-demo">
                        <Text>Fades and scales in, and stays mounted until it has faded out.</Text>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </SandboxEditor>
    )
};

const DetachedTriggersExample = () => {
    const handle = React.useMemo(() => Popover.createHandle<string>(), []);
    return (
        <SandboxEditor>
            <div className="flex gap-2">
                {['Ada', 'Grace', 'Linus'].map((name) => (
                    <Popover.Trigger key={name} handle={handle} payload={name} asChild>
                        <Button>{name}</Button>
                    </Popover.Trigger>
                ))}
            </div>
            <Popover.Root handle={handle}>
                {({ payload }) => (
                    <Popover.Portal>
                        <Popover.Content>
                            <Text>Profile card for {String(payload)}</Text>
                        </Popover.Content>
                    </Popover.Portal>
                )}
            </Popover.Root>
        </SandboxEditor>
    );
};

export const DetachedTriggers = {
    render: () => <DetachedTriggersExample />
};

const FocusTargetsExample = () => {
    const nameRef = React.useRef<HTMLInputElement>(null);
    const saveRef = React.useRef<HTMLButtonElement>(null);
    return (
        <SandboxEditor>
            <div style={{ padding: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <Button variant="soft">Rename</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content sideOffset={12} initialFocus={nameRef} finalFocus={saveRef}>
                            <div style={{ display: 'grid', gap: '0.5rem', minWidth: '16rem' }}>
                                <Text as="label" htmlFor="popover-name">Name</Text>
                                <TextField id="popover-name" ref={nameRef} defaultValue="Untitled" />
                                <Popover.Close asChild>
                                    <Button size="small">Done</Button>
                                </Popover.Close>
                            </div>
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
                <Button ref={saveRef} variant="outline">Save document</Button>
            </div>
        </SandboxEditor>
    );
};

/** `initialFocus` puts the caret in the name field; `finalFocus` moves on to Save when it closes. */
export const FocusTargets = {
    render: () => <FocusTargetsExample />
};
