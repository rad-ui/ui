import React from 'react';
import Dialog from '~/components/ui/Dialog/Dialog';
import Select from '~/components/ui/Select/Select';
import Tooltip from '~/components/ui/Tooltip/Tooltip';

export function SSRDialog() {
    return (
        <div data-testid="dialog-container">
            <Dialog.Root open>
                <Dialog.Trigger data-testid="dialog-trigger">Open Dialog</Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content>
                        <Dialog.Title>Dialog Title</Dialog.Title>
                        <Dialog.Description>This tests that Dialog components can be rendered and hydrated</Dialog.Description>
                        <Dialog.Close>Close</Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}

export function SSRSelect() {
    return (
        <div data-testid="select-container">
            <Select.Root defaultValue="one">
                <Select.Trigger data-testid="select-trigger">Select Option</Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Item value="one">Option One</Select.Item>
                        <Select.Item value="two">Option Two</Select.Item>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    );
}

export function SSRTooltip() {
    return (
        <div data-testid="tooltip-container">
            <Tooltip.Root defaultOpen>
                <Tooltip.Trigger data-testid="tooltip-trigger">Hover for tooltip</Tooltip.Trigger>
                <Tooltip.Content>This is a tooltip</Tooltip.Content>
            </Tooltip.Root>
        </div>
    );
}
