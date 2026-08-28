import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { DrawerContext } from '../context/DrawerContext';

function DrawerContextProbe() {
    const { isOpen, onOpen } = useContext(DrawerContext);
    onOpen();

    return <div data-testid="drawer-context-open">{String(isOpen)}</div>;
}

describe('Drawer context defaults', () => {
    test('provides closed state and a no-op open handler outside a provider', () => {
        render(<DrawerContextProbe />);

        expect(screen.getByTestId('drawer-context-open')).toHaveTextContent('false');
    });
});
