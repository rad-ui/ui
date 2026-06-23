import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from '../Accordion';

describe('Accordion lazy mount behavior', () => {
    test('does not mount collapsed content by default', () => {
        render(
            <Accordion.Root type="single" defaultValue="">
                <Accordion.Item value="one">
                    <Accordion.Header>
                        <Accordion.Trigger>Section one</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>Panel one</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );

        expect(screen.getByText('Section one')).toBeInTheDocument();
        expect(screen.queryByText('Panel one')).not.toBeInTheDocument();
    });

    test('mounts content after opening', async() => {
        const user = userEvent.setup();

        render(
            <Accordion.Root type="single" collapsible>
                <Accordion.Item value="one">
                    <Accordion.Header>
                        <Accordion.Trigger>Section one</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>Panel one</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );

        expect(screen.queryByText('Panel one')).not.toBeInTheDocument();
        await user.click(screen.getByText('Section one'));
        expect(screen.getByText('Panel one')).toBeInTheDocument();
    });

    test('forceMount keeps content mounted while closed', () => {
        render(
            <Accordion.Root type="single" value="">
                <Accordion.Item value="one">
                    <Accordion.Header>
                        <Accordion.Trigger>Section one</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content forceMount>Mounted panel</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );

        const panel = screen.getByText('Mounted panel');
        expect(panel).toBeInTheDocument();
        expect(panel.closest('[data-state="closed"]')).toBeTruthy();
    });
});
