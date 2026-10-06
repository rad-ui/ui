import React from 'react';
import { render, screen } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Dialog from '../Dialog';

describe('Dialog labelling', () => {
    test('content is labelled by Title and described by Description', async() => {
        render(
            <Dialog.Root defaultOpen>
                <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content data-testid="content">
                        <Dialog.Title>Workspace settings</Dialog.Title>
                        <Dialog.Description>Adjust your workspace.</Dialog.Description>
                        <Dialog.Close>Close</Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );

        const dialog = await screen.findByRole('dialog', { name: 'Workspace settings' });
        const title = screen.getByText('Workspace settings');
        const description = screen.getByText('Adjust your workspace.');
        expect(dialog).toHaveAttribute('aria-labelledby', title.id);
        expect(dialog).toHaveAttribute('aria-describedby', description.id);
        expect(dialog).toHaveAccessibleDescription('Adjust your workspace.');

        const results = await axe.run(document.body, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations.filter(v => v.id.startsWith('aria-dialog')).map(v => v.id)).toEqual([]);
    });

    test('explicit ids and aria props are respected', async() => {
        render(
            <Dialog.Root defaultOpen>
                <Dialog.Portal>
                    <Dialog.Content aria-labelledby="custom-label">
                        <span id="custom-label">Custom</span>
                        <Dialog.Title id="my-title">Title</Dialog.Title>
                        <Dialog.Description id="my-desc">Desc</Dialog.Description>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toHaveAttribute('aria-labelledby', 'custom-label');
        expect(dialog).toHaveAttribute('aria-describedby', 'my-desc');
        expect(screen.getByText('Title')).toHaveAttribute('id', 'my-title');
    });

    test('omits aria-describedby when no Description is rendered', async() => {
        render(
            <Dialog.Root defaultOpen>
                <Dialog.Portal>
                    <Dialog.Content>
                        <Dialog.Title>Only title</Dialog.Title>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );

        const dialog = await screen.findByRole('dialog', { name: 'Only title' });
        expect(dialog).not.toHaveAttribute('aria-describedby');
    });
});
