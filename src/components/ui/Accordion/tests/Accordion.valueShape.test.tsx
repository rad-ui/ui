import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from '../Accordion';

describe('Accordion value shape', () => {
    const singleAccordion = (props: React.ComponentProps<typeof Accordion.Root>) => (
        <Accordion.Root type="single" collapsible {...props}>
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

    test('type single onValueChange receives a scalar value', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();

        render(singleAccordion({ onValueChange }));

        await user.click(screen.getByText('One'));
        expect(onValueChange).toHaveBeenLastCalledWith('one');

        await user.click(screen.getByText('Two'));
        expect(onValueChange).toHaveBeenLastCalledWith('two');
    });

    test('type multiple onValueChange receives an array', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();

        render(
            <Accordion.Root type="multiple" onValueChange={onValueChange}>
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

        await user.click(screen.getByText('One'));
        expect(onValueChange).toHaveBeenLastCalledWith(['one']);

        await user.click(screen.getByText('Two'));
        expect(onValueChange).toHaveBeenLastCalledWith(['one', 'two']);
    });

    test('type single controlled value accepts a scalar', () => {
        render(singleAccordion({ value: 'two' }));
        expect(screen.getByText('Panel two')).toBeInTheDocument();
        expect(screen.queryByText('Panel one')).not.toBeInTheDocument();
    });
});
