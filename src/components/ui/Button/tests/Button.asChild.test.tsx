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
            <Button asChild className="test-class" ref={ref as any}>
                <a href="#">link</a>
            </Button>
        );
        const button = screen.getByRole('button');
        expect(button.tagName.toLowerCase()).toBe('a');
        expect(button).toHaveClass('rad-ui-button', 'test-class');
        expect(ref.current).toBe(button);
    });

    test('span child preserves role and className', () => {
        render(
            <Button asChild className="span-class">
                <span>span</span>
            </Button>
        );
        const button = screen.getByRole('button');
        expect(button.tagName.toLowerCase()).toBe('span');
        expect(button).toHaveClass('rad-ui-button', 'span-class');
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
});
