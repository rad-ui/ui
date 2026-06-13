import React from 'react';
import { render, act, screen } from '@testing-library/react';

import Theme from '../Theme';
import ThemeContext from '../ThemeContext';

describe('Theme', () => {
    const originalMatchMedia = window.matchMedia;

    const createMediaQueryList = (matches: boolean) => {
        const listeners: Array<(e: MediaQueryListEvent) => void> = [];
        const mediaQueryList = {
            matches,
            addEventListener: jest.fn((_event, listener) => {
                listeners.push(listener);
            }),
            removeEventListener: jest.fn((_event, listener) => {
                const index = listeners.indexOf(listener);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            })
        } as unknown as MediaQueryList;

        return { listeners, mediaQueryList };
    };

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });

    test('applies light appearance regardless of system preference', () => {
        const { mediaQueryList } = createMediaQueryList(true);
        window.matchMedia = jest.fn().mockReturnValue(mediaQueryList);

        const { container } = render(<Theme appearance="light">content</Theme>);
        const themeDiv = container.firstChild as HTMLElement;

        expect(themeDiv).toHaveAttribute('data-rad-ui-theme', 'light');
        expect(mediaQueryList.addEventListener).not.toHaveBeenCalled();
    });

    test('applies dark appearance regardless of system preference', () => {
        const { mediaQueryList } = createMediaQueryList(false);
        window.matchMedia = jest.fn().mockReturnValue(mediaQueryList);

        const { container } = render(<Theme appearance="dark">content</Theme>);
        const themeDiv = container.firstChild as HTMLElement;

        expect(themeDiv).toHaveAttribute('data-rad-ui-theme', 'dark');
        expect(mediaQueryList.addEventListener).not.toHaveBeenCalled();
    });

    test('resolves system appearance from the current color scheme preference', () => {
        const darkPreference = createMediaQueryList(true);
        window.matchMedia = jest.fn().mockReturnValue(darkPreference.mediaQueryList);

        const { container, rerender } = render(<Theme appearance="system">content</Theme>);
        const themeDiv = container.firstChild as HTMLElement;
        expect(themeDiv).toHaveAttribute('data-rad-ui-theme', 'dark');

        const lightPreference = createMediaQueryList(false);
        window.matchMedia = jest.fn().mockReturnValue(lightPreference.mediaQueryList);

        rerender(<Theme appearance="system" key="light-system">content</Theme>);
        expect(container.firstChild as HTMLElement).toHaveAttribute('data-rad-ui-theme', 'light');
    });

    test('updates theme on system preference change and cleans up listeners', () => {
        const { listeners, mediaQueryList } = createMediaQueryList(false);
        window.matchMedia = jest.fn().mockReturnValue(mediaQueryList);

        const { container, unmount } = render(<Theme appearance="system">content</Theme>);
        const themeDiv = container.firstChild as HTMLElement;

        expect(themeDiv).toHaveAttribute('data-rad-ui-theme', 'light');

        const addedListener = listeners[0];
        expect(mediaQueryList.addEventListener).toHaveBeenCalledWith('change', addedListener);

        act(() => {
            addedListener({ matches: true } as MediaQueryListEvent);
        });

        expect(themeDiv).toHaveAttribute('data-rad-ui-theme', 'dark');

        unmount();

        expect(mediaQueryList.removeEventListener).toHaveBeenCalledWith('change', addedListener);
    });

    test('forwards ref to underlying div', () => {
        window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as MediaQueryList);
        const ref = React.createRef<HTMLDivElement>();
        render(<Theme ref={ref}>content</Theme>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toContainElement(screen.getByText('content'));
    });

    test('renders without console warnings', () => {
        window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as MediaQueryList);
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<Theme>content</Theme>);
        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
        errorSpy.mockRestore();
    });

    test('renders children accessibly', () => {
        window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as MediaQueryList);
        render(<Theme>content</Theme>);
        expect(screen.getByText('content')).toBeVisible();
    });

    test('renders a dedicated portal root inside the theme container', () => {
        window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as MediaQueryList);
        const { container } = render(<Theme>content</Theme>);
        const themeDiv = container.firstChild as HTMLElement;
        const portalRoot = themeDiv.querySelector('[data-rad-ui-portal-root]');

        expect(portalRoot).toBeInstanceOf(HTMLDivElement);
        expect(portalRoot?.parentElement).toBe(themeDiv);
    });

    test('provides classNamespace through context', () => {
        window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as MediaQueryList);

        const Consumer = () => {
            const context = React.useContext(ThemeContext);
            return <span data-testid="class-namespace">{context?.classNamespace}</span>;
        };

        render(
            <Theme classNamespace="acme">
                <Consumer />
            </Theme>
        );

        expect(screen.getByTestId('class-namespace')).toHaveTextContent('acme');
    });

    test('does not add generated classes without classNamespace', () => {
        window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as MediaQueryList);
        const { container } = render(<Theme>content</Theme>);
        const themeDiv = container.firstChild as HTMLElement;

        expect(themeDiv).not.toHaveClass('rad-ui-theme');
    });

    test('renders under StrictMode without console errors', () => {
        window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as MediaQueryList);
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const { unmount } = render(
            <React.StrictMode>
                <Theme appearance="light">content</Theme>
            </React.StrictMode>
        );

        expect(screen.getByText('content')).toBeVisible();
        unmount();
        expect(errorSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
    });
    describe('nested Theme providers', () => {
        const mockMatchMedia = () => {
            window.matchMedia = jest.fn().mockReturnValue({
                matches: false,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn()
            } as unknown as MediaQueryList);
        };

        test('scopes appearance and accent metadata to each provider subtree', () => {
            mockMatchMedia();

            const { container } = render(
                <Theme appearance="light" accentColor="gray" data-testid="outer-theme">
                    <span data-testid="outer-content">outer</span>
                    <Theme appearance="dark" accentColor="tomato" data-testid="inner-theme">
                        <span data-testid="inner-content">inner</span>
                    </Theme>
                </Theme>
            );

            const outerTheme = screen.getByTestId('outer-theme');
            const innerTheme = screen.getByTestId('inner-theme');

            expect(outerTheme).toHaveAttribute('data-rad-ui-theme', 'light');
            expect(outerTheme).toHaveAttribute('data-rad-ui-accent-color', 'gray');
            expect(innerTheme).toHaveAttribute('data-rad-ui-theme', 'dark');
            expect(innerTheme).toHaveAttribute('data-rad-ui-accent-color', 'tomato');
            expect(outerTheme).toContainElement(screen.getByTestId('outer-content'));
            expect(innerTheme).toContainElement(screen.getByTestId('inner-content'));
            expect(container.querySelectorAll('[data-rad-ui-portal-root]')).toHaveLength(2);
        });

        test('provides independent classNamespace values through nested context', () => {
            mockMatchMedia();

            const NamespaceReader = ({ testId }: { testId: string }) => {
                const context = React.useContext(ThemeContext);
                return <span data-testid={testId}>{context?.classNamespace ?? 'none'}</span>;
            };

            render(
                <Theme classNamespace="outer">
                    <NamespaceReader testId="outer-namespace" />
                    <Theme classNamespace="inner">
                        <NamespaceReader testId="inner-namespace" />
                    </Theme>
                </Theme>
            );

            expect(screen.getByTestId('outer-namespace')).toHaveTextContent('outer');
            expect(screen.getByTestId('inner-namespace')).toHaveTextContent('inner');
        });

        test('keeps radius and scaling scoped to the matching nested provider', () => {
            mockMatchMedia();

            render(
                <Theme radius="sm" scaling="90%" data-testid="outer-theme">
                    <Theme radius="lg" scaling="110%" data-testid="inner-theme">
                        inner
                    </Theme>
                </Theme>
            );

            expect(screen.getByTestId('outer-theme')).toHaveAttribute('data-rad-ui-radius', 'sm');
            expect(screen.getByTestId('outer-theme')).toHaveAttribute('data-rad-ui-scaling', '90%');
            expect(screen.getByTestId('inner-theme')).toHaveAttribute('data-rad-ui-radius', 'lg');
            expect(screen.getByTestId('inner-theme')).toHaveAttribute('data-rad-ui-scaling', '110%');
        });
    });
});
