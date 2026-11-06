import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { expectNoUnexpectedHydrationWarnings, flush, hydrateRoot, renderToString } from '~/components/ui/tests/ssrHydration';
import ButtonPrimitive from '../index';
import Tooltip from '~/components/ui/Tooltip/Tooltip';
import Popover from '~/components/ui/Popover/Popover';
import Dialog from '~/components/ui/Dialog/Dialog';

// `asChild` hands the part's behaviour to the child, not the button semantics: a link stays a link
// (rad-ui/ui#2332), a native button keeps its own type, and only elements that are neither get
// role="button".
describe('ButtonPrimitive asChild semantics', () => {
    test('a plain ButtonPrimitive is still a button with type="button"', () => {
        render(<ButtonPrimitive>press</ButtonPrimitive>);
        const button = screen.getByRole('button', { name: 'press' });
        expect(button).toHaveAttribute('type', 'button');
    });

    test('a link child keeps link semantics', () => {
        render(<ButtonPrimitive asChild><a href="/plants">Plants</a></ButtonPrimitive>);
        const link = screen.getByRole('link', { name: 'Plants' });
        expect(link).not.toHaveAttribute('role');
        expect(link).not.toHaveAttribute('type');
    });

    test('a native button child gets type="button" and no extra role', () => {
        render(<ButtonPrimitive asChild><button>go</button></ButtonPrimitive>);
        const button = screen.getByRole('button', { name: 'go' });
        expect(button).toHaveAttribute('type', 'button');
        expect(button).not.toHaveAttribute('role');
    });

    test('a native submit button child keeps its type', () => {
        render(<form><ButtonPrimitive asChild type={undefined}><button type="submit">save</button></ButtonPrimitive></form>);
        expect(screen.getByRole('button', { name: 'save' })).toHaveAttribute('type', 'submit');
    });

    test('a span child gets role="button" and no type', () => {
        render(<ButtonPrimitive asChild><span>tap</span></ButtonPrimitive>);
        const span = screen.getByRole('button', { name: 'tap' });
        expect(span.tagName).toBe('SPAN');
        expect(span).not.toHaveAttribute('type');
    });

    test('an explicit role or type from the caller wins', () => {
        render(<ButtonPrimitive asChild role="menuitem"><a href="/x">x</a></ButtonPrimitive>);
        expect(screen.getByRole('menuitem', { name: 'x' })).toHaveAttribute('href', '/x');
    });

    test('Tooltip, Popover and Dialog triggers with a link child keep link semantics', () => {
        render(
            <>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild><a href="/t">tooltip link</a></Tooltip.Trigger>
                    <Tooltip.Content>tip</Tooltip.Content>
                </Tooltip.Root>
                <Popover.Root>
                    <Popover.Trigger asChild><a href="/p">popover link</a></Popover.Trigger>
                    <Popover.Portal><Popover.Content>body</Popover.Content></Popover.Portal>
                </Popover.Root>
                <Dialog.Root>
                    <Dialog.Trigger asChild><a href="/d">dialog link</a></Dialog.Trigger>
                    <Dialog.Portal><Dialog.Content>body</Dialog.Content></Dialog.Portal>
                </Dialog.Root>
            </>
        );
        for (const name of ['tooltip link', 'popover link', 'dialog link']) {
            const link = screen.getByRole('link', { name });
            expect(link).not.toHaveAttribute('role');
            expect(link).not.toHaveAttribute('type');
        }
    });

    test.each([
        ['a link', <a key="a" href="/x">x</a>, (el: Element) => { expect(el).not.toHaveAttribute('role'); expect(el).not.toHaveAttribute('type'); }],
        ['a span', <span key="s">x</span>, (el: Element) => { expect(el).toHaveAttribute('role', 'button'); expect(el).not.toHaveAttribute('type'); }]
    ])('hydrates a Tooltip trigger with %s child without a mismatch', async(_label, child, check) => {
        const ui = (
            <Tooltip.Root>
                <Tooltip.Trigger asChild>{child}</Tooltip.Trigger>
                <Tooltip.Content>tip</Tooltip.Content>
            </Tooltip.Root>
        );
        const container = document.createElement('div');
        container.innerHTML = renderToString(ui);
        document.body.appendChild(container);
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        await act(async() => {
            hydrateRoot(container, ui);
            await flush();
        });
        expectNoUnexpectedHydrationWarnings(warn, error);
        warn.mockRestore();
        error.mockRestore();
        check(container.querySelector('a, span')!);
        container.remove();
    });
});
