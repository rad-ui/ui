import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';
import { act } from 'react';
import axe from 'axe-core';
import VisuallyHidden from '../VisuallyHidden';

// polyfill for environments without TextEncoder/TextDecoder
// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;

// @ts-ignore - react-dom/server has no type definitions in this repo
const { renderToString } = require('react-dom/server');
// @ts-ignore - react-dom/client has no type definitions in this repo
const { hydrateRoot } = require('react-dom/client');

describe('VisuallyHidden accessibility', () => {
    test('is hidden visually but readable by screen readers', () => {
        render(<VisuallyHidden>Accessible text</VisuallyHidden>);
        const element = screen.getByText('Accessible text');
        expect(element).toBeInTheDocument();
        expect(element).toHaveStyle({ clip: 'rect(0 0 0 0)' });
    });

    test('asChild preserves semantics and forwards refs', () => {
        const ref = createRef<HTMLSpanElement>();
        render(
            <VisuallyHidden asChild ref={ref}>
                <span>Hidden span</span>
            </VisuallyHidden>
        );
        const element = screen.getByText('Hidden span');
        expect(element.tagName).toBe('SPAN');
        expect(ref.current).toBe(element);
        expect(element).toHaveStyle({ clipPath: 'inset(50%)' });
    });

    test('respects custom root class', () => {
        render(
            <VisuallyHidden customRootClass="custom-root">root class</VisuallyHidden>
        );
        const element = screen.getByText('root class');
        expect(element.className).toContain('custom-root-visually-hidden');
        expect(element.className).not.toContain('rad-ui-visually-hidden');
    });

    test('has no accessibility violations', async () => {
        const { container } = render(
            <VisuallyHidden>axe check</VisuallyHidden>
        );
        const results = await axe.run(container);
        expect(results.violations).toHaveLength(0);
    });

    test('SSR render and hydration produce matching markup', () => {
        const serverHTML = renderToString(
            <VisuallyHidden>hydrated text</VisuallyHidden>
        );
        const container = document.createElement('div');
        container.innerHTML = serverHTML;
        const initialHTML = container.innerHTML;
        act(() => {
            hydrateRoot(container, <VisuallyHidden>hydrated text</VisuallyHidden>);
        });
        expect(container.innerHTML).toBe(initialHTML);
        document.body.appendChild(container);
        expect(screen.getByText('hydrated text')).toHaveStyle({ clip: 'rect(0 0 0 0)' });
    });
});
