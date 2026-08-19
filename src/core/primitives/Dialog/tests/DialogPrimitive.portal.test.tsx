import React from 'react';
import { render, screen } from '@testing-library/react';
import ThemeContext from '~/components/ui/Theme/ThemeContext';
import DialogPrimitive from '~/core/primitives/Dialog';

describe('Dialog primitive portal', () => {
    test('portals into Theme portalRootRef when provided', () => {
        const portalRoot = document.createElement('div');
        document.body.appendChild(portalRoot);

        render(
            <ThemeContext.Provider
                value={{
                    containerRef: { current: null },
                    portalRootRef: { current: portalRoot }
                }}>
                <DialogPrimitive.Root open>
                    <DialogPrimitive.Portal>
                        <DialogPrimitive.Content>Dialog body</DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                </DialogPrimitive.Root>
            </ThemeContext.Provider>
        );

        expect(portalRoot).toContainElement(screen.getByText('Dialog body'));
        portalRoot.remove();
    });
});
