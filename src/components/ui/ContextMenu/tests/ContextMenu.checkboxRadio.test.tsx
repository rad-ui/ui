import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import ContextMenu from '../ContextMenu';

describe('ContextMenu checkbox and radio items', () => {
    test('toggles a checkbox item and picks a radio item without closing', async() => {
        const user = userEvent.setup();
        render(
            <ContextMenu.Root>
                <ContextMenu.Trigger>Canvas</ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.CheckboxItem>Snap to grid</ContextMenu.CheckboxItem>
                    <ContextMenu.Group>
                        <ContextMenu.GroupLabel>Zoom</ContextMenu.GroupLabel>
                        <ContextMenu.RadioGroup defaultValue="100">
                            <ContextMenu.RadioItem value="50">50%</ContextMenu.RadioItem>
                            <ContextMenu.RadioItem value="100">100%</ContextMenu.RadioItem>
                        </ContextMenu.RadioGroup>
                    </ContextMenu.Group>
                </ContextMenu.Content>
            </ContextMenu.Root>
        );
        fireEvent.contextMenu(screen.getByText('Canvas'));
        await user.click(screen.getByRole('menuitemcheckbox', { name: 'Snap to grid' }));
        expect(screen.getByRole('menuitemcheckbox', { name: 'Snap to grid' })).toHaveAttribute('aria-checked', 'true');
        await user.click(screen.getByRole('menuitemradio', { name: '50%' }));
        expect(screen.getByRole('menuitemradio', { name: '50%' })).toHaveAttribute('aria-checked', 'true');
        expect(screen.getByRole('menuitemradio', { name: '100%' })).toHaveAttribute('aria-checked', 'false');

        const results = await axe.run(document.body, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
