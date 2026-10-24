import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';

const Page = ({ modal }: { modal?: boolean | 'trap-focus' }) => (
    <>
        <Dialog.Root modal={modal} defaultOpen>
            <Dialog.Portal>
                <Dialog.Overlay data-testid="overlay" />
                <Dialog.Content data-testid="content">
                    <Dialog.Title>Notes</Dialog.Title>
                    <button>Inside</button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
        <button>Outside</button>
    </>
);

describe('Dialog modal', () => {
    test('default (true): aria-modal, scroll locked, overlay takes pointer input', async() => {
        render(<Page />);
        expect(screen.getByTestId('content')).toHaveAttribute('aria-modal', 'true');
        await waitFor(() => expect(document.body.style.overflow).toBe('hidden'));
        expect(screen.getByTestId('overlay').style.pointerEvents).not.toBe('none');
    });

    test('trap-focus: focus stays inside but the page still scrolls and takes pointer input', async() => {
        render(<Page modal="trap-focus" />);
        expect(screen.getByTestId('content')).toHaveAttribute('aria-modal', 'true');
        expect(document.body.style.overflow).not.toBe('hidden');
        expect(screen.getByTestId('overlay').style.pointerEvents).toBe('none');
        await waitFor(() => expect(screen.getByTestId('content').contains(document.activeElement)).toBe(true));
        // The focus manager runs modal, which hides the rest of the page from assistive technology.
        // (Tab trapping itself can't be exercised in jsdom; see src/test-utils/portal.ts.)
        await waitFor(() => expect(screen.getByText('Outside').closest('[aria-hidden="true"]')).not.toBeNull());
    });

    test('false: no aria-modal, no scroll lock, focus can leave', async() => {
        const user = userEvent.setup();
        render(<Page modal={false} />);
        expect(screen.getByTestId('content')).toHaveAttribute('aria-modal', 'false');
        expect(document.body.style.overflow).not.toBe('hidden');
        expect(screen.getByTestId('overlay').style.pointerEvents).toBe('none');
        await waitFor(() => expect(screen.getByTestId('content').contains(document.activeElement)).toBe(true));
        expect(screen.getByText('Outside').closest('[aria-hidden="true"]')).toBeNull();
        await user.click(screen.getByText('Outside'));
        expect(screen.getByText('Outside')).toHaveFocus();
    });

    test('explicit Content props still win', () => {
        render(
            <Dialog.Root modal={false} defaultOpen>
                <Dialog.Portal>
                    <Dialog.Content data-testid="content" aria-modal>
                        <Dialog.Title>Notes</Dialog.Title>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );
        expect(screen.getByTestId('content')).toHaveAttribute('aria-modal', 'true');
    });
});
