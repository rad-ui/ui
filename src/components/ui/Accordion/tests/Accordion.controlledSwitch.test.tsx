import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from '../Accordion';

const accordionItems = (props: React.ComponentProps<typeof Accordion.Root>) => (
    <Accordion.Root {...props}>
        <Accordion.Item value="one">
            <Accordion.Header>
                <Accordion.Trigger>One</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Panel one</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="two">
            <Accordion.Header>
                <Accordion.Trigger>Two</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Panel two</Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
);

describe('Accordion controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();

        const { rerender } = render(
            accordionItems({ type: 'single', collapsible: true, defaultValue: 'one' })
        );

        await user.click(screen.getByText('Two'));
        await waitFor(() => {
            expect(screen.getByText('Panel two')).toBeVisible();
        });

        rerender(
            accordionItems({
                type: 'single',
                collapsible: true,
                value: 'one',
                onValueChange
            })
        );

        await waitFor(() => {
            expect(screen.getByText('Panel one')).toBeVisible();
        });

        await user.click(screen.getByText('Two'));
        expect(onValueChange).toHaveBeenCalledWith('two');
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const { rerender } = render(
            accordionItems({
                type: 'single',
                collapsible: true,
                value: 'two',
                onValueChange: () => {}
            })
        );

        await waitFor(() => {
            expect(screen.getByText('Panel two')).toBeVisible();
        });
        rerender(
            accordionItems({
                type: 'single',
                collapsible: true,
                value: 'one',
                onValueChange: () => {}
            })
        );
        await waitFor(() => {
            expect(screen.getByText('Panel one')).toBeVisible();
        });

        rerender(accordionItems({ type: 'single', collapsible: true, defaultValue: 'one' }));

        await waitFor(() => {
            expect(screen.getByText('Panel one')).toBeVisible();
        });
        await user.click(screen.getByText('Two'));
        await waitFor(() => {
            expect(screen.getByText('Panel two')).toBeVisible();
        });
    });
});
