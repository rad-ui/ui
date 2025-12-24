import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';

describe('Popover', () => {
    test('renders trigger and toggles content on click', async () => {
        render(
            <Popover.Root>
                <Popover.Trigger>Trigger</Popover.Trigger>
                <Popover.Content>
                    <div>Content</div>
                </Popover.Content>
            </Popover.Root>
        );

        const trigger = screen.getByText('Trigger');
        expect(screen.queryByText('Content')).toBeNull();
        await userEvent.click(trigger);
        expect(screen.getByText('Content')).toBeInTheDocument();
        await userEvent.click(trigger);
        expect(screen.queryByText('Content')).toBeNull();
    });

    test('forwards refs to subcomponents', async () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const triggerRef = React.createRef<HTMLButtonElement>();
        const contentRef = React.createRef<HTMLDivElement>();

        render(
            <Popover.Root ref={rootRef}>
                <Popover.Trigger ref={triggerRef}>Trigger</Popover.Trigger>
                <Popover.Content ref={contentRef}>
                    <div>Content</div>
                </Popover.Content>
            </Popover.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(contentRef.current).toBeNull();
        await userEvent.click(screen.getByText('Trigger'));
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    });
});
