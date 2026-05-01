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
