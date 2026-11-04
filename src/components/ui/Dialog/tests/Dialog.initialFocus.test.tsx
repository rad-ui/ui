import React, { createRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dialog from '../Dialog';

// #2278: a chosen initial focus target must not scroll a tall dialog to it.
describe('Dialog initialFocus', () => {
    let focusSpy: jest.SpyInstance;
    beforeEach(() => {
        focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
    });
    afterEach(() => focusSpy.mockRestore());

    const focusedWith = (el: HTMLElement) =>
        focusSpy.mock.calls.filter((_, i) => focusSpy.mock.instances[i] === el).map(([options]) => options);

    test('a ref target gets focus without scrolling', async() => {
        const target = createRef<HTMLButtonElement>();
        render(
            <Dialog.Root open>
                <Dialog.Portal>
                    <Dialog.Content initialFocus={target}>
                        <Dialog.Title>Title</Dialog.Title>
                        <button>First</button>
                        <button ref={target}>Primary action</button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );
        const button = screen.getByText('Primary action');
        await waitFor(() => expect(document.activeElement).toBe(button));
        expect(focusedWith(button)).toEqual([{ preventScroll: true }]);
        expect(focusedWith(screen.getByText('First'))).toEqual([]);
    });

    test('a function returning an element works the same way', async() => {
        render(
            <Dialog.Root open>
                <Dialog.Portal>
                    <Dialog.Content initialFocus={() => document.getElementById('pick')}>
                        <Dialog.Title>Title</Dialog.Title>
                        <button>First</button>
                        <button id="pick">Picked</button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );
        const button = screen.getByText('Picked');
        await waitFor(() => expect(document.activeElement).toBe(button));
        expect(focusedWith(button)).toEqual([{ preventScroll: true }]);
    });

    test('the default still focuses the first tabbable element', async() => {
        render(
            <Dialog.Root open>
                <Dialog.Portal>
                    <Dialog.Content>
                        <Dialog.Title>Title</Dialog.Title>
                        <button>First</button>
                        <button>Second</button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );
        await waitFor(() => expect(document.activeElement).toBe(screen.getByText('First')));
    });
});
