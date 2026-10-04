import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../Button';

const Custom = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>((props, ref) => (
    <span ref={ref} {...props} />
));
Custom.displayName = 'Custom';

describe('Button asChild', () => {
    test('anchor child preserves role and forwards className and ref', () => {
        const ref = React.createRef<HTMLAnchorElement>();
        render(
            <Button asChild customRootClass="rad-ui" className="test-class" ref={ref as any}>
                <a href="#">link</a>
            </Button>
        );
        const button = screen.getByRole('button');
        expect(button.tagName.toLowerCase()).toBe('a');
        expect(button).toHaveClass('rad-ui-button-root', 'test-class');
        expect(ref.current).toBe(button);
    });

    test('span child preserves role and className', () => {
        render(
            <Button asChild customRootClass="rad-ui" className="span-class">
                <span>span</span>
            </Button>
        );
        const button = screen.getByRole('button');
        expect(button.tagName.toLowerCase()).toBe('span');
        expect(button).toHaveClass('rad-ui-button-root', 'span-class');
    });

    test('disabled asChild suppresses clicks and sets data-disabled', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        render(
            <Button asChild disabled onClick={onClick}>
                <a href="#">disabled</a>
            </Button>
        );
        const button = screen.getByRole('button');
        await user.click(button);
        expect(onClick).not.toHaveBeenCalled();
        expect(button).toHaveAttribute('data-disabled', '');
    });

    test('supports custom elements', () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(
            <Button asChild ref={ref as any}>
                <Custom data-test="yes" />
            </Button>
        );
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('data-test', 'yes');
        expect(ref.current).toBe(button);
    });

    test('avoids nested buttons when child is button', () => {
        render(
            <Button asChild>
                <button data-testid="inner">inner</button>
            </Button>
        );
        expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    test('disabled asChild blocks the child onClick and link navigation', async() => {
        const user = userEvent.setup();
        const childClick = jest.fn();
        const parentClick = jest.fn();
        render(
            <div onClick={parentClick}>
                <Button asChild disabled>
                    <a href="/somewhere" onClick={childClick}>disabled link</a>
                </Button>
            </div>
        );
        const link = screen.getByRole('button');
        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        link.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        await user.click(link);
        expect(childClick).not.toHaveBeenCalled();
        expect(parentClick).not.toHaveBeenCalled();

        const auxEvent = new MouseEvent('auxclick', { bubbles: true, cancelable: true, button: 1 });
        link.dispatchEvent(auxEvent);
        expect(auxEvent.defaultPrevented).toBe(true);
    });

    test('disabled asChild exposes aria-disabled and leaves the tab order for non-button children', async() => {
        const user = userEvent.setup();
        render(
            <>
                <Button asChild disabled>
                    <a href="/somewhere">disabled link</a>
                </Button>
                <button>next</button>
            </>
        );
        const link = screen.getByText('disabled link');
        expect(link).toHaveAttribute('aria-disabled', 'true');
        expect(link).toHaveAttribute('tabindex', '-1');
        expect(link).not.toHaveAttribute('aria-description');
        await user.tab();
        expect(screen.getByText('next')).toHaveFocus();
    });

    test('enabled asChild keeps child onClick and default tab order', async() => {
        const user = userEvent.setup();
        const childClick = jest.fn();
        const onClick = jest.fn();
        render(
            <Button asChild onClick={onClick}>
                <a href="#" onClick={childClick}>link</a>
            </Button>
        );
        const link = screen.getByRole('button');
        expect(link).not.toHaveAttribute('tabindex');
        await user.click(link);
        expect(childClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('disabled asChild with a native button child keeps native disabled semantics', () => {
        render(
            <Button asChild disabled>
                <button>native</button>
            </Button>
        );
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).not.toHaveAttribute('tabindex');
    });
});
