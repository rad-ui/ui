import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Label from '../Label';

/**
 * Tests for Label component ensuring proper linkage and accessibility.
 */
describe('Label', () => {
    test('associates with form field via htmlFor', () => {
        render(
            <div>
                <Label htmlFor="email">Email</Label>
                <input id="email" />
            </div>
        );
        const input = screen.getByLabelText('Email');
        expect(input).toBeInTheDocument();
    });

    test('clicking label focuses associated input', async() => {
        const user = userEvent.setup();
        render(
            <div>
                <Label htmlFor="name">Name</Label>
                <input id="name" />
            </div>
        );
        const label = screen.getByText('Name');
        const input = screen.getByLabelText('Name');
        await user.click(label);
        expect(document.activeElement).toBe(input);
    });

    test('renders a <label> with the root class and data-slot, and forwards refs', () => {
        const ref = React.createRef<HTMLLabelElement>();
        // customRootClass is a class namespace (unstyled unless one is set).
        render(<Label ref={ref} customRootClass="rad-ui" className="extra">Email</Label>);
        const label = screen.getByText('Email');
        expect(label.tagName).toBe('LABEL');
        expect(label).toHaveClass('rad-ui-label', 'extra');
        expect(label).toHaveAttribute('data-slot', 'label');
        expect(ref.current).toBe(label);
    });

    test('supports customRootClass', () => {
        render(<Label customRootClass="acme">Email</Label>);
        expect(screen.getByText('Email')).toHaveClass('acme-label');
    });

    test('does not select its text on double-click', () => {
        render(<Label htmlFor="x">Email</Label>);
        const doubleClick = new MouseEvent('mousedown', { bubbles: true, cancelable: true, detail: 2 });
        screen.getByText('Email').dispatchEvent(doubleClick);
        expect(doubleClick.defaultPrevented).toBe(true);

        const singleClick = new MouseEvent('mousedown', { bubbles: true, cancelable: true, detail: 1 });
        screen.getByText('Email').dispatchEvent(singleClick);
        expect(singleClick.defaultPrevented).toBe(false);
    });

    test('leaves double-clicks on a nested control alone', () => {
        render(<Label>Name <input aria-label="nested" /></Label>);
        const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true, detail: 2 });
        screen.getByLabelText('nested').dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
    });

    test('calls a consumer onMouseDown first and respects its preventDefault', () => {
        const onMouseDown = jest.fn();
        render(<Label onMouseDown={onMouseDown}>Email</Label>);
        fireEvent.mouseDown(screen.getByText('Email'), { detail: 1 });
        expect(onMouseDown).toHaveBeenCalledTimes(1);
    });

    test('asChild renders the child element with label props merged', () => {
        // With asChild the ref points at the child element (a <span> here).
        const ref = React.createRef<HTMLLabelElement>();
        render(
            <Label asChild ref={ref} customRootClass="acme">
                <span data-testid="child">Email</span>
            </Label>
        );
        const child = screen.getByTestId('child');
        expect(child.tagName).toBe('SPAN');
        expect(child).toHaveClass('acme-label');
        expect(child).toHaveAttribute('data-slot', 'label');
        expect(ref.current).toBe(child);
    });
});
