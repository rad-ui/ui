import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { customClassSwitcher } from '~/core';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder/TextDecoder for react-dom/server
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TextDecoder = TextDecoder;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactDOMServer = require('react-dom/server');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { hydrateRoot } = require('react-dom/client');

const customRootClass = 'myCustomRootClass';
const componentName = 'myComponent';

describe('customClassSwitcher', () => {
    it('returns customRootClass if passed', () => {
        expect(customClassSwitcher(customRootClass, componentName)).toBe(`${customRootClass}-my-component`);
    });

    it('returns empty string if neither customRootClass nor componentName were passed', () => {
        expect(customClassSwitcher('', '')).toBe('');
    });

    it('returns dashed class name if componentName was passed and customRootClass was not', () => {
        expect(customClassSwitcher('', componentName)).toBe('rad-ui-my-component');
    });

    it('uses default parameters when called without arguments', () => {
        // @ts-ignore testing missing args
        expect(customClassSwitcher()).toBe('');
    });

    it('applies token CSS vars when switching root class', () => {
        const tokenName = '--rad-ui-color-accent-50';
        const tokenValue = 'rgb(255, 0, 0)';
        const style = document.createElement('style');
        style.innerHTML = `.${customRootClass} { ${tokenName}: ${tokenValue}; }`;
        document.head.appendChild(style);

        render(
            <div className={customRootClass}>
                <button
                    data-testid="btn"
                    className={customClassSwitcher(customRootClass, 'Button')}
                    style={{ color: 'var(--rad-ui-color-accent-50)' }}
                >
                    test
                </button>
            </div>
        );

        const root = document.querySelector(`.${customRootClass}`) as HTMLElement;
        expect(getComputedStyle(root).getPropertyValue(tokenName).trim()).toBe(tokenValue);
    });

    it('retains accessibility attributes in detach mode', () => {
        const { getByRole } = render(
            <button aria-label="close" className={customClassSwitcher('', 'Button')} />
        );
        expect(getByRole('button')).toHaveAttribute('aria-label', 'close');
    });

    it('handles nested root class switches', () => {
        const outerClass = 'outer-root';
        const innerClass = 'inner-root';
        const tokenName = '--rad-ui-color-accent-50';
        const outerValue = 'rgb(0, 0, 255)';
        const innerValue = 'rgb(255, 0, 0)';
        const style = document.createElement('style');
        style.innerHTML = `.${outerClass} { ${tokenName}: ${outerValue}; } .${innerClass} { ${tokenName}: ${innerValue}; }`;
        document.head.appendChild(style);

        render(
            <div className={outerClass}>
                <div className={innerClass}>
                    <button
                        data-testid="nested"
                        className={customClassSwitcher(innerClass, 'Button')}
                        style={{ color: 'var(--rad-ui-color-accent-50)' }}
                    >
                        nested
                    </button>
                </div>
            </div>
        );

        const innerRoot = document.querySelector(`.${innerClass}`) as HTMLElement;
        expect(getComputedStyle(innerRoot).getPropertyValue(tokenName).trim()).toBe(innerValue);
    });

    it('returns empty value for missing tokens', () => {
        const { container } = render(<div className={customRootClass}></div>);
        const root = container.firstChild as HTMLElement;
        expect(getComputedStyle(root).getPropertyValue('--rad-ui-color-missing')).toBe('');
    });

    it('renders on server and hydrates without mismatch', () => {
        const ssrRoot = 'ssr-root';

        function App() {
            return (
                <div className={ssrRoot}>
                    <button
                        aria-label="ssr button"
                        className={customClassSwitcher(ssrRoot, 'Button')}
                    >
                        SSR
                    </button>
                </div>
            );
        }

        const html = ReactDOMServer.renderToString(<App />);
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

        let root: any;
        act(() => {
            root = hydrateRoot(container, <App />);
        });

        expect(spy).not.toHaveBeenCalled();

        root.unmount();
        spy.mockRestore();
    });
});

