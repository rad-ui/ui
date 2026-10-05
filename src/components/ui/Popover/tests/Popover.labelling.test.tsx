import React from 'react';
import { render, screen } from '@testing-library/react';
import Popover from '../Popover';

describe('Popover labelling', () => {
    test('content is labelled by Popover.Title and described by Popover.Description', async() => {
        render(
            <Popover.Root defaultOpen>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Content>
                    <Popover.Title>Dimensions</Popover.Title>
                    <Popover.Description>Set the layer size.</Popover.Description>
                </Popover.Content>
            </Popover.Root>
        );

        const dialog = await screen.findByRole('dialog', { name: 'Dimensions' });
        expect(dialog).toHaveAccessibleDescription('Set the layer size.');
        expect(screen.getByText('Dimensions').tagName).toBe('H2');
        expect(screen.getByText('Dimensions')).toHaveAttribute('data-slot', 'popover-title');
    });

    test('forwards aria-label and lets it take precedence over Title', async() => {
        render(
            <Popover.Root defaultOpen>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Content aria-label="Layer settings">
                    <Popover.Title>Dimensions</Popover.Title>
                </Popover.Content>
            </Popover.Root>
        );

        const dialog = await screen.findByRole('dialog', { name: 'Layer settings' });
        expect(dialog).not.toHaveAttribute('aria-labelledby');
    });

    test('forwards an explicit aria-labelledby', async() => {
        render(
            <Popover.Root defaultOpen>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Content aria-labelledby="ext">
                    <span id="ext">External label</span>
                    <Popover.Title>Dimensions</Popover.Title>
                </Popover.Content>
            </Popover.Root>
        );

        expect(await screen.findByRole('dialog', { name: 'External label' })).toHaveAttribute('aria-labelledby', 'ext');
    });
});
